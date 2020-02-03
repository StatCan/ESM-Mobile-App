using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiForEsm.Models
{
    public class ParaData
    {
        public string PlatFormVersion { get; set; }
        public string DeviceName { get; set; }
        public string NativeAppVersion { get; set; }
        public string NativeBuildVersion { get; set; }
        public string DeviceYearClass { get; set; }
        public string SessionID { get; set; }
        public string WakeTime { get; set; }
        public string SleepTime { get; set; }
        public string NotificationCount { get; set; }
        public bool NotificationEnable { get; set; }
        public List<string> ScheduledNotificationTimes{ get; set; }

        public override string ToString()
        {
            return PlatFormVersion + "," + DeviceName + "," + NativeAppVersion;
        }
    }
}