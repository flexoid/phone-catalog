using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using MongoRepository;
using PhoneCatalog.Models;

namespace PhoneCatalog.Controllers
{
    public class UsersController : ApiController
    {
        private static readonly MongoRepository<User> userRepository = new MongoRepository<User>();

        /*
        // GET api/users
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/users/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/users
        public void Post([FromBody]string value)
        {
        }

        // PUT api/users/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/users/5
        public void Delete(int id)
        {
        }
        */
    }
}
