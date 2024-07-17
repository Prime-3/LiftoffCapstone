using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class AlbumViewModel
{
    [Required]
    public int ShopId {get; set;}
    [Required]
    public string OwnerId {get; set;}
    public string? UniqueTitle {
        get {
            int hash = HashCode.Combine(ShopId, OwnerId);
            return $"{hash}-{Guid.NewGuid()}";
        }
    }
}