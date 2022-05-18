using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace NewExpProject.Data
{
    public static class PositionRepository
    {
        public static List<Position> GetPositions()
        {
            using (var db = new AppDBContext())
            {
                return db.Positions.ToList();
            }
        }

        public static Position GetPositionById(int positionId)
        {
            using (var db = new AppDBContext())
            {
                return db.Positions.FirstOrDefault(p => p.ID == positionId);
            }
        }

        public static bool CreatePosition(Position positionToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Positions.Add(positionToCreate);

                    return db.SaveChanges() >= 1;
                }
                catch (Exception e)
                {
                    return false;   
                }
            }
        }

        public static bool UpdatePosition(Position positionToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Positions.Update(positionToUpdate);

                    return db.SaveChanges() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public static bool DeletePosition(int positionId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    var postToDelete = GetPositionById(positionId);

                    db.Remove(postToDelete);

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
