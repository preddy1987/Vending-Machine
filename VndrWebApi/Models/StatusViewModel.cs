﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VndrWebApi.Models
{
    public class StatusViewModel
    {
        public string Message { get; set; }
        public bool IsSuccessful { get; set; } = true;
    }
}
