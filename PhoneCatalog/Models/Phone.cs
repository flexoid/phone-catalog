using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoRepository;

namespace PhoneCatalog.Models
{
    [CollectionName("phones")]
    public class Phone : Entity
    {
        public string Make { get; set; }
        public string Model { get; set; }
    }
}