using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Student
    {
        [Key]
        public int StudentId { get; set; }

        public string Name { get; set; }
        public int Age { get; set; }

        
       public int UniversityCampusId { get; set; }

        
        public virtual UniversityCampus UniversityCampus { get; set; }
    }
}