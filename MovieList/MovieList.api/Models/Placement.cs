using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieList.api.Models
{
    public class Placement
    {
        public int MovieId { get; set; }
        public int ListId { get; set; }

        //Navigation Properties
        public virtual Movie Movies { get; set; }
        public virtual List Lists { get; set; }

    }
}