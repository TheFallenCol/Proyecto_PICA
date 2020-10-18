using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestAdapterLibrary;
using System;

namespace RestAdapter_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RestCallController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(new { Message = "The service is up" });
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult MakeCall([FromBody] RestCall callDescription)
        {
            try
            {
                var restAdapter = new RestAdapter(callDescription);
                return Ok(restAdapter.ExecuteRestCall());
            }
            catch (Exception ex)
            {
                if (ex.GetType() == typeof(TimeoutException))
                    return StatusCode(408, new { MessageError = ex.Message });

                return BadRequest(new { MessageError = ex.Message.ToString() });
            }
        }
    }
}
