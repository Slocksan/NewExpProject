using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NewExpProject.Data.EF
{
    [Table("EMPLOYEES")]
    public class Employee
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("FIRSTNAME")]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("LASTNAME")]
        public string LastName { get; set; }

        [Required]
        [Column("POSITION_ID")]
        [ForeignKey("POSITION")]
        public int PositionID { get; set; }

        public Position Position { get; set; }

        [Column("ISREADY")]
        public bool? IsReady { get; set; }
    }
}
