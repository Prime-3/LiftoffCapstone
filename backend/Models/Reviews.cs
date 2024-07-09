using System;
namespace backend.Models
{
    public class Reviews
    {
        public int Id { get; set; }
        public int ShopId { get; set; }
        // Id in aspnetusers
        public string ApplicationUserId { get; set; }
        public int Stars { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; }


        public Reviews()
        {
        }
        public Reviews(int shopId, string applicationUserId, int stars, string description)
        {
            ShopId = shopId;
            ApplicationUserId = applicationUserId;
            Stars = stars;
            Description = description;
            Date = DateTime.Now;
        }
    }
}