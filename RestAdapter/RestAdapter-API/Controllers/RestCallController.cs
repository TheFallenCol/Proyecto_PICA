using Microsoft.AspNetCore.Mvc;
using RestAdapterLibrary;
using System.Threading.Tasks;

namespace RestAdapter_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RestCallController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {            
            return Ok(new { Message = "The service is up"});
        }


        [HttpPost]
        public async Task<IActionResult> MakeCall([FromBody] RestCall callDescription)
        {
            var restAdapter = new RestAdapter(callDescription);
            return Ok(await restAdapter.ExecuteRestCall());
        }
    }
}
