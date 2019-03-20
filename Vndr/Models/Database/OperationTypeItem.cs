using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendingService.Models
{
    public class OperationTypeItem : BaseItem
    {
        public string Name { get; set; }

        public OperationTypeItem Clone()
        {
            OperationTypeItem item = new OperationTypeItem();
            item.Id = this.Id;
            item.Name = this.Name;
            return item;
        }
    }
}
