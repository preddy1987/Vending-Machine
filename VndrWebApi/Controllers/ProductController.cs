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
    public class ProductController : ControllerBase
    {
        private IVendingService _db = null;

        public ProductController(IVendingService db)
        {
            _db = db;
        }

        // GET api/product
        [HttpGet]
        public ActionResult<IEnumerable<ProductItem>> Get()
        {
            return _db.GetProductItems();
        }

        // GET api/product/5
        [HttpGet("{id}")]
        public ActionResult<ProductItem> Get(int id)
        {
            return _db.GetProductItem(id);
        }

        // POST api/product
        [HttpPost]
        public void Post([FromBody] ProductItemViewModel value)
        {
            ProductItem item = new ProductItem();
            item.Name = value.Name;
            item.CategoryId = value.CategoryId;
            item.Price = value.Price;
            item.Image = value.Image;
            _db.AddProductItem(item);
        }

        // PUT api/product/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] ProductItemViewModel value)
        {
            ProductItem item = new ProductItem();
            item.Id = id;
            item.Name = value.Name;
            item.CategoryId = value.CategoryId;
            item.Price = value.Price;
            item.Image = value.Image;
            _db.UpdateProductItem(item);
        }

        // DELETE api/product/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _db.DeleteProductItem(id);
        }
    }
}