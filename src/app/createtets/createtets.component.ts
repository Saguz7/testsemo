import { Component, OnInit } from '@angular/core';
 import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Examen} from '../models/vo/Examen';
 import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {RespuestaVO} from '../models/vo/RespuestaVO';
import {TipoLicencia} from '../models/vo/Tipo_Licencia';
import {Categoria} from '../models/vo/Categoria';

import {PreguntaVO} from '../models/vo/PreguntaVO';

declare var M: any;

const FeedQuery = gql`
query listExams{
  examenes{
    id,nombre,descripcion,total_preguntas,calificacion_minima,tiempo_limite,estatus,createdAt
     }
  }
`;

@Component({
  selector: 'app-createtets',
  templateUrl: './createtets.component.html',
  styleUrls: ['./createtets.component.css']
})
export class CreateTetsComponent implements OnInit {
  examen: any;
  examenaux: any;
  pregunta:any = new PreguntaVO();
  numeropreguntas: number;
  preguntas_generales: number;
  preguntas_especificas: number;
  preguntasacrear = new Array();
  licencias: number = 4;
  categoriapreguntas = new Array();
  arraylicencias = new Array();
  arraylicenciasboolean = new Array();
  arraylicenciasparaenviar = new Array();
  arraylicenciasparaenviaraux = new Array();

////////////////////////////////////

  arraycategoriaslibres = new Array();
  arraycategoriaslibresparamostrar = new Array();
  auxcantidadpreguntas0: number = 0;
  auxcantidadpreguntas1: number = 0;

 ///////////////////

  mensajedeprecaucion: string;
  items: any[];
  imagenes: Observable<any>;
  n: string;
  d: string;
  tP: number;
  cM: number;
  tL: number;
  data: Observable<any>;

  listadoexamenop:boolean = true;
  crearexamenop:boolean = false;
  vermodificarexamen:boolean = false;
  verrespuestamodulo:boolean = false;
  vercrearpreguntas:boolean = false;
  vercrearexamen:boolean = false;
  postcreacionrespuestas:boolean = false;

  constructor(
    private apollo?: Apollo,
    private apollo2?: Apollo

  ) { }

  ngOnInit() {


        $(document).ready(function(){
          $('.tooltipped').tooltip();
        });


    $(document).ready(function(){
      $('.tabs').tabs();
    });

    $(document).ready(function(){
      $('.modal').modal();
    });
    this.arraycategoriaslibres = [];
    this.arraycategoriaslibresparamostrar= [];
    this.traertiposlicencias();
    this.traerexamenes();
    this.examen = new Examen();
    this.examenaux = new Examen();
   }

   seleccionarlicenciasparaenviar(id: number){
     console.log(id);
     if(this.arraylicenciasboolean[id]){
       this.arraylicenciasboolean[id] = false;
     }else{
       this.arraylicenciasboolean[id] = true;
     }
     console.log(this.arraylicenciasboolean);
   }

  crearexamen(examenaux: any){
     this.data = examenaux.examenes;
  }

  crearlicencias(licenciaaux: any){
     this.arraylicencias = licenciaaux.tiposLicencia;
     for(var i = 0; i < this.arraylicencias.length; i++){
      this.arraylicenciasboolean.push(false);
     }

  }

  pregenerales(){
     this.preguntas_especificas = this.examen.total_preguntas - this.preguntas_generales;
  }

  mostrarconfpreguntas(){
     this.crearcategorias()
  }

  crearcategorias(){
    this.apollo.use('endpointexamen')
      .watchQuery({
        query: gql`
        query listCategories{
             categorias{
                 id,
                 nombre,
                 descripcion,
                 estatus,
                 createdAt
                 }
              }
        `,
      })
      .valueChanges.subscribe(result => {
          this.crearcategoriasparaselect(result.data)
      });

  }

  crearcategoriasparaselect(categoriaaux: any){
     this.arraycategoriaslibres = categoriaaux.categorias;

  }
  //Funcion para crear Preguntas
  crearpreguntasfuncion(){
    this.preguntasacrear = new Array();
    console.log(this.numeropreguntas);
    for(var i= 0; i < this.numeropreguntas;i++){
      let respuestascreada = new RespuestaVO();
      respuestascreada.id = (i+1);
      respuestascreada.descripcion = "";
      respuestascreada.correcto = false;
      respuestascreada.id_pregunta = 1;
      this.preguntasacrear.push(respuestascreada);
    }
  }

  listadoexamenes(event: any){

    this.listadoexamenop = true;
    this.crearexamenop = false;
    this.verrespuestamodulo = false;
    this.vercrearpreguntas = false;

  }

  mostrarcrearexamen(){
    this.examen = new Examen();
    this.mensajedeprecaucion = "";
    this.vermodificarexamen = false;

    this.listadoexamenop = false;
    this.crearexamenop = true;
    this.verrespuestamodulo = false;
    this.vercrearpreguntas = false;

    this.traertiposlicencias();
    this.crearcategorias();

  }

  referenciaracambiodeatributos(examen: any){
    this.vermodificarexamen = true;
    this.verrespuestamodulo = false;
    this.vercrearpreguntas = false;
    this.examenaux = examen;

  }



  traertiposlicencias(){
     this.apollo.use('endpointexamen')
      .watchQuery({
        query: gql`
        query listTypesLicense{
          tiposLicencia{
            id,
            nombre,
            descripcion,
            estatus,
            createdAt
              }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.crearlicencias(result.data)
      });
  }

  traerexamenes(){
     this.apollo.use('endpointexamen')
      .watchQuery({
        query: gql`
        query listExams{
          examenes{
            id,nombre,descripcion,total_preguntas,calificacion_minima,tiempo_limite,estatus,createdAt
             }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.crearexamen(result.data)
      });
  }

  upvote() {
   this.arraylicenciasparaenviar = [];
    for(var i = 0; i < this.arraylicenciasboolean.length;i++){
      if(this.arraylicenciasboolean[i]){
          this.arraylicenciasparaenviar.push(this.arraylicencias[i]);
      }
    }

    /*
     >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    */
    this.n = this.examen.nombre;
    this.d = this.examen.descripcion;
    this.tP = this.examen.total_preguntas;
    this.cM = this.examen.calificacion_minima;
    this.tL =  this.examen.tiempo_limite;

    console.log(this.arraylicenciasparaenviar);

/*

    this.apollo.use('endpointexamen')
      .mutate({
        mutation: gql`
        mutation newExam($n:String,$d:String,$tP:Int,$cM:Float,$tL:Int)
        {
          crearExamen(nombre:$n,descripcion:$d,total_preguntas:$tP,calificacion_minima:$cM,tiempo_limite:$tL)
          {
            id,
            nombre,
            descripcion,
            total_preguntas,
            calificacion_minima,
            tiempo_limite,
            estatus,
            createdAt
          }
        }
        `,
            variables: {
              n: this.examen.nombre,
            d: this.examen.descripcion,
            tP: this.examen.total_preguntas,
            cM: this.examen.calificacion_minima,
            tL: this.examen.tiempo_limite
          }
          }).subscribe(({ data }) => {
        M.toast({html: 'Se ha agregado un nuevo examen'})
        //window.location.href = "/mantenimientotest";
      },(error) => {
        var divisiones = error.message.split(":", 2);
        M.toast({html: divisiones[1]})
        });

        */

  }


  seleccategoriaevent(idcategoria: any){
    console.log(idcategoria);
     this.arraycategoriaslibresparamostrar.push(this.arraycategoriaslibres[idcategoria]);
     var index = this.arraycategoriaslibres.indexOf(idcategoria);

     console.log(this.arraycategoriaslibres);
     var auxarray = [];

     for(var i =0; i < this.arraycategoriaslibres.length;i++){
       if(idcategoria == i){
         console.log("Aqui esta");

       }else{
         console.log("No nes");
         auxarray.push(this.arraycategoriaslibres[i]);
       }
     }
     this.arraycategoriaslibres = auxarray;
     console.log(this.arraycategoriaslibres);

     console.log(index);

  }

  agregaraarrayinput(licencia: any,id: number){
    this.arraycategoriaslibres.push(licencia);
    this.arraycategoriaslibresparamostrar.splice(id, 1);
    this.cambiarmensadedeerror();
  }

  mensajedeerror(licencia: any,event: any){
     console.log("mensaje de error");
     console.log(licencia);
     console.log(event.target.value);
     licencia.cantidadpreguntas = event.target.value;
     console.log(this.arraycategoriaslibresparamostrar);
      this.cambiarmensadedeerror();

   }

   cambiarmensadedeerror(){
     var contador = 0;

     for(var i = 0; i < this.arraycategoriaslibresparamostrar.length;i++){
       console.log(Number(this.arraycategoriaslibresparamostrar[i].cantidadpreguntas))
         contador = contador + Number(this.arraycategoriaslibresparamostrar[i].cantidadpreguntas);
         console.log(contador);
     }
     if((this.examen.total_preguntas - contador)> 0){
       this.vercrearexamen = false;
       this.mensajedeprecaucion = "Le faltan " + (this.examen.total_preguntas - contador) + " preguntas para asignar.";
        var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+this.mensajedeprecaucion+'</div></span>';
       M.toast({html: toastHTML});
     }else{
       if((this.examen.total_preguntas - contador) == 0){
         this.vercrearexamen = true;
         this.mensajedeprecaucion = "Ya se asignaron todas las preguntas.";
          var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+this.mensajedeprecaucion+'</div></span>';
         M.toast({html: toastHTML});
       }else{
         this.vercrearexamen = false;
         this.mensajedeprecaucion = "Se ha excedido por " + ( (this.examen.total_preguntas - contador) * -1 ) + " preguntas. Favor de revisar el total de preguntas.";
          var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+this.mensajedeprecaucion+'</div></span>';
         M.toast({html: toastHTML});
       }

      }
   }

   crearexamenenviarobj(){

     var rutaform = (<HTMLInputElement>document.getElementById("ruta")).value;

     this.pregunta.ruta = rutaform;
     this.pregunta.respuestas = this.preguntasacrear;


     console.log(this.preguntasacrear);
     console.log(this.pregunta);

   }

   asignartrue(pregunta: any){
     for(var i = 0; i < this.preguntasacrear.length;i++){
       this.preguntasacrear[i].correcto = false;
     }
     pregunta.correcto = true;
     this.postcreacionrespuestas = true;
   }

}
