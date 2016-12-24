using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Task4.Models;

namespace Task4.Controllers
{
    [RequireHttps]
    [Authorize]
    public class HomeController : Controller
    {
        public ApplicationDbContext db = new ApplicationDbContext();
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(FileViewModel file)
        {
            FileModel curFile = new FileModel() { Name = file.Name, Content = file.Content, UserId = User.Identity.GetUserId() };
            db.Files.Add(curFile);
            db.SaveChanges();
            return Json(new FileViewModel { Id = curFile.Id, Name = curFile.Name, Content = curFile.Content });
        }

        [HttpGet]
        public ActionResult Open(int? id)
        {
            if (id == null)
                return HttpNotFound();
            FileModel curFile = db.Files.Find(id);
            return Json(new FileViewModel { Id = curFile.Id, Name = curFile.Name, Content = curFile.Content }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Save(FileViewModel file)
        {
            FileModel curFile = db.Files.Find(file.Id);
            curFile.Content = file.Content;
            db.SaveChanges();
            return Json(true);
        }

        [HttpGet]
        public ActionResult GetFiles()
        {
            string curUserId = User.Identity.GetUserId();
            return Json(db.Files.Where(f => f.UserId == curUserId).ToArray(), JsonRequestBehavior.AllowGet);
        }
    }
}