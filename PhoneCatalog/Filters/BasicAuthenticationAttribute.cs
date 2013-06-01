using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Security.Cryptography;
using MongoRepository;
using PhoneCatalog.Models;

namespace PhoneCatalog.Filters
{
    public class BasicAuthenticationAttribute : System.Web.Http.Filters.ActionFilterAttribute
    {
        private static readonly MongoRepository<User> userRepository = new MongoRepository<User>();

        public override void OnActionExecuting(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.Authorization != null)
            {
                try
                {
                    string authToken = actionContext.Request.Headers.Authorization.Parameter;
                    if (!String.IsNullOrWhiteSpace(authToken))
                    {
                        string decodedToken = Encoding.UTF8.GetString(Convert.FromBase64String(authToken ?? ""));

                        string username = decodedToken.Substring(0,
                                                                 decodedToken.IndexOf(":",
                                                                                      System.StringComparison.Ordinal));
                        string password =
                            decodedToken.Substring(decodedToken.IndexOf(":", System.StringComparison.Ordinal) + 1);

                        User user = userRepository.GetSingle(u => u.Login == username && u.Password == password);
                        if (user != null)
                        {
                            base.OnActionExecuting(actionContext);
                            return;
                        }
                    }
                }
                catch(FormatException)
                {
                    actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
                }
            }

            actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
        }
    }
}