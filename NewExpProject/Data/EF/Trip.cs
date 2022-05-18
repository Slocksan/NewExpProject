using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NewExpProject.Data.EF
{
    [Table("TRIPS")]
    public class Trip
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [Column("EMPLOYEE_ID")]
        [ForeignKey("EMPLOYEE")]
        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }

        [Required]
        [Column("EXPEDITION_ID")]
        [ForeignKey("EXPEDITION")]
        public int ExpeditionId { get; set; }

        public Expedition Expedition { get; set; }
    }
}
