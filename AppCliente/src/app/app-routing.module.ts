import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { ProductosComponent } from './productos/productos.component';
import { from } from 'rxjs';
const routes: Routes = [
  {path:'Producto', component: ProductoComponent},
  {path:'Producto/:id', component: ProductoComponent},
  {path:'', component: ProductosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [ ProductoComponent ]