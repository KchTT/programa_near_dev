import { Licitacion } from "./licitacion";

export const ESTADOS = [
  "STAND BY",
  "LICITACION",
  "ACTIVA",
  "FINALIZADA",
  "CANCELADA",
];

export class Proyecto {
  sender: string;
  unixTimeStamp: number;
  nombre: string;
  ubicacion: string;
  descripcion: string;
  aperturaLicitacion: number;
  fechaLimiteLicitacion: number;
  hashPliego: string;
  licitaciones: Licitacion[];
  estado: number;

  constructor({
    sender,
    unixTimeStamp,
    nombre,
    ubicacion,
    descripcion,
    aperturaLicitacion,
    fechaLimiteLicitacion,
    hashPliego,
    estado,
  }: {
    sender: string;
    unixTimeStamp: number;
    nombre: string;
    ubicacion: string;
    descripcion: string;
    aperturaLicitacion: number;
    fechaLimiteLicitacion: number;
    hashPliego: string;
    estado: number;
  }) {
    this.sender = sender;
    this.unixTimeStamp = unixTimeStamp;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.descripcion = descripcion;
    this.aperturaLicitacion = aperturaLicitacion;
    this.fechaLimiteLicitacion = fechaLimiteLicitacion;
    this.hashPliego = hashPliego;
    this.estado = estado;
  }

  cambiaEstado(estado) {
    this.estado = estado;
  }

  checkBetween(from, to) {
    return this.unixTimeStamp >= from && this.unixTimeStamp <= to
      ? true
      : false;
  }

  checkActiva() {
    const NOW: number = Math.floor(Date.now() / 1000);
    return true;
  }

  agregaLicitacion(
    sender,
    empresa,
    cuit,
    descripcion,
    monto,
    tiempo,
    hashPresupuesto,
    estado
  ) {
    const UNIX_TIME_STAMP = Math.floor(Date.now() / 1000);
    const LICITACION = new Licitacion({
      sender,
      UNIX_TIME_STAMP,
      empresa,
      cuit,
      descripcion,
      monto,
      tiempo,
      hashPresupuesto,
      estado,
    });
    this.licitaciones.push(LICITACION);
  }

  cambiaEstadoLicitacion(indexLicitacion, estado) {
    this.licitaciones[indexLicitacion].cambiaEstado(estado);
  }

  evaluaLicitacion(indexLicitacion, valoracion, justificacion, estado) {
    this.licitaciones[indexLicitacion].evalua(
      valoracion,
      justificacion,
      estado
    );
  }
}
