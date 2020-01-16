using Stc.Graphics;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApiForEsm.Helpers;
using WebApiForEsm.Resources;

namespace WebApiForEsm.Controllers
{
    public class GraphController : ApiController
    {
        string path = Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("/"), "XmlSample.txt");

        [Route("GetSecurityQuestions/{culture}")]
        [HttpGet]
        public IEnumerable<string> GetSecurityQuestions(string culture)
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
            //   var s = EsmResource.GetString("Happy", "fr");
            // return new string[] { "value1", "value2" };
            if (culture == "fr") return dataF;
            else return dataE;
        }
        [Route("Thermometers/{userToken}/{culture}")]
        [HttpGet]
        public HttpResponseMessage GetThermometersWithBulletinImage(string userToken, string culture = "en")
        {
            var title0 = EsmResource.GetString("Feelings", culture);
            var title1 = EsmResource.GetString("Number of times you reported a value less than 4", culture);
            var title2 = EsmResource.GetString("Number of times you reported a value greater than 7", culture);
            var data = GetThermometerWithBulletinData(userToken, culture);
            Image img = StcGraphics.GetThermometersWithBulletinGraph2D(data, 410, 350, title0, 12, 12, title1, title2);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                var result = new HttpResponseMessage(HttpStatusCode.OK);
                result.Content = new ByteArrayContent(ms.ToArray());
                result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
                return result;
            }
        }
        [Route("Bulletin/{userToken}/{culture}")]
        [HttpGet]
        public HttpResponseMessage GetBulletinImage(string userToken, string culture = "en")
        {
            var title = EsmResource.GetString("Your Feelings with Other People", culture);
            var data = GetBulletinData(userToken, culture);
            Image img = StcGraphics.GetBulletinGraph2D(data, 410, 350, title, 12, true);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                var result = new HttpResponseMessage(HttpStatusCode.OK);
                result.Content = new ByteArrayContent(ms.ToArray());
                result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
                return result;
            }
        }
        [Route("ScalableBar/{userToken}/{culture}")]
        [HttpGet]
        public HttpResponseMessage GetScalableBarImage(string userToken, string culture = "en")
        {
            var title1 = EsmResource.GetString("Your Weekly Activity Breakdown", culture);
            var title2 = EsmResource.GetString("Number of times your selected this activity", culture);
            var data = GetBarData(userToken, culture);
            var setting = new ScalableBarGraphSetting { ChartTitle = title1, ChartTitleFontSize = 10, IsChartTitleHighlighted = true, LabelWidthRatio = 0.24F, ChartFontSize = 8, XAxisNotchCount = 5, XAxisDesc = title2 };
            Image img = StcGraphics.GetScalableBarGraph2D(data, 410, 350, setting);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                var result = new HttpResponseMessage(HttpStatusCode.OK);
                result.Content = new ByteArrayContent(ms.ToArray());
                result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
                return result;
            }
        }
        [Route("ScalableLine/{userToken}/{culture}")]
        [HttpGet]
        public HttpResponseMessage GetScalableLineImage(string userToken, string culture = "en")
        {
            var title1 = EsmResource.GetString("Your Feelings by Activity Type", culture);
            var title2 =EsmResource.GetString("ActivityType",culture);
            var title3 =EsmResource.GetString("Anverage Score",culture);
            var data = GetChartDataForScalableLine(userToken, culture);
            var setting = new ScalabelLineGraphSetting
            {
                ChartTitle = title1,
                ChartTitleFontSize = 8,
                ChartFontSize = 8,
                IsChartTitleHighlighted = true,
                LegendIcon = LegendIconType.Rectangle,
                XAxisTitle = title2,
                XAxisTitleFontSize = 8,
                YAxisTitle = title3,
                YAxisTitleFontSize = 8,
                NotchCount = 5
            };
            Image img = StcGraphics.GetScalableLineGraph2D(data, 410, 350, setting);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                var result = new HttpResponseMessage(HttpStatusCode.OK);
                result.Content = new ByteArrayContent(ms.ToArray());
                result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
                return result;
            }
        }
        [Route("Table/{userToken}/{culture}")]
        [HttpGet]
        public HttpResponseMessage GetTableImage(string userToken, string culture = "en")
        {
            var title = EsmResource.GetString("Your Feelings by Location", culture);
            var data = GetTableData(userToken, culture);
            Image img = StcGraphics.GetTableGraph2D(data, 400, 40, title, 6, true);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                var result = new HttpResponseMessage(HttpStatusCode.OK);
                result.Content = new ByteArrayContent(ms.ToArray());
                result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
                return result;
            }
        }

        [Route("Macaroni/{userToken}/{culture}")]
        [HttpGet]
        public HttpResponseMessage GetMacaroniImage(string userToken, string culture = "en")
        {
            var data = GetMacaroniData(userToken,culture);
            Image img = StcGraphics.GetMacaroniGraph2D(data, 12, 14, 0F, 10F, Color.Plum, Color.LightSeaGreen,true);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                var result = new HttpResponseMessage(HttpStatusCode.OK);
                result.Content = new ByteArrayContent(ms.ToArray());
                result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
                return result;
            }
        }

        [Route("MoodCount/{userToken}/{culture}")]
        [HttpGet]
        public HttpResponseMessage GetMoodCountImage(string userToken, string culture = "en")
        {
            var title = culture == "en" ? "Mood Count" : "Compte d'humeur";
            var data = GetEmotionCountData(userToken, culture);
            Image img = StcGraphics.GetHalfDoughnutWithEmojiLegendGraph2D(data, 500, 500, title, 18);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                var result = new HttpResponseMessage(HttpStatusCode.OK);
                result.Content = new ByteArrayContent(ms.ToArray());
                result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
                return result;
            }
        }



        private List<ThermometerExData> GetThermometerWithBulletinData(string userToken, string culture = "en", bool isTesting = false)
        {

            var s = CmpHelper.GetCmpData(userToken, culture, path);         
            return new List<ThermometerExData> {
                    new ThermometerExData{ Label=EsmResource.GetString("Happy", culture), Color=Color.LightGreen, Value=s.feeling.happy.average, ExtraHigh =s.feeling.happy.timesAbove7,ExtraLow=s.feeling.happy.timesBelow4},
                    new ThermometerExData{ Label=EsmResource.GetString("Awake",culture), Color=Color.LightPink, Value=s.feeling.awake.average, ExtraHigh=s.feeling.awake.timesAbove7,ExtraLow=s.feeling.awake.timesBelow4},
                    new ThermometerExData{ Label=EsmResource.GetString("Relaxed",culture), Color=Color.LightSalmon, Value=s.feeling.relaxed.average, ExtraHigh=s.feeling.relaxed.timesAbove7,ExtraLow=s.feeling.relaxed.timesBelow4},
                    new ThermometerExData{ Label=EsmResource.GetString("InControl",culture), Color=Color.LightSkyBlue, Value=s.feeling.inControl.average, ExtraHigh=s.feeling.inControl.timesAbove7,ExtraLow=s.feeling.inControl.timesBelow4},
                    new ThermometerExData{ Label=EsmResource.GetString("Anxious",culture), Color=Color.LightPink, Value=s.feeling.anxious.average, ExtraHigh=s.feeling.anxious.timesAbove7,ExtraLow=s.feeling.anxious.timesBelow4}
                };
        }
        private List<BulletinData> GetBulletinData(string userToken, string culture = "en", bool isTesting = false)
        {
            var s = CmpHelper.GetCmpData(userToken, culture, path);
            return new List<BulletinData> {
                new BulletinData{ Label=EsmResource.GetString("Feeling Happy",culture), Color=Color.LightCoral, Data=new List<KeyValuePair<string, float>>{new KeyValuePair<string, float>(EsmResource.GetString("While With Friend", culture),s.feelingWithOthers.happy.withFriends),new KeyValuePair<string, float>(EsmResource.GetString("While Alone",culture), s.feelingWithOthers.happy.whileAlone),new KeyValuePair<string, float>(EsmResource.GetString("While With Family", culture), s.feelingWithOthers.happy.withFamily)}},
                new BulletinData{ Label=EsmResource.GetString("Feeling Relaxed",culture), Color=Color.LightGreen, Data=new List<KeyValuePair<string, float>>{new KeyValuePair<string, float>(EsmResource.GetString("While With Friend", culture), s.feelingWithOthers.relaxed.withFriends),new KeyValuePair<string, float>(EsmResource.GetString("While Alone", culture), s.feelingWithOthers.relaxed.whileAlone),new KeyValuePair<string, float>(EsmResource.GetString("While With Family", culture), s.feelingWithOthers.relaxed.withFamily)}},
                new BulletinData{ Label=EsmResource.GetString("Feeling In Control",culture), Color=Color.LightSeaGreen, Data=new List<KeyValuePair<string, float>>{new KeyValuePair<string, float>(EsmResource.GetString("While With Friend", culture), s.feelingWithOthers.inControl.withFriends),new KeyValuePair<string, float>(EsmResource.GetString("While Alone", culture), s.feelingWithOthers.inControl.whileAlone),new KeyValuePair<string, float>(EsmResource.GetString("While With Family", culture), s.feelingWithOthers.inControl.withFamily) }},
                new BulletinData{ Label=EsmResource.GetString("Feeling Anxious",culture), Color=Color.LightPink, Data=new List<KeyValuePair<string, float>>{new KeyValuePair<string, float>(EsmResource.GetString("While With Friend", culture), s.feelingWithOthers.anxious.withFriends),new KeyValuePair<string, float>(EsmResource.GetString("While Alone", culture), s.feelingWithOthers.anxious.whileAlone),new KeyValuePair<string, float>(EsmResource.GetString("While With Family", culture), s.feelingWithOthers.anxious.withFamily) }},
            };
        }
        private List<BarDataSingle> GetBarData(string userToken, string culture = "en", bool isTesting = false)
        {
            Color[] Colors = { Color.Aqua, Color.LightCyan, Color.LightPink, Color.Aquamarine, Color.Azure, Color.Beige, Color.Blue, Color.Red, Color.ForestGreen, Color.LightGoldenrodYellow, Color.Gold,Color.LightCyan,Color.LightPink };
            var s = CmpHelper.GetCmpData(userToken, culture, path);
            var list = (from a in s.feelingByActivity select new BarDataSingle { Label=a.what, Value=a.numberSelected,Color=Colors[s.feelingByActivity.IndexOf(a)] }).ToList();
            //return new List<BarDataSingle> {
            //    new BarDataSingle{ Label="Media Consumption", Color=Color.Aqua, Value=8},
            //    new BarDataSingle{ Label="Attending a ciname,exhibition,libray,concert,Theretre,entertainment event", Color=Color.Aquamarine, Value=6},
            //    new BarDataSingle{ Label="Creative Hobbies", Color=Color.Azure, Value=5},
            //    new BarDataSingle{ Label="Being Active", Color=Color.Beige, Value=2},
            //    new BarDataSingle{ Label="Socializing", Color=Color.Blue, Value=4},
            //    new BarDataSingle{ Label="Chores", Color=Color.Red, Value=7},
            //    new BarDataSingle{ Label="Other", Color=Color.ForestGreen, Value=1},
            //    new BarDataSingle{ Label="Work and school", Color=Color.LightGoldenrodYellow, Value=3},
            //    new BarDataSingle{ Label="Personal care", Color=Color.Gold, Value=4},
            //};
            return list;
        }
        private List<GridChartData> GetChartDataForScalableLine(string userToken, string culture = "en", bool isTesting = false)
        {
            var s = CmpHelper.GetCmpData(userToken, culture, path);
            return new List<GridChartData>
            {
                 new GridChartData
                 {
                      RowHeader=new Legend{ Text=EsmResource.GetString("Feeling Happy",culture), Color=Color.Green},
                      //Columns=new List<ColumnData>
                      //{
                      //    new ColumnData{ ColumnHeader="Chores", Value=2.3},
                      //    new ColumnData{ ColumnHeader="Personal Care", Value=1.4},
                      //    new ColumnData{ ColumnHeader="Creative Hobbies", Value=3.4},
                      //    new ColumnData{ ColumnHeader="Work and School", Value=2.8},
                      //    new ColumnData{ ColumnHeader="Going to Places and Events",Value=8.4},
                      //    new ColumnData{ ColumnHeader="Socializing", Value=4.1},
                      //    new ColumnData{ColumnHeader="Being Active", Value=5.2},
                      //    new ColumnData{ColumnHeader="Media Consumption",Value=3.7},
                      //    new ColumnData{ColumnHeader="Other",Value=7.4}
                      //}
                      Columns=(from a in s.feelingByActivity select new ColumnData{ ColumnHeader=a.what, Value=a.happy }).ToList()
                 },
                 new GridChartData
                 {
                      RowHeader=new Legend{ Text=EsmResource.GetString("Feeling Relax",culture), Color=Color.BlueViolet},
                      //Columns=new List<ColumnData>
                      //{
                      //    new ColumnData{ ColumnHeader="Chores", Value=3.3},
                      //    new ColumnData{ ColumnHeader="Personal Care", Value=4.4},
                      //    new ColumnData{ ColumnHeader="Creative Hobbies", Value=5.4},
                      //    new ColumnData{ ColumnHeader="Work and School", Value=1.0},
                      //    new ColumnData{ ColumnHeader="Going to Places and Events",Value=2.4},
                      //    new ColumnData{ ColumnHeader="Socializing", Value=6.1},
                      //    new ColumnData{ColumnHeader="Being Active", Value=7.2},
                      //    new ColumnData{ColumnHeader="Media Consumption",Value=8.8},
                      //    new ColumnData{ColumnHeader="Other",Value=9.4}
                      //}
                        Columns=(from a in s.feelingByActivity select new ColumnData{ ColumnHeader=a.what, Value=a.relaxed }).ToList()
                 },
                 new GridChartData
                 {
                      RowHeader=new Legend{ Text=EsmResource.GetString("Feeling Anxious",culture), Color=Color.Red},
                      //Columns=new List<ColumnData>
                      //{
                      //    new ColumnData{ ColumnHeader="Chores", Value=7.3},
                      //    new ColumnData{ ColumnHeader="Personal Care", Value=8.4},
                      //    new ColumnData{ ColumnHeader="Creative Hobbies", Value=6.4},
                      //    new ColumnData{ ColumnHeader="Work and School", Value=5.2},
                      //    new ColumnData{ ColumnHeader="Going to Places and Events",Value=4.4},
                      //    new ColumnData{ ColumnHeader="Socializing", Value=3.1},
                      //    new ColumnData{ColumnHeader="Being Active", Value=2.2},
                      //    new ColumnData{ColumnHeader="Media Consumption",Value=1.8},
                      //    new ColumnData{ColumnHeader="Other",Value=2.4}
                      //}
                        Columns=(from a in s.feelingByActivity select new ColumnData{ ColumnHeader=a.what, Value=a.anxious }).ToList()
                 }
            };
        }
        private TableData GetTableData(string userToken, string culture = "en", bool isTesting = false)
        {
            var s = CmpHelper.GetCmpData(userToken, culture, path);
            var list = new List<TableRow>(); var list1 = new List<string>();
            foreach (var l in s.feelingByLocation)
            {
                list1.Add(l.where); list1.Add(l.happy.ToString()); list1.Add(l.relaxed.ToString()); list1.Add(l.awake.ToString()); list1.Add(l.inControl.ToString()); list1.Add(l.anxious.ToString());
                list.Add(new TableRow { Cells = list1 });list1 = new List<string>();
            }
      
            return new TableData
            {
                Header = new List<TableHeader> {
                    new TableHeader{ Text=EsmResource.GetString("Location",culture), Alignment=CellAlignment.Left, WidthRatio=0.3F},
                    new TableHeader{ Text=EsmResource.GetString("Happy",culture) },new TableHeader{ Text=EsmResource.GetString("Relaxed",culture) },new TableHeader{ Text=EsmResource.GetString("Awake",culture) },new TableHeader{ Text=EsmResource.GetString("InControl",culture) },new TableHeader{ Text=EsmResource.GetString("Anxious",culture) }
                 },
                //Rows = new List<TableRow> {
                //    new TableRow{ Cells=new List<string>{ "Sports center,community center,field or arena", "5.73","5.55", "5.73", "5.55","4.64" } },
                //    new TableRow{Cells= new List<string> { "Restaurant, bar or club", "5.73", "5.55", "5.73", "5.55", "4.64" } },
                //    new TableRow{Cells=new List<string> { "Place of worship", "5.73","5.55", "5.73", "5.55","4.64" }},
                //    new TableRow{Cells=new List<string> { "Outdoors", "5.73","5.55", "5.73", "5.55","4.64" }},
                //    new TableRow{Cells=new List<string>{ "Medicl,dental or other health clinic", "5.73","5.55", "5.73", "5.55","4.64" }},
                //    new TableRow{Cells=new List<string> { "Other", "5.73","5.55", "5.73", "5.55","4.64" }}
                //}
                Rows=list
            };
        }
        private List<KeyValuePair<string, float>> GetMacaroniData(string userToken, string culture = "en", bool isTesting = false)
        {
            var s = CmpHelper.GetCmpData(userToken, culture, path);

            return new List<KeyValuePair<string, float>> {
               new KeyValuePair<string, float>("Your Happiness Score",s.feeling.happy.average),
               new KeyValuePair<string, float>("Your Relaxed Score",s.feeling.relaxed.average),
               new KeyValuePair<string, float>("Your Awake Score",s.feeling.awake.average),
               new KeyValuePair<string, float>("Your In Control Score",s.feeling.inControl.average),
               new KeyValuePair<string, float>("Your Anxious Score",s.feeling.anxious.average),
            };
        }

        private List<EmojiCountData> GetEmotionCountData(string userToken, string culture = "en")
        {
            return new List<EmojiCountData> {
                new EmojiCountData{ Emotion=EmotionType.Excellent,Count=1,Label="rad"},
                new EmojiCountData{ Emotion=EmotionType.VeryGood,Count=7,Label="good"},
                new EmojiCountData{ Emotion=EmotionType.Good,Count=2,Label="meh"},
                new EmojiCountData{ Emotion=EmotionType.Fair,Count=2,Label="tired"},
                new EmojiCountData{ Emotion=EmotionType.Poor,Count=1,Label="frustrated"},
            };
        }

    }
}
