﻿using System;
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
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private IVendingService _db = null;

        public RoleController(IVendingService db)
        {
            _db = db;
        }

        // GET api/role
        [HttpGet]
        public ActionResult<IEnumerable<RoleItem>> Get()
        {
            return _db.GetRoleItems();
        }

        // GET api/role/5
        [HttpGet("{id}")]
        public ActionResult<RoleItem> Get(int id)
        {
            return _db.GetRoleItem(id);
        }

        // POST api/role
        [HttpPost]
        public ActionResult<int> Post([FromBody] RoleItemViewModel value)
        {
            RoleItem item = new RoleItem();
            item.Name = value.Name;
            item.Id = value.Id;
            return _db.AddRoleItem(item);
        }

        // PUT api/role/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] RoleItemViewModel value)
        {
            RoleItem item = new RoleItem();
            item.Id = id;
            item.Name = value.Name;
            _db.UpdateRoleItem(item);
        }

        // DELETE api/role/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _db.DeleteRoleItem(id);
        }
    }
}