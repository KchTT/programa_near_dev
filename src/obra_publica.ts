import { NearBindgen, LookupMap, call, near, view } from "near-sdk-js";
import { Proyecto, ESTADOS } from "./obra";
import { Licitacion } from "./licitacion";

@NearBindgen({})
class Obra {
  proyectos: LookupMap<Proyecto>;

  @view({})
  getProyectos({
    from = 0,
    to = 0,
    limit = 10,
  }: {
    from: number;
    to: number;
    limit: number;
  }): Proyecto[] {
    const FILTRADOS = this.proyectos.filter((proyecto) => {
      if (proyecto >= from || proyecto <= to) {
        return this.proyectos.get(proyecto);
      }
    });
    return FILTRADOS;
  }

  @view({})
  getLicitacionesActivas({}): Proyecto[] {
    const FILTRADOS = this.proyectos.filter((proyecto) => {
      if (proyecto.checkActiva()) {
        return this.proyectos.get(proyecto);
      }
    });
    return FILTRADOS;
  }

  @call({ payableFunction: true })
  addObra({
    nombre,
    ubicacion,
    descripcion,
    aperturaLicitacion,
    fechaLimiteLicitacion,
    hashPliego,
    estado,
  }) {
    const UNIX_TIME_STAMP: number = Math.floor(Date.now() / 1000);
    const sender = near.predecessorAccountId();
    const proyecto = new Proyecto({
      sender,
      UNIX_TIME_STAMP,
      nombre,
      ubicacion,
      descripcion,
      aperturaLicitacion,
      fechaLimiteLicitacion,
      hashPliego,
      estado,
    });
    this.proyectos.set(UNIX_TIME_STAMP, proyecto);
    near.log(`Se agrego una obra nueva: ${nombre}`);
    return 1;
  }

  @call({ payableFunction: true })
  estadoObra({ index, estado }) {
    const PROYECTO_SELECT = this.proyectos.get(index);
    PROYECTO_SELECT.cambia_estado(estado);
    return 1;
  }

  @call({ payableFunction: true })
  addLicitacion({
    indexObra,
    empresa,
    cuit,
    descripcion,
    monto,
    tiempo,
    hashPresupuesto,
    estado,
  }) {
    const SENDER = near.predecessorAccountId();
    const PROYECTO_SELECT = this.proyectos.get(indexObra);
    PROYECTO_SELECT.agrega_licitacion(
      SENDER,
      empresa,
      cuit,
      descripcion,
      monto,
      tiempo,
      hashPresupuesto,
      estado
    );
    //assert(this.proyectos.get(key) == value, "Error saving value")
    return 1;
  }

  @call({ payableFunction: true })
  estadoLicitacion({ indexObra, indexLicitacion, estado }) {
    const PROYECTO_SELECT = this.proyectos.get(indexObra);
    PROYECTO_SELECT.cambia_estado_licitacion(indexLicitacion, estado);
    return 1;
  }

  @call({ payableFunction: true })
  evaluarLicitacion({
    indexObra,
    indexLicitacion,
    valoracion,
    justificacion,
    estado,
  }) {
    const PROYECTO_SELECT = this.proyectos.get(indexObra);
    PROYECTO_SELECT.evalua_licitacion(indexLicitacion, estado);
    return 1;
  }
}

//const assert = (condition, message) => { if(!condition) panic(message); }
