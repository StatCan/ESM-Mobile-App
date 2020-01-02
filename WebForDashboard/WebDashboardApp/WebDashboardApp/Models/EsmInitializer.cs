using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDashboardApp.Models
{
    public class EsmInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<EsmContext>
    {
        protected override void Seed(EsmContext context)
        {
            var questionnairs = new List<Questionnair> {
                new Questionnair{ EnglishName="What is your age range ?", FrenchName="", QuestionType=QuestionType.SingleChoice,
                             Choices=new List<Choice>{
                                new Choice{ EnglishName="Less than or equal 8",FrenchName=""},
                                new Choice{ EnglishName="greater than 18 to less than or equal 30",FrenchName=""},
                                new Choice{ EnglishName="greater than 30 to less than or equal 65",FrenchName=""},
                                new Choice{ EnglishName="greater than 65",FrenchName=""}
                             }, SurveyType=SurveyType.QuestionnaireA
                         },
                new Questionnair{ EnglishName="What is Gender ?", FrenchName="", QuestionType=QuestionType.SingleChoice,
                             Choices=new List<Choice>{
                                new Choice{ EnglishName="Male",FrenchName=""},
                                new Choice{ EnglishName="Femal",FrenchName=""},
                                new Choice{ EnglishName="Mixed",FrenchName=""}
                             },SurveyType=SurveyType.QuestionnaireA
                         },
                new Questionnair{ EnglishName="Using a scale,how happy do you feel at this very moment", FrenchName="", QuestionType=QuestionType.SingleChoice,
                            Choices=new List<Choice>{
                            new Choice{ EnglishName="Very happy",FrenchName=""},
                            new Choice{ EnglishName="happy",FrenchName=""},
                            new Choice{ EnglishName="kind of",FrenchName=""},
                            new Choice{ EnglishName="Not happy",FrenchName=""},
                            new Choice{ EnglishName="Sad",FrenchName=""}
                             },SurveyType=SurveyType.QuestionnairB
                          },
                new Questionnair{ EnglishName="Where are you at this very moment", FrenchName="", QuestionType=QuestionType.SingleChoice,
                            Choices=new List<Choice>{
                            new Choice{ EnglishName="At home or own property",FrenchName=""},
                            new Choice{ EnglishName="At place of work or school",FrenchName=""},
                            new Choice{ EnglishName="Away on business",FrenchName=""},
                            new Choice{ EnglishName="At someone else's home or property",FrenchName=""},
                            new Choice{ EnglishName="In the neighborhood",FrenchName=""},
                            new Choice{ EnglishName="Outdoors",FrenchName=""},
                            new Choice{ EnglishName="Grocery store,other store or mall",FrenchName=""},
                            new Choice{ EnglishName="Library,museum or theatre",FrenchName=""},
                            new Choice{ EnglishName="Sports center, field or arena",FrenchName=""},
                            new Choice{ EnglishName="Restaurant,bar or club",FrenchName=""},
                            new Choice{ EnglishName="Place of worship",FrenchName=""},
                            new Choice{ EnglishName="Medical,dental or other health clinic",FrenchName=""},
                            new Choice{ EnglishName="Other",FrenchName="",IsUserInput=true},
                        }, SurveyType=SurveyType.QuestionnairB
                }
            };

            questionnairs.ForEach(q => context.Questionnairs.Add(q));
            context.SaveChanges();
        }
    }
}
