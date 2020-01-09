using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApiForEsm.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        public ActionResult GetSecurityQuestions(string culture)
        {
            var dataE = new[] {
                "What is your name ?",
                "What is your age ?",
                "What is your movie ?",
                "What is your tv ?",
            };
            var dataF = new[] {
                "What is your name fr ?",
                "What is your age fr ?",
                "What is your movie fr ?",
                "What is your tv fr ?",
            };
            if (culture == "en") return Json(dataE, JsonRequestBehavior.AllowGet);
            else return Json(dataF, JsonRequestBehavior.AllowGet);
        }
    }
}
