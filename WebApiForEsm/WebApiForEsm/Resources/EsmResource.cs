using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiForEsm.Resources
{
    public class EsmResource
    {
        public static string GetString(string key, string culture)
        {
            var str = key;
            if (ResourceDic.ContainsKey(key))str = culture == "en" ? ResourceDic[key].English : ResourceDic[key].French;
            return str;
        }
        static Dictionary<string, Meaning> ResourceDic = new Dictionary<string, Meaning>
        {
            {"Feelings",new Meaning("Feelings","Sentiments")  },
            {"Happy",new Meaning("Happy","Heureux")  },
            {"Awake",new Meaning("Awake","Réveillé")  },
            {"Relaxed",new Meaning("Relaxed","Détendu")  },
            {"InControl",new Meaning("In Control","En contrôle")  },
            {"Anxious",new Meaning("Anxious","Anxieux")  },

            {"Feeling Happy",new Meaning("Feeling Happy","Se sentir heureux")  },
            {"Feeling Awake",new Meaning("Feeling Awake","Sentiment d’éveil")  },
            {"Feeling Relaxed",new Meaning("Feeling Relaxed","Se sentir détendu")  },
            {"Feeling InControl",new Meaning("Feeling InControl","Se sentir en contrôle")  },
            {"Feeling Anxious",new Meaning("Feeling Anxious","Sentiment d’anxiété")  },
            {"Number of times you reported a value less than 4",new Meaning("Number of times you reported a value less than 4:","Nombre de fois où vous avez signalé une valeur inférieure à 4:")  },
            {"Number of times you reported a value greater than 7",new Meaning("Number of times you reported a value greater than 7:","Nombre de fois où vous avez signalé une valeur supérieure à 7:")  },

            {"Your Feelings with Other People",new Meaning("Your Feelings with Other People","Vos sentiments avec les autres")  },
            {"While With Friend",new Meaning("While With Friend","Avec mes amis")  },
            {"While Alone",new Meaning("While Alone","Tout seul")  },
            {"While With Family",new Meaning("While With Family","Avec ma famille")  },

            {"Your Weekly Activity Breakdown",new Meaning("Your Weekly Activity Breakdown","La repartition de vos activités hebdomadaires")  },
            {"Number of times your selected this activity",new Meaning("Number of times your selected this activity","Nombre de fois où vous avez sélectionné cette activité")  },

            {"Your Feelings by Activity Type",new Meaning("Your Feelings by Activity Type","Vos sentiments par type d’activité")  },
            {"ActivityType",new Meaning("ActivityType","Type d'activité")  },
            {"Average Score",new Meaning("Average Score","Score moyen")  },

            {"Your Feelings by Location",new Meaning("Your Feelings by Location","Vos sentiments selon l’endroit")  },
            {"Location",new Meaning("Location","Emplacement")  },

            {"Data not found",new Meaning("Data not found","Données non trouvées") },
            {"You have to complete the survey at least once",new Meaning("You have to complete the survey at least once","Vous devez remplir l'enquête au moins une fois") }
        };
        class Meaning
        {
            public string English { get; set; }
            public string French { get; set; }
            public Meaning(string e,string f) { English=e;French = f; }
        }
    }

}