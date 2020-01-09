using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Serialization;
using WebApiForEsm.Models;

namespace WebApiForEsm.Helpers
{
    public static class CmpHelper
    {
        public static wellBeingGraphData GetCmpData(string userToken,string password,string path)
        {
            var xmlStr = File.ReadAllText(path);
            var ts = xmlStr.ParseXml<wellBeingGraphData>();
            var w = ts.feelingByLocation[0].where;
            return ts;
        }
    }
    public static class Helper
    {
        public static T ParseXml<T>(this string value) where T : class
        {
            var xmlSerializer = new XmlSerializer(typeof(T));
            using (var textReader = new StringReader(value))
            {
                return (T)xmlSerializer.Deserialize(textReader);
            }
        }
    }
}