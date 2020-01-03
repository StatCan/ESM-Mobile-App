using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDashboardApp.Models
{
    public class EsmInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<EsmContext>      //DropCreateDatabaseAlways<EsmContext>   //.DropCreateDatabaseIfModelChanges<EsmContext>
    {
        protected override void Seed(EsmContext context)
        {
            var questionnairs = new List<Questionnair> {
                new Questionnair{EnglishName="A1) What is your date of birth ?", FrenchName="A1) Quelle est votre date de naissance?", QuestionType=QuestionType.DatePicker, SurveyType=SurveyType.QuestionnaireA,Choices=new List<Choice>{ new Choice {EnglishName="Your date of borth:",FrenchName= "Votre date de naissance:" } } },
                new Questionnair{EnglishName="A2) What is your name ?", FrenchName="A2) Quel est ton nom?", QuestionType=QuestionType.MultiInput, SurveyType=SurveyType.QuestionnaireA,Choices=new List<Choice>{ new Choice {EnglishName="Given name:",FrenchName= "Prénom:" },new Choice {EnglishName="Family name",FrenchName= "Nom de famille" } } },
                new Questionnair{ EnglishName="A3) To determine which geographic region you live in,Please provide your postal code.",FrenchName="A3) Pour déterminer dans quelle région géographique vous vivez, veuillez fournir votre code postal.",QuestionType=QuestionType.SingleInput, SurveyType=SurveyType.QuestionnaireA, HelpDescEng="Pattern:A1A 1A1",HelpDescFre="Modèle: A1A 1A1", Choices=new List<Choice>{ new Choice { EnglishName="Postal Code", FrenchName= "Code postal" } } },
                new Questionnair{EnglishName="A4) What was your sex at birth?", FrenchName="A4) Quel était votre sexe à la naissance?", QuestionType=QuestionType.SingleChoice, SurveyType=SurveyType.QuestionnaireA,HelpDescEng="sex refers to sex assigned at birth",Choices=new List<Choice>{new Choice{ EnglishName="Male",FrenchName="Mâle"}, new Choice{ EnglishName="Femal",FrenchName= "Femelle" } }},
                new Questionnair{ EnglishName="A5) What is your gender ?", FrenchName="A5) Quel est votre sexe?", QuestionType=QuestionType.SingleChoiceWithOtherInput,HelpDescEng="Gender refers to current gender which may bedifferent from sex assigned at birth and maybe different from what is indicated on legal documents",
                             Choices=new List<Choice>{
                                new Choice{ EnglishName="Male",FrenchName="Mâle"},
                                new Choice{ EnglishName="Femal",FrenchName="Femelle"},
                                new Choice{ EnglishName="Or please specify:",FrenchName="Ou veuillez préciser:", IsUserInput=true}
                             },SurveyType=SurveyType.QuestionnaireA
                         },
                new Questionnair{EnglishName="A6) Including yourself, how many persons live in your household ?",FrenchName="A6) Y compris vous-même, combien de personnes vivent dans votre ménage?", QuestionType=QuestionType.SingleInput,SurveyType=SurveyType.QuestionnaireA, Choices=new List<Choice>{ new Choice {EnglishName="Number of persons",FrenchName= "Nombre de personnes" } } },
                new Questionnair{EnglishName="A7) How many of these persons are 15 yeads of age or older ?",FrenchName="A7) How many of these persons are 15 yeads of age or older ?", QuestionType=QuestionType.SingleInput,SurveyType=SurveyType.QuestionnaireA, Choices=new List<Choice>{ new Choice {EnglishName="Number of persons",FrenchName= "Nombre de personnes" } } },
                new Questionnair{EnglishName="A8) Are you an aboriginal person, that is,First names(North American Indian),Metis or Inuk(inuit) ?",FrenchName="A8) Êtes-vous un Autochtone, c'est-à-dire un prénom (Indien de l'Amérique du Nord), un Métis ou un Inuk (inuit)?", QuestionType=QuestionType.MultipleChoice,SurveyType=SurveyType.QuestionnaireA, HelpDescEng="Note:First Nations includes statusand non-status indians",HelpDescFre="Remarque: les Premières nations comprennent les Indiens inscrits et non inscrits",
                    Choices =new List<Choice>{
                        new Choice{ EnglishName="No, not an Aboriginal persion", FrenchName="Non, pas un Autochtone"},
                        new Choice{ EnglishName="Yes,First Namtions(North American Indian)",FrenchName="Oui, Premières nations (Indien de l'Amérique du Nord)"},
                        new Choice{ EnglishName="Yes,Metis",FrenchName="Oui, Métis"},
                        new Choice{EnglishName="Yes,Inuk(Inuit)",FrenchName="Oui, Inuk (Inuit)"}
                    } },
                new Questionnair{ EnglishName="A9) What were the ethnic or culture origins of your ancestors?",FrenchName="A9) Quelles étaient les origines ethniques ou culturelles de vos ancêtres?", QuestionType=QuestionType.MultipleChoiceWithOtherInput,SurveyType=SurveyType.QuestionnaireA,
                     Choices=new List<Choice>{
                         new Choice{EnglishName="Canadian",FrenchName="Canadien"}, new Choice{EnglishName="English",FrenchName="Anglais"}, new Choice{EnglishName="French",FrenchName="Français"},
                         new Choice{EnglishName="Scottish",FrenchName="Écossais"}, new Choice{EnglishName="Irish",FrenchName="Irlandais"}, new Choice{EnglishName="German",FrenchName="Allemand"},
                         new Choice{EnglishName="Italian",FrenchName="Italien"}, new Choice{EnglishName="Aboriginal(First Nations,Metis,Inuit)",FrenchName="Autochtone (Premières nations, Métis, Inuit)"}, new Choice{EnglishName="Ukrainian",FrenchName="Ukrainien"},
                         new Choice{EnglishName="Chinese",FrenchName="Chinois"}, new Choice{EnglishName="Dutch",FrenchName="Néerlandais"}, new Choice{EnglishName="Polish",FrenchName="Polonais"},
                         new Choice{EnglishName="South Asian",FrenchName="Sud-asiatique"}, new Choice{EnglishName="Jewish",FrenchName="Juif"}, new Choice{EnglishName="Portuguese",FrenchName="Portugais"},
                         new Choice{EnglishName="Filipino",FrenchName="Philippin"}, new Choice{EnglishName="Other",FrenchName="Autre",IsUserInput=true},
                     }
                },
                new Questionnair{EnglishName="A10) Indicate if you identify as a person with any of the following",FrenchName="A10) Indiquez si vous vous identifiez en tant que personne avec l'un des éléments suivants", QuestionType=QuestionType.MultipleChoice, SurveyType=SurveyType.QuestionnaireA, Choices=new List<Choice>{
                    new Choice{EnglishName="Deaf, partially deaf, hard of hearing",FrenchName="Sourds, partiellement sourds, malentendants"},new Choice{EnglishName="Has a disability",FrenchName="A un handicap"},new Choice{EnglishName="I do not identify",FrenchName="Je n'identifie pas"}
                } },
                new Questionnair{EnglishName="A11) What language you speak most often at home?",FrenchName="A11) Quelle langue parlez-vous le plus souvent à la maison?", QuestionType=QuestionType.SingleChoiceWithOtherInput,SurveyType=SurveyType.QuestionnaireA, Choices=new List<Choice>{new Choice{EnglishName="English",FrenchName= "Anglais" },new Choice { EnglishName="French",FrenchName= "Français" },new Choice {EnglishName="Other",IsUserInput=true ,FrenchName= "Autre" } } },

                new Questionnair{ EnglishName="B1) Using a scale,how happy do you feel at this very moment", FrenchName="B1) À l'aide d'une échelle, comment vous sentez-vous heureux en ce moment même", QuestionType=QuestionType.SingleChoice,
                            Choices=new List<Choice>{
                            new Choice{ EnglishName="Very unhappy",FrenchName="Très mécontent"},
                            new Choice{ EnglishName="unhappy",FrenchName="Malheureuse"},
                            new Choice{ EnglishName="Neither happy or unhappy",FrenchName="Ni heureux ni malheureux"},
                            new Choice{ EnglishName="Happy",FrenchName="Heureux"},
                            new Choice{ EnglishName="Very Happy",FrenchName="Très heureux"}
                             },SurveyType=SurveyType.QuestionnairB
                          },
                new Questionnair{ EnglishName="B2) Using a scale,how relaxare you at this very moment", FrenchName="B2) À l'aide d'une balance, comment vous détendez-vous en ce moment même", QuestionType=QuestionType.SingleChoice,
                            Choices=new List<Choice>{
                            new Choice{ EnglishName="Not at all relaxed",FrenchName="Pas du tout détendu"},
                            new Choice{ EnglishName="Not relaxed",FrenchName="Pas détendu"},
                            new Choice{ EnglishName="Neither relaxed or unrelaxed",FrenchName="Ni détendu, ni détendu"},
                            new Choice{ EnglishName="Relaxed",FrenchName="Détendu"},
                            new Choice{ EnglishName="Very relaxed",FrenchName="Très relaxé"}
                             },SurveyType=SurveyType.QuestionnairB
                          },
                new Questionnair{ EnglishName="B3) Using a scale,how awake do youfeel at this very moment", FrenchName="B3) À l'aide d'une balance, comment vous sentez-vous éveillé en ce moment même", QuestionType=QuestionType.SingleChoice,
                            Choices=new List<Choice>{
                            new Choice{ EnglishName="Very tired",FrenchName="Très fatigué"},
                            new Choice{ EnglishName="Tired",FrenchName="Fatigué"},
                            new Choice{ EnglishName="Neither awake or tired",FrenchName="Ni éveillé ni fatigué"},
                            new Choice{ EnglishName="Awake",FrenchName="Éveillé"},
                            new Choice{ EnglishName="Very awake",FrenchName="Très éveillé"}
                             },SurveyType=SurveyType.QuestionnairB
                          },
                new Questionnair{ EnglishName="B4) Using a scale,how in control do you feel at this very moment", FrenchName="B4) À l'aide d'une échelle, comment vous sentez-vous en contrôle en ce moment même", QuestionType=QuestionType.SingleChoice,
                            Choices=new List<Choice>{
                            new Choice{ EnglishName="Not at all in control",FrenchName="Pas du tout sous contrôle"},
                            new Choice{ EnglishName="Not in control",FrenchName="Pas en contrôle"},
                            new Choice{ EnglishName="Neither in control or not in control",FrenchName="Ni sous contrôle ni sous contrôle"},
                            new Choice{ EnglishName="In control",FrenchName="En contrôle"},
                            new Choice{ EnglishName="Very in control",FrenchName="Très en contrôle"}
                             },SurveyType=SurveyType.QuestionnairB
                          },
                new Questionnair{ EnglishName="B5) Using a scale,how anxious do you feel at this very moment", FrenchName="B4) À l'aide d'une échelle, comment vous sentez-vous en contrôle en ce moment même", QuestionType=QuestionType.SingleChoice,
                            Choices=new List<Choice>{
                            new Choice{ EnglishName="Very anxious",FrenchName="Très anxieux"},
                            new Choice{ EnglishName="Anxious",FrenchName="Anxieux"},
                            new Choice{ EnglishName="Neither anxious or calm",FrenchName="Ni anxieux ni calme"},
                            new Choice{ EnglishName="Calm",FrenchName="Calme"},
                            new Choice{ EnglishName="Very calm",FrenchName="Très calme"}
                             },SurveyType=SurveyType.QuestionnairB
                          },
                new Questionnair{ EnglishName="B6) Where are you at this very moment", FrenchName="B6) Où êtes-vous en ce moment même", QuestionType=QuestionType.SingleChoiceWithOtherInput,
                            Choices=new List<Choice>{
                            new Choice{ EnglishName="At home or own property",FrenchName="À la maison ou en propriété"},
                            new Choice{ EnglishName="At place of work or school",FrenchName="Sur le lieu de travail ou à l'école"},
                            new Choice{ EnglishName="Away on business",FrenchName="En voyage d'affaires"},
                            new Choice{ EnglishName="At someone else's home or property",FrenchName="Chez quelqu'un ou chez quelqu'un"},
                            new Choice{ EnglishName="In the neighborhood",FrenchName="Dans le quartier"},
                            new Choice{ EnglishName="Outdoors",FrenchName="En plein air"},
                            new Choice{ EnglishName="Grocery store,other store or mall",FrenchName="Épicerie, autre magasin ou centre commercial"},
                            new Choice{ EnglishName="Library,museum or theatre",FrenchName="Bibliothèque, musée ou théâtre"},
                            new Choice{ EnglishName="Sports center, field or arena",FrenchName="Centre sportif, terrain ou aréna"},
                            new Choice{ EnglishName="Restaurant,bar or club",FrenchName="Restaurant, bar ou club"},
                            new Choice{ EnglishName="Place of worship",FrenchName="Lieu de culte"},
                            new Choice{ EnglishName="Medical,dental or other health clinic",FrenchName="Clinique médicale, dentaire ou autre"},
                            new Choice{ EnglishName="Other",FrenchName="Autre",IsUserInput=true},
                        }, SurveyType=SurveyType.QuestionnairB
                },
                new Questionnair{EnglishName="B7) What are you doing at this very moment?",FrenchName="B7) Que faites-vous en ce moment même?", QuestionType=QuestionType.SingleChoice,SurveyType=SurveyType.QuestionnairB,
                     Choices=new List<Choice>
                     {
                         new Choice{EnglishName="Sleeping",FrenchName="En train de dormir"},new Choice{EnglishName="Sports, excercise,outdoor activities or spending time in nsture",FrenchName="Sports, exercice, activités de plein air ou passer du temps dans la nature"},
                         new Choice{EnglishName="Art and culture hobbies or activities",FrenchName="Loisirs ou activités artistiques et culturelles"},new Choice{EnglishName="Own personal care",FrenchName="Propre soins personnels"},new Choice{EnglishName="Eating or drinking",FrenchName="Manger ou boire"},
                         new Choice{EnglishName="Travel and going from place to place",FrenchName="Voyager et aller d'un endroit à l'autre"},new Choice{EnglishName="Paid workactivities or looking for work",FrenchName="Activités de travail rémunérées ou à la recherche d'un emploi"},
                         new Choice{EnglishName="Studying or learning",FrenchName="Étudier ou apprendre"},new Choice{EnglishName="Household chores or maintenance",FrenchName="Les tâches ménagères ou l'entretien"},new Choice{EnglishName="Caring for a child,teenagger or adult",FrenchName="Prendre soin d'un enfant, d'un adolescent ou d'un adulte"}
                     }
                },
                new Questionnair{EnglishName="B8) What activities are you participating in at this verymoment ?",FrenchName="", QuestionType=QuestionType.SingleChoice,SurveyType=SurveyType.QuestionnairB,
                     Choices=new List<Choice>{
                         new Choice{EnglishName="Attending a sporting event",FrenchName="Assister à un événement sportif"},new Choice{EnglishName="Exercise",FrenchName="Des exercices"},new Choice{EnglishName="Organized recreational sports",FrenchName="Sports récréatifs organisés"},
                         new Choice{EnglishName="Competitive sports",FrenchName="Les sports de compétition"},new Choice{EnglishName="Non-competitve outdoor sports",FrenchName="Sports de plein air non compétitifs"},new Choice{EnglishName="Outdoor activities",FrenchName="Activités extérieures"},
                         new Choice{EnglishName="Walking,hiking,birdwatching",FrenchName="Marche, randonnée, observation des oiseaux"},new Choice{EnglishName="Coaching or administering sports",FrenchName="Coaching ou administration de sports"}
                     } },
                new Questionnair{EnglishName="B9) Who are you with at this very moment?",FrenchName="B9) Avec qui êtes-vous en ce moment même?", QuestionType=QuestionType.SingleChoiceWithOtherInput, SurveyType=SurveyType.QuestionnairB,
                     Choices=new List<Choice>
                     {
                         new Choice{EnglishName="On my own",FrenchName="Me débrouiller tout seul"},new Choice{EnglishName="Spouse,partner",FrenchName="Conjoint, partenaire"},new Choice{EnglishName="Household child,children(less than 15 years old)",FrenchName="Enfant de ménage, enfants (moins de 15 ans)"},
                         new Choice{EnglishName="Household child,children(15 years or older)",FrenchName="Enfant domestique, enfants (15 ans et plus)"},new Choice{EnglishName="Parents or parents in-law",FrenchName="Parents ou beaux-parents"},new Choice{EnglishName="Other household adults",FrenchName="Autres adultes du ménage"},
                         new Choice{EnglishName="Other family members from other households",FrenchName="Autres membres de la famille d'autres ménages"},new Choice{EnglishName="Friends",FrenchName="Copains"},new Choice{EnglishName="Colleagues,classmates",FrenchName="Collègues, camarades de classe"},
                         new Choice{EnglishName="Other",FrenchName="Autre",IsUserInput=true}
                     }
                },

                new Questionnair{EnglishName="Extr1) How did you find this app?",FrenchName="Extr1) Comment avez-vous trouvé cette application?", QuestionType=QuestionType.SingleChoice, SurveyType=SurveyType.Supportive,
                    Choices =new List<Choice>
                    {
                        new Choice{EnglishName="Invited by Statistics Canada",FrenchName="Invité par Statistique Canada"},new Choice{EnglishName="Friend told me about it",FrenchName="Un ami m'en a parlé"}, new Choice{EnglishName="Saw it in the news",FrenchName="Je l'ai vu dans les nouvelles"}
                    }
                },
                new Questionnair{EnglishName="Extr2)) What do you think of this app ?",FrenchName="Extr2)) Que pensez-vous de cette application?", QuestionType=QuestionType.SingleChoice, SurveyType=SurveyType.Supportive,
                    Choices=new List<Choice>
                    {
                        new Choice{EnglishName="Very dissatisfied",FrenchName="Très insatisfait"},new Choice{EnglishName ="Dissatisfied",FrenchName="Mécontent"},new Choice{EnglishName="Neither satisfied nor dissatisfied",FrenchName="Ni satisfait ni insatisfait"},
                        new Choice{EnglishName="Satisfied",FrenchName="Satisfait"},new Choice{EnglishName="Very satisfied",FrenchName="Très satisfait"}
                    }
                },
                new Questionnair{EnglishName="Extr3) How can we make this app better?",FrenchName="Extr3) Comment pouvons-nous améliorer cette application?", QuestionType=QuestionType.SingleInput, SurveyType=SurveyType.Supportive, HelpDescEng="Maximum 500 characters",HelpDescFre="500 caractères maximum", Choices=new List<Choice>{new Choice { EnglishName= "Feedback", FrenchName = "Retour d'information" } }}
            };

            questionnairs.ForEach(q => context.Questionnairs.Add(q));
            context.SaveChanges();
        }
    }
}
