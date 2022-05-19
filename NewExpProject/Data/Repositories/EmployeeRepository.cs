using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NewExpProject.Data.EF;

namespace NewExpProject.Data.Repositories
{
    public class EmployeeRepository
    {
        public static List<Employee> GetEmployees()
        {
            using (var db = new AppDBContext())
            {
                var employees = db.Employees.ToList();
                foreach (var employee in employees)
                {
                    employee.Position = db.Positions.FirstOrDefault(p => p.ID == employee.PositionID);
                }
                return employees;
            }
        }

        public static Employee GetEmployeeById(int employeeId)
        {
            using (var db = new AppDBContext())
            {
                var employee = db.Employees.FirstOrDefault(p => p.ID == employeeId);
                if (employee != null)
                {
                    employee.Position = db.Positions.FirstOrDefault(p => p.ID == employee.PositionID);
                }

                return employee;
            }
        }

        public static bool CreateEmployee(Employee employeeToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Employees.Add(employeeToCreate);

                    return db.SaveChanges() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public static bool UpdateEmployee(Employee employeeToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Employees.Update(employeeToUpdate);

                    return db.SaveChanges() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public static bool DeleteEmployee(int employeeId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    var employeeToDelete = GetEmployeeById(employeeId);

                    db.Remove(employeeToDelete);

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
