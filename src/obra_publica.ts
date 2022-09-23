import {  NearBindgen, call, near,view} from 'near-sdk-js';
import { Proyecto, estados } from './obra'
import { Licitacion } from './licitacion'


@NearBindgen({})
class Obra{
  //proyectos: {key:number,proyecto:Proyecto}[] = [];
  proyectos: Proyecto[] = [];
  demo_string: string = "Desarrollo Obra Publica";

  @view({})
  get_demo_string(): string {
    return this.demo_string;
  }

  @view({})
  get_proyectos({ from = 0,to=0, limit = 10 }: { from: number,to:number, limit: number }): Proyecto[] {
    // VER LA POSIBILIDAD DE BUSCAR EL INDEX DEL FROM Y DESDE ESE INDEX HACER UN LOOP HASTA QUE NO SE CUMPLA LA CONDICION
    const filtrados = this.proyectos.filter(proyecto => {
      if(proyecto.unix_timestamp >= from && proyecto.unix_timestamp<= to ){
        return proyecto
      }
    })
    return filtrados;
  }

  @view({})
  get_licitaciones_activas({}): Proyecto[] {
    const now:number = Math.floor(Date.now() / 1000)
    const filtrados = this.proyectos.filter(proyecto => {
      if(proyecto.fecha_limite_licitacion >= now && proyecto.estado===1 ){
        return proyecto
      }
    })
    return filtrados;
  }
  
  @call({})
  set_demo_string({ message }: { message: string }): void {
    near.log(`Saving demo_string ${message}`);
    this.demo_string = message;
  }

  @call({payableFunction: true})
  add_obra({ nombre,ubicacion,descripcion,apertura_licitacion,fecha_limite_licitacion,hash_pliego,estado}) {
    // KEY fecha en unix, Value Proyecto
    //this.proyectos.set(key, value);
    const unix_timestamp = Math.floor(Date.now() / 1000)
    const sender = near.predecessorAccountId();
    const proyecto = new Proyecto({sender,unix_timestamp,nombre,ubicacion,descripcion,apertura_licitacion,fecha_limite_licitacion,hash_pliego,estado});
    this.proyectos.push(proyecto);
    //assert(this.proyectos.get(key) == value, "Error saving value")
    return 1
  }

  @call({payableFunction: true})
  estado_obra({index_obra,index_licitacion,estado}) {
    this.proyectos[index_obra]={...this.proyectos[index_obra],estado};
    //assert(this.proyectos.get(key) == value, "Error saving value")
    return 1
  }


  @call({payableFunction: true})
  add_licitacion({index_obra,empresa,cuit,descripcion,monto,tiempo,valoracion,justificacion,hash_presupuesto,estado}) {
    const sender = near.predecessorAccountId();
    const unix_timestamp = Math.floor(Date.now() / 1000)
    const licitacion = new Licitacion({sender,unix_timestamp,empresa,cuit,descripcion,monto,tiempo,hash_presupuesto,estado});
    this.proyectos[index_obra].licitaciones.push(licitacion);
    //assert(this.proyectos.get(key) == value, "Error saving value")
    return 1
  }

  @call({payableFunction: true})
  estado_licitacion({index_obra,index_licitacion,estado}) {
    this.proyectos[index_obra].licitaciones[index_licitacion]={...this.proyectos[index_obra].licitaciones[index_licitacion],estado};
    //assert(this.proyectos.get(key) == value, "Error saving value")
    return 1
  }

  @call({payableFunction: true})
  evaluar_licitacion({index_obra,index_licitacion,valoracion,justificacion,estado}) {
    const unix_timestamp = Math.floor(Date.now() / 1000)
    this.proyectos[index_obra].licitaciones[index_licitacion]={...this.proyectos[index_obra].licitaciones[index_licitacion],fecha_evaluacion:unix_timestamp,valoracion,justificacion,estado};
    //assert(this.proyectos.get(key) == value, "Error saving value")
    return 1
  }
}

//function assert(condition, message) { if(!condition) near.panic(message); }