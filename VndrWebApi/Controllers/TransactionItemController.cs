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
    [ApiController]
    public class TransactionItemController : ControllerBase
    {
        private IVendingService _db = null;

        public TransactionItemController (IVendingService db)
        {
            _db = db;
        }

        //List<TransactionItem> GetTransactionItems();
        [HttpGet]
        [Route("api/[controller]/all")]
        public ActionResult<IEnumerable<TransactionItem>> Get()
        {
            return _db.GetTransactionItems();
        }

        //TransactionItem GetTransactionItem(int transactionItemId);
        [HttpGet]
        [Route("api/[controller]/single/{id}")]
        public ActionResult<TransactionItem> Get(int id)
        {
            return _db.GetTransactionItem(id);
        }

        //List<TransactionItem> GetTransactionItems(int vendingTransactionId);
        [HttpGet]
        [Route("api/[controller]/fortransaction/{vendingTransactionId}")]
        public ActionResult<IEnumerable<TransactionItem>> TransactionIdGet(int vendingTransactionId)
        {
            return _db.GetTransactionItems(vendingTransactionId);
        }

        //List<TransactionItem> GetTransactionItemsForYear(int year);
        [HttpGet]
        [Route("api/[controller]/foryear/{year}")]
        public ActionResult<IEnumerable<TransactionItem>> YearGet(int year)
        {
            return _db.GetTransactionItemsForYear(year);
        }

        //List<TransactionItem> GetTransactionItemsForYear(int year, int userId);
        [HttpGet]
        [Route("api/[controller]/foryearanduser/{year}/{userId}")]
        public ActionResult<IEnumerable<TransactionItem>> YearUserGet(int year, int userId)
        {
            return _db.GetTransactionItemsForYear(year, userId);
        }

        //int AddTransactionItem(TransactionItem item);
        [HttpPost]
        [Route("api/[controller]/add")]
        public void Post([FromBody] TransactionItemViewModel value)
        {
            TransactionItem item = new TransactionItem();
            item.ProductId = value.ProductId;
            item.VendingTransactionId = value.VendingTransactionId;
            item.SalePrice = value.SalePrice;

            _db.AddTransactionItem(item);
        }
    }
}