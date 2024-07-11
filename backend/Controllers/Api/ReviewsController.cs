using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Authorization;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReviewsController : ControllerBase
{
   private readonly ApplicationDbContext context;
   private readonly IAuthorizationService _authz;

   public ReviewsController(
      ApplicationDbContext dbContext,
      IAuthorizationService authz)
   {
      context = dbContext;
      _authz = authz;
   }

   // POST /api/reviews
   [HttpPost, Authorize]
   public IActionResult CreateReview([FromBody] Review review)
   {
      if (ModelState.IsValid)
      {
         context.Reviews.Add(review);
         context.SaveChanges();

         return Ok(new { message = "Success! Review Submitted." });
      }
      else
      {
         return BadRequest(new { message = "Error! Failed submitting review." });
      }
   }

   // GET /api/reviews/shop/{id}
   [HttpGet("shop/{id}")]
   public async Task<ActionResult<IEnumerable<ReviewDTO>>> GetReviewByShopId(int id)
   {
      try
      {
         return await context
         .Reviews
         .Where(r => id == r.ShopId)
         .Select(r => new ReviewDTO(r))
         .ToListAsync();
      }
      catch (InvalidOperationException e)
      {
         return NotFound(e.ToString());
      }
   }

   // GET /api/reviews/user/{id}
   [HttpGet("user/{id}")]
   public async Task<ActionResult<IEnumerable<ReviewDTO>>> GetReviewByUserId(string id)
   {
      try
      {
         return await context
         .Reviews
         .Where(r => id == r.ApplicationUserId)
         .Select(r => new ReviewDTO(r))
         .ToListAsync();
      }
      catch (InvalidOperationException e)
      {
         return NotFound(e.ToString());
      }
   }

   // DELETE /api/reviews/{id}
   [HttpDelete("{id}"), Authorize]
   public async Task<IActionResult> DeleteReviewAsync(int id)
   {
      var review = context.Reviews.FirstOrDefault(r => r.Id == id);
      if (review == null)
      {
         return NotFound();
      }
      var authzResult = await _authz.AuthorizeAsync(
                           User, // User property from ControllerBase
                           review,
                           new OwnerOnlyRequirement());
      if (!authzResult.Succeeded) {
            return Forbid();
      }

      context.Reviews.Remove(review);
      context.SaveChanges();

      return Ok(new { message = "Successfully removed review." });
   }
}
