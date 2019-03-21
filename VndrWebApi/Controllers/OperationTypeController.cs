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
    public class OperationTypeController : ControllerBase
    {
        private ILogService _db = null;

        public OperationTypeController(ILogService db)
        {
            _db = db;
        }

        // GET api/OperationType
        [HttpGet]
        public ActionResult<IEnumerable<OperationTypeItem>> Get()
        {
            return _db.GetOperationTypeItems();
        }

        // POST api/OperationType
        [HttpPost]
        public void Post([FromBody] OperationTypeViewModel value)
        {
            OperationTypeItem item = new OperationTypeItem();
            item.Name = value.Name;
            _db.AddOperationTypeItem(item);
        }
    }
}