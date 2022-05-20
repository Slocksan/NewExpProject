using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NewExpProject.Data.EF;

namespace NewExpProject.Data
{
    public class AppDBContext : DbContext
    {
        public DbSet<Position> Positions { get; set; }

        public DbSet<Place> Places { get; set; }

        public DbSet<Expedition> Expeditions { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Trip> Trips { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //"Host=localhost;Database=postgres;Username=postgres;Password=1234"
            //"Host=ec2-52-86-115-245.compute-1.amazonaws.com;Database=d5pb39t2qg3oa7;Username=jippsvmugllwte;Password=b0a462b403a9139b9cebdfaade5d0882ca946aa53a35659be5243120dc883f89"
            var connString = $"{Environment.GetEnvironmentVariable("ASPNETCORE_CONNECTION_STRING")}";
            optionsBuilder.UseNpgsql(connString);
        }
    }
}
