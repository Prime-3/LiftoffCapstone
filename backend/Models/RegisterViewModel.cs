using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class RegisterViewModel
{
    public string FirstName {get; set;}
    public string LastName {get;set;}
    [Required(ErrorMessage="e-mail is required")]
    [EmailAddress]
    public string Email {get; set;}
    [Required(ErrorMessage="password is required")]
    [DataType(DataType.Password)]
    public string Password {get;set;}
}