using System.ComponentModel.DataAnnotations;
namespace backend.Models;

public class FavoriteCheckDTO
{
   public string UserId { get; set; }
   public int ShopId { get; set; }

   public FavoriteCheckDTO() { }

   public FavoriteCheckDTO(UserFavoriteShop userFavoriteShop)
   {
      UserId = userFavoriteShop.UserId;
      ShopId = userFavoriteShop.ShopId;
   }
}
