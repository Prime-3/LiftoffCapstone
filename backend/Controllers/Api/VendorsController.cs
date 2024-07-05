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
            try {
                var vendor = await context.Vendors.SingleAsync(v => id == v.Id);
                return new VendorsDTO(vendor);
            } catch (InvalidOperationException e) {
                return NotFound(e.ToString());
            }
        }


        // POST: api/vendors/registration --> Posts new vendor registration info
        [HttpPost("registration")]
        public IActionResult RegisterVendor([FromBody] Vendors vendor) 
        {
            if (ModelState.IsValid)
            {
                //Save vendor data to database
                context.Vendors.Add(vendor);
                context.SaveChanges();
                //return success message to user
                return Ok(new {message = "Success! Registration completed."});
            }
            else
            {
                //return error message to let user know it failed registering data
                return BadRequest(new {message = "Error! Failed registering information."});
            }
        }


    }