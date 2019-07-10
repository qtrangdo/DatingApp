using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 6, ErrorMessage = "Password must be 6-10 characters")]
        public string Password { get; set; }
    }
}