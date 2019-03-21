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
    public class InventoryController : ControllerBase
    {
        private IVendingService _db = null;

        public InventoryController(IVendingService db)
        {
            _db = db;
        }

        // GET api/Inventory
        [HttpGet]
        public ActionResult<IEnumerable<InventoryItem>> Get()
        {
            return _db.GetInventoryItems();
        }

        // GET api/Inventory/5
        [HttpGet("{id}")]
        public ActionResult<InventoryItem> Get(int id)
        {
            return _db.GetInventoryItem(id);
        }

        // POST api/Inventory
        [HttpPost]
        public ActionResult<int> Post([FromBody] InventoryItemViewModel value)
        {
            InventoryItem item = new InventoryItem();
            item.Column = value.Column;
            item.ProductId= value.ProductId;
            item.Qty = value.Qty;
            item.Row = value.Row;
            return _db.AddInventoryItem(item);
        }

        // PUT api/Inventory/5
        [HttpPut("{id}")]
        public ActionResult<bool> Put(int id, [FromBody] InventoryItemViewModel value)
        {
            InventoryItem item = new InventoryItem();
            item.Id = id;
          item.Column = value.Column;
            item.ProductId= value.ProductId;
            item.Qty = value.Qty;
            item.Row = value.Row;
           return _db.UpdateInventoryItem(item);
        }

        // DELETE api/Inventory/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _db.DeleteInventoryItem(id);
        }
    }
}