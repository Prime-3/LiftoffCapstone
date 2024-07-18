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
    public async Task<ActionResult<AlbumDTO>> CreateAlbum([FromBody]int shopId)
    {
        if (ModelState.IsValid)
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
                return Problem(detail: "Could not create album.", statusCode: 422);

            shop.AlbumUniqueTitle = albumTitle;
            shop.AlbumId = album.id;
            _context.SaveChanges();

            album.title = $"{shop.ShopName}'s album";
            return Ok(new AlbumDTO(album));
        }
        return BadRequest(ModelState.ToDictionary());
    }

    // GET /api/photos/albums/photos?shopId={id}
    [HttpGet("albums/photos")]
    public async Task<ActionResult<List<PhotoDTO>>> GetPhotos(int shopId)
    {
        Shop? shop = await _context.Shops.FindAsync(shopId);
        if (shop == null)
            return NotFound(new {message = $"Not found: shop({shopId})."});
        if (shop.AlbumId == null)
            return NotFound(new {message = $"Not found: album for shop({shopId})."});

        if (!await _photosSvc.LoginAsync())
            return Problem(detail: "Could not access Photos.", statusCode: 503);
        var photos = _photosSvc.GetMediaItemsByAlbumAsync(shop.AlbumId);
        if (photos == null)
            return NotFound(new {message = $"Not found: no photos for shop ({shopId})."});

        try
        {
            List<PhotoDTO> photoDTOList =
                await photos
                    .Where(p => p.isPhoto)
                    .Select(p => new PhotoDTO(p))
                    .ToListAsync();
            return Ok(photoDTOList);
        }
        catch (Exception e)
        {
            return Problem(detail: e.Message, statusCode: 500);
        }
    }

    // POST /api/photos/albums/photos?shopId={id}
    // [HttpPost("albums/photos"), Authorize]
    //   - UploadSingle(path, albumId, description)
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