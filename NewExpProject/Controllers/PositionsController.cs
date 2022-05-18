using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using NewExpProject.Data;

namespace NewExpProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PositionsController : ControllerBase
    {
        private readonly ILogger<PositionsController> _logger;

        public PositionsController(ILogger<PositionsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Position> GetAll()
        {
            return PositionRepository.GetPositions();
        }

        [HttpGet("{id}")]
        public Position GetById(int id)
        {
            return PositionRepository.GetPositionById(id);
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return PositionRepository.DeletePosition(id);
        }

        [HttpPost]
        public bool Create([FromBody] Position entity)
        {
            return PositionRepository.CreatePosition(entity);
        }

        [HttpPut]
        public bool Update([FromBody] Position entity)
        {
            return PositionRepository.UpdatePosition(entity);
        }
    }
}
