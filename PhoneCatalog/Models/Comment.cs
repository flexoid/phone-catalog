using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace PhoneCatalog.Models
{
    public class Comment
    {
        [Required]
        public String Author { get; set; }
        [Required]
        public String Text { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}