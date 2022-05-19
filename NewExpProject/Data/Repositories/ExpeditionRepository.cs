using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace NewExpProject.Data.Repositories
{
    public class ExpeditionRepository
    {
        public static List<Expedition> GetExpeditions()
        {
            using (var db = new AppDBContext())
            {
                var exps = db.Expeditions.ToList();

                foreach (var expedition in exps)
                {
                    expedition.Place = db.Places.FirstOrDefault(p => p.ID == expedition.PlaceId);
                }
                return exps;
            }
        }

        public static Expedition GetExpeditionById(int expeditionId)
        {
            using (var db = new AppDBContext())
            {
                var exp = db.Expeditions.FirstOrDefault(p => p.ID == expeditionId);

                if (exp != null)
                {
                    exp.Place = db.Places.FirstOrDefault(p => p.ID == exp.PlaceId);
                }
                
                return exp;
            }
        }

        public static bool CreateExpedition(Expedition expeditionToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Expeditions.Add(expeditionToCreate);

                    return db.SaveChanges() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public static bool UpdateExpedition(Expedition ExpeditionToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Expeditions.Update(ExpeditionToUpdate);

                    return db.SaveChanges() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public static bool DeleteExpedition(int expeditionId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    var expeditionToDelete = GetExpeditionById(expeditionId);

                    db.Remove(expeditionToDelete);

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
