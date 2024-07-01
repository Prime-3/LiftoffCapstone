using System;
namespace backend.Models
{
    public class Reviews
    {
        public int Id { get; set; }
        public int VendorId { get; set; }
        public int UserId { get; set; }
        public int Stars { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; }


        public Reviews(int vendorId, int userId, int stars, string description)
        {
            VendorId = vendorId;
            UserId = userId;
            Stars = stars;
            Description = description;
        }
    }
}