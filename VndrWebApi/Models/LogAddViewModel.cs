using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VndrWebApi.Models
{
    public class LogAddViewModel
    {
        public enum eOperationType
        {
            Invalid = 0,
            FeedMoney = 1,
            GiveChange = 2,
            PurchaseItem = 3
        }

        public eOperationType OperationType { get; set; } = eOperationType.Invalid;
        public double Price { get; set; } = 0.0;
        public DateTime TimeStamp { get; set; }
        public int UserId { get; set; } = -1; //BaseItem.InvalidId
        public int ProductId = -1; // BaseItem.InvalidId;

        public LogAddViewModel()
        {
            TimeStamp = DateTime.UtcNow;
        }
    }
}
