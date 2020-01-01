using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace WebDashboardApp.Models
{
    [XmlRoot(Namespace = "http://www.statcan.gc.ca/esm/wellbeing-graph")]
    public class wellBeingGraphData
    {
        public feeling feeling { get; set; }
        public feelingWithOthers feelingWithOthers { get; set; }
        public List<location> feelingByLocation { get; set; }
        public List<activity> feelingByActivity { get; set; }
    }
    public class feeling
    {
        [XmlElement(ElementName ="happy")]
        public FeelingElement happy { get; set; }
        [XmlElement(ElementName = "awake")]
        public FeelingElement awake { get; set; }
        [XmlElement(ElementName = "relaxed")]
        public FeelingElement relaxed { get; set; }
        [XmlElement(ElementName = "inControl")]
        public FeelingElement inControl { get; set; }
        [XmlElement(ElementName = "anxious")]
        public FeelingElement anxious { get; set; }
    }
    public class feelingWithOthers
    {
        public FeelingElement happy { get; set; }
        public FeelingElement relaxed { get; set; }
        public FeelingElement inControl { get; set; }
        public FeelingElement anxious { get; set; }

    }
    public class location
    {
        [XmlAttribute]
        public string where { get; set; }
        [XmlAttribute]
        public float happy { get; set; }
        [XmlAttribute]
        public float relaxed { get; set; }
        [XmlAttribute]
        public float awake { get; set; }
        [XmlAttribute]
        public float inControl { get; set; }
        [XmlAttribute]
        public float anxious { get; set; }
    }
    public class activity
    {
        [XmlAttribute]
        public string what { get; set; }
        [XmlAttribute]
        public int numberSelected { get; set; }
        [XmlAttribute]
        public float happy { get; set; }
        [XmlAttribute]
        public float relaxed { get; set; }
        [XmlAttribute]
        public float anxious { get; set; }
    }
    public class FeelingElement {
        [XmlAttribute]
        public float average { get; set; }
        [XmlAttribute]
        public float timesBelow4 { get; set; }
        [XmlAttribute]
        public float timesAbove7 { get; set; }
        [XmlAttribute]
        public float withFriends { get; set; }
        [XmlAttribute]
        public float whileAlone { get; set; }
        [XmlAttribute]
        public float withFamily { get; set; }
    }

}