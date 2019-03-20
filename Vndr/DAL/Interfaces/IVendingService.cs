using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendingService.Models;

namespace VendingService.Interfaces
{
    public interface IVendingService
    {
        #region VendingItem
        List<VendingItem> GetVendingItems();
        VendingItem GetVendingItem(int row, int col);
        #endregion

        #region UserItem
        int AddUserItem(UserItem item);
        bool UpdateUserItem(UserItem item);
        void DeleteUserItem(int userId);
        UserItem GetUserItem(int userId);
        UserItem GetUserItem(string username);
        List<UserItem> GetUserItems();
        #endregion

        #region CategoryItem
        int AddCategoryItem(CategoryItem item);
        bool UpdateCategoryItem(CategoryItem item);
        void DeleteCategoryItem(int categoryId);
        CategoryItem GetCategoryItem(int categoryId);
        List<CategoryItem> GetCategoryItems();
        #endregion

        #region InventoryItem
        int AddInventoryItem(InventoryItem item);
        bool UpdateInventoryItem(InventoryItem item);
        void DeleteInventoryItem(int inventoryId);
        InventoryItem GetInventoryItem(int inventoryId);
        List<InventoryItem> GetInventoryItems();
        #endregion

        #region ProductItem
        int AddProductItem(ProductItem item);
        bool UpdateProductItem(ProductItem item);
        void DeleteProductItem(int productId);
        ProductItem GetProductItem(int productId);
        List<ProductItem> GetProductItems();
        #endregion

        #region VendingTransaction
        int AddTransactionSet(VendingTransaction vendTrans, List<TransactionItem> transItems);
        int AddVendingTransaction(VendingTransaction item);
        VendingTransaction GetVendingTransaction(int id);
        List<VendingTransaction> GetVendingTransactions();
        #endregion

        #region TransactionItem
        int AddTransactionItem(TransactionItem item);
        TransactionItem GetTransactionItem(int transactionItemId);
        List<TransactionItem> GetTransactionItems(int vendingTransactionId);
        List<TransactionItem> GetTransactionItems();
        List<TransactionItem> GetTransactionItemsForYear(int year);
        List<TransactionItem> GetTransactionItemsForYear(int year, int userId);
        #endregion

        #region RoleItem
        int AddRoleItem(RoleItem item);
        List<RoleItem> GetRoleItems();
        RoleItem GetRoleItem(int id);
        bool UpdateRoleItem(RoleItem item);
        void DeleteRoleItem(int id);
        #endregion
    }
}
