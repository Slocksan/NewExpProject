using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NewExpProject.Data.EF
{
    [Table("PLACES")]
    public class Place
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("NAME")]
        public string Name { get; set; }

        [Required]
        [Column("LATITUDE")]
        public double Latitude { get; set; }

        [Required]
        [Column("LONGITUDE")]
        public double Longitude { get; set; }

        [Required]
        [MaxLength(300)]
        [Column("DESCRIPTION")]
        public string Description { get; set; }

        public ICollection<Expedition> Expeditions { get; set; }
    }
}
