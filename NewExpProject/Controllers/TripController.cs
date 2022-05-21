using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NewExpProject.Data;
using NewExpProject.Data.EF;
using NewExpProject.Data.Repositories;

namespace NewExpProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripController
    {
        private readonly ILogger<TripController> _logger;

        public TripController(ILogger<TripController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Trip> GetAll()
        {
            return TripRepository.GetTrips();
        }

        [HttpGet("{id}")]
        public Trip GetById(int id)
        {
            return TripRepository.GetTripById(id);
        }

        [HttpGet("/get-trips-by-expedition-id/{id}")]
        public IEnumerable<Trip> GetTripsByExpId(int id)
        {
            return TripRepository.GetTripsByExpId(id);
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return TripRepository.DeleteTrip(id);
        }

        [HttpPost]
        public bool Create([FromBody] Trip entity)
        {
            return TripRepository.CreateTrip(entity);
        }

        [HttpPut]
        public bool Update([FromBody] Trip entity)
        {
            return TripRepository.UpdateTrip(entity);
        }
    }
}
