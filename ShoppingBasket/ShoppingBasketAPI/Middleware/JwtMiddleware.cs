using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace ShoppingBasketAPI.Middleware
{
    public static class TypeConverterExtension
    {
        public static byte[] ToByteArray(this string value) =>
         Convert.FromBase64String(value);
    }

    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;        
        
        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext httpContext)
        {
            var token = httpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null) {
                var rsaProvider = RSA.Create();
                byte[] publicKeyArray = @"MIIBCgKCAQEAyXAi8y6xLEoJFekHDlK3sAWM6cSYMekq2xzvtzoBVFXFeYs0ECnsVsYx39aqQSZtUaqkBceKA+xFbtVikC37qdfzAVfvb0K+p+BE42WhSMPClAkUChTf/7w5T0VpTboJ7X5fbDnGkVLA9+5uUBpr/qiI0sJPtqsUcQ8zESh3HXCMYuzR48ybl4iR2wPvjFc4cHyBwH2UoGRB3zOGQLrzlYt5Cp/N0rBY60yajN25FRdx0qbTFVXn6ibLwnLz0fQiA/8X5n+IgpOHpMtSeSTBFKcocdioofn648VBkcTCtq3QE0ecrG2wb6VMzuwY78dy8Qgy9+qFDGCPgtQ4OWANzwIDAQAB".ToByteArray();
                rsaProvider.ImportRSAPublicKey(publicKeyArray, out _);

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "TouresBalon.com",
                    ValidAudience = "UsuariosPlataforma",
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
                    httpContext.Response.StatusCode = 401;
                }                
            }                                   

            return _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class JwtMiddlewareExtensions
    {
        public static IApplicationBuilder UseJwtMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtMiddleware>();
        }
    }
}
