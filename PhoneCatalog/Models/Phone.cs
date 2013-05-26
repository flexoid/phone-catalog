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
        public string ImageUrl { get; set; }
        public string Date { get; set; }
        public string Type { get; set; }
        public string OS { get; set; }
        public string Processor { get; set; }
        public string Clock { get; set; }
        public string Length { get; set; }
        public string Width { get; set; }
        public string Thickness { get; set; }
        public string Weight { get; set; }
        public string ScreenSize { get; set; }
        public string Resolution { get; set; }
        public string CameraPixelCount { get; set; }
        public string BatteryCapacity { get; set; }
    }
}