using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VendingService;
using VendingService.Interfaces;
using VendingService.Models;
using VndrWebApi.Models;

namespace VndrWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IVendingService _db = null;

        public UserController(IVendingService db)
        {
            _db = db;
        }

        // GET api/user
        [HttpGet]
        public ActionResult<IEnumerable<UserItem>> Get()
        {
            return _db.GetUserItems();
        }

        // GET api/user/5
        [HttpGet("{id}")]
        public ActionResult<UserItem> Get(int id)
        {
            return _db.GetUserItem(id);
        }

        // POST api/user
        [HttpPost]
        public ActionResult<int> Post([FromBody] UserItemViewModel value)
        {
            PasswordManager passHelper = new PasswordManager(value.Password);
            UserItem user = new UserItem();
            user.FirstName = value.FirstName;
            user.LastName = value.LastName;
            user.Username = value.Username;
            user.Email = value.Email;
            user.Hash = passHelper.Hash;
            user.Salt = passHelper.Salt;
            user.RoleId = value.RoleId;

            return _db.AddUserItem(user);
        }

        // PUT api/user/5
        [HttpPut("{id}")]
        public ActionResult<bool> Put(int id, [FromBody] UserItemViewModel value)
        {
            PasswordManager passHelper = new PasswordManager(value.Password);
            UserItem user = new UserItem();
            user.Id = id;
            user.FirstName = value.FirstName;
            user.LastName = value.LastName;
            user.Username = value.Username;
            user.Email = value.Email;
            user.Hash = passHelper.Hash;
            user.Salt = passHelper.Salt;
            //user.RoleId = value.RoleId;
            return _db.UpdateUserItem(user);
        }

        // DELETE api/user/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _db.DeleteUserItem(id);
        }
    }
}