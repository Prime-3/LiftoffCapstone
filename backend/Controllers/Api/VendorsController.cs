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


        // POST: api/vendors --> Posts new vendor registration info
        [HttpPost]
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


        // PATCH: api/vendors/{id} --> Patch updates existing vendor information
        [HttpPatch("{id}")]
        public IActionResult UpdateVendor(int id, [FromBody] Vendors vendors)
        {
            //Get existing vendor info
            var existingVendor = context.Vendors.FirstOrDefault(v => v.Id == id);
            if (existingVendor == null)
            {
                return NotFound();
            }

            //Apply changes
                //If vendors is not null and does not equal existingVendor then update
            existingVendor.ShopName = (vendors.ShopName != null) && (vendors.ShopName != existingVendor.ShopName) ? vendors.ShopName : existingVendor.ShopName;

            existingVendor.OwnerName = (vendors.OwnerName != null) && (vendors.OwnerName != existingVendor.OwnerName) ? vendors.OwnerName : existingVendor.OwnerName;

            existingVendor.Description = (vendors.Description != null) && (vendors.Description != existingVendor.Description) ? vendors.Description : existingVendor.Description;

            existingVendor.PhoneNumber = (vendors.PhoneNumber != null) && (vendors.PhoneNumber != existingVendor.PhoneNumber) ? vendors.PhoneNumber : existingVendor.PhoneNumber;

            existingVendor.Address = (vendors.Address != null) && (vendors.Address != existingVendor.Address) ? vendors.Address : existingVendor.Address;

            existingVendor.Website = (vendors.Website != null) && (vendors.Website != existingVendor.Website) ? vendors.Website : existingVendor.Website;


            //Save changes
            context.SaveChanges();
            
            //Return response
            return Ok(new {message = "Account information has successfully been updated."});
        }
    }