using Microsoft.AspNetCore.Mvc;
using System;
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
            try
            {
                var response = new SoapAdapter(soapParameters).SoapDynamicallyCall();
                return Ok(response);
            }
            catch(Exception ex)
            {
                if(ex.GetType() == typeof(TimeoutException))
                    return StatusCode(408);
                
                return BadRequest(new { MessageError = ex.Message.ToString() });
            }            
        }
    }
}
