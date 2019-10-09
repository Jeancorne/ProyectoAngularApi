import { Binary } from '@angular/compiler';


export interface ProductoModel {
    Id: number;
    Nombre: string;
    correo_fabricante: string;
    pais: string;
    unidad_dispo: number;
    unidad_vendidas: number;
    precio: string;
    imagen: string;
    caracteristicas: string;
    fecha_lanzamiento: Date;
}