using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace PhoneCatalog
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapHttpRoute(
                "TypeAhead",
                "api/phones/type_ahead",
                new { controller = "Phones", action = "TypeAhead" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );

            routes.MapHttpRoute(
                name: "Comments",
                routeTemplate: "api/phones/{phoneId}/comments/{id}",
                defaults: new { controller = "Comments", id = RouteParameter.Optional }
                );

            routes.MapHttpRoute(
                name: "Phones",
                routeTemplate: "api/phones/{id}",
                defaults: new { controller = "Phones", id = RouteParameter.Optional }
            );

            routes.MapHttpRoute(
               name: "Users",
               routeTemplate: "api/users/{id}",
               defaults: new { controller = "Users", id = RouteParameter.Optional }
           );
        }
    }
}