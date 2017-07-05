using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieList.api.Models
{
    public class List
    {
        public int ListId { get; set; }
        public int UserId { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public int NumberOfMovies { get; set; }
        public int AverageRating { get; set; }

        //Navigation Properties
        public virtual User User { get; set; }
        public virtual ICollection<Placement> Placements { get; set; }

        
    }
}