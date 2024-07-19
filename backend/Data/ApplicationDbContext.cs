using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
{
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Shop> Shops { get; set; }
    public DbSet<UserFavoriteShop> UserFavoriteShops { get; set; }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) {}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<ApplicationUser>()
            .HasMany(u => u.Favorites)
            .WithMany(v => v.Likes)
            .UsingEntity<UserFavoriteShop>();
        builder.Entity<Shop>()
            .HasOne(v => v.Owner)
            .WithMany(u => u.Shops);
        base.OnModelCreating(builder);
    }
}
