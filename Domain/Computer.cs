using System;

namespace Domain
{
    public class Computer
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string processor { get; set; }
        public string brand { get; set; }
        public int usbNum { get; set; }
        public int ramSlotsNum { get; set; }
        public string fromFactor { get; set; }
        public int quantity{ get;set; }
        public string ExtraProps {get; set; }
    }
    
}