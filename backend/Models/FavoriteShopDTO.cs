namespace backend.Models;

public class FavoriteShopDTO
{
    public string? ShopName { get; set; }
    public string? Description { get; set; }
    public string? Logo { get; set; }

    public FavoriteShopDTO() {}
    public FavoriteShopDTO(Shop shop)
    {
        ShopName = shop.ShopName;
        Description = shop.Description;
        Logo = shop.Logo;
    }
}