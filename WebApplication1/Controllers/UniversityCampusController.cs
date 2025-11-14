using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class UniversityCampusController : Controller
    {
        private WebApplication1Context db = new WebApplication1Context();

        // GET: UniversityCampus
        public ActionResult Index()
        {
            return View(db.UniversityCampus.ToList());
        }

        // GET: UniversityCampus/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UniversityCampus universityCampus = db.UniversityCampus.Find(id);
            if (universityCampus == null)
            {
                return HttpNotFound();
            }
            return View(universityCampus);
        }

        // GET: UniversityCampus/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: UniversityCampus/Create
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性；有关
        // 更多详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Name")] UniversityCampus universityCampus)
        {
            if (ModelState.IsValid)
            {
                db.UniversityCampus.Add(universityCampus);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(universityCampus);
        }

        // GET: UniversityCampus/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UniversityCampus universityCampus = db.UniversityCampus.Find(id);
            if (universityCampus == null)
            {
                return HttpNotFound();
            }
            return View(universityCampus);
        }

        // POST: UniversityCampus/Edit/5
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性；有关
        // 更多详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Name")] UniversityCampus universityCampus)
        {
            if (ModelState.IsValid)
            {
                db.Entry(universityCampus).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(universityCampus);
        }

        // GET: UniversityCampus/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UniversityCampus universityCampus = db.UniversityCampus.Find(id);
            if (universityCampus == null)
            {
                return HttpNotFound();
            }
            return View(universityCampus);
        }

        // POST: UniversityCampus/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            UniversityCampus universityCampus = db.UniversityCampus.Find(id);
            db.UniversityCampus.Remove(universityCampus);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
