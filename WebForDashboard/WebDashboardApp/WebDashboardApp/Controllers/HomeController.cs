using Stc.Graphics;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebDashboardApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetMoodCountImage()
        {
            var data = GetEmotionCountData();
            Image img = StcGraphics.GetHalfDoughnutWithEmojiLegendGraph2D(data, 500, 500, "Mood Count", 18);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetMoodWeeklyImage()
        {
            var data = GetEmotionWeeklyData();
            Image img = StcGraphics.GetColumnWithEmojiLegendGraph2D(data, 500, 500, "Mood Count", 18);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetActivityCountImage()
        {
            var data = GetActivityData();
            Image img = StcGraphics.GetEmojiListGraph2D(data, 500, 500, "Activity Count", 18);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        private List<EmojiCountData> GetEmotionCountData()
        {
            return new List<EmojiCountData> {
                new EmojiCountData{ Emotion=EmotionType.Excellent,Count=1,Label="rad"},
                new EmojiCountData{ Emotion=EmotionType.VeryGood,Count=7,Label="good"},
                new EmojiCountData{ Emotion=EmotionType.Good,Count=2,Label="meh"},
                new EmojiCountData{ Emotion=EmotionType.Fair,Count=2,Label="tired"},
                new EmojiCountData{ Emotion=EmotionType.Poor,Count=1,Label="frustrated"},
            };
        }
        private List<EmojiWeekData> GetEmotionWeeklyData()
        {
            var list = new List<EmojiWeekData> {
                new EmojiWeekData{ WeekDay=WeekDay.Sun,WeekDayLabel="Sun", Value=0.7F, Group=EmojiWeekGroup.Individual,GroupLabel="Individual"},
                new EmojiWeekData{ WeekDay=WeekDay.Mon,WeekDayLabel="Mon", Value=1.7F,Group=EmojiWeekGroup.Individual,GroupLabel="Individual"},
                new EmojiWeekData{ WeekDay=WeekDay.Tue,WeekDayLabel="Tue", Value=2.7F,Group=EmojiWeekGroup.Individual,GroupLabel="Individual" },
                new EmojiWeekData{ WeekDay=WeekDay.Wed,WeekDayLabel="Wed", Value=3.3F,Group=EmojiWeekGroup.Individual,GroupLabel="Individual"},
                new EmojiWeekData{ WeekDay=WeekDay.Thu,WeekDayLabel="Thu", Value=4.7F,Group=EmojiWeekGroup.Individual,GroupLabel="Individual"},
                new EmojiWeekData{ WeekDay=WeekDay.Fri,WeekDayLabel="Fri", Value=2.5F,Group=EmojiWeekGroup.Individual,GroupLabel="Individual"},
                new EmojiWeekData{ WeekDay=WeekDay.Sat,WeekDayLabel="Sat", Value=3.5F,Group=EmojiWeekGroup.Individual,GroupLabel="Individual"},
                new EmojiWeekData{ WeekDay=WeekDay.Sun,WeekDayLabel="Sun", Value=1.7F, Group=EmojiWeekGroup.Average,GroupLabel="Average"},
                new EmojiWeekData{ WeekDay=WeekDay.Mon,WeekDayLabel="Mon", Value=2.7F,Group=EmojiWeekGroup.Average,GroupLabel="Average"},
                new EmojiWeekData{ WeekDay=WeekDay.Tue,WeekDayLabel="Tue", Value=3.7F,Group=EmojiWeekGroup.Average,GroupLabel="Average" },
                new EmojiWeekData{ WeekDay=WeekDay.Wed,WeekDayLabel="Wed", Value=4.3F,Group=EmojiWeekGroup.Average,GroupLabel="Average"},
                new EmojiWeekData{ WeekDay=WeekDay.Thu,WeekDayLabel="Thu", Value=1.7F,Group=EmojiWeekGroup.Average,GroupLabel="Average"},
                new EmojiWeekData{ WeekDay=WeekDay.Fri,WeekDayLabel="Fri", Value=3.5F,Group=EmojiWeekGroup.Average,GroupLabel="Average"},
                new EmojiWeekData{ WeekDay=WeekDay.Sat,WeekDayLabel="Sat", Value=2.5F,Group=EmojiWeekGroup.Average,GroupLabel="Average"},
            };
            foreach (var l in list)
            {
                l.Emotion = (EmotionType)Math.Ceiling(l.Value);
            }
            return list;
        }
        private List<EmojiCustomData> GetActivityData()
        {
            return new List<EmojiCustomData> {
                new EmojiCustomData{ Label="work",Count=4, EmojiChar="🔨"},
                new EmojiCustomData{ Label="family",Count=2, EmojiChar="👪"},
                new EmojiCustomData{ Label="gaming",Count=2, EmojiChar="🎲"},
                new EmojiCustomData{ Label="school",Count=3, EmojiChar="⛩"},
                new EmojiCustomData{ Label="study",Count=1, EmojiChar="🖍"},
                new EmojiCustomData{ Label="relax",Count=4, EmojiChar="💤"},
                new EmojiCustomData{ Label="friend",Count=1, EmojiChar="👯"},
                new EmojiCustomData{ Label="restaurant",Count=2, EmojiChar="🍽"},
                new EmojiCustomData{ Label="transit",Count=3, EmojiChar="🚕"},
            };
        }
    }
}