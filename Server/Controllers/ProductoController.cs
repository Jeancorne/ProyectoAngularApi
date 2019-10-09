using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Producto;

namespace Server.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        List<clsProducto> listProduct = new List<clsProducto>();

        public ProductoController(ApplicationDbContext context)
        {
            this.context = context;
        }

        //OBTENER TODOS
        [HttpGet]
        public IEnumerable<clsProducto> Get(string strBuscar )
        {
            listProduct = context.productos.ToList();
            if (strBuscar != null)
            {
                List<clsProducto> newList = (from a in listProduct
                                             where (a.caracteristicas.Contains(strBuscar) ||
                                                    a.correo_fabricante.Contains(strBuscar) ||
                                                    Convert.ToString(a.Id).Contains(strBuscar) ||
                                                    a.Nombre.Contains(strBuscar) ||
                                                    a.pais.Contains(strBuscar))
                                             select a).ToList();
                return newList.ToList();
            }
            else
            {
                return context.productos.ToList();
            }


                    

        }
        public class GetAllArgs : QueryArgsBase
        {
            public string Filter { get; set; }
            public string Whatever { get; set; }
        }
        public interface IPaginationInfo
        {
            int PageNumber { get; }
            int PageSize { get; }
        }
        public abstract class QueryArgsBase : IPaginationInfo
        {
            public int PageNumber { get; set; } = 1;
            public int PageSize { get; set; } = 20;
        }

        // OBTENER UNO
        [HttpGet("{Id}")]
        public IActionResult GetById(int Id)
        {
            try
            {
                var producto = context.productos.FirstOrDefault(x => x.Id == Id);
                if (producto == null)
                {
                    return NotFound();
                }
                return Ok(producto);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        // REGISTRAR
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] clsProducto producto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    context.productos.Add(producto);
                    await context.SaveChangesAsync();
                    return Ok(producto.Id);
                    
                }
                else
                {
                    return BadRequest(ModelState);
                }
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex);                
            }

        }
        // ACTUALIZAR
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] clsProducto produ, int id)
        {
            try
            {
                if (id != produ.Id)
                {
                    return BadRequest();
                }
                context.Entry(produ).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                try
                {
                    await context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return NotFound();

                }
                return Ok(produ);
               // return NoContent();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var producto = context.productos.FirstOrDefault(x => x.Id == id);
                if (producto == null)
                {
                    return NotFound();
                }
                context.productos.Remove(producto);
                context.SaveChanges();
                return Ok(producto);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }





    }
}