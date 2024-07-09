namespace backend.Models;

public class ReviewDTO
{
   public int Id { get; set; }
   public int? ShopId { get; set; }
   public string? ReviewerName { get; set; }
   public int? Stars { get; set; }
   public string? Description { get; set; }


   public ReviewDTO(Review review)
   {
      Id = review.Id;
      ShopId = review.ShopId;
      ReviewerName = review.Reviewer.ToString();
      Stars = review.Stars;
      Description = review.Description;
   }
}
