using DBModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UnitOfWork;

namespace ShoppingBasketAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SupplierController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public SupplierController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetByID(int id)
        {
            return Ok(_unitOfWork.Supplier.GetById(id));
        }

        [HttpGet]
        [Route("GetPaginatedSupplier/{page:int}/{rows:int}")]
        public IActionResult GetPaginatedSupplier(int page, int rows)
        {
            return Ok(_unitOfWork.Supplier.SupplierPagedList(page, rows));
        }

        [HttpPost]
        public IActionResult AddSupplier([FromBody] Supplier supplier)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(_unitOfWork.Supplier.Insert(supplier));
        }

        [HttpPut]
        public IActionResult UpdateSupplier([FromBody] Supplier supplier)
        {
            if (ModelState.IsValid && _unitOfWork.Supplier.Update(supplier))
                return Ok(new { Message = "The Supplier was updated successfully" });

            return BadRequest();
        }

        [HttpDelete]
        public IActionResult DeleteSupplier([FromBody] Supplier supplier)
        {
            if (supplier.Id > 0)
                return Ok(_unitOfWork.Supplier.Delete(supplier));

            return BadRequest();
        }
    }
}
