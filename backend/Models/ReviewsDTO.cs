namespace backend.Models;

public class ReviewsDTO
{
   public int Id { get; set; }
   public int? VendorId { get; set; }
   public int? UserId { get; set; }
   public int? Stars { get; set; }
   public string? Description { get; set; }


   public ReviewsDTO(Reviews reviews)
   {
      Id = reviews.Id;
      VendorId = reviews.VendorId;
      UserId = reviews.UserId;
      Stars = reviews.Stars;
      Description = reviews.Description;
   }
}
