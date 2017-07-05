using MovieList.api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MovieList.api.Infrastructure
{
    public class MovieListDataContext : DbContext
    {
        public MovieListDataContext() : base("MovieList")
        {
        }

        public IDbSet<User> Users { get; set; }
        public IDbSet<List> Lists { get; set; }
        public IDbSet<Movie> Movies { get; set; }
        public IDbSet<Placement> Placements { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // 1 User has many Lists
            modelBuilder.Entity<User>()
                .HasMany(u => u.Lists)
                .WithRequired(l => l.User)
                .HasForeignKey(l => l.UserId);

            // 1 List has many placements
            modelBuilder.Entity<List>()
                .HasMany(l => l.Placements)
                .WithRequired(p => p.Lists)
                .HasForeignKey(p => p.ListId);

            // 1 Movie has many placements
            modelBuilder.Entity<Movie>()
                .HasMany(m => m.Placements)
                .WithRequired(p => p.Movies)
                .HasForeignKey(p => p.MovieId);

            //Compound Key
            modelBuilder.Entity<Placement>()
                .HasKey(Placement => new { Placement.ListId, Placement.MovieId });
        }

    }
}