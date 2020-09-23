﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using AuthenticationAPI.Authentication;
using DBModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
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