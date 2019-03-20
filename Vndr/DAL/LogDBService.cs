using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendingService.Interfaces;
using VendingService.Models;

namespace VendingService.Database
{
    public class LogDBService : ILogService
    {
        #region Variables

        private const string _getLastIdSQL = "SELECT CAST(SCOPE_IDENTITY() as int);";
        private string _connectionString;

        #endregion

        #region Constructors

        public LogDBService(string connectionString)
        {
            _connectionString = connectionString;
        }

        #endregion

        public IList<VendingOperation> GetLogData(DateTime? startDate, DateTime? endDate)
        {
            List<VendingOperation> result = new List<VendingOperation>();
            var items = GetLogItems(startDate, endDate);
            foreach(var item in items)
            {
                var vendOp = new VendingOperation();
                vendOp.OperationType = (VendingOperation.eOperationType) item.OperationId;
                vendOp.Price = item.Amount;
                vendOp.ProductName = item.ProductName;
                vendOp.TimeStamp = item.CreationDate;
                vendOp.ProductId = item.ProductId;
                vendOp.UserId = item.UserId;
                result.Add(vendOp);
            }
            return result;
        }

        public IList<VendingOperation> GetLogData()
        {
            return GetLogData(null, null);
        }

        public void LogOperation(VendingOperation operation)
        {
            LogItem item = new LogItem();
            item.CreationDate = operation.TimeStamp;
            item.Amount = operation.Price;
            item.OperationId = (int) operation.OperationType;
            item.ProductId = operation.ProductId;
            item.UserId = operation.UserId;
            AddLogItem(item);
        }

        #region OperationTypeItem

        public void AddOperationTypeItem(OperationTypeItem item)
        {
            const string sql = "INSERT OperationType (Id, Name) " +
                               "VALUES (@Id, @Name);";
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand(sql + _getLastIdSQL, conn);
                cmd.Parameters.AddWithValue("@Id", item.Id);
                cmd.Parameters.AddWithValue("@Name", item.Name);
                cmd.ExecuteNonQuery();
            }
        }

        public List<OperationTypeItem> GetOperationTypeItems()
        {
            List<OperationTypeItem> roles = new List<OperationTypeItem>();
            const string sql = "Select * From OperationType;";

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(sql, conn);
                var reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    roles.Add(GetOperationTypeItemFromReader(reader));
                }
            }

            return roles;
        }

        private OperationTypeItem GetOperationTypeItemFromReader(SqlDataReader reader)
        {
            OperationTypeItem item = new OperationTypeItem();

            item.Id = Convert.ToInt32(reader["Id"]);
            item.Name = Convert.ToString(reader["Name"]);

            return item;
        }

        #endregion

        #region LogItem

        public void AddLogItem(LogItem item)
        {
            string sql = "INSERT Log (OperationId, Date, Amount, UserId, ProductId) " +
                         "VALUES (@OperationId, @Date, @Amount, @UserId, " +
                         (item.ProductId == BaseItem.InvalidId ? "null" : item.ProductId.ToString()) + 
                         ");";

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand(sql + _getLastIdSQL, conn);
                cmd.Parameters.AddWithValue("@OperationId", item.OperationId);
                cmd.Parameters.AddWithValue("@Date", item.CreationDate);
                cmd.Parameters.AddWithValue("@Amount", item.Amount);
                cmd.Parameters.AddWithValue("@UserId", item.UserId);
                cmd.ExecuteNonQuery();
            }
        }

        public List<LogItem> GetLogItems(DateTime? startDate = null, DateTime? endDate = null)
        {
            List<LogItem> roles = new List<LogItem>();
            string sql = "";
            if (startDate != null && endDate != null)
            {
                sql = "Select Log.*, Product.Name as ProductName " +
                      "From Log " +
                      "Join Product On Product.Id = Log.ProductId " +
                      "Where Log.Date > @StartDate And Log.Date < @EndDate;";                
            }
            else
            {
                sql = "Select Log.*, Product.Name as ProductName " +
                      "From Log " +
                      "Join Product On Product.Id = Log.ProductId;";
            }

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(sql, conn);
                if (startDate != null && endDate != null)
                {
                    cmd.Parameters.AddWithValue("@StartDate", startDate);
                    cmd.Parameters.AddWithValue("@EndDate", endDate);
                }

                var reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    roles.Add(GetLogItemFromReader(reader));
                }
            }

            // Now get the log entries that do not have a product id
            if (startDate != null && endDate != null)
            {
                sql = "Select * " +
                      "From Log " +
                      "Where Log.Date > @StartDate And Log.Date < @EndDate And ProductId Is Null;";
            }
            else
            {
                sql = "Select * " +
                      "From Log " +
                      "Where ProductId Is Null;";
            }

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(sql, conn);
                if (startDate != null && endDate != null)
                {
                    cmd.Parameters.AddWithValue("@StartDate", startDate);
                    cmd.Parameters.AddWithValue("@EndDate", endDate);
                }

                var reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    roles.Add(GetLogItemFromReader(reader));
                }
            }

            return roles.OrderByDescending(x => x.Id).ToList();
        }

        private LogItem GetLogItemFromReader(SqlDataReader reader)
        {
            LogItem item = new LogItem();

            item.Id = Convert.ToInt32(reader["Id"]);
            item.OperationId = Convert.ToInt32(reader["OperationId"]);
            item.CreationDate = Convert.ToDateTime(reader["Date"]);
            item.Amount = Convert.ToDouble(reader["Amount"]);
            item.UserId = Convert.ToInt32(reader["UserId"]);
            if (reader.IsDBNull(reader.GetOrdinal("ProductId")))
            {
                item.ProductId = BaseItem.InvalidId;
                item.ProductName = "";
            }
            else
            {
                item.ProductId = Convert.ToInt32(reader["ProductId"]);
                item.ProductName = Convert.ToString(reader["ProductName"]);
            }

            return item;
        }

        #endregion

    }
}
