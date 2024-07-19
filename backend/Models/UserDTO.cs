namespace backend.Models;

public class UserDTO
{
    public string? FirstName {get; set;}
    public string? LastName {get; set;}
    public UserDTO(ApplicationUser user)
    {
        FirstName = user.FirstName;
        LastName = user.LastName;
    }
}