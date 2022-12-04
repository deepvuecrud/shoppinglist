﻿using System.Web;
using System.Web.Optimization;

namespace Portfolio.Web {
    public class BundleConfig {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862


        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new Bundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery.js",
                        "~/Scripts/InMemData.js"));

            bundles.Add(new Bundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new Bundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new Bundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.bundle.min.js"));

            bundles.Add(new Bundle("~/Content/css").Include(
                      "~/Content/site.css",
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-theme.css",
                      "~/Content/responsive.css"));
                      
        }
    }
}
