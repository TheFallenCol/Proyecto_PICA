using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using WebServiceAdapterLibrary;

namespace WebServiceAdapterAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SoapController : ControllerBase
    {

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(new { Message = "The service is up" });
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status408RequestTimeout)]
        public IActionResult ResponseRequest([FromBody] SoapParameters soapParameters)
        {
            try
            {
                var response = new SoapAdapter(soapParameters).SoapDynamicallyCall();
                return Ok(new { EnvelopeResponse = response });
            }
            catch(Exception ex)
            {
                if(ex.GetType() == typeof(TimeoutException))
                    return StatusCode(408, new { MessageError = ex.Message });
                
                return BadRequest(new { MessageError = ex.Message });
            }
        }
    }
}
