using System.ComponentModel.DataAnnotations;
namespace backend.Models;

public class AddFavoriteShopViewModel
{
    [Required]
    public string UserId { get; set; }
    [Required]
    public int ShopId { get; set; }
}
