using Microsoft.AspNetCore.Mvc;
using WebServiceAdapterLibrary;

namespace WebServiceAdapterAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SoapController : ControllerBase
    {
        [HttpPost]
        public IActionResult Get([FromBody] SoapParameters soapParameters)
        {
            var response = new SoapAdapter(soapParameters).SoapDynamicallyCall();
            return Ok(response);
        }
    }
}
