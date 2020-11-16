using AutheticationLibrary;
using DBModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using UnitOfWork;

namespace AuthenticationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private ITokenProvider _tokenProvider;
        private IUnitOfWork _unitOfWork;

        public TokenController(ITokenProvider tokenProvider, IUnitOfWork unitOfWork)
        {
            _tokenProvider = tokenProvider;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult HealthService()
        {
            return Ok("Servicio funcionando correctamente");
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult CreateToken([FromBody] User userLogin)
        {
            var user = _unitOfWork.User.ValidateUser(userLogin.NickName, userLogin.Password);

            if (user == null)
               return Unauthorized(new UnauthorizedAccessException("Wrong Nickname or password, check the credential values"));

            return Ok(new JsonWebToken
            {
                Access_Token = _tokenProvider.CreateToken(user, DateTime.UtcNow.AddHours(8)),
                Expires_in = 480 //life time of the token on minutes
            });
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]        
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("validate")]
        public IActionResult ValidateToken([FromBody] string token)
        {
            if (_tokenProvider.ValidateToken(token))
            {
                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadToken(token) as JwtSecurityToken;

                return Ok(new
                {
                    Name = jwtToken.Claims.First(claim => claim.Type == "unique_name").Value,
                    Role = jwtToken.Claims.First(claim => claim.Type == "role").Value,
                    PrimarySid = jwtToken.Claims.First(claim => claim.Type == "primarysid").Value
                });

            }

            return BadRequest("Token is invalid.");
        }
    }
}
