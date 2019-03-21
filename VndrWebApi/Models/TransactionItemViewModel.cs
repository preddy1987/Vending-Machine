using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VndrWebApi.Models
{
    public class TransactionItemViewModel
    {
        public int Id { get; set; }
        public int VendingTransactionId { get; set; }
        public int ProductId { get; set; }
        public double SalePrice { get; set; }
    }
}
