using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
{
    public DbSet<Review>? Reviews { get; set; }
    public DbSet<Shop>? Shops { get; set; }
    // public DbSet<ApplicationUser>? ApplicationUser { get; set; }
    // public DbSet<FavoritesAndLikes>? FavoritesAndLikes { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) {}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<ApplicationUser>()
            .HasMany(u => u.Favorites)
            .WithMany(v => v.Likes)
            .UsingEntity(e => e.ToTable("FavoritesAndLikes"));
        builder.Entity<Shop>()
            .HasOne(v => v.Owner)
            .WithMany(u => u.Shops);
        base.OnModelCreating(builder);
    }
}
//      builder.Entity<FavoritesAndLikes>()
//         .HasOne(fal => fal.User) 
//         .WithMany(fal => fal.Shops)
//         .HasForeignKey(fal => fal.LikesId);

//     builder.Entity<FavoritesAndLikes>()
//         .HasOne(fal => fal.Shop)
//         .WithMany(fal => fal.Users)
//         .HasForeignKey(fal => fal.FavoritesId);