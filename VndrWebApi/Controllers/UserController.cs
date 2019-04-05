﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VendingService;
using VendingService.Exceptions;
using VendingService.Interfaces;
using VendingService.Models;
using VndrWebApi.Models;

namespace VndrWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : AuthController
    {
        public UserController(IVendingService db) : base(db)
        {
           
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
        public ActionResult<UserItem> Post([FromBody] UserItemViewModel value)
        {
            UserItem userItem = null;
            try
            {
                userItem = _db.GetUserItem(value.Username);
            }
            catch (Exception)
            {
            }

            if (userItem != null)
            {
                return NotFound();
            }
            PasswordManager passHelper = new PasswordManager(value.Password);
            UserItem user = new UserItem()
            {
              FirstName = value.FirstName,
              LastName = value.LastName,
              Username = value.Username,
              Email = value.Email,
              Hash = passHelper.Hash,
              Salt = passHelper.Salt,
              RoleId = value.RoleId
          };
            _db.AddUserItem(user);
            return user;
        }

        [HttpGet]
        //[Route("api/user/login")]
        public ActionResult<StatusViewModel> Login(LoginViewModel info)
        {
            StatusViewModel result = new StatusViewModel();

            try
            {
                LoginUser(info.UserName, info.Password);
            }
            catch(Exception ex)
            {
                result.IsSuccessful = false;
                result.Message = ex.Message;
            }

            return result;
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