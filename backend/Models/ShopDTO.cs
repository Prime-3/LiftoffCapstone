namespace backend.Models;

public class ShopDTO
{
    public int Id { get; set; }
    public string? ShopName { get; set; }
    public string? OwnerName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public string? Description { get; set; }
    public string? Website { get; set; }
    public string? Logo { get; set; }


    public ShopDTO(Shop shop)
    {

        Id = shop.Id;
        ShopName = shop.ShopName;
        OwnerName = shop.Owner.ToString();
        PhoneNumber = shop.PhoneNumber;
        Address = shop.Address;
        Description = shop.Description;
        Website = shop.Website;
        Logo = shop.Logo;
    }
}
