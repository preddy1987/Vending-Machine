using System;
using Microsoft.AspNetCore.Mvc;
using SessionControllerData;
using VendingService;
using VendingService.Exceptions;
using VendingService.Interfaces;
using VendingService.Models;

namespace VndrWebApi.Controllers
{
    public class AuthController : SessionController
    {
        /// <summary>
        /// Manages the user authentication and authorization
        /// </summary>
        private RoleManager _roleMgr = null;
        protected IVendingService _db = null;

        public AuthController(IVendingService db)
        {
            _db = db;
        }

        /// <summary>
        /// The current logged in user of the vending machine
        /// </summary>
        public UserItem CurrentUser
        {
            get
            {
                return _roleMgr.User;
            }
        }

        /// <summary>
        /// RoleManager used to validate user permissions and have access to the current user information
        /// </summary>
        public RoleManager Role
        {
            get
            {
                return _roleMgr;
            }
        }

        /// <summary>
        /// Returns true if the vending machine has an authenticated user
        /// </summary>
        public bool IsAuthenticated
        {
            get
            {
                return _roleMgr.User != null;
            }
        }

        /// <summary>
        /// Adds a new user to the vending machine system
        /// </summary>
        /// <param name="userModel">Model that contains all the user information</param>
        public void RegisterUser(User userModel)
        {
            UserItem userItem = null;
            try
            {
                userItem = _db.GetUserItem(userModel.Username);
            }
            catch (Exception)
            {
            }

            if (userItem != null)
            {
                throw new UserExistsException("The username is already taken.");
            }

            if (userModel.Password != userModel.ConfirmPassword)
            {
                throw new PasswordMatchException("The password and confirm password do not match.");
            }

            PasswordManager passHelper = new PasswordManager(userModel.Password);
            UserItem newUser = new UserItem()
            {
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                Email = userModel.Email,
                Username = userModel.Username,
                Salt = passHelper.Salt,
                Hash = passHelper.Hash,
                RoleId = (int)RoleManager.eRole.Customer
            };

            _db.AddUserItem(newUser);
            LoginUser(newUser.Username, userModel.Password);
        }

        /// <summary>
        /// Logs a user into the vending machine system and throws exceptions on any failures
        /// </summary>
        /// <param name="username">The username of the user to authenicate</param>
        /// <param name="password">The password of the user to authenicate</param>
        public void LoginUser(string username, string password)
        {
            UserItem user = null;

            try
            {
                user = _db.GetUserItem(username);
            }
            catch (Exception)
            {
                throw new Exception("Either the username or the password is invalid.");
            }

            PasswordManager passHelper = new PasswordManager(password, user.Salt);
            if (!passHelper.Verify(user.Hash))
            {
                throw new Exception("Either the username or the password is invalid.");
            }

            _roleMgr = new RoleManager(user);
        }

        /// <summary>
        /// Logs the current user out of the vending machine system
        /// </summary>
        public void LogoutUser()
        {
            _roleMgr = new RoleManager(null);
        }

        public ActionResult GetAuthenticatedView(string viewName, object model = null)
        {
            ActionResult result = null;
            if (IsAuthenticated)
            {
                result = View(viewName, model);
            }
            else
            {
                result = RedirectToAction("Login", "User");
            }
            return result;
        }

        public JsonResult GetAuthenticatedJson(JsonResult json, bool hasPermission)
        {
            JsonResult result = null;
            if (!hasPermission && IsAuthenticated)
            {
                result = Json(new { error = "User is not permitted to access this data." });
            }
            else if (IsAuthenticated)
            {
                result = json;
            }
            else
            {
                result = Json(new { error = "User is not authenticated." });
            }
            return result;
        }
    }
}
