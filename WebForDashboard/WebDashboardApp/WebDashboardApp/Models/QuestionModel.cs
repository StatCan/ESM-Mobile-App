using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDashboardApp.Models
{
    public class QuestionModel
    {
        public int QuestionnairId { get; set; }
        public string Text { get; set; }
        public string UserToken { get; set; }
        public string NotificationId { get; set; }
        public List<ChoiceModel> Choices { get; set; }
        public string Message { get; set; }
        public int Type { get; set; }
        public string Culture { get; set; }
    }
    public class ChoiceModel
    {
        public int ChoiceId { get; set; }
        public string Text { get; set; }
        public bool IsUserInput { get; set; }
    }
    public class AnswerModel
    {
        public int QuestionnairId { get; set; }
        public string UserToken { get; set; }
        public string NotificationId { get; set; }
        public int ChoiceId { get; set; }
        public string UserInput { get; set; }
    }
}