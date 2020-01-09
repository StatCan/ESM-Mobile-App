using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDashboardApp.Models
{
    //public class EsmModel
    //{
    //    public int Id { get; set; }
    //    public Questionnair Questionnair { get; set; }
    //    public List<Choice> Options { get; set; }
    //    public Answer Answer { get; set; }
    //}

    public class OtherModel
    {
        public string UserToken { get; set; }
        public string Culture { get; set; }
        public bool IsTesting { get; set; }
    }
}