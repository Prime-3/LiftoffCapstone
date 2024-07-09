namespace backend.Models;

public class ReviewsDTO
{
   public int Id { get; set; }
   public string? VendorId { get; set; }
   public string? UserId { get; set; }
   public string? Stars { get; set; }
   public string? Description { get; set; }


   public VendorsDTO(Vendors vendors)
   {
      VendorId = vendorId;
      UserId = userId;
      Stars = stars;
      Description = description;
   }
}
