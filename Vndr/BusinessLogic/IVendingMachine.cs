using System;
using System.Collections.Generic;
using System.Text;
using VendingService;
using VendingService.Models;

namespace VendingService
{
    public interface IVendingMachine
    {
        bool IsAuthenticated { get; }
        void RegisterUser(User userModel);
        void LoginUser(string username, string password);
        void LogoutUser();
        IList<UserItem> Users { get; }
        VendingItem[,] VendingItems { get; }
        IList<ProductItem> Products { get; }
        IList<OperationTypeItem> OperationTypes { get; }
        RoleManager Role { get; }
        double RunningTotal { get; }
        void FeedMoney(double amt);
        VendingItem PurchaseItem(int row, int col);
        Change ReturnChange();
        UserItem CurrentUser { get; }
        Report GetReport(int? year, int? userId);
        IList<VendingOperation> GetLog(DateTime? startDate, DateTime? endDate);
        void Restock(int qty = 5);
    }
}
