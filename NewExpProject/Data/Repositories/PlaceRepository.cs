using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NewExpProject.Data.EF;

namespace NewExpProject.Data.Repositories
{
    public static class PlaceRepository
    {
        public static List<Place> GetPlaces()
        {
            using (var db = new AppDBContext())
            {
                return db.Places.ToList();
            }
        }

        public static Place GetPlaceById(int placeId)
        {
            using (var db = new AppDBContext())
            {
                return db.Places.FirstOrDefault(p => p.ID == placeId);
            }
        }

        public static bool CreatePlace(Place placeToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Places.Add(placeToCreate);

                    return db.SaveChanges() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public static bool UpdatePlace(Place placeToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Places.Update(placeToUpdate);

                    return db.SaveChanges() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public static bool DeletePlace(int placeId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    var placeToDelete = GetPlaceById(placeId);

                    db.Remove(placeToDelete);

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
