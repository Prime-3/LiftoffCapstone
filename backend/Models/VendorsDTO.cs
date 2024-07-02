namespace backend.Models;

public class VendorsDTO
{
        public int Id { get; set; }
        public string? ShopName { get; set; }
        public string? OwnerName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? Website { get; set; }


        public VendorsDTO(Vendors vendors)
        {
            Id = vendors.Id;
            ShopName = vendors.ShopName;
            OwnerName = vendors.OwnerName;
            PhoneNumber = vendors.PhoneNumber;
            Address = vendors.Address;
            Description = vendors.Description;
            Website = vendors.Website;
        }
}