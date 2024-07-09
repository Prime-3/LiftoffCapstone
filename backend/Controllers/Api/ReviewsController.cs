using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // provides DbSet.Include()
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

   [HttpPost]
   public IActionResult CreateReview([FromBody] Reviews review)
   {
      if (ModelState.IsValid)
      {
         context.Reviews.Add(review);
         context.SaveChanges();

         return Ok(new { message = "Success! Review Submitted." });
      }
      else
      {
         return BadRequest(new { message = "Error! Failed submiting review." });
      }
   }

   // [HttpGet("{id}")]
   // public async Task<ActionResult<IEnumerable<ReviewsDTO>>> GetReviewByVendorId(int id)
   // {
   //    try
   //    {
   //       var reviews = await context.Reviews.Where(r => id == r.VendorId).ToListAsync();

   //    }
   //    catch (InvalidOperationException e)
   //    {
   //       return NotFound(e.ToString());
   //    }
   // }
}
