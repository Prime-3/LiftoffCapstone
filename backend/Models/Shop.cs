using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
    public class Shop
    {
        public int Id { get; set; }
        public string? ShopName { get; set; }
        // Id in aspnetusers
        public string ApplicationUserId { get; set; }
        [ForeignKey("ApplicationUserId")]
        public ApplicationUser? Owner { get; set; }
        public List<ApplicationUser>? Likes { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? Website { get; set; }
        public string? Logo { get; set; }
        public string? Category { get; set; }
        public int AvgStars { get; set; }


        public Shop()
        {
        }

        public Shop(string shopName, string applicationUserId, string phoneNumber, string address, string description, string website, string logo, string category)
        {
            ShopName = shopName;
            ApplicationUserId = applicationUserId;
            PhoneNumber = phoneNumber;
            Address = address;
            Description = description;
            Website = website;
            Logo = logo;
            Category = category;
            AvgStars = 0;
        }
    }
}
