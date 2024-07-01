using System;
namespace backend.Models
{
    public class Vendors
    {
        public int Id { get; set; }
        public string? ShopName { get; set; }
        public string? OwnerName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? Website { get; set; }

        public Vendors()
        {
        }
        public Vendors(string shopName, string ownerName, string phoneNumber, string address, string description, string website)
        {
            ShopName = shopName;
            OwnerName = ownerName;
            PhoneNumber = phoneNumber;
            Address = address;
            Description = description;
            Website = website;
        }
    }
}