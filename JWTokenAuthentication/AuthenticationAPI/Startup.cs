using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthenticationAPI.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using UnitOfWork;

namespace AuthenticationAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IUnitOfWork>(option => new DataAccess.UnitOfWork(
                Configuration.GetConnectionString("AutenthicationDB")
                ));

            //
            var tokenProvider = new JwtProvider("issuer","audience","AES_PICA_Token2020");
            services.AddSingleton<ITokenProvider>(tokenProvider);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>{
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = tokenProvider.GetValidationParameters();
            });
            
            services.AddAuthorization(auth =>{
                auth.DefaultPolicy = new AuthorizationPolicyBuilder().AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme).RequireAuthenticatedUser().Build();
            });

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseAuthentication();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
