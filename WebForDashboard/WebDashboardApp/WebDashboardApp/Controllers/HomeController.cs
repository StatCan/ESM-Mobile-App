﻿using Stc.Graphics;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebDashboardApp.Models;
using WebDashboardApp.Services;

namespace WebDashboardApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ConductSurvey(string userToken, string notificationId, string culture = "en")
        {
            var context = new EsmContext();
            var aCount = context.Answers.Count(x => x.RespondentKey == userToken && x.SurveyType==(int)SurveyType.QuestionnaireA);
            var bCount = 0;var supportCount = context.Answers.Count(x => x.RespondentKey == userToken && x.SurveyType ==(int)SurveyType.Supportive);
            if (string.IsNullOrEmpty(notificationId)) notificationId = DateTime.Now.ToString();
            else bCount = context.Answers.Count(x => x.RespondentKey == userToken && x.NotificationId == notificationId && x.SurveyType ==(int)SurveyType.QuestionnairB);
            var question = new Questionnair();string percentage = "";
            if (aCount < 11) {
                percentage = $"({Math.Round((double)(aCount+1)/(11+9)*100)}%)";
                question = context.Questionnairs.Where(x => x.SurveyType == SurveyType.QuestionnaireA).OrderBy(x => x.QuestionnairId).Skip(aCount).FirstOrDefault();
            }
            else if (bCount < 9) {
                percentage = $"({Math.Round((double)(aCount +bCount+ 1) / (11 + 9)*100)}%)";
                question = context.Questionnairs.Where(x => x.SurveyType == SurveyType.QuestionnairB).OrderBy(x => x.QuestionnairId).Skip(bCount).FirstOrDefault();
            }
            else if (supportCount < 3)
            {
                percentage = $"(100%+Extra:{Math.Round((double)(supportCount + 1) /3*100)}%)";
                question = context.Questionnairs.Where(x => x.SurveyType == SurveyType.Supportive).OrderBy(x => x.QuestionnairId).Skip(supportCount).FirstOrDefault();
            }
            var model = new QuestionModel { UserToken = userToken, NotificationId = notificationId, Culture = culture };
            if (question == null) { model.Message = culture == "fr" ? "Vous avez fait l'enquête pour cette fois, merci" : "You have done the survey for this time, Thanks"; model.QuestionnairId = 0; }
            else
            {
                model.Type = (int)question.QuestionType; model.HelpDesc =culture=="fr"?question.HelpDescFre: question.HelpDescEng;
                question.Choices = context.Options.Where(x => x.QuestionnairId == question.QuestionnairId).ToList();
                model.Text = culture == "en" ? question.EnglishName : question.FrenchName; model.QuestionnairId = question.QuestionnairId;
                model.Choices = (from c in question.Choices select new ChoiceModel { ChoiceId = c.ChoiceId, IsUserInput = c.IsUserInput, Text = culture == "en" ? c.EnglishName : c.FrenchName }).ToList();
                model.Percentage = percentage;
            }
            return View(model);
        }
        [HttpPost]
        public ActionResult SaveSurvey(string userToken, string notificationId, int questionId, int answerId,string answerIdStr="",  string userInput = "", string culture = "en")
        {
            var context = new EsmContext();var isOtherInput = false;
            if (answerIdStr.EndsWith(",")) answerIdStr = answerIdStr.Substring(0,answerIdStr.Length - 1); if (userInput.EndsWith(",")) userInput = userInput.Substring(0, userInput.Length - 1);
            var q = context.Questionnairs.First(x => x.QuestionnairId == questionId);//q never be null
            var answer = new Answer { RespondentKey = userToken, NotificationId = notificationId, QuestionnairId = questionId, ChoiceId = answerId, ResponseDate = DateTime.Now};

            switch (q.QuestionType)
            {
                case QuestionType.MultipleChoice:
                    //do something later
                    break;
                case QuestionType.MultipleChoiceWithOtherInput:
                    var multipleChoices =(from s in answerIdStr.Split(',') select int.Parse(s)).ToList();
                    //do something later
                    break;
                case QuestionType.MultiInput:
                    //do something later
                    break;
                default:
                    //do something later
                    break;
            }
           
            if (answerId != 0) isOtherInput = context.Options.First(x => x.ChoiceId == answerId).IsUserInput; if (!isOtherInput) userInput = "";
            int surveyType = 1; if (q != null) surveyType = (int)q.SurveyType;
            answer.ChoicesIdStr = answerIdStr;answer.ChoiceId = answerId;answer.SurveyType =(int)q.SurveyType;
            answer.TheUserInputAnswer = userInput;
            context.Answers.Add(answer);
            context.SaveChanges();
            return RedirectToAction("ConductSurvey", new { userToken = userToken, notificationId = notificationId, culture = culture });
        }
        public ActionResult RemoveRespondant()
        {
            return View();
        }
        [HttpPost]
        public ActionResult RemoveRespondant(string userToken)
        {
            var context = new EsmContext();
            var list = context.Answers.Where(x => x.RespondentKey == userToken).ToList();
            context.Answers.RemoveRange(list);context.SaveChanges();
            return View();
        }
        public ActionResult DisplayResult()
        {
            return View();
        }
        [HttpPost]
        public ActionResult DisplayResult(string userToken,string culture)
        {
            return RedirectToAction("ShowImages", new { userToken = userToken, culture = culture,isTesting=true });//
        }
        public ActionResult ShowImages(string userToken, string culture,bool isTesting=false)
        {
            //isTesting = true;//for test only
            var m = new OtherModel { Culture = culture, UserToken = userToken,IsTesting=isTesting };
            //string path = Server.MapPath("XmlSample.txt");
            //var s = CmpHelper.GetCmpData("111", "222", path);
            //ViewBag.UserAgentStr = HttpContext.Request.UserAgent;
            return View(m);
        }
        public ActionResult GetMoodCountImage(string userToken, string culture = "en", bool isTesting = false)
        {
            var title = culture == "en" ? "Mood Count" : "Compte d'humeur";
            var data = GetEmotionCountData(userToken,culture,isTesting);
            Image img = StcGraphics.GetHalfDoughnutWithEmojiLegendGraph2D(data, 500, 500, title, 18);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetMoodWeeklyImage(string userToken, string culture = "en", bool isTesting = false)
        {
            var title = culture == "en" ? "Mood Count" : "Compte d'humeur";
            var data = GetEmotionWeeklyData(userToken, culture, isTesting);
            Image img = StcGraphics.GetColumnWithEmojiLegendGraph2D(data, 500, 500,title, 18);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetActivityCountImage(string userToken, string culture = "en", bool isTesting = false)
        {
            var title = culture == "en" ? "Activity Count" : "Nombre d'activités";
            var data = GetActivityData(userToken, culture, isTesting);
            Image img = StcGraphics.GetEmojiListGraph2D(data, 500, 500, "Activity Count", 18);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetThermometersWithBulletinImage(string userToken, string culture="en", bool isTesting = false)
        {
            var title0 = culture == "en" ? "Feelings" : "Sentiments";
            var title1 = culture == "en" ? "Number of times you reported a value less than 4:" : "Nombre de fois où vous avez signalé une valeur inférieure à 4:";
            var title2 = culture == "en" ? "Number of times you reported a value greater than 7:" : "Nombre de fois où vous avez signalé une valeur supérieure à 7:";
            var data = GetThermometerWithBulletinData(userToken, culture, isTesting);
            Image img = StcGraphics.GetThermometersWithBulletinGraph2D(data, 350, 350, title0, 10, 10,title1,title2);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetBulletinImage(string userToken, string culture = "en", bool isTesting = false)
        {
            var title = culture == "en" ? "Your Feelings With Other People" : "Vos sentiments avec d'autres personnes";
            var data = GetBulletinData(userToken, culture, isTesting);
            Image img = StcGraphics.GetBulletinGraph2D(data, 350, 350, title, 10, true);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetScalableBarImage(string userToken, string culture = "en", bool isTesting = false)
        {
            var title1 = culture == "en" ? "Your Weekly Activity Breakdown" : "Votre répartition d'activité hebdomadaire";
            var title2 = culture == "en" ? "Number of times your selected this activity" : "Nombre de fois où vous avez sélectionné cette activité";
            var data = GetBarData(userToken, culture, isTesting);
            var setting = new ScalableBarGraphSetting { ChartTitle = title1, ChartTitleFontSize = 10, IsChartTitleHighlighted = true, LabelWidthRatio = 0.24F, ChartFontSize = 8, XAxisNotchCount = 5, XAxisDesc =title2};
            Image img = StcGraphics.GetScalableBarGraph2D(data, 350, 40, setting);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetScalableLineImage(string userToken, string culture = "en", bool isTesting = false)
        {
            var title1 = culture == "en" ? "Your Feelings by Activity Type" : "Vos sentiments par type d'activité";
            var title2 = culture == "en" ? "ActivityType" : "Type d'activité";
            var title3 = culture == "en" ? "Anverage Score" : "Score moyen";
            var data = GetChartDataForScalableLine(userToken, culture, isTesting);
            var setting = new ScalabelLineGraphSetting
            {
                ChartTitle = title1,
                ChartTitleFontSize = 8,
                ChartFontSize = 8,
                IsChartTitleHighlighted = true,
                LegendIcon = LegendIconType.Rectangle,
                XAxisTitle =title2,
                XAxisTitleFontSize = 8,
                YAxisTitle = title3,
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
        public ActionResult GetTableImage(string userToken, string culture = "en", bool isTesting = false)
        {
            var title = culture == "en" ? "Your Feeling by Location" : "Votre sentiment par emplacement";
            var data = GetTableData(userToken, culture, isTesting);
            Image img = StcGraphics.GetTableGraph2D(data, 400, 40, title, 10, true);
            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Jpeg);
                return File(ms.ToArray(), "image/jpeg");
            }
        }
        public ActionResult GetMacaroniImage()
        {
            var data = GetMacaroniData();
            Image img = StcGraphics.GetMacaroniGraph2D(data, 12, 14, 0F, 10F, Color.Plum, Color.LightSeaGreen,true);
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
        private List<EmojiCountData> GetEmotionCountData(string userToken, string culture = "en", bool isTesting = false)
        {
            return new List<EmojiCountData> {
                new EmojiCountData{ Emotion=EmotionType.Excellent,Count=1,Label="rad"},
                new EmojiCountData{ Emotion=EmotionType.VeryGood,Count=7,Label="good"},
                new EmojiCountData{ Emotion=EmotionType.Good,Count=2,Label="meh"},
                new EmojiCountData{ Emotion=EmotionType.Fair,Count=2,Label="tired"},
                new EmojiCountData{ Emotion=EmotionType.Poor,Count=1,Label="frustrated"},
            };
        }
        private List<EmojiWeekData> GetEmotionWeeklyData(string userToken, string culture = "en", bool isTesting = false)
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
        private List<EmojiCustomData> GetActivityData(string userToken, string culture = "en", bool isTesting = false)
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
        private List<ThermometerExData> GetThermometerWithBulletinData(string userToken, string culture = "en", bool isTesting = false)
        {
            float hv = 4.5f, av = 3.5f, rv = 6.5f, iv = 7.5f, xv = 2.5f;
            if (isTesting)
            {
                var context = new EsmContext();
                hv =(float) (from a in context.Answers join b in context.Options on a.ChoiceId equals b.ChoiceId join c in context.Questionnairs on a.QuestionnairId equals c.QuestionnairId where a.RespondentKey == userToken && c.QuestionairCode=="B01"  select b.Value).Average();
                av = (float)(from a in context.Answers join b in context.Options on a.ChoiceId equals b.ChoiceId join c in context.Questionnairs on a.QuestionnairId equals c.QuestionnairId where a.RespondentKey == userToken && c.QuestionairCode == "B02" select b.Value).Average();
                rv = (float)(from a in context.Answers join b in context.Options on a.ChoiceId equals b.ChoiceId join c in context.Questionnairs on a.QuestionnairId equals c.QuestionnairId where a.RespondentKey == userToken && c.QuestionairCode == "B03" select b.Value).Average();
                iv = (float)(from a in context.Answers join b in context.Options on a.ChoiceId equals b.ChoiceId join c in context.Questionnairs on a.QuestionnairId equals c.QuestionnairId where a.RespondentKey == userToken && c.QuestionairCode == "B04" select b.Value).Average();
                xv = (float)(from a in context.Answers join b in context.Options on a.ChoiceId equals b.ChoiceId join c in context.Questionnairs on a.QuestionnairId equals c.QuestionnairId where a.RespondentKey == userToken && c.QuestionairCode == "B05" select b.Value).Average();

            }

            return new List<ThermometerExData> {
                    new ThermometerExData{ Label="Happy", Color=Color.LightGreen, Value=hv, ExtraHigh=36,ExtraLow=63},
                    new ThermometerExData{ Label="Awake", Color=Color.LightPink, Value=av, ExtraHigh=39,ExtraLow=54},
                    new ThermometerExData{ Label="Relaxed", Color=Color.LightSalmon, Value=rv, ExtraHigh=54,ExtraLow=47},
                    new ThermometerExData{ Label="InControl", Color=Color.LightSkyBlue, Value=iv, ExtraHigh=43,ExtraLow=27},
                    new ThermometerExData{ Label="Anxious", Color=Color.LightPink, Value=xv, ExtraHigh=37,ExtraLow=58}
                };
        }
        private List<BulletinData> GetBulletinData(string userToken, string culture = "en", bool isTesting = false)
        {
            return new List<BulletinData> {
                new BulletinData{ Label="Feeling Happy", Color=Color.LightCoral, Data=new List<KeyValuePair<string, float>>{new KeyValuePair<string, float>("While With Friend",3.08F),new KeyValuePair<string, float>("While Alone",4.08F),new KeyValuePair<string, float>("While With Family",5.67F)}},
                new BulletinData{ Label="Feeling Relaxed", Color=Color.LightGreen, Data=new List<KeyValuePair<string, float>>{new KeyValuePair<string, float>("While With Friend",3.08F),new KeyValuePair<string, float>("While Alone",4.08F),new KeyValuePair<string, float>("While With Family",5.67F)}},
                new BulletinData{ Label="Feeling In Control", Color=Color.LightSeaGreen, Data=new List<KeyValuePair<string, float>>{new KeyValuePair<string, float>("While With Friend",3.08F),new KeyValuePair<string, float>("While Alone",4.08F),new KeyValuePair<string, float>("While With Family",5.67F)}},
                new BulletinData{ Label="Feeling Anxious", Color=Color.LightPink, Data=new List<KeyValuePair<string, float>>{new KeyValuePair<string, float>("While With Friend",3.08F),new KeyValuePair<string, float>("While Alone",4.08F),new KeyValuePair<string, float>("While With Family",5.67F)}},
            };
        }
        private List<BarDataSingle> GetBarData(string userToken, string culture = "en", bool isTesting = false)
        {
            if (isTesting)
            {
                var context = new EsmContext();
                var list = (from a in context.Answers join b in context.Questionnairs on a.QuestionnairId equals b.QuestionnairId join c in context.Options on a.ChoiceId equals c.ChoiceId where b.QuestionairCode == "B06" select c).ToList();
                
            }
            
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
        private List<GridChartData> GetChartDataForScalableLine(string userToken, string culture = "en", bool isTesting = false)
        {
            if (isTesting)
            {
                var context = new EsmContext();
                //B07:Activity  B01:Feel ;1:Very happy+ 2:Happy
                var listHappy = (from a in context.Answers                                
                                 join b in context.Questionnairs on a.QuestionnairId equals b.QuestionnairId
                                 join c in context.Options on a.ChoiceId equals c.ChoiceId
                                 join d in context.Answers on a.NotificationId equals d.NotificationId
                                 join e in context.Questionnairs on d.QuestionnairId equals e.QuestionnairId
                                 join f in context.Options on d.ChoiceId equals f.ChoiceId
                                 where b.QuestionairCode == "B07" && e.QuestionairCode=="B01" && (f.Value==1 ||f.Value==2)  select c).ToList();

            }
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
        private TableData GetTableData(string userToken, string culture = "en", bool isTesting = false)
        {
            if (isTesting)
            {
                var context = new EsmContext();
                //B06:Location  B01:Feel ;1:Very happy+ 2:Happy
                var listHappy = (from a in context.Answers
                                 join b in context.Questionnairs on a.QuestionnairId equals b.QuestionnairId
                                 join c in context.Options on a.ChoiceId equals c.ChoiceId
                                 join d in context.Answers on a.NotificationId equals d.NotificationId
                                 join e in context.Questionnairs on d.QuestionnairId equals e.QuestionnairId
                                 join f in context.Options on d.ChoiceId equals f.ChoiceId
                                 where b.QuestionairCode == "B06" && e.QuestionairCode == "B01" && (f.Value == 1 || f.Value == 2)
                                 select c).ToList();

            }
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
        private List<KeyValuePair<string, float>> GetMacaroniData()
        {
            return new List<KeyValuePair<string, float>> {
               new KeyValuePair<string, float>("Your Happiness Score",4.71F),
               new KeyValuePair<string, float>("Your Relaxed Score",2.71F),
               new KeyValuePair<string, float>("Your Awake Score",8.71F),
               new KeyValuePair<string, float>("Your In Control Score",6.71F),
               new KeyValuePair<string, float>("Your Anxious Score",5.71F),
            };
        }

    }
}