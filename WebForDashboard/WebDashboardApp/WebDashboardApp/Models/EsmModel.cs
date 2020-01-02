using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDashboardApp.Models
{
    public class EsmModel
    {
        public int Id { get; set; }
        public Questionnair Questionnair { get; set; }
        public List<Choice> Options { get; set; }
        public Answer Answer { get; set; }
    }
}