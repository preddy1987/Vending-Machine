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

        // GET api/Category
        [HttpGet]
        public ActionResult<IEnumerable<CategoryItem>> Get()
        {
            return _db.GetCategoryItems();
        }

        // GET api/Category/5
        [HttpGet("{id}")]
        public ActionResult<CategoryItem> Get(int id)
        {
            return _db.GetCategoryItem(id);
        }

        // POST api/Category
        [HttpPost]
        public ActionResult<int> Post([FromBody] CategoryItemViewModel value)
        {
            CategoryItem item = new CategoryItem();
            item.Name = value.Name;
            item.Noise= value.Noise;
            return _db.AddCategoryItem(item);
        }

        // PUT api/Category/5
        [HttpPut("{id}")]
        public ActionResult<bool> Put(int id, [FromBody] CategoryItemViewModel value)
        {
            CategoryItem item = new CategoryItem();
            item.Id = id;
            item.Name = value.Name;
            item.Noise = value.Noise;
            return _db.UpdateCategoryItem(item);
        }

        // DELETE api/Category/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _db.DeleteCategoryItem(id);
        }
    }
}