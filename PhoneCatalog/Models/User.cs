using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using MongoRepository;

namespace PhoneCatalog.Models
{
    [CollectionName("users")]
    public class User : Entity
    {
        public string Login { get; set; }
        public string PasswordEncrypted { get; set; }
        public bool Admin { get; set; }
    }
}