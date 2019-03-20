using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendingService.Models
{
    public class LogItem : BaseItem
    {
        public int OperationId { get; set; } = BaseItem.InvalidId;
        public double Amount { get; set; }
        public DateTime CreationDate { get; set; }
        public int UserId { get; set; } = BaseItem.InvalidId;
        public int ProductId { get; set; } = BaseItem.InvalidId;
        public string ProductName { get; set; }
    }
}
