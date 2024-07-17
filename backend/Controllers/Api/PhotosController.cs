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
    private readonly GooglePhotosService _googlePhotosSvc;
    private readonly ApplicationDbContext _context;
    private readonly IAuthorizationService _authz;

    public PhotosController(
        ApplicationDbContext context,
        GooglePhotosService googlePhotosSvc,
        IAuthorizationService authz)
    {
        _googlePhotosSvc = googlePhotosSvc;
        _context = context;
        _authz = authz;
    }

    // GET /api/photos/albums/{id}
    [HttpGet("albums/{id}")]
    public async Task<ActionResult<CasCap.Models.Album>> GetAlbum(string id)
    {

        if (!await _googlePhotosSvc.LoginAsync())
            return Problem(detail: "Could not access Photos.", statusCode: 503);
        var album = await _googlePhotosSvc.GetAlbumAsync(id);
        if (album == null)
            return NotFound();
        return Ok(new AlbumDTO(album));
    }

    // GET /api/photos/albums?shopId={id}
    [HttpGet("albums")]
    public async Task<ActionResult<CasCap.Models.Album>> GetAlbum(int shopId)
    {
        Shop shop = await _context.Shops.FindAsync(shopId);
        if (shop == null)
            return NotFound(new {message = $"Not found: shop({shopId})."});
        if (shop.AlbumUniqueTitle == null)
            return NotFound(new {message = $"Not found: album for shop({shopId})."});

        if (!await _googlePhotosSvc.LoginAsync())
            return Problem(detail: "Could not access Photos.", statusCode: 503);
        var album = await _googlePhotosSvc.GetAlbumByTitleAsync(shop.AlbumUniqueTitle);
        // TODO: go ahead create an album if shop doesn't have one?
        if (album == null)
            return NotFound(new {message = $"Not found: album for shop({shopId})."});

        album.title = $"{shop.ShopName}'s album";
        return Ok(new AlbumDTO(album));
    }

    // POST /api/photos/albums
    [HttpPost("albums"), Authorize]
    public async Task<ActionResult<CasCap.Models.Album>> CreateAlbum([FromBody]int shopId)
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

            if (!await _googlePhotosSvc.LoginAsync())
                return Problem(detail: "Could not access Photos.", statusCode: 503);

            string albumTitle = UniqueTitle(shop.Id, shop.ApplicationUserId);
            var album = await _googlePhotosSvc.GetOrCreateAlbumAsync(albumTitle);
            if (album == null)
                return Problem(detail: "Could not create album.", statusCode: 422);

            shop.AlbumUniqueTitle = albumTitle;
            _context.SaveChanges();

            album.title = $"{shop.ShopName}'s album";
            return Ok(new AlbumDTO(album));
        }
        return BadRequest(ModelState.ToDictionary());
    }

    private string UniqueTitle(int shopId, string ownerId)
    {
        int hash = HashCode.Combine(shopId, ownerId);
        return $"{hash}-{Guid.NewGuid()}";
    }
    // TODO:
    // - GET /api/photos/albums/{id}/media
    // - POST /api/photos/albums/{id}/media
    // - authE & authZ
    // - should probably look into whether it is possible to "cache" login
    //   session for some time duration so we don't have to login for every
    //   API call.
}