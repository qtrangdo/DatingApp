using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IAuthRepository _repo;
    public AuthController(IAuthRepository repo)
    {
      this._repo = repo;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegisterDto user) {
        // Validate request

        var username = user.Username.ToLower();
        if (await _repo.UserExists(username)) return BadRequest("Username already exists");
        
        var userToCreate = new User{
            Username = username
        };

        await _repo.Register(userToCreate, user.Password);
        
        return StatusCode(201);
    }
  }
}