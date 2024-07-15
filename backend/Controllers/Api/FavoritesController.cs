using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using backend.Data;
using backend.Models;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FavoritesController: ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FavoritesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}"), Authorize]
    public async Task<ActionResult<IEnumerable<Shop>>> Favorites(string id)
    {
        ApplicationUser? user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound("Could not find user.");
        }
        var favoriteShops = _context.UserFavoriteShops
            .Where(e => e.UserId == id)
            .Include(e => e.Shop)
            .Select(e => new FavoriteShopDTO(e.Shop));
        return Ok(favoriteShops);
    }

    [HttpPost("add"), Authorize]
    public async Task<ActionResult> AddFavorites([FromBody] AddFavoriteShopViewModel viewModel)
    {
        ApplicationUser? user = await _context.Users.FindAsync(viewModel.UserId);
        Shop? shop = await _context.Shops.FindAsync(viewModel.ShopId);
        if (user == null)
        {
            return NotFound("Could not find user.");
        }
        if (shop == null)
        {
            return NotFound("Could not find shop.");
        }
        // TODO: authorization - viewModel.UserId needs to match context.User's id
        user = await _context.Users
            .Include(u => u.Favorites)
            .SingleAsync(u => u.Id == viewModel.UserId);
        user.Favorites.Add(shop);
        _context.SaveChanges();
        return Ok();
    }
}