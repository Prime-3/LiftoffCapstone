using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // provides DbSet.Include()
using backend.Data;
using backend.Models;

namespace backend.Controllers;

    [Route("api/[controller]")]
    [ApiController]
    public class VendorsController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public VendorsController(ApplicationDbContext dbContext)
        {
            context = dbContext;
        }

        // GET: api/vendors --> Gets all vendors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VendorsDTO>>> GetVendors()
        {
            return await context
                .Vendors
                .Select(v => new VendorsDTO(v))
                .ToListAsync();
        }

        // GET: api/vendors/{id} --> Gets vendor by id
        [HttpGet("{id}")]
        public async Task<ActionResult<VendorsDTO>> GetVendors(int id)
        {
            // Check for empty collection
            var vendor = await context.Vendors.FirstOrDefaultAsync();
            if (vendor == null) {
                return NotFound();
            }

            // Look for vendor with 'id'
            vendor = await context
                .Vendors
                .SingleAsync(v => id == v.Id);
            if (vendor == null)
            {
                return NotFound();
            }

            return new VendorsDTO(vendor);
        }
    }