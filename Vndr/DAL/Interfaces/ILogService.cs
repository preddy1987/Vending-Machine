using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendingService.Models;

namespace VendingService.Interfaces
{
    /// <summary>
    /// Interface for the vending machine log
    /// </summary>
    public interface ILogService
    {
        /// <summary>
        /// Adds a vending operation to the log
        /// </summary>
        /// <param name="operation">The operation needed to be logged</param>
        void LogOperation(VendingOperation operation);

        /// <summary>
        /// Gets all the vending operations from the log for the given date range
        /// </summary>
        /// <param name="startDate">The range start date</param>
        /// <param name="endDate">The range end date</param>
        /// <returns>The list of vending operations</returns>
        IList<VendingOperation> GetLogData(DateTime? startDate, DateTime? endDate);

        /// <summary>
        /// Gets all the vending operations from the log
        /// </summary>
        /// <returns>The list of vending operations</returns>
        IList<VendingOperation> GetLogData();

        /// <summary>
        /// Adds an operation type to the database. The primary key must be specified.
        /// </summary>
        /// <param name="item">The item to be added</param>
        void AddOperationTypeItem(OperationTypeItem item);

        /// <summary>
        /// Returns a list of all the operation type items
        /// </summary>
        /// <returns>List of operation types</returns>
        List<OperationTypeItem> GetOperationTypeItems();
    }
}
