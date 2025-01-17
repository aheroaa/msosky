﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MSOMVC
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");



            routes.MapRoute(
                "List",
                "list{type}/{keyword}/{pageindex}",
                new { controller= "Home",action="List", type = 0, pageindex = 1 });
            routes.MapRoute(
                "Detail",
                "detail/{hashid}",
                new { controller="Home",action="Detail"});

            routes.MapRoute("Help", "help", new { controller = "Home", action = "Help" });

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}