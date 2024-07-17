using Microsoft.AspNetCore.Mvc;
using CasCap.Services; // GooglePhotosService

using backend.Data;
using backend.Models;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PhotosController: ControllerBase
{
    private readonly GooglePhotosService _googlePhotosSvc;
    private readonly ApplicationDbContext _context;

    public PhotosController(
        ApplicationDbContext context,
        GooglePhotosService googlePhotosSvc)
    {
        _googlePhotosSvc = googlePhotosSvc;
        _context = context;
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
        if (shop.AlbumId == null)
            return NotFound(new {message = $"Not found: album for shop({shopId})."});

        if (!await _googlePhotosSvc.LoginAsync())
            return Problem(detail: "Could not access Photos.", statusCode: 503);
        var album = await _googlePhotosSvc.GetAlbumAsync(shop.AlbumId);
        // TODO: go ahead create an album if shop doesn't have one?
        if (album == null)
            return NotFound(new {message = $"Not found: album for shop({shopId})."});

        album.title = $"{shop.ShopName}'s album";
        return Ok(new AlbumDTO(album));
    }

    // POST /api/photos/albums
    [HttpPost("albums")]
    public async Task<ActionResult<CasCap.Models.Album>> CreateAlbum(AlbumViewModel model)
    {
        if (ModelState.IsValid)
        {
            Shop shop = await _context.Shops.FindAsync(model.ShopId);
            if (shop == null)
                return NotFound(new {message = $"Not found: shop({model.ShopId})"});

            if (!await _googlePhotosSvc.LoginAsync())
                return Problem(detail: "Could not access Photos.", statusCode: 503);

            var album = await _googlePhotosSvc.GetOrCreateAlbumAsync(model.UniqueTitle);
            if (album == null)
                return Problem(detail: "Could not create album.", statusCode: 422);

            shop.AlbumId = album.id;
            _context.SaveChanges();

            album.title = $"{shop.ShopName}'s album";
            return Ok(new AlbumDTO(album));
        }
        return BadRequest(ModelState.ToDictionary());
    }
    // TODO:
    // - GET /api/photos/albums/{id}/media
    // - POST /api/photos/albums/{id}/media
    // - authE & authZ
    // - should probably look into whether it is possible to "cache" login
    //   session for some time duration so we don't have to login for every
    //   API call.
}