using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiForEsm.Models
{
    public class ParaData1
    {
        public string name { get; set; }
        public string sex { get; set; }
        public override string ToString()
        {
            return name + "," + sex;
        }
    }
}