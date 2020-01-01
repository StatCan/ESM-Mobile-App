using Stc.Graphics;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebDashboardApp.Services;

namespace WebDashboardApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            string path = Server.MapPath("XmlSample.txt");
            var s = CmpHelper.GetCmpData("111", "222", path);
            ViewBag.UserAgentStr = HttpContext.Request.UserAgent;
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
        public ActionResult GetThermometersWithBulletinImage()
        {
            var data = GetThermometerWithBulletinData();
            Image img = StcGraphics.GetThermometersWithBulletinGraph2D(data, 350, 350, "Feelings", 10, 10, "Number of times you reported a value less than 4:", "Number of times you reported a value greater than 7:");
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetBulletinImage()
        {
            var data = GetBulletinData();
            Image img = StcGraphics.GetBulletinGraph2D(data, 350, 350, "Your Feelings With Other People", 10, true);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetScalableBarImage()
        {
            var data = GetBarData();
            var setting = new ScalableBarGraphSetting { ChartTitle = "Your Weekly Activity Breakdown", ChartTitleFontSize = 10, IsChartTitleHighlighted = true, LabelWidthRatio = 0.24F, ChartFontSize = 8, XAxisNotchCount = 5, XAxisDesc = "Number of times your selected this activity" };
            Image img = StcGraphics.GetScalableBarGraph2D(data, 350, 40, setting);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetScalableLineImage()
        {
            var data = GetChartDataForScalableLine();
            var setting = new ScalabelLineGraphSetting
            {
                ChartTitle = "Your Feelings by Activity Type",
                ChartTitleFontSize = 8,
                ChartFontSize = 8,
                IsChartTitleHighlighted = true,
                LegendIcon = LegendIconType.Rectangle,
                XAxisTitle = "ActivityType",
                XAxisTitleFontSize = 8,
                YAxisTitle = "Anverage Score",
                YAxisTitleFontSize = 8,
                NotchCount = 5
            };
            Image img = StcGraphics.GetScalableLineGraph2D(data, 400, 40, setting);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetTableImage()
        {
            var data = GetTableData();
            Image img = StcGraphics.GetTableGraph2D(data, 400, 40, "Your Feeling by Location", 10, true);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
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
            if(culture =="en")return Json(dataE, JsonRequestBehavior.AllowGet);
            else return Json(dataF, JsonRequestBehavior.AllowGet);
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
        private List<ThermometerExData> GetThermometerWithBulletinData()
        {
            return new List<ThermometerExData> {
                new ThermometerExData{ Label="Happy", Color=Color.LightGreen, Value=4.5f, ExtraHigh=36,ExtraLow=63},
                new ThermometerExData{ Label="Awake", Color=Color.LightPink, Value=3.5f, ExtraHigh=39,ExtraLow=54},
                new ThermometerExData{ Label="Relaxed", Color=Color.LightSalmon, Value=6.5f, ExtraHigh=54,ExtraLow=47},
                new ThermometerExData{ Label="InControl", Color=Color.LightSkyBlue, Value=7.5f, ExtraHigh=43,ExtraLow=27},
                new ThermometerExData{ Label="Anxious", Color=Color.LightPink, Value=2.5f, ExtraHigh=37,ExtraLow=58}
            };
        }
        private List<BulletinData> GetBulletinData()
        {
            return new List<BulletinData> {
                new BulletinData{ Label="Feeling Happy", Color=Color.LightCoral, Data=new List<KeyValuePair<string, float>>{new KeyValuePair<string, float>("While With Friend",3.08F),new KeyValuePair<string, float>("While Alone",4.08F),new KeyValuePair<string, float>("While With Family",5.67F)}},
                new BulletinData{ Label="Feeling Relaxed", Color=Color.LightGreen, Data=new List<KeyValuePair<string, float>>{new KeyValuePair<string, float>("While With Friend",3.08F),new KeyValuePair<string, float>("While Alone",4.08F),new KeyValuePair<string, float>("While With Family",5.67F)}},
                new BulletinData{ Label="Feeling In Control", Color=Color.LightSeaGreen, Data=new List<KeyValuePair<string, float>>{new KeyValuePair<string, float>("While With Friend",3.08F),new KeyValuePair<string, float>("While Alone",4.08F),new KeyValuePair<string, float>("While With Family",5.67F)}},
                new BulletinData{ Label="Feeling Anxious", Color=Color.LightPink, Data=new List<KeyValuePair<string, float>>{new KeyValuePair<string, float>("While With Friend",3.08F),new KeyValuePair<string, float>("While Alone",4.08F),new KeyValuePair<string, float>("While With Family",5.67F)}},
            };
        }
        private List<BarDataSingle> GetBarData()
        {
            return new List<BarDataSingle> {
                new BarDataSingle{ Label="Media Consumption", Color=Color.Aqua, Value=8},
                new BarDataSingle{ Label="Attending a ciname,exhibition,libray,concert,Theretre,entertainment event", Color=Color.Aquamarine, Value=6},
                new BarDataSingle{ Label="Creative Hobbies", Color=Color.Azure, Value=5},
                new BarDataSingle{ Label="Being Active", Color=Color.Beige, Value=2},
                new BarDataSingle{ Label="Socializing", Color=Color.Blue, Value=4},
                new BarDataSingle{ Label="Chores", Color=Color.Red, Value=7},
                new BarDataSingle{ Label="Other", Color=Color.ForestGreen, Value=1},
                new BarDataSingle{ Label="Work and school", Color=Color.LightGoldenrodYellow, Value=3},
                new BarDataSingle{ Label="Personal care", Color=Color.Gold, Value=4},
            };
        }
        private List<GridChartData> GetChartDataForScalableLine()
        {
            return new List<GridChartData>
            {
                 new GridChartData
                 {
                      RowHeader=new Legend{ Text="Feeling Happy", Color=Color.Green},
                      Columns=new List<ColumnData>
                      {
                          new ColumnData{ ColumnHeader="Chores", Value=2.3},
                          new ColumnData{ ColumnHeader="Personal Care", Value=1.4},
                          new ColumnData{ ColumnHeader="Creative Hobbies", Value=3.4},
                          new ColumnData{ ColumnHeader="Work and School", Value=2.8},
                          new ColumnData{ ColumnHeader="Going to Places and Events",Value=8.4},
                          new ColumnData{ ColumnHeader="Socializing", Value=4.1},
                          new ColumnData{ColumnHeader="Being Active", Value=5.2},
                          new ColumnData{ColumnHeader="Media Consumption",Value=3.7},
                          new ColumnData{ColumnHeader="Other",Value=7.4}
                      }
                 },
                 new GridChartData
                 {
                      RowHeader=new Legend{ Text="Feeling Relax", Color=Color.BlueViolet},
                      Columns=new List<ColumnData>
                      {
                          new ColumnData{ ColumnHeader="Chores", Value=3.3},
                          new ColumnData{ ColumnHeader="Personal Care", Value=4.4},
                          new ColumnData{ ColumnHeader="Creative Hobbies", Value=5.4},
                          new ColumnData{ ColumnHeader="Work and School", Value=1.0},
                          new ColumnData{ ColumnHeader="Going to Places and Events",Value=2.4},
                          new ColumnData{ ColumnHeader="Socializing", Value=6.1},
                          new ColumnData{ColumnHeader="Being Active", Value=7.2},
                          new ColumnData{ColumnHeader="Media Consumption",Value=8.8},
                          new ColumnData{ColumnHeader="Other",Value=9.4}
                      }
                 },
                 new GridChartData
                 {
                      RowHeader=new Legend{ Text="Feeling Anxious", Color=Color.Red},
                      Columns=new List<ColumnData>
                      {
                          new ColumnData{ ColumnHeader="Chores", Value=7.3},
                          new ColumnData{ ColumnHeader="Personal Care", Value=8.4},
                          new ColumnData{ ColumnHeader="Creative Hobbies", Value=6.4},
                          new ColumnData{ ColumnHeader="Work and School", Value=5.2},
                          new ColumnData{ ColumnHeader="Going to Places and Events",Value=4.4},
                          new ColumnData{ ColumnHeader="Socializing", Value=3.1},
                          new ColumnData{ColumnHeader="Being Active", Value=2.2},
                          new ColumnData{ColumnHeader="Media Consumption",Value=1.8},
                          new ColumnData{ColumnHeader="Other",Value=2.4}
                      }
                 }
            };
        }
        private TableData GetTableData()
        {
            return new TableData
            {
                Header = new List<TableHeader> {
                    new TableHeader{ Text="Location", Alignment=CellAlignment.Left, WidthRatio=0.3F},
                    new TableHeader{ Text="Happy" },new TableHeader{ Text="Relaxed" },new TableHeader{ Text="Awake" },new TableHeader{ Text="In Control" },new TableHeader{ Text="Anxious" }
                 },
                Rows = new List<TableRow> {
                    new TableRow{ Cells=new List<string>{ "Sports center,community center,field or arena", "5.73","5.55", "5.73", "5.55","4.64" } },
                    new TableRow{Cells= new List<string> { "Restaurant, bar or club", "5.73", "5.55", "5.73", "5.55", "4.64" } },
                    new TableRow{Cells=new List<string> { "Place of worship", "5.73","5.55", "5.73", "5.55","4.64" }},
                    new TableRow{Cells=new List<string> { "Outdoors", "5.73","5.55", "5.73", "5.55","4.64" }},
                    new TableRow{Cells=new List<string>{ "Medicl,dental or other health clinic", "5.73","5.55", "5.73", "5.55","4.64" }},
                    new TableRow{Cells=new List<string> { "Other", "5.73","5.55", "5.73", "5.55","4.64" }}
                }
            };
        }
    }
}