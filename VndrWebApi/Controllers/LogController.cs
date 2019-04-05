using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VendingService.Interfaces;
using VendingService.Models;
using VndrWebApi.Models;

namespace VndrWebApi.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class LogController : AuthController
    {
        #region Member Variables
        private ILogService _loggingDAO = null;
        #endregion

        #region Constructors

        public LogController(ILogService loggingDAO, IVendingService db, IHttpContextAccessor httpContext) : base(db, httpContext)
        {
            _loggingDAO = loggingDAO;
        }

        #endregion
        // GET api/log
        [HttpGet]
        [Route("api/log/getall")]
        public ActionResult<IEnumerable<VendingOperation>> Get()
        {
            var result = Json((List<VendingOperation>)_loggingDAO.GetLogData());
            return GetAuthenticatedJson(result, Role.IsExecutive);
        }

        // GET api/log/
        [HttpGet]
        [Route("api/log/getrange")]
        public ActionResult<IEnumerable<VendingOperation>> GetRange(DateTime fromLogDateTime, DateTime toLogDateTime)
        {
            //DateTime fromDate = logDates.FromLogDateTime;
            //DateTime toDate = logDates.ToLogDateTime;
            var result = Json((List<VendingOperation>)_loggingDAO.GetLogData(fromLogDateTime,  toLogDateTime));
            return GetAuthenticatedJson(result, Role.IsExecutive);
            //return null;
        }

        // POST api/log
        [HttpPost]
        [Route("api/log/add")]
        public void Post([FromBody] LogAddViewModel logOp)
        {
            VendingOperation vendOp = new VendingOperation();
            vendOp.OperationType = (VendingOperation.eOperationType)logOp.OperationType;
            vendOp.Price = logOp.Price;
            vendOp.TimeStamp = logOp.TimeStamp;
            vendOp.UserId = logOp.UserId;
            if (logOp.OperationType == LogAddViewModel.eOperationType.PurchaseItem)
            {
                vendOp.ProductId = logOp.ProductId;
            }

            _loggingDAO.LogOperation(vendOp);
        }
    }
}