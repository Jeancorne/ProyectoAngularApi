
import { productoService } from '../../app/producto/producto.service';
import { ProductoModel } from '../../app/producto/producto';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  strBuscar: string;

  constructor(private productoslist: productoService, private router: Router, private routes: ActivatedRoute) {

  }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoslist.getProduct("")
      .subscribe(
        data => {
          this.productoslist.products = data as ProductoModel[];
        },
        error => {
          console.log(error);
        })
  }

  onKey(event: any) {
    var values = event.target.value;
    this.strBuscar = values;   
    this.productoslist.getProduct(this.strBuscar).subscribe(
      data => {
        this.productoslist.products = data as ProductoModel[];
      },
      error => {
        console.log(error);
      }
    )
  }

  DeletProduct(id: string) {
    console.log(id)
    this.productoslist.DeleteProduct(id).subscribe(
      res => {
        this.obtenerProductos();
      },
      error => {
        console.log(error);
      }
    );
  }

  Redirect(url: string, id) {
    this.router.navigate([url + id]);
  }


}
