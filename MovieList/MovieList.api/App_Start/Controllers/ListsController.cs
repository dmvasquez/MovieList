using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MovieList.api.Infrastructure;
using MovieList.api.Models;

namespace MovieList.api.Controllers
{
    public class ListsController : ApiController
    {
        private MovieListDataContext db = new MovieListDataContext();

        // GET: api/Lists
        public IHttpActionResult GetLists()
        {
            var resultSet = db.Lists.Select(l => new
            {
                l.ListId,
                l.UserId,
                l.Title,
                l.NumberOfMovies,
                l.Placements,
                l.AverageRating
            });

            return Ok(resultSet);
        }

        // GET: api/Lists/5
        [ResponseType(typeof(List))]
        public IHttpActionResult GetList(int id)
        {
            List list = db.Lists.Find(id);
            if (list == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                list.ListId,
                list.Title,
                list.NumberOfMovies,
                list.Placements
            });
        }

        // PUT: api/Lists/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutList(int id, List list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != list.ListId)
            {
                return BadRequest();
            }

            var dbList = db.Lists.Find(id);

            dbList.Title = list.Title;
            dbList.NumberOfMovies = list.NumberOfMovies;
            dbList.AverageRating = list.AverageRating;

            db.Entry(dbList).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Lists
        [ResponseType(typeof(List))]
        public IHttpActionResult PostList(List list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Lists.Add(list);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = list.ListId }, list);
        }

        // DELETE: api/Lists/5
        [ResponseType(typeof(List))]
        public IHttpActionResult DeleteList(int id)
        {
            List list = db.Lists.Find(id);
            if (list == null)
            {
                return NotFound();
            }

            db.Lists.Remove(list);
            db.SaveChanges();

            return Ok(list);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ListExists(int id)
        {
            return db.Lists.Count(e => e.ListId == id) > 0;
        }
    }
}