using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieList.api.Models
{
    public class Movie
    {
        public int MovieId { get; set; }

        public string Title { get; set; }
        public int Rating { get; set; }
        public int YearReleased { get; set; }
        public string PosterImage { get; set; }
        public string Genre { get; set; }

        //Navigation Properties
        public virtual ICollection<Placement> Placements { get; set; }

    }
}