import { NearBindgen, LookupMap, call, near, view } from 'near-sdk-js';
import { Proyecto, estados } from './obra'
import { Licitacion } from './licitacion'


@NearBindgen({})
class Obra {
  proyectos: LookupMap<Proyecto>;

  @view({})
  get_proyectos({ from = 0, to = 0 }: { from: number, to: number }): Proyecto[] {
    const filtrados = this.proyectos.filter(proyecto => {
      if (proyecto >= from || proyecto <= to) {
        return this.proyectos.get(proyecto)
      }
    })
    return filtrados;
  }

  @view({})
  get_licitaciones_activas({ }): Proyecto[] {
    const filtrados = this.proyectos.filter(proyecto => {
      if (proyecto.checkActiva()) {
        return this.proyectos.get(proyecto)
      }
    })
    return filtrados;
  }

  @call({ payableFunction: true })
  add_obra({ nombre, ubicacion, descripcion, apertura_licitacion, fecha_limite_licitacion, hash_pliego, estado }): number {
    const unix_timestamp: number = Math.floor(Date.now() / 1000)
    const sender = near.predecessorAccountId();
    const proyecto = new Proyecto({ sender, unix_timestamp, nombre, ubicacion, descripcion, apertura_licitacion, fecha_limite_licitacion, hash_pliego, estado });
    this.proyectos.set(unix_timestamp, proyecto);
    near.log(`Se agrego una obra nueva: ${nombre}`);
    return 1
  }

  @call({ payableFunction: true })
  estado_obra({ index, estado }): number {
    const proyecto_select = this.proyectos.get(index);
    proyecto_select.cambia_estado(estado)
    return 1
  }


  @call({ payableFunction: true })
  add_licitacion({ index_obra, empresa, cuit, descripcion, monto, tiempo, hash_presupuesto, estado }): number {
    const sender = near.predecessorAccountId();
    const proyecto_select = this.proyectos.get(index_obra);
    proyecto_select.agrega_licitacion(sender, empresa, cuit, descripcion, monto, tiempo, hash_presupuesto, estado)
    //assert(this.proyectos.get(key) == value, "Error saving value")
    return 1
  }

  @call({ payableFunction: true })
  estado_licitacion({ index_obra, index_licitacion, estado }): number {
    const proyecto_select = this.proyectos.get(index_obra);
    proyecto_select.cambia_estado_licitacion(index_licitacion, estado)
    return 1
  }

  @call({ payableFunction: true })
  evaluar_licitacion({ index_obra, index_licitacion, valoracion, justificacion, estado }): number {
    const proyecto_select = this.proyectos.get(index_obra);
    proyecto_select.evalua_licitacion(index_licitacion, estado)
    return 1
  }
}

const assert = (condition, message) => { if (!condition) near.panic(message); }