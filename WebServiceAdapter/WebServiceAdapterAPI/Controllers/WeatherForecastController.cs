using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebServiceAdapterLibrary;

namespace WebServiceAdapterAPI.Controllers
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
            //var url = "http://www.dneonline.com/calculator.asmx";
            var url = "http://DESKTOP-Q4E08KH:9050/mockCalculatorSoap"; 
            var action = "Add";
            var envelope = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\"><soapenv:Header/><soapenv:Body><tem:Add><tem:intA>12</tem:intA><tem:intB>23</tem:intB></tem:Add></soapenv:Body></soapenv:Envelope>";

            var response = new SoapAdapter(url,action,envelope).SoapDynamicallyCall();

            return Ok(new { 
                Envelope = envelope,
                Action = action,
                Url = url,
                Response = response
            });                
        }
    }
}
