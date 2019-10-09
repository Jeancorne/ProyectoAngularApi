import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { productoService } from './producto/producto.service';
import {CustExtBrowserXhr} from './cust-ext-browser-xhr';
import { BrowserXhr } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadModule } from 'angular2-image-upload';
import { ReactiveFormsModule  } from '@angular/forms';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { ProductosComponent } from './productos/productos.component';

 
@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    ProductosComponent,
  ],
  imports: [
    AngularFileUploaderModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ImageUploadModule.forRoot()
  ],
  providers: [
    productoService,
    {provide: BrowserXhr, useClass:CustExtBrowserXhr},
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
