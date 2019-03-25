using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingService.Models;

namespace VndrWebApi.Models
{
    public class InventoryDisplay : BaseItem
    {
        public int ProductId { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
        public int Qty { get; set; }

        public string Key
        {
            get
            {
                return $"{Row},{Column}";
            }
        }

        public InventoryDisplay Clone()
        {
            InventoryDisplay item = new InventoryDisplay();
            item.Id = this.Id;
            item.Column = this.Column;
            item.Row = this.Row;
            item.Qty = this.Qty;
            item.ProductId = this.ProductId;
            item.Name = this.Name;
            item.Price = this.Price;
            item.Image = this.Image;
            item.Qty = this.Qty;

            return item;
        }
    }
}
