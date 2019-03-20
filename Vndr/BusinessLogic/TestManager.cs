using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using VendingService.Database;
using VendingService.Interfaces;
using VendingService.Models;

namespace VendingService
{
    /// <summary>
    /// Populate the IVendingService with dummy data. This is useful for loading the SQL Database
    /// for the first time and for loading the Mock database in its constructor. The order in which these
    /// methods are called is important if starting from an empty database.
    /// </summary>
    public static class TestManager
    {
        /// <summary>
        /// Creates a user for each role type
        /// </summary>
        /// <param name="db">Database interface used to create the data</param>
        public static void PopulateDatabaseWithUsers(IVendingService db)
        {
            using (TransactionScope scope = new TransactionScope())
            {
                PasswordManager passHelper = new PasswordManager("a");

                db.AddRoleItem(new RoleItem() { Id = 1, Name = "Administrator" });
                db.AddRoleItem(new RoleItem() { Id = 2, Name = "Customer" });
                db.AddRoleItem(new RoleItem() { Id = 3, Name = "Executive" });
                db.AddRoleItem(new RoleItem() { Id = 4, Name = "Serviceman" });

                UserItem item = new UserItem()
                {
                    FirstName = "Joe",
                    LastName = "Piscapoe",
                    Username = "jp",
                    Email = "jp@gmail.com",
                    RoleId = (int)RoleManager.eRole.Administrator
                };
                item.Hash = passHelper.Hash;
                item.Salt = passHelper.Salt;
                item.Id = db.AddUserItem(item);

                item = new UserItem()
                {
                    FirstName = "John",
                    LastName = "Doe",
                    Username = "jd",
                    Email = "jd@gmail.com",
                    RoleId = (int)RoleManager.eRole.Customer
                };
                item.Hash = passHelper.Hash;
                item.Salt = passHelper.Salt;
                item.Id = db.AddUserItem(item);

                item = new UserItem()
                {
                    FirstName = "Sally",
                    LastName = "Mae",
                    Username = "sm",
                    Email = "sm@gmail.com",
                    RoleId = (int)RoleManager.eRole.Executive
                };
                item.Hash = passHelper.Hash;
                item.Salt = passHelper.Salt;
                item.Id = db.AddUserItem(item);

                item = new UserItem()
                {
                    FirstName = "Alex",
                    LastName = "Carol",
                    Username = "ac",
                    Email = "ac@gmail.com",
                    RoleId = (int)RoleManager.eRole.Serviceman
                };
                item.Hash = passHelper.Hash;
                item.Salt = passHelper.Salt;
                item.Id = db.AddUserItem(item);

                scope.Complete();
            }
        }

        /// <summary>
        /// Creates the products, inventory, and categories to support a 4x3 vending machine
        /// </summary>
        /// <param name="db">Database interface used to create the data</param>
        public static void PopulateDatabaseWithInventory(IVendingService db)
        {
            using (TransactionScope scope = new TransactionScope())
            {
                CategoryItem categoryItem = new CategoryItem()
                {
                    Name = "Chips",
                    Noise = "Crunch, Crunch, Crunch, Yum!"
                };
                categoryItem.Id = db.AddCategoryItem(categoryItem);

                // Add Product 1
                ProductItem productItem = new ProductItem()
                {
                    Name = "Lays",
                    Price = 0.50,
                    Image = "https://image.flaticon.com/icons/svg/305/305385.svg",
                    CategoryId = categoryItem.Id
                };
                productItem.Id = db.AddProductItem(productItem);

                InventoryItem inventoryItem = new InventoryItem()
                {
                    Column = 1,
                    Row = 1,
                    Qty = 5,
                    ProductId = productItem.Id
                };
                inventoryItem.Id = db.AddInventoryItem(inventoryItem);

                // Add Product 2
                productItem.Name = "Pringles";
                productItem.Image = "https://image.flaticon.com/icons/svg/1228/1228383.svg";
                productItem.Price = 0.65;
                productItem.Id = db.AddProductItem(productItem);

                inventoryItem.Column = 2;
                inventoryItem.ProductId = productItem.Id;
                inventoryItem.Id = db.AddInventoryItem(inventoryItem);

                // Add Product 3
                productItem.Name = "Ruffles";
                productItem.Image = "https://image.flaticon.com/icons/svg/1046/1046758.svg";
                productItem.Price = 0.75;
                productItem.Id = db.AddProductItem(productItem);

                inventoryItem.Column = 3;
                inventoryItem.ProductId = productItem.Id;
                inventoryItem.Id = db.AddInventoryItem(inventoryItem);

                // Add Product 4
                categoryItem.Name = "Candy";
                categoryItem.Noise = "Lick, Lick, Yum!";
                categoryItem.Id = db.AddCategoryItem(categoryItem);

                productItem.Name = "M&Ms Plain";
                productItem.Image = "https://image.flaticon.com/icons/svg/1296/1296913.svg";
                productItem.Price = 0.55;
                productItem.CategoryId = categoryItem.Id;
                productItem.Id = db.AddProductItem(productItem);

                inventoryItem.Row = 2;
                inventoryItem.Column = 1;
                inventoryItem.ProductId = productItem.Id;
                inventoryItem.Id = db.AddInventoryItem(inventoryItem);

                // Add Product 5
                productItem.Name = "M&Ms Peanut";
                productItem.Image = "https://image.flaticon.com/icons/svg/1296/1296944.svg";
                productItem.Price = 0.55;
                productItem.Id = db.AddProductItem(productItem);

                inventoryItem.Column = 2;
                inventoryItem.ProductId = productItem.Id;
                inventoryItem.Id = db.AddInventoryItem(inventoryItem);

                // Add Product 6
                productItem.Name = "Gummy Bears";
                productItem.Image = "https://image.flaticon.com/icons/svg/119/119497.svg";
                productItem.Price = 1.00;
                productItem.Id = db.AddProductItem(productItem);

                inventoryItem.Column = 3;
                inventoryItem.ProductId = productItem.Id;
                inventoryItem.Id = db.AddInventoryItem(inventoryItem);

                // Add Product 7
                categoryItem.Name = "Nuts";
                categoryItem.Noise = "Munch, Munch, Yum!";
                categoryItem.Id = db.AddCategoryItem(categoryItem);

                productItem.Name = "Peanuts";
                productItem.Image = "https://image.flaticon.com/icons/svg/811/811455.svg";
                productItem.Price = 1.00;
                productItem.CategoryId = categoryItem.Id;
                productItem.Id = db.AddProductItem(productItem);

                inventoryItem.Row = 3;
                inventoryItem.Column = 1;
                inventoryItem.ProductId = productItem.Id;
                inventoryItem.Id = db.AddInventoryItem(inventoryItem);

                // Add Product 8
                productItem.Name = "Cashews";
                productItem.Image = "https://image.flaticon.com/icons/svg/1256/1256949.svg";
                productItem.Price = 1.50;
                productItem.Id = db.AddProductItem(productItem);

                inventoryItem.Column = 2;
                inventoryItem.ProductId = productItem.Id;
                inventoryItem.Id = db.AddInventoryItem(inventoryItem);

                // Add Product 9
                productItem.Name = "Sunflower Seeds";
                productItem.Image = "https://image.flaticon.com/icons/svg/188/188352.svg";
                productItem.Price = 1.25;
                productItem.Id = db.AddProductItem(productItem);

                inventoryItem.Column = 3;
                inventoryItem.ProductId = productItem.Id;
                inventoryItem.Id = db.AddInventoryItem(inventoryItem);

                // Add Product 10
                categoryItem.Name = "Gum";
                categoryItem.Noise = "Chew, Chew, Yum!";
                categoryItem.Id = db.AddCategoryItem(categoryItem);

                productItem.Name = "Hubba Bubba";
                productItem.Image = "https://image.flaticon.com/icons/svg/287/287062.svg";
                productItem.Price = 0.75;
                productItem.CategoryId = categoryItem.Id;
                productItem.Id = db.AddProductItem(productItem);

                inventoryItem.Row = 4;
                inventoryItem.Column = 1;
                inventoryItem.ProductId = productItem.Id;
                inventoryItem.Id = db.AddInventoryItem(inventoryItem);

                // Add Product 11
                productItem.Name = "Bubble Yum";
                productItem.Image = "https://image.flaticon.com/icons/svg/1331/1331714.svg";
                productItem.Price = 0.75;
                productItem.Id = db.AddProductItem(productItem);

                inventoryItem.Column = 2;
                inventoryItem.ProductId = productItem.Id;
                inventoryItem.Id = db.AddInventoryItem(inventoryItem);

                // Add Product 12
                productItem.Name = "Trident";
                productItem.Image = "https://image.flaticon.com/icons/svg/524/524402.svg";
                productItem.Price = 0.65;
                productItem.Id = db.AddProductItem(productItem);

                inventoryItem.Column = 3;
                inventoryItem.ProductId = productItem.Id;
                inventoryItem.Id = db.AddInventoryItem(inventoryItem);
                scope.Complete();
            }
        }

        /// <summary>
        /// Creates a transaction item for each product and associates that with a vending transaction
        /// </summary>
        /// <param name="db">Database interface used to create the data</param>
        public static void PopulateDatabaseWithTransactions(IVendingService db)
        {
            using (TransactionScope scope = new TransactionScope())
            {
                // Get a list of products and users
                List<ProductItem> products = db.GetProductItems();
                List<UserItem> users = db.GetUserItems();
                
                VendingTransaction vendTrans = new VendingTransaction()
                {
                    Date = DateTime.UtcNow,
                    UserId = users[0].Id
                };
                vendTrans.Id = db.AddVendingTransaction(vendTrans);

                foreach (ProductItem prodItem in products)
                {
                    // Add Transaction Item
                    TransactionItem item = new TransactionItem()
                    {
                        SalePrice = prodItem.Price,
                        VendingTransactionId = vendTrans.Id,
                        ProductId = prodItem.Id
                    };
                    item.Id = db.AddTransactionItem(item);
                }

                scope.Complete();
            }
        }

        /// <summary>
        /// Creates each type of vending operation and a purchase operation for each product in the system
        /// </summary>
        /// <param name="db">Database interface used to create the data</param>
        /// <param name="log">Log interface used to create the file data</param>
        public static void PopulateLogFileWithOperations(IVendingService db, ILogService log)
        {
            OperationTypeItem type = new OperationTypeItem();
            type.Id = (int) VendingOperation.eOperationType.Invalid;
            type.Name = VendingOperation.eOperationType.Invalid.ToString();
            log.AddOperationTypeItem(type);

            type.Id = (int)VendingOperation.eOperationType.FeedMoney;
            type.Name = VendingOperation.eOperationType.FeedMoney.ToString();
            log.AddOperationTypeItem(type);

            type.Id = (int)VendingOperation.eOperationType.GiveChange;
            type.Name = VendingOperation.eOperationType.GiveChange.ToString();
            log.AddOperationTypeItem(type);

            type.Id = (int)VendingOperation.eOperationType.PurchaseItem;
            type.Name = VendingOperation.eOperationType.PurchaseItem.ToString();
            log.AddOperationTypeItem(type);

            var users = db.GetUserItems();
            var products = db.GetProductItems();

            double runningTotal = 0.0;
            foreach (var user in users)
            {
                VendingOperation op = new VendingOperation();
                op.OperationType = VendingOperation.eOperationType.FeedMoney;
                op.Price = 20.0;
                op.RunningTotal = runningTotal += op.Price;
                op.TimeStamp = DateTime.UtcNow;
                op.UserId = user.Id;
                log.LogOperation(op);

                op.OperationType = VendingOperation.eOperationType.FeedMoney;
                op.Price = 10.0;
                op.RunningTotal = runningTotal += op.Price;
                op.TimeStamp = DateTime.UtcNow;
                op.UserId = user.Id;
                log.LogOperation(op);

                foreach (var product in products)
                {
                    op = new VendingOperation();
                    op.OperationType = VendingOperation.eOperationType.PurchaseItem;
                    op.Price = product.Price;
                    op.RunningTotal = runningTotal - op.Price;
                    op.TimeStamp = DateTime.UtcNow;
                    op.UserId = user.Id;
                    op.ProductId = product.Id;
                    log.LogOperation(op);
                }
                
                op.OperationType = VendingOperation.eOperationType.GiveChange;
                op.Price = runningTotal;
                runningTotal = 0.0;
                op.RunningTotal = runningTotal;
                op.TimeStamp = DateTime.UtcNow;
                op.UserId = user.Id;
                op.ProductId = BaseItem.InvalidId;
                log.LogOperation(op);
            }
        }
    }
}
