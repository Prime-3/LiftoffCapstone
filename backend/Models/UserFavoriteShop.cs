namespace backend.Models;

public class UserFavoriteShop
{
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }
    public int ShopId { get; set; }
    public Shop Shop { get; set; }
}