using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using NewExpProject.Data.EF;

namespace NewExpProject.Data
{
    [Table("POSITIONS")]
    public class Position
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("NAME")]
        public string Name { get; set; }

        public ICollection<Employee> Employees { get; set; }
    }
}
