using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class UploadMediaViewModel
{
    [Required]
    public int ShopId {get; set;}
    [Required]
    public string FilePath {get; set;}
    public string? Description {get; set;}
}