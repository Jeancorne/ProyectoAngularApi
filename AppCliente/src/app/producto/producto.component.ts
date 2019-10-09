import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ProductoModel } from './producto';
import { paisModel } from './pais.model';
import { productoService } from './producto.service';
import { RequestOptions } from '@angular/http';
import { HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { empty } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit {
  public model: ProductoModel;
  private oldModel: ProductoModel[];
  private fileName;
  public newvalue = "";
  public id: string;
  public pais: string;
  public oldDate: Date;
  constructor(private servicesProducto: productoService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.getPais();

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.getUno();
    }

  }



  ngOnInit() {
    /* this.productForm = this.formBuilder.group({
      'prod_name': [null]
    }); */


  }
  getUno() {
    this.servicesProducto.getProductOne(this.id).subscribe(
      res => {
        this.oldDate = res["fecha_lanzamiento"];
        this.fileName = res["imagen"];
        this.servicesProducto.products = res as ProductoModel[];

      }
    )
  }
  onKey(event: any) {
    var values = event.target.value;
    this.newvalue = new Intl.NumberFormat('es-CO', { style: "currency", currency: "COP" }).format(values)
  }


  getPais() {
    this.servicesProducto.getPais().subscribe(
      res => {
        this.servicesProducto.paisModel = res as paisModel[];
      }
    )
  }

  fileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.fileName = reader.result.toString();
    };
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  saveProduct(form: NgForm) {
    var newFecha;
    if (form.value.fecha_lanzamiento == null) {
      newFecha = new Date(this.oldDate);
    } else {
      var formatFecha = form.value.fecha_lanzamiento.year + "/" + form.value.fecha_lanzamiento.month + "/" + form.value.fecha_lanzamiento.day
      newFecha = new Date(formatFecha);
    }

    this.model = {
      Id: Number(this.id),
      Nombre: form.value.Nombre,
      correo_fabricante: form.value.correo_fabricante,
      pais: form.value.pais,
      unidad_dispo: form.value.unidad_dispo,
      unidad_vendidas: form.value.unidad_vendidas,
      precio: form.value.precio,
      imagen: this.fileName,
      caracteristicas: form.value.caracteristicas,
      fecha_lanzamiento: newFecha
    }


    if (this.id != null) {

      this.servicesProducto.UpdateProducto(this.model, this.id).subscribe(
        res => {
          this.Redirect("", 0);

        }
      )
    } else {
      this.servicesProducto.CreateProducto(this.model).subscribe(
        res => {
          this.Redirect("", 0);
        }
      )
    }

  }


  Redirect(url: string, id) {
    if (id == 0) {
      this.router.navigate([url]);
    } else {
      this.router.navigate([url + id]);
    }

  }





}
