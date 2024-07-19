namespace backend.Models;

public class UserDTO
{
    public string? FirstName {get; set;}
    public string? LastName {get; set;}
    public string? Email {get; set;}
    public bool? IsAdmin {get; set;}
    public UserDTO(ApplicationUser user, bool isAdmin = false)
    {
        FirstName = user.FirstName;
        LastName = user.LastName;
        Email = user.Email;
        IsAdmin = isAdmin;
    }
}