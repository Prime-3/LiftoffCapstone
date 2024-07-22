using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Constants;
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
        ApplicationDbContext context)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _context = context;
    }

    [HttpGet("{id}"), Authorize]
    public async Task<ActionResult<ApplicationUser>> GetUserById(string id)
    {
        if (id == null || id == "")
            return BadRequest(new {message = "User ID is needed."});
        ApplicationUser? user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound($"Could not find user({id})");
        bool isAdmin = await _userManager.IsInRoleAsync(user, Admin.ROLE);
        return Ok(new UserDTO(user, isAdmin));
    }

    [HttpPost("register")]
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

    // DELETE /api/accounts/{id}
    [HttpDelete("{id}"), Authorize(Roles=Admin.ROLE)]
    public async Task<IActionResult> Delete(string id)
    {
        ApplicationUser user = await _userManager.FindByIdAsync(id);
        if (user == null)
            return NotFound(new {message = $"Could not find user ({id})."});

        IdentityResult result = await _userManager.DeleteAsync(user);
        if (!result.Succeeded)
            return Problem(detail: $"Could not delete user: {result}.", statusCode: 503);

        return Ok(new {message = $"Successfully deleted user ({user.Email})."});
    }

    // PATCH /api/accounts/makeAdministrator/{id}
    [HttpPatch("makeAdministrator/{id}"), Authorize(Roles=Admin.ROLE)]
    public async Task<IActionResult> MakeAdministrator(string id)
    {
        ApplicationUser user = await _userManager.FindByIdAsync(id);
        if (user == null)
            return NotFound(new {message = $"Could not find user ({id})."});

        IdentityResult result = await _userManager.AddToRoleAsync(user, Admin.ROLE);
        if (!result.Succeeded)
            return Problem(detail: $"Could not make user({id}) and administrator.", statusCode: 503);

        return Ok(new {message = $"User ({user.Email}) is now administrator. With great power..."});
    }
}