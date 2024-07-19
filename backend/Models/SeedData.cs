// https://learn.microsoft.com/en-us/aspnet/core/security/authorization/secure-data?view=aspnetcore-8.0
// https://stackoverflow.com/questions/34343599/how-to-seed-users-and-roles-with-code-first-migration-using-identity-asp-net-cor
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using backend.Constants;
using backend.Data;

namespace backend.Models;

public class SeedData
{
    public static async Task InitializeAsync(IServiceProvider serviceProvider, string testUserPw)
    {
        using (var context = new ApplicationDbContext(
            serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
        {
            var adminID = await EnsureUser(serviceProvider, testUserPw, Admin.EMAIL);
            await EnsureRole(serviceProvider, adminID, Admin.ROLE);
        }
    }
    private static async Task<string> EnsureUser(IServiceProvider serviceProvider, string testUserPw, string userName)
    {
        var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();
        if (userManager == null)
        {
            throw new Exception("EnsureUser: userManager null.");
        }
        var user = await userManager.FindByNameAsync(userName);
        if (user == null)
        {
            user = new ApplicationUser
                {
                    FirstName = Admin.FIRST_NAME,
                    LastName = Admin.LAST_NAME,
                    Email = userName,
                    NormalizedEmail = userName.ToUpper(),
                    UserName = userName,
                    NormalizedUserName = userName.ToUpper(),
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString("D")
                };
            await userManager.CreateAsync(user, testUserPw);
        }
        if (user == null)
        {
            throw new Exception("Could not add user, the password is probably not string enough.");
        }
        return user.Id;
    }
    private static async Task<IdentityResult> EnsureRole(IServiceProvider serviceProvider, string uid, string role)
    {
        var roleManager = serviceProvider.GetService<RoleManager<IdentityRole>>();
        if (roleManager == null)
        {
            throw new Exception("EnsureRole: roleManager null.");
        }
        IdentityResult result;
        if (!await roleManager.RoleExistsAsync(role))
        {
            result = await roleManager.CreateAsync(new IdentityRole(role));
            if (!result.Succeeded)
            {
                throw new Exception($"EnsureRole: could not create role ({result})");
            }
        }
        var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();
        if (userManager == null)
        {
            throw new Exception("EnsureRole: userManager null.");
        }
        var user = await userManager.FindByIdAsync(uid);
        if (user == null)
        {
            throw new Exception("Could not find user, the password is probably not strong enough.");
        }
        result = await userManager.AddToRoleAsync(user, role);
        return result;
    }
}