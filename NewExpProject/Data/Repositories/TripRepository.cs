using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NewExpProject.Data.EF;

namespace NewExpProject.Data.Repositories
{
    public class TripRepository
    {
        public static List<Trip> GetTrips()
        {
            using (var db = new AppDBContext())
            {
                var trips = db.Trips.ToList();

                foreach (var trip in trips)
                {
                    trip.Employee = db.Employees.FirstOrDefault(emp => emp.ID == trip.EmployeeId);
                    trip.Expedition = db.Expeditions.FirstOrDefault(exp => exp.ID == trip.ExpeditionId);
                }

                return trips;
            }
        }

        public static Trip GetTripById(int tripId)
        {
            using (var db = new AppDBContext())
            {
                var trip = db.Trips.FirstOrDefault(p => p.ID == tripId);

                if (trip != null)
                {
                    trip.Employee = db.Employees.FirstOrDefault(emp => emp.ID == trip.EmployeeId);
                    trip.Expedition = db.Expeditions.FirstOrDefault(exp => exp.ID == trip.ExpeditionId);
                }

                return trip;
            }
        }

        public static List<Trip> GetTripsByExpId(int expId)
        {
            using (var db = new AppDBContext())
            {
                var trips = db.Trips.Where(t => t.ExpeditionId == expId).ToList();

                foreach (var trip in trips)
                {
                    trip.Employee = db.Employees.FirstOrDefault(emp => emp.ID == trip.EmployeeId);
                    trip.Expedition = db.Expeditions.FirstOrDefault(exp => exp.ID == trip.ExpeditionId);
                }

                return trips;
            }
        }

        public static bool CreateTrip(Trip tripToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Trips.Add(tripToCreate);

                    return db.SaveChanges() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public static bool UpdateTrip(Trip tripToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Trips.Update(tripToUpdate);

                    return db.SaveChanges() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public static bool DeleteTrip(int tripId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    var tripToDelete = GetTripById(tripId);

                    db.Remove(tripToDelete);

                    return db.SaveChanges() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
    }
}
