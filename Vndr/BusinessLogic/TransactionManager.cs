using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendingService.Interfaces;
using VendingService.Models;

namespace VendingService
{
    /// <summary>
    /// Handles all the user transactions that are saved in the report and log
    /// </summary>
    public class TransactionManager
    {
        /// <summary>
        /// Interface for the database
        /// </summary>
        private IVendingService _db = null;

        /// <summary>
        /// Interface for the log file
        /// </summary>
        private ILogService _log = null;

        /// <summary>
        /// Needed to keep track of the active vending transaction for additional purchases
        /// being made before change is given.
        /// </summary>
        private int _vendingTransactionId = BaseItem.InvalidId;

        /// <summary>
        /// Holds the current value of money in the vending machine
        /// </summary>
        public double RunningTotal { get; private set; }

        /// <summary>
        /// Constructor that requires the interface for the database and log
        /// </summary>
        /// <param name="db">Database interface</param>
        /// <param name="log">Log interface</param>
        public TransactionManager(IVendingService db, ILogService log)
        {
            _db = db;
            _log = log;
        }

        /// <summary>
        /// Handles all purchase transactions. Writes a transaction to the database and an entry
        /// into the log file. This also updates the running total property for the vending machine.
        /// </summary>
        /// <param name="productId">The id of the product being purchased</param>
        /// <param name="userId">The id of the user purchasing the product</param>
        /// <returns>The updated running total after the purchase has been handled.</returns>
        public double AddPurchaseTransaction(int productId, int userId)
        {
            ProductItem product = _db.GetProductItem(productId);

            if (product.Price > RunningTotal)
            {
                throw new Exception("More money is required.");
            }            

            TransactionItem transactionItem = new TransactionItem();
            transactionItem.ProductId = productId;
            transactionItem.SalePrice = product.Price;

            if (_vendingTransactionId == BaseItem.InvalidId)
            {
                VendingTransaction vendTrans = new VendingTransaction();
                vendTrans.Date = DateTime.UtcNow;
                vendTrans.UserId = userId;

                List<TransactionItem> transactionItems = new List<TransactionItem>();
                transactionItems.Add(transactionItem);

                _vendingTransactionId = _db.AddTransactionSet(vendTrans, transactionItems);
            }
            else
            {
                transactionItem.VendingTransactionId = _vendingTransactionId;
                _db.AddTransactionItem(transactionItem);
            }

            VendingOperation operation = new VendingOperation();
            operation.OperationType = VendingOperation.eOperationType.PurchaseItem;
            operation.Price = product.Price;
            operation.RunningTotal = RunningTotal;
            operation.ProductName = product.Name;
            operation.ProductId = product.Id;
            operation.UserId = userId;
            _log.LogOperation(operation);

            RunningTotal -= product.Price;

            return RunningTotal;
        }

        /// <summary>
        /// Writes an entry into the log and updates the running total.
        /// </summary>
        /// <param name="amountAdded">The amount of money to add to the running total.</param>
        /// <param name="userId">The id of the user purchasing the product</param>
        /// <returns>The updated running total after the money has been added.</returns>
        public double AddFeedMoneyOperation(double amountAdded, int userId)
        {
            VendingOperation operation = new VendingOperation();
            operation.OperationType = VendingOperation.eOperationType.FeedMoney;
            operation.Price = amountAdded;
            operation.RunningTotal = RunningTotal;
            operation.UserId = userId;
            _log.LogOperation(operation);

            RunningTotal += amountAdded;

            return RunningTotal;
        }

        /// <summary>
        /// Writes an entry into the log and determines the change needed. Resets the running
        /// total to zero.
        /// </summary>
        /// <param name="userId">The id of the user purchasing the product</param>
        /// <returns>The change that should be given to the user</returns>
        public Change AddGiveChangeOperation(int userId)
        {
            var result = GetChange();

            VendingOperation operation = new VendingOperation();
            operation.OperationType = VendingOperation.eOperationType.GiveChange;
            operation.RunningTotal = RunningTotal;
            operation.UserId = userId;
            _log.LogOperation(operation);
            
            RunningTotal = 0.0;

            _vendingTransactionId = BaseItem.InvalidId;

            return result;
        }

        /// <summary>
        /// Converts the running total into change
        /// </summary>
        /// <returns>The change needed to account for the running total</returns>
        private Change GetChange()
        {
            Change result = new Change();

            int temp = (int)(RunningTotal * 100.0);
            result.Dollars = temp / 100;
            temp -= result.Dollars * 100;

            result.Quarters = temp / 25;
            temp -= result.Quarters * 25;

            result.Dimes = temp / 10;
            temp -= result.Dimes * 10;

            result.Nickels = temp / 5;
            temp -= result.Nickels * 5;

            result.Pennies = temp;

            return result;
        }
    }
}
