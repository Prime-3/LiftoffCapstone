using System;
namespace backend.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string? HashedPassword { get; set; }


        public Users(string firstName, string lastName, string username, string hashedPassword)
        {
            FirstName = firstName;
            LastName = lastName;
            Username = username;
            HashedPassword = hashedPassword;
        }
    }
}