using System.Text;
using AutheticationLibrary;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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
            var config = new StringBuilder
                (Configuration["ConnectionStrings:AutenthicationDB"]);
            
            string conn = 
                config.Replace("ENVSERVER", Configuration["ENVSERVER"])
                    .Replace("ENVDBNAME", Configuration["ENVDBNAME"])
                    .Replace("ENVID", Configuration["ENVID"])
                    .Replace("ENVPW", Configuration["ENVPW"])
                    .ToString();

            services.AddCors();

            services.AddSingleton<IUnitOfWork>(option => new DataAccess.UnitOfWork(conn));

            var tokenProvider = new JwtProvider("TouresBalon.com", "UsuariosPlataforma");
            services.AddSingleton<ITokenProvider>(tokenProvider);

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseRouting();

            app.UseAuthorization();        

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
