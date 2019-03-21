using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VndrWebApi.Models
{
    public class InventoryItemViewModel
    {
        public int ProductId { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public int Qty { get; set; }
    }
}
