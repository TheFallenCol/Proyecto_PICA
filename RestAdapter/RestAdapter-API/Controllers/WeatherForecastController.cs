using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
            return Ok(new { Message = "The service is up"});
        }


        [HttpPost]
        public IActionResult MakeCall([FromBody] RestCall callDescription)
        {
            var restAdapter = new RestAdapter(callDescription);
            return Ok(JsonConvert.DeserializeObject(restAdapter.Method().GetAwaiter().GetResult()));
        }
    }
}
