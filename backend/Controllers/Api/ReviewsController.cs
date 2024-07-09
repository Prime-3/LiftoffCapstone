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

   public VendorsController(ApplicationDbContext dbContext)
   {
      context = dbContext;
   }

   [HttpGet]
   public async Task<ActionResult<IEnumerable<ReviewsDTO>>> GetReviewByVendorId()
   {
      return await context
          .Reviews
          .Select(v => new ReviewssDTO(v))
          .ToListAsync();
   }
}
