using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using PhoneCatalog.Filters;
using PhoneCatalog.Models;
using MongoRepository;

namespace PhoneCatalog.Controllers
{
    public class CommentsController : ApiController
    {
        private static readonly MongoRepository<Phone> phoneRepository = new MongoRepository<Phone>();

        [HttpPost]
        [ModelValidationFilter]
        public Comment Post(string phoneId, [FromBody]Comment comment)
        {
            var phone = phoneRepository.GetById(phoneId);
            comment.CreatedAt = DateTime.Now;
            phone.Comments.Add(comment);
            phoneRepository.Update(phone);
            return comment;
        }
    }
}
