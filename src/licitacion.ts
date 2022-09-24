export const ESTADOS = ["PRESENTADO", "EVALUACION", "GANADOR", "DESCARTADO"];

export class Licitacion {
  sender: string;
  UNIX_TIME_STAMP: number;
  empresa: string;
  cuit: number;
  descripcion: string;
  monto: number;
  tiempo: number; // en dias
  fechaEvaluacion: number;
  valoracion: number;
  justificacion: string;
  hashPresupuesto: string;
  estado: number;

  constructor({
    sender,
    UNIX_TIME_STAMP,
    empresa,
    cuit,
    descripcion,
    monto,
    tiempo,
    hashPresupuesto,
    estado,
  }: {
    sender: string;
    UNIX_TIME_STAMP: number;
    empresa: string;
    cuit: number;
    descripcion: string;
    monto: number;
    tiempo: number; // en dias
    hashPresupuesto: string;
    estado: number;
  }) {
    this.sender = sender;
    this.UNIX_TIME_STAMP = UNIX_TIME_STAMP;
    this.empresa = empresa;
    this.cuit = cuit;
    this.descripcion = descripcion;
    this.monto = monto;
    this.tiempo = tiempo;
    this.hashPresupuesto = hashPresupuesto;
    this.estado = estado;
  }

  cambiaEstado(estado) {
    this.estado = estado;
  }

  evalua(valoracion, justificacion, estado) {
    const UNIX_TIME_STAMP = Math.floor(Date.now() / 1000);
    this.fechaEvaluacion = UNIX_TIME_STAMP;
    this.valoracion = valoracion;
    this.justificacion = justificacion;
    this.estado = estado;
  }
}
