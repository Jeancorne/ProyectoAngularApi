using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Producto
{

    public class clsProducto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string correo_fabricante { get; set; }
        public string pais { get; set; }
        public int unidad_dispo { get; set; }
        public int unidad_vendidas { get; set; }
        public string precio { get; set; }
        public string imagen { get; set; }
        public string caracteristicas { get; set; }
        public DateTime fecha_lanzamiento { get; set; }
    }
}
