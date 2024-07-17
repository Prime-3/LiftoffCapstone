using Microsoft.AspNetCore.Mvc;
using CasCap.Services; // GooglePhotosService

using backend.Models;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PhotosController: ControllerBase
{
    readonly GooglePhotosService _googlePhotosSvc;
    public PhotosController(GooglePhotosService googlePhotosSvc)
    {
        _googlePhotosSvc = googlePhotosSvc;
    }

    // TODO: authE & authZ
    // GET /api/photos/albums/{id}
    [HttpGet("albums/{id}")]
    public async Task<IActionResult> GetAlbums(string id)
    {
        // Should probably look into whether it is possible to "cache" login
        // session for some time duration so we don't have to login for every
        // API call.
        if (!await _googlePhotosSvc.LoginAsync())
            return Problem(detail: "Could not access Photos.", statusCode: 503);
        var album = await _googlePhotosSvc.GetAlbumByTitleAsync(id);
        if (album == null)
            return NotFound();
        return Ok(new AlbumDTO(album));
    }
    // POST /api/photos/albums/
    // GET /api/photos/albums/{id}/media
    // POST /api/photos/albums/{id}/media
}