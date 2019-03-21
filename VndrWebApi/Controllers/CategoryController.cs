using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VendingService.Interfaces;
using VendingService.Models;
using VndrWebApi.Models;

namespace VndrWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private IVendingService _db = null;

        public CategoryController(IVendingService db)
        {
            _db = db;
        }

        // GET api/role
        [HttpGet]
        public ActionResult<IEnumerable<CategoryItem>> Get()
        {
            return _db.GetCategoryItems();
        }

        // GET api/role/5
        [HttpGet("{id}")]
        public ActionResult<CategoryItem> Get(int id)
        {
            return _db.GetCategoryItem(id);
        }

        // POST api/role
        [HttpPost]
        public void Post([FromBody] CategoryItemViewModel value)
        {
            CategoryItem item = new CategoryItem();
            //item.Name = value.Name;
            //_db.AddCategoryItem(item);
        }

        // PUT api/role/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] CategoryItemViewModel value)
        {
            CategoryItem item = new CategoryItem();
            item.Id = id;
            //item.Name = value.;
            //item.Noise = value.;
            //_db.UpdateCategoryItem(item);
        }

        // DELETE api/role/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _db.DeleteCategoryItem(id);
        }
    }
}