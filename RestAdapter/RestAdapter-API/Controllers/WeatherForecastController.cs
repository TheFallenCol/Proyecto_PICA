using JsonFx.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RestAdapterLibrary;

namespace RestAdapter_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            RestAdapter algo = new RestAdapter();
            var reader = new JsonReader(); 
            var writer = new JsonWriter();
            string input = algo.Method().GetAwaiter().GetResult();
            dynamic output = reader.Read(input);            
            string json = writer.Write(output);
            return Ok(json);
        }
    }
}
