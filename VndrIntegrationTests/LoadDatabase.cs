using Microsoft.VisualStudio.TestTools.UnitTesting;
using VendingService.Database;
using VendingService.Interfaces;

namespace VndrIntegrationTests
{
    [TestClass]
    public class LoadDatabase
    {
        private const string _connectionString = @"Data Source=.\SQLEXPRESS;Initial Catalog=VendingMachine;Integrated Security=true";

        //[TestMethod]
        public void PopulateDatabase()
        {
            IVendingService db = new VendingDBService(_connectionString);
            //IVendingService db = new MockVendingDBService();

            //TestManager.PopulateDatabaseWithUsers(db);
            //TestManager.PopulateDatabaseWithInventory(db);
            //TestManager.PopulateDatabaseWithTransactions(db);

            //ILogService log = new LogDBService(_connectionString);
            //TestManager.PopulateLogFileWithOperations(db, log);
        }
    }
}
