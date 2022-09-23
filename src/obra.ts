export const estados = ["STAND BY", "LICITACION", "ACTIVA" ,"FINALIZADA" ,"CANCELADA"] 
import { Licitacion } from './licitacion'

export class Proyecto {
    sender:string;
    unix_timestamp: number;
    nombre: string;
    ubicacion:string;
    descripcion: string;
    apertura_licitacion: number;
    fecha_limite_licitacion: number;
    hash_pliego:string; 
    licitaciones: Licitacion[];
    estado:number

  constructor({ sender,unix_timestamp,nombre,ubicacion,descripcion,apertura_licitacion,fecha_limite_licitacion,hash_pliego,estado }: { 
    sender:string;
    unix_timestamp: number;
    nombre: string;
    ubicacion:string;
    descripcion: string;
    apertura_licitacion:number;
    fecha_limite_licitacion: number;
    hash_pliego:string; 
    estado:number }) {
        this.sender=sender;
        this.unix_timestamp=unix_timestamp;
        this.nombre=nombre;
        this.ubicacion=ubicacion;
        this.descripcion=descripcion;
        this.apertura_licitacion=apertura_licitacion;
        this.fecha_limite_licitacion=fecha_limite_licitacion;
        this.hash_pliego=hash_pliego;
        this.estado=estado;
  }
}