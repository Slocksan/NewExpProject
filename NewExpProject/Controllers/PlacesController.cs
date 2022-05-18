using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NewExpProject.Data.EF;
using NewExpProject.Data.Repositories;

namespace NewExpProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlacesController
    {
        private readonly ILogger<PlacesController> _logger;

        public PlacesController(ILogger<PlacesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Place> GetAll()
        {
            return PlaceRepository.GetPlaces();
        }

        [HttpGet("{id}")]
        public Place GetById(int id)
        {
            return PlaceRepository.GetPlaceById(id);
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return PlaceRepository.DeletePlace(id);
        }

        [HttpPost]
        public bool Create([FromBody] Place entity)
        {
            return PlaceRepository.CreatePlace(entity);
        }

        [HttpPut]
        public bool Update([FromBody] Place entity)
        {
            return PlaceRepository.UpdatePlace(entity);
        }
    }
}
