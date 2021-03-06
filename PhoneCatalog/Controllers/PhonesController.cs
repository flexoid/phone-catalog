﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using MongoRepository;
using PhoneCatalog.Models;
using PhoneCatalog.Filters;
using System.Linq.Dynamic;

using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.GridFS;
using MongoDB.Driver.Linq;

namespace PhoneCatalog.Controllers
{
    public class PhonesController : ApiController
    {
        private static readonly MongoRepository<Phone> phoneRepository = new MongoRepository<Phone>();

        // GET api/phones
        public IEnumerable<Phone> GetPhones(string q = null, string sort = null, bool desc = false, int? limit = null, int offset = 0)
        {
            MongoCursor<Phone> phones;

            if (!string.IsNullOrWhiteSpace(q))
            {
                phones = phoneRepository.Collection.Find((Query.Or(
                    Query.EQ("Make", new Regex(q, RegexOptions.IgnoreCase)),
                    Query.EQ("Model", new Regex(q, RegexOptions.IgnoreCase))
                )));
            }
            else
            {
                phones = phoneRepository.Collection.FindAll();
            }

            if (!string.IsNullOrWhiteSpace(sort))
            {
                phones = phones.SetSortOrder(!desc
                    ? SortBy.Ascending(sort)
                    :  SortBy.Descending(sort)
                );
            }

            if (limit.HasValue)
                phones.SetLimit(limit.Value);
            if (offset > 0)
                phones.SetSkip(offset);

            return phones;
        }

        // GET api/phones/5172b45dd273a00a303ea054
        public Phone Get(string id)
        {
            var phone = phoneRepository.GetById(id);
            if (phone == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            return phoneRepository.GetById(id);
        }

        // POST api/phones
        [BasicAuthentication]
        [ModelValidationFilter]
        public Phone Post([FromBody]Phone phone)
        {
            var newPhone = phoneRepository.Add(phone);
            return newPhone;
        }

        // PUT api/phones/5172b45dd273a00a303ea054
        [BasicAuthentication]
        public void Put(string id, [FromBody]Phone phone)
        {
            phone.Id = id;
            phoneRepository.Update(phone);
        }

        // DELETE api/phones/5172b45dd273a00a303ea054
        [BasicAuthentication]
        public void Delete(string id)
        {
            if (!phoneRepository.Delete(id))
                throw new HttpResponseException(HttpStatusCode.NotFound);
        }

        [AcceptVerbs("GET")]
        public IEnumerable<String> TypeAhead(string text)
        {
            MongoCursor<Phone> phones;
            phones = phoneRepository.Collection.Find((Query.Or(
                Query.EQ("Make", new Regex(text, RegexOptions.IgnoreCase)),
                Query.EQ("Model", new Regex(text, RegexOptions.IgnoreCase))
            )));
            phones.SetLimit(10);
            return phones.Select(phone => String.Format("{0} {1}", phone.Make, phone.Model));
        }
    }
}