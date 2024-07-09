using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int ShopId { get; set; }
        // Id in aspnetusers
        public string ApplicationUserId { get; set; }
        [ForeignKey("ApplicationUserId")]
        public ApplicationUser? Reviewer { get; set; }
        public int Stars { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; }


        public Review()
        {
        }
        public Review(int shopId, string applicationUserId, int stars, string description)
        {
            ShopId = shopId;
            ApplicationUserId = applicationUserId;
            Stars = stars;
            Description = description;
            Date = DateTime.Now;
        }
    }
}