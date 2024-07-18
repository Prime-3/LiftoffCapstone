using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CasCap.Services; // GooglePhotosService

using backend.Data;
using backend.Models;
using backend.Authorization;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PhotosController: ControllerBase
{
    private readonly GooglePhotosService _photosSvc;
    private readonly ApplicationDbContext _context;
    private readonly IAuthorizationService _authz;

    public PhotosController(
        ApplicationDbContext context,
        GooglePhotosService photosSvc,
        IAuthorizationService authz)
    {
        _photosSvc = photosSvc;
        _context = context;
        _authz = authz;
    }

    // GET /api/photos/albums/{id}
    [HttpGet("albums/{id}")]
    public async Task<ActionResult<AlbumDTO>> GetAlbum(string id)
    {

        if (!await _photosSvc.LoginAsync())
            return Problem(detail: "Could not access Photos.", statusCode: 503);
        var album = await _photosSvc.GetAlbumAsync(id);
        if (album == null)
            return NotFound();
        return Ok(new AlbumDTO(album));
    }

    // GET /api/photos/albums?shopId={id}
    [HttpGet("albums")]
    public async Task<ActionResult<AlbumDTO>> GetAlbum(int shopId)
    {
        Shop? shop = await _context.Shops.FindAsync(shopId);
        if (shop == null)
            return NotFound(new {message = $"Not found: shop({shopId})."});
        if (shop.AlbumUniqueTitle == null)
            return NotFound(new {message = $"Not found: album for shop({shopId})."});

        if (!await _photosSvc.LoginAsync())
            return Problem(detail: "Could not access Photos.", statusCode: 503);
        var album = await _photosSvc.GetAlbumByTitleAsync(shop.AlbumUniqueTitle);
        // TODO: go ahead create an album if shop doesn't have one?
        if (album == null)
            return NotFound(new {message = $"Not found: album for shop({shopId})."});

        album.title = $"{shop.ShopName}'s album";
        return Ok(new AlbumDTO(album));
    }

    // POST /api/photos/albums
    [HttpPost("albums"), Authorize]
    public async Task<ActionResult<AlbumDTO>> CreateAlbum(int shopId)
    {
        Shop? shop = await _context.Shops.FindAsync(shopId);
        if (shop == null)
            return NotFound(new {message = $"Not found: shop({shopId})."});

        AuthorizationResult authzResult =
            await _authz.AuthorizeAsync(User, shop, new OwnerOnlyRequirement());
        if (!authzResult.Succeeded)
            return Forbid("Forbidden: you don't have permssion add an album.");

        if (!await _photosSvc.LoginAsync())
            return Problem(detail: "Could not access Photos.", statusCode: 503);

        string albumTitle = UniqueTitle(shop.Id, shop.ApplicationUserId);
        var album = await _photosSvc.GetOrCreateAlbumAsync(albumTitle);
        if (album == null)
            return Problem(detail: "Could not create album.", statusCode: 503);

        shop.AlbumUniqueTitle = albumTitle;
        shop.AlbumId = album.id;
        _context.SaveChanges();

        album.title = $"{shop.ShopName}'s album";
        return Ok(new AlbumDTO(album));
    }

    // GET /api/photos/albums/media?shopId={id}
    [HttpGet("albums/media")]
    public async Task<ActionResult<List<MediaDTO>>> GetMedia(int shopId)
    {
        Shop? shop = await _context.Shops.FindAsync(shopId);
        if (shop == null)
            return NotFound(new {message = $"Not found: shop({shopId})."});
        if (shop.AlbumId == null)
            return NotFound(new {message = $"Not found: album for shop({shopId})."});

        if (!await _photosSvc.LoginAsync())
            return Problem(detail: "Could not access Photos.", statusCode: 503);
        var media = _photosSvc.GetMediaItemsByAlbumAsync(shop.AlbumId);
        if (media == null)
            return NotFound(new {message = $"Not found: no media for shop ({shopId})."});

        try
        {
            List<MediaDTO> MediaDTOList =
                await media
                    .Where(p => p.isPhoto) // TODO: is this needed?
                    .Select(p => new MediaDTO(p))
                    .ToListAsync();
            return Ok(MediaDTOList);
        }
        catch (Exception e)
        {
            return Problem(detail: e.Message, statusCode: 500);
        }
    }

    // POST /api/photos/albums/media
    [HttpPost("albums/media"), Authorize]
    public async Task<ActionResult<MediaDTO>> UploadMedia(UploadMediaViewModel model)
    {
        // TODO: For separation of concerns, investigate "ActionFilterAttribute" for model valiation
        if (!ModelState.IsValid)
            return BadRequest(ModelState.ToDictionary());

        Shop? shop = await _context.Shops.FindAsync(model.ShopId);
        if (shop == null)
            return NotFound(new {message = $"Not found: shop({model.ShopId})."});

        AuthorizationResult authzResult =
            await _authz.AuthorizeAsync(User, shop, new OwnerOnlyRequirement());
        if (!authzResult.Succeeded)
            return Forbid("Forbidden: you don't have permssion add media.");

        if (!await _photosSvc.LoginAsync())
            return Problem(detail: "Could not access Photos.", statusCode: 503);

        // TODO: check file is a type before uploading (and only allow images)?
        var uploadResult = await _photosSvc.UploadSingle(model.FilePath, shop.AlbumId);
        if (uploadResult == null)
            return Problem(detail: "Could not upload media.", statusCode: 503);
        // https://developers.google.com/photos/library/reference/rest/v1/Status
        if (uploadResult.status.code != 0)
            return Problem(
                detail: $"Could not upload media: {uploadResult.status.message}.",
                statusCode: 503);

        return Ok(new MediaDTO(uploadResult.mediaItem));
    }
    private string UniqueTitle(int shopId, string ownerId)
    {
        int hash = HashCode.Combine(shopId, ownerId);
        return $"{hash}-{Guid.NewGuid()}";
    }

    // TODO:
    // - should probably look into whether it is possible to "cache" login
    //   session for some time duration so we don't have to login for every
    //   API call.
}