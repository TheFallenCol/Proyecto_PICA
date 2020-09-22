using DBModels;
using Microsoft.IdentityModel.Tokens;
using System;

namespace AuthenticationAPI.Authentication
{
    public interface ITokenProvider
    {
        string CreateToken(User user, DateTime expiry);
        bool ValidateToken(string token);
    }
}
