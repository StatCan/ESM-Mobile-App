using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebDashboardApp.Models
{
    public class EsmContext:DbContext
    {
        public EsmContext() : base("EsmContext") { }      
        public DbSet<Choice> Options { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Questionnair> Questionnairs { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}