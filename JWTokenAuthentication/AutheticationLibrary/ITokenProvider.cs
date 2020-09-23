using DBModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace AutheticationLibrary
{
    public interface ITokenProvider
    {
        string CreateToken(User user, DateTime expiry);
        bool ValidateToken(string token);
    }
}
