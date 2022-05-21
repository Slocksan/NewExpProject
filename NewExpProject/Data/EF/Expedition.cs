using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;
using NewExpProject.Data.EF;
using Newtonsoft.Json;

namespace NewExpProject.Data
{
    [Table("EXPEDITIONS")]
    public class Expedition
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [Column("PLACE_ID")]
        [ForeignKey("PLACE")]
        public int PlaceId { get; set; }

        public Place Place { get; set; }

        [Required]
        [Column("START_DATE")]
        public DateTime StartDate { get; set; }

        [Column("END_DATE")]
        public DateTime EndDate { get; set; }

        [MaxLength(400)]
        [Column("DESCRIPTION")]
        public string Description { get; set; }

        [Column("ISDONE")]
        public bool? IsDone { get; set; }

        [Column("PRODUCTION")]
        public double? Production { get; set; }
    }
}
