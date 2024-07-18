using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

[Route("api/[controller]")]
[ApiController]
public class AcountsController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ApplicationDbContext _context;


    public AcountsController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ApplicationDbContext context
        )
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _context = context;
    }

 
    [HttpGet("{id}")]

    public async Task<ActionResult<ApplicationUser>> GetUserById(string id)
    {
        ApplicationUser? user = await _context.Users.FindAsync(id);
        return Ok(new UserDTO(user));
    }

    [HttpPost("register"), AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterViewModel user)
    {
        IdentityResult? result = null;
        if (ModelState.IsValid)
        {
            ApplicationUser newUser = new ApplicationUser {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.Email,
                Email = user.Email
            };
            result = await _userManager.CreateAsync(newUser, user.Password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(newUser, isPersistent: false);
                return Ok(new {message = $"Successfully registered {user.Email}."});
            }
        }
        return BadRequest(new {message = result != null ? result.ToString() : ""});
    }
}