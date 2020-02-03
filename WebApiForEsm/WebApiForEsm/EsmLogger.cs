using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.ExceptionHandling;

namespace WebApiForEsm
{
    public class EsmLogger : IExceptionLogger
    {
        public async Task LogAsync(ExceptionLoggerContext context, CancellationToken cancellationToken)
        {
            string path = Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("/Logs/"), "EsmExceptionLog.txt");
            if(File.Exists(path) && new FileInfo(path).LastAccessTime < DateTime.Now.AddDays(-3)) {
                    StreamWriter writer = File.CreateText(path);
                    await writer.WriteAsync(string.Format("{0}:{1}\r\n", DateTime.Now, context.ExceptionContext.Exception.ToString()));
                    
                    writer.Dispose();
            }
            else
            {
                StreamWriter writer = File.AppendText(path);
                await writer.WriteAsync(string.Format("{0}:{1}\r\n", DateTime.Now, context.ExceptionContext.Exception.ToString()));
                writer.Dispose();
            }
            
        }
    }
}