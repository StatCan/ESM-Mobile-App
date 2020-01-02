using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebDashboardApp.Models
{
    public enum QuestionType
    {
        SingleChoice=1,MultipleChoice=2
    }
    public enum SurveyType
    {
        QuestionnaireA = 1, QuestionnairB = 2
    }
    public class Questionnair
    {
        [Key]
        public int QuestionnairId { get; set; }
        public QuestionType QuestionType { get; set; }
        public SurveyType SurveyType { get; set; }
        public string EnglishName { get; set; }
        public string FrenchName { get; set; }
        public List<Choice> Choices { get; set; }
    }
    public class Choice
    {
        [Key]
        public int ChoiceId { get; set; }
        public string EnglishName { get; set; }
        public string FrenchName { get; set; }
        public int QuestionnairId { get; set; }
        [ForeignKey("QuestionnairId")]
        public Questionnair Questionnair { get; set; }
        public bool IsUserInput { get; set; }
    }
    public class Answer
    {
        [Key]
        public int AnswerId { get; set; }
        public string RespondentKey { get; set; }
        public string NotificationId { get; set; }
        public DateTime ResponseDate { get; set; }
        public string TheUserInputAnswer { get; set; }
        public int QuestionnairId { get; set; }
        public int ChoiceId { get; set; }
        public int SurveyType { get; set; }
    }
}