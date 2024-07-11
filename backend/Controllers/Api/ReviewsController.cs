using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReviewsController : ControllerBase
{
   private readonly ApplicationDbContext context;

   public ReviewsController(ApplicationDbContext dbContext)
   {
      context = dbContext;
   }

   // POST /api/reviews
   [HttpPost]
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
         .Include(r => r.Reviewer)
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
         .Include(r => r.Reviewer)
         .Select(r => new ReviewDTO(r))
         .ToListAsync();
      }
      catch (InvalidOperationException e)
      {
         return NotFound(e.ToString());
      }
   }

   // DELETE /api/reviews/{id}
   [HttpDelete("{id}")]
   public IActionResult DeleteReview(int id)
   {
      var review = context.Reviews.FirstOrDefault(r => r.Id == id);
      if (review == null)
      {
         return NotFound();
      }

      context.Reviews.Remove(review);
      context.SaveChanges();

      return Ok(new { message = "Successfully removed review." });
   }
}
