using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

using backend.Models;

namespace backend.Authorization;

public class OwnerOnlyHandler:
    AuthorizationHandler<OwnerOnlyRequirement, Shop>
{
    UserManager<ApplicationUser> _userManager;
    public OwnerOnlyHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        OwnerOnlyRequirement requirement,
        Shop resource)
    {
        if (resource.ApplicationUserId == _userManager.GetUserId(context.User))
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}