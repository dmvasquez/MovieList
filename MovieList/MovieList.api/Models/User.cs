using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieList.api.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string Telephone { get; set; }


        //Navigation Properties
        public virtual ICollection<List> Lists { get; set; }


    }
}