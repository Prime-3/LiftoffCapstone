using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

using backend.Models;

namespace backend.Authorization;

public class ReviewerOnlyHandler:
    AuthorizationHandler<OwnerOnlyRequirement, Review>
{
    UserManager<ApplicationUser> _userManager;
    public ReviewerOnlyHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        OwnerOnlyRequirement requirement,
        Review resource)
    {
        if (resource.ApplicationUserId == _userManager.GetUserId(context.User))
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}