using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NewExpProject.Data;
using NewExpProject.Data.EF;
using NewExpProject.Data.Repositories;

namespace NewExpProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController
    {
        private readonly ILogger<EmployeesController> _logger;

        public EmployeesController(ILogger<EmployeesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<Employee> GetAll()
        {
            return EmployeeRepository.GetEmployees();
        }

        [HttpGet("/api/get-all-free-employees")]
        [Authorize]
        public IEnumerable<Employee> GetAllFreeEmployees()
        {
            return EmployeeRepository.GetFreeEmployees();
        }

        [HttpGet("{id}")]
        [Authorize]
        public Employee GetById(int id)
        {
            return EmployeeRepository.GetEmployeeById(id);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public bool Delete(int id)
        {
            return EmployeeRepository.DeleteEmployee(id);
        }

        [HttpPost]
        [Authorize]
        public bool Create([FromBody] Employee entity)
        {
            return EmployeeRepository.CreateEmployee(entity);
        }

        [HttpPut]
        [Authorize]
        public bool Update([FromBody] Employee entity)
        {
            return EmployeeRepository.UpdateEmployee(entity);
        }
    }
}
