using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VendingService.Interfaces;
using VendingService.Models;
using VndrWebApi.Models;

namespace VndrWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : AuthController
    {
        public ProductController(IVendingService db, IHttpContextAccessor httpContext) : base(db, httpContext)
        {
        }

        // GET api/product
        [HttpGet]
        public ActionResult<IEnumerable<ProductItem>> Get()
        {
            var result = Json(_db.GetProductItems());
            return GetAuthenticatedJson(result, Role.IsCustomer || Role.IsExecutive || Role.IsServiceman);
        }

        // GET api/product/5
        [HttpGet("{id}")]
        public ActionResult<ProductItem> Get(int id)
        {
            return _db.GetProductItem(id);
        }

        // POST api/product
        [HttpPost]
        public ActionResult<int> Post([FromBody] ProductItemViewModel value)
        {
            ProductItem item = new ProductItem();
            item.Name = value.Name;
            item.CategoryId = value.CategoryId;
            item.Price = value.Price;
            item.Image = value.Image;
            return _db.AddProductItem(item);
        }

        // PUT api/product/5
        [HttpPut("{id}")]
        public ActionResult<bool> Put(int id, [FromBody] ProductItemViewModel value)
        {
            ProductItem item = new ProductItem();
            item.Id = id;
            item.Name = value.Name;
            item.CategoryId = value.CategoryId;
            item.Price = value.Price;
            item.Image = value.Image;
            return _db.UpdateProductItem(item);
        }

        // DELETE api/product/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _db.DeleteProductItem(id);
        }
    }
}