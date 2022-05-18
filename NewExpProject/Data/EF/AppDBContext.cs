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
            optionsBuilder.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;Password=1234");
        }
    }
}
