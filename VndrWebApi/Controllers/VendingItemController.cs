using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VendingService.Interfaces;
using VendingService.Models;

namespace VndrWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendingItemController : ControllerBase
    {
        private IVendingService _db = null;

        public VendingItemController(IVendingService db)
        {
            _db = db;
        }

        // GET api/vendingitem
        [HttpGet]
        public List<VendingItem> Get()
        {
            return _db.GetVendingItems();
        }

        // GET api/vendingitem/2,3
        [HttpGet("{row},{column}")]
        public VendingItem Get(int row,int column)
        {
            return _db.GetVendingItem(row,column);
        }
    }
}