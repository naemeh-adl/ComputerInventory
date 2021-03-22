using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Computers.Any()) return;
            
            var Computers = new List<Computer>
            {
                new Computer
                {
                    Type = "Desktop",
                    brand = "Sony",
                    fromFactor= "Tower",
                    processor="IntelCorei7",
                    ramSlotsNum=1,
                    usbNum=2,
                    quantity=4
                }
            };

            await context.Computers.AddRangeAsync(Computers);
            await context.SaveChangesAsync();
        }
    }
}