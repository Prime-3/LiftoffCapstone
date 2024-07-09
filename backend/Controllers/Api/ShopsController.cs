using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // provides DbSet.Include()
using backend.Data;
using backend.Models;

namespace backend.Controllers;

    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public ShopsController(ApplicationDbContext dbContext)
        {
            context = dbContext;
        }

        // GET: api/shops --> Gets all shops
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShopDTO>>> GetShops()
        {
            return await context
                .Shops
                .Include(v => v.Owner)
                .Select(v => new ShopDTO(v))
                .ToListAsync();
        }

        // GET: api/shops/{id} --> Gets shop by id
        [HttpGet("{id}")]
        public async Task<ActionResult<ShopDTO>> GetShop(int id)
        {
            try {
                var shop = await context.Shops.SingleAsync(v => id == v.Id);
                return new ShopDTO(shop);
            } catch (InvalidOperationException e) {
                return NotFound(e.ToString());
            }
        }


        // POST: api/shop --> Posts new shop registration info
        [HttpPost]
        public IActionResult RegisterShop([FromBody] Shop shop)
        {
            if (ModelState.IsValid)
            {
                //Save shop data to database
                context.Shops.Add(shop);
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


        // PATCH: api/shop/{id} --> Patch updates existing shop information
        [HttpPatch("{id}")]
        public IActionResult UpdateShop(int id, [FromBody] Shop shop)
        {
            //Get existing shop info
            var existingShop = context.Shops.FirstOrDefault(v => v.Id == id);
            if (existingShop == null)
            {
                return NotFound();
            }

            //Apply changes
                //If shops is not null and does not equal existingShop then update
            existingShop.ShopName =
                (shop.ShopName != null) && (shop.ShopName != existingShop.ShopName)
                ? shop.ShopName : existingShop.ShopName;
            existingShop.ApplicationUserId =
                (shop.ApplicationUserId != null) && (shop.ApplicationUserId != existingShop.ApplicationUserId)
                ? shop.ApplicationUserId : existingShop.ApplicationUserId;
            existingShop.Description =
                (shop.Description != null) && (shop.Description != existingShop.Description)
                ? shop.Description : existingShop.Description;
            existingShop.PhoneNumber =
                (shop.PhoneNumber != null) && (shop.PhoneNumber != existingShop.PhoneNumber)
                ? shop.PhoneNumber : existingShop.PhoneNumber;
            existingShop.Address =
                (shop.Address != null) && (shop.Address != existingShop.Address)
                ? shop.Address : existingShop.Address;
            existingShop.Website =
                (shop.Website != null) && (shop.Website != existingShop.Website)
                ? shop.Website : existingShop.Website;
            //Save changes
            context.SaveChanges();

            //Return response
            return Ok(new {message = "Account information has successfully been updated."});
        }

    // DELETE: api/shops/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteShop(int id)
    {
        var shop = context.Shops.FirstOrDefault(v => v.Id == id);
            if (shop == null)
            {
                return NotFound();
            }

            context.Shops.Remove(shop);
            context.SaveChanges();

            return Ok(new {message = "Successfully removed shop."});
    }
}