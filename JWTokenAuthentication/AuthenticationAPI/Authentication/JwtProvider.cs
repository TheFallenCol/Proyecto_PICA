using DBModels;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AuthenticationAPI.Authentication
{
    public static class TypeConverterExtension
    {
        public static byte[] ToByteArray(this string value) =>
         Convert.FromBase64String(value);
    }

    public class JwtProvider : ITokenProvider
    {
        private RsaSecurityKey _key;
        private SigningCredentials _signingCredentials;
        private string _algorithm;
        private string _issuer;
        private string _audience;     

        /// <summary>
        /// Constructor del proveedor del token
        /// </summary>
        /// <param name="issuer">How emmits the token</param>
        /// <param name="audience">Who are the specific roles for the token</param>
        /// <param name="keyName">Name of the key</param>
        public JwtProvider(string issuer, string audience)
        {
            //Proveedores para utilizar en Docker linux
            _issuer = issuer;
            _audience = audience;
        }

        /// <summary>
        /// Token creation
        /// </summary>
        /// <param name="user">User Information</param>
        /// <param name="expiry">Expiration time for the token</param>
        /// <returns>Returns the token to be used in the services</returns>
        public string CreateToken(User user, DateTime expiry)
        {
            var rsaProvider = RSA.Create();            
            byte[] privateKeyArray = "MIIEpQIBAAKCAQEAyXAi8y6xLEoJFekHDlK3sAWM6cSYMekq2xzvtzoBVFXFeYs0ECnsVsYx39aqQSZtUaqkBceKA+xFbtVikC37qdfzAVfvb0K+p+BE42WhSMPClAkUChTf/7w5T0VpTboJ7X5fbDnGkVLA9+5uUBpr/qiI0sJPtqsUcQ8zESh3HXCMYuzR48ybl4iR2wPvjFc4cHyBwH2UoGRB3zOGQLrzlYt5Cp/N0rBY60yajN25FRdx0qbTFVXn6ibLwnLz0fQiA/8X5n+IgpOHpMtSeSTBFKcocdioofn648VBkcTCtq3QE0ecrG2wb6VMzuwY78dy8Qgy9+qFDGCPgtQ4OWANzwIDAQABAoIBADlSEI/0tHPu6WDzu49G2IBdQ/jteYWSXSCWvlv8RI6UDaqFgx4qX9dddKnGcxIw9iCsFxqR6mMtY6CjVfXDL/7ntX2nYTne21P4DIJM1DVZh1AKuUoZIJisHf7BuLJmgxayxEKOukN2MfUbQwbGTf7cRHr80iQf0KRPd++k/ShB8cw1G8/1LqdE7OzXPeOje0wT6/qIaAstWl+pMQwMKhmCXJ4uXznrUpVf9tJOadFn6gwboOeuzFEpnxZ4X8et3DgXO05Kz9OtxS62xPGACVUEn7qXvgGAg956RLKkJj4h5yOq9CDirfGduV9hHv02WsOxGS22chBdMbN5z1V7igkCgYEA+d1yJwNZJIugXAeM9JXAjUmrc5wV67xFotORG2v4BmZHLVriZY///WFyCSHcykQ72itO2ShNqjPw348HvnhYl/U5wU3uBXId6LrEe8iK1N11QUb967W/HNQkhFtQtI686+PoBGiW763X5rWJ3AtaLyyQsAlnEimMZ9XTHf6PbCMCgYEAzmJMJT2lRd6ESWeC264vkFkqTyl+EYavsoKydGxVyul/mIK27CJsGUDtTZZ5hnov+0ItlhVI3nx1+H/OA496dTvtap3roUHwJv/vpOy9oTH+Lp1qdFDbgz3Re3XVk1IKYRFnznZmKgcIl0vaJ4AodsN+fJef/ahf20m8P8GQTGUCgYEAgVlxSd8C29doeZvzDX8kwj+8AUpxUqsRhZxuxzpamL2D5WfiQd+NDxfOGAouqYsvTN8Un3is1Aq1jJYX1TOp8WiisH5uVOVhtGRTaR1FObM3i0Z8FvTsbbko+lfnbMFj7d3686VNVeCyHx4lswMxebBharBDanSV2f8onqN0je8CgYEAnLgcJnNnW2UbgzotLnBZAf4TmMVjTB/Ar4d7x9i0VT92evNXwHxrJcod6TsI0UtbwCqCv2MuUHSmiKtUX3PGg9ub78g3s96EZLkY215CqXNzFybGPclgx4pb1qqmIha8dvVmpGtYLTXmGi2pXTF+iKDvHeFtxorjL3wQjUGJN9kCgYEAw3OUc51+TF2FTYTSEli8LDZ2JLbDGooujv6y5scEJuimShKu78Q0PxejO/QQbzfUUoBP1k21T4nwCLHjM8I067h83s4DxrRZboKHIgQFDrnruBlg42cSD+jhlBuqwc4KnK7t6RBXgif2HAAuHTpMdJDJcdAT8kcPZU2dOvmYEoo=".ToByteArray();
            rsaProvider.ImportRSAPrivateKey(privateKeyArray, out _);

            _key = new RsaSecurityKey(rsaProvider);
            _algorithm = SecurityAlgorithms.RsaSha256Signature;

            _signingCredentials = new SigningCredentials(_key, _algorithm)
            {
                CryptoProviderFactory = new CryptoProviderFactory { CacheSignatureProviders = false }
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            var identity = new ClaimsIdentity(new List<Claim>() {
                new Claim(ClaimTypes.Name,$"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Role, user.Roles),
                new Claim(ClaimTypes.PrimarySid, user.Id.ToString())
            }, "Custom");

            SecurityToken token = tokenHandler.CreateJwtSecurityToken(new SecurityTokenDescriptor
            {
                Audience = _audience,
                Issuer = _issuer,
                SigningCredentials = _signingCredentials,
                Expires = expiry.ToUniversalTime(),
                Subject = identity
            });

            return tokenHandler.WriteToken(token);
        }

        /// <summary>
        /// Check validation parameters
        /// </summary>
        /// <returns></returns>
        public bool ValidateToken(string token)
        {                                    
            var rsaProvider = RSA.Create();
            byte[] publicKeyArray = @"MIIBCgKCAQEAyXAi8y6xLEoJFekHDlK3sAWM6cSYMekq2xzvtzoBVFXFeYs0ECnsVsYx39aqQSZtUaqkBceKA+xFbtVikC37qdfzAVfvb0K+p+BE42WhSMPClAkUChTf/7w5T0VpTboJ7X5fbDnGkVLA9+5uUBpr/qiI0sJPtqsUcQ8zESh3HXCMYuzR48ybl4iR2wPvjFc4cHyBwH2UoGRB3zOGQLrzlYt5Cp/N0rBY60yajN25FRdx0qbTFVXn6ibLwnLz0fQiA/8X5n+IgpOHpMtSeSTBFKcocdioofn648VBkcTCtq3QE0ecrG2wb6VMzuwY78dy8Qgy9+qFDGCPgtQ4OWANzwIDAQAB".ToByteArray();
            rsaProvider.ImportRSAPublicKey(publicKeyArray, out _);

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _issuer,
                ValidAudience = _audience,
                IssuerSigningKey = new RsaSecurityKey(rsaProvider),
                ClockSkew = TimeSpan.FromSeconds(0)
            };

            try
            {
                var handler = new JwtSecurityTokenHandler();
                handler.ValidateToken(token, validationParameters, out var validatedSecurityToken);
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}
