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
    public class VendingTransactionController : ControllerBase
    {
        private IVendingService _db = null;

        public VendingTransactionController(IVendingService db)
        {
            _db = db;
        }

        //List<VendingTransaction> GetVendingTransactions();
        [HttpGet]
        [Route("api/[controller]/all")]
        public ActionResult<IEnumerable<VendingTransaction>> Get()
        {
            return _db.GetVendingTransactions();
        }

        //VendingTransaction GetVendingTransaction(int id);
        [HttpGet]
        [Route("api/[controller]/single/{id}")]
        public ActionResult<VendingTransaction> Get(int id)
        {
            return _db.GetVendingTransaction(id);
        }

        [HttpPost]
        [Route("api/[controller]/add")]
        public void PostSingle([FromBody] VendingTransactionViewModel value)
        {
            VendingTransaction transaction = new VendingTransaction();
            transaction.UserId = value.UserId;
            transaction.Date = value.Date;

            _db.AddVendingTransaction(transaction);
        }

        [HttpPost]
        [Route("api/[controller]/addwithlist")]
        public void PostList([FromBody] VendingTransactionViewModel value)
        {
            VendingTransaction transaction = new VendingTransaction();
            transaction.UserId = value.UserId;
            transaction.Date = value.Date;

            List<TransactionItem> transItems = new List<TransactionItem>();

            foreach (TransactionItemViewModel item in value.TransItems)
            {
                TransactionItem tranItem = new TransactionItem();
                tranItem.ProductId = item.ProductId;
                tranItem.SalePrice = item.SalePrice;
                transItems.Add(tranItem);
            }

            _db.AddTransactionSet(transaction, transItems);
        }
    }
}