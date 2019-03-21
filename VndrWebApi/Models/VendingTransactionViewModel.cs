using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VndrWebApi.Models
{
    public class VendingTransactionViewModel
    {
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public List<TransactionItemViewModel> TransItems { get; set; }
    }
}
