using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;
public class FavoritesAndLikes
{
    public int Id { get; set; } 
    public string LikesId { get; set; } // referencing the user
    
    public int FavoritesId { get; set; } // referencing the shop
  
    

    [ForeignKey("LikesId")]
    public virtual List<Shop> Favorites {get; set;}


    [ForeignKey("FavoritesId")]
    public virtual List<ApplicationUser>? Likes { get; set;}




    public FavoritesAndLikes(string likesId, int favoritesId) 
    {
        LikesId = likesId;
        FavoritesId = favoritesId;
    }
}