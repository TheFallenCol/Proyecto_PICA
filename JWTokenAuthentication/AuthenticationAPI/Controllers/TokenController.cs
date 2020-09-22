using AuthenticationAPI.Authentication;
using DBModels;
using Microsoft.AspNetCore.Mvc;
using System;
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

        [HttpPost]
        public JsonWebToken CreateToken([FromBody] User userLogin)
        {
            var user = _unitOfWork.User.ValidateUser(userLogin.NickName, userLogin.Password);
            
            if(user == null)
                throw new UnauthorizedAccessException();

            return new JsonWebToken{
                Access_Token = _tokenProvider.CreateToken(user, DateTime.UtcNow.AddHours(8)),
                Expires_in = 480 //life time of the token on minutes
            };
        }
    }
}
