import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ProductoModel } from './producto';
import { paisModel } from './pais.model';
import { Observable, throwError, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { ok } from 'assert';
@Injectable()
export class productoService {
  readonly URL_API = "http://localhost:49758/api/Producto"
  
  products: ProductoModel[];

  paisModel:paisModel[];
  constructor(private http: HttpClient) { }

  getProduct(strBuscar: string) {
    
    return this.http.get(this.URL_API+"?strBuscar="+strBuscar);
  }

  getPais(){
    return this.http.get("https://restcountries.eu/rest/v2/all")
  }

  DeleteProduct(id:string){
    return this.http.delete(this.URL_API+"/"+id);
  }

  UpdateProducto(products: ProductoModel, id:string){
    return this.http.put(this.URL_API+"/"+id,products);
  }

  getProductOne(id:string) {
      //console.log(id)      
      return this.http.get(this.URL_API+"/"+id);
  }

  CreateProducto(products: ProductoModel) {
    return this.http.post(this.URL_API, products);
    //return this.http.post<ProductoModel>(this.baseURL, producto);
  }
  
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
