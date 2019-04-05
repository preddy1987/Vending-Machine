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
    public class TransactionItemController : AuthController
    {
        public TransactionItemController(IVendingService db, IHttpContextAccessor httpContext) : base(db, httpContext)
        {
            
        }

        //List<TransactionItem> GetTransactionItems();
        [HttpGet]
        [Route("api/[controller]/all")]
        public ActionResult<IEnumerable<TransactionItem>> Get()
        {
            var result = Json(_db.GetTransactionItems());
            return GetAuthenticatedJson(result, Role.IsExecutive);
        }

        //TransactionItem GetTransactionItem(int transactionItemId);
        [HttpGet]
        [Route("api/[controller]/single/{id}")]
        public ActionResult<TransactionItem> Get(int id)
        {
            var result = Json(_db.GetTransactionItem(id));
            return GetAuthenticatedJson(result, Role.IsExecutive);
        }

        //List<TransactionItem> GetTransactionItems(int vendingTransactionId);
        [HttpGet]
        [Route("api/[controller]/fortransaction/{vendingTransactionId}")]
        public ActionResult<IEnumerable<TransactionItem>> TransactionIdGet(int vendingTransactionId)
        {
            var result = Json(_db.GetTransactionItems(vendingTransactionId));
            return GetAuthenticatedJson(result, Role.IsExecutive);
        }

        //List<TransactionItem> GetTransactionItemsForYear(int year);
        [HttpGet]
        [Route("api/[controller]/foryear/{year}")]
        public ActionResult<IEnumerable<TransactionItem>> YearGet(int year)
        {
            var result = Json(_db.GetTransactionItemsForYear(year));
            return GetAuthenticatedJson(result, Role.IsExecutive);
        }

        //List<TransactionItem> GetTransactionItemsForYear(int year, int userId);
        [HttpGet]
        [Route("api/[controller]/foryearanduser/{year}/{userId}")]
        public ActionResult<IEnumerable<TransactionItem>> YearUserGet(int year, int userId)
        {
            var result = Json(_db.GetTransactionItemsForYear(year, userId));
            return GetAuthenticatedJson(result, Role.IsExecutive);
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