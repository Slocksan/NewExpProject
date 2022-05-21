using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NewExpProject.Data;
using NewExpProject.Data.Repositories;

namespace NewExpProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpeditionsController
    {
        private readonly ILogger<ExpeditionsController> _logger;

        public ExpeditionsController(ILogger<ExpeditionsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Expedition> GetAll()
        {
            return ExpeditionRepository.GetExpeditions();
        }

        [HttpGet("{id}")]
        public Expedition GetById(int id)
        {
            return ExpeditionRepository.GetExpeditionById(id);
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return ExpeditionRepository.DeleteExpedition(id);
        }

        [HttpPost]
        public Expedition Create([FromBody] Expedition entity)
        {
            return ExpeditionRepository.CreateExpedition(entity);
        }

        [HttpPut]
        public bool Update([FromBody] Expedition entity)
        {
            return ExpeditionRepository.UpdateExpedition(entity);
        }
    }
}
