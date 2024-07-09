using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class ApplicationUser: IdentityUser
{
    // Field(s)/Propert(y|ies)
    public string? FirstName {get; set;}
    public string? LastName {get;set;}
    public int? ShopId {get; set;}
    public Shop? Shop {get; set;}
    public List<Shop> Favorites {get; set;}
    public List<Reviews> Reviews {get; set;}

    // Constructor(s)
    public ApplicationUser()
    : base() {}
    public ApplicationUser(string firstName, string lastName)
    : this()
    {
        FirstName = firstName;
        LastName = lastName;
    }

    // Override(s)
    public override string ToString()
    {
        return $"{FirstName} {LastName}";
    }
}