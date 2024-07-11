using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // provides DbSet.Include()
using backend.Data;
using backend.Models;
using System.ComponentModel;
using Microsoft.AspNetCore.Identity;

namespace backend.Controllers;

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            context = dbContext;
            _userManager = userManager;
        }
    
// GET: api/users/{id} --> this gets list of favorites for user
// [HttpGet("{id}")]
// public async Task<ActionResult<IEnumerable<Shop>>> GetUserFavorites(string id) {
//     ApplicationUser? user =
//          await _userManager
//         .Users
//         .Include(u=>u.Favorites)
//         .FirstOrDefaultAsync(u => u.Id == _userManager.GetUserId(User));
    
//  return Ok(user.Favorites);
// }


   // GET: api/users/{id} --> this gets list of favorites for user
//     [HttpGet("{id}")]
//     // public async Task<ActionResult<IEnumerable<FavoritesAndLikesDTO>>> GetUserFavorites(string id) {
//    public async Task<ActionResult<IEnumerable<Shop>>> GetUserFavorites(string Id) {
//      return await context.ApplicationUser
//      .Include(e => e.)
//      .ToListAsync();
//    }

        // return await context.Favorites
        // .Where(f => id == f.LikesId)
        // .Select(f => new FavoritesAndLikesDTO(f))
        // .ToListAsync();


}