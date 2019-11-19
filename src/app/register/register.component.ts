import { Component, OnInit , ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {PersonaVO} from '../models/vo/PersonaVO';
 import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
  import { ActivatedRoute, Router} from '@angular/router';
  import { map } from 'rxjs/operators';
  import gql from 'graphql-tag';
 import { TestComponent } from '../test/test.component';
 import {BuscarExamen} from '../models/vo/BuscarExamen';
import {Examen} from '../models/vo/Examen';
import {Apollo} from 'apollo-angular';
 import {ExamenVO} from '../models/vo/ExamenVO';
import {PreguntaVO} from '../models/vo/PreguntaVO';
import {RespuestaVO} from '../models/vo/RespuestaVO';
import {ExamenContestadoVO} from '../models/vo/ExamenContestadoVO';
import {PregAsigResp} from '../models/vo/PregAsigResp';
import * as M from '../graphql/mutations';

import {User} from "../core/models/user.model";
import {StorageService} from "../core/services/storage.service";
import { FileUploadService } from '../core/file-upload.service';

const feedQuery = gql`
query listExams{
  examenes{
    id,nombre,descripcion,total_preguntas,calificacion_minima,tiempo_limite,estatus,createdAt
     }
  }
`;
 @Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;
  public captures: Array<any>;
  descripcion: string;
  imagen: File;
  fileToUpload: File = null;
  selecetdFile : File;
  imagePreview: string;
  personaVO: any;
  persona: any;
  imagenes: Observable<any>;
  imagenesAux: Observable<any>;
  registroabuscar: string;
  examenes: Observable<any[]>;

    horaempiezoexamen: string;
    diaempiezoexamen: string;
    horaterminoexamen: string;
  puntero: number = 1;

  acumuladorsegundos: number = 0;
  acumuladorminutos: number = 0;
  public user: User;

  //confExamen: Observable<BuscarExamen>;

  mostrarexamenes: boolean = false;
  advertenciaCURP: boolean = false;
  mostrartBtnSelTest: boolean = false;
  tomarfoto: boolean = false;
  banderacurpcorrecta: boolean = false;
  quitartodo: boolean = true;
  mostrarbotonrealizarexamen: boolean = false;
  ejemplo: boolean = false;
  quitarempezar: boolean = false;

  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  curp: string;
  id: number;
  curpenviar: string;
  public mostrartest:boolean = false;
  configuracionExamen: any = {};

  examen: ExamenVO;
  preguntas: PreguntaVO[];
  respuestas1: RespuestaVO[];
  respuestas2: RespuestaVO[];
  respuestas3: RespuestaVO[];

  preguntaobjamostrar: PreguntaVO;
  respuestasobjamostrar: RespuestaVO[];
  examenContestadoalmomento: any;

  mostrarcorrectas:boolean = false;
  mostrarbotonsiguiente:boolean = false;
  mostrarresultadosboton:boolean = false;
   mostrar:boolean = false;

    quitarpararesultados:boolean = true;
    siaprobo:boolean = false;


      public hora:number = 0;
      public minutos:number = 0;
      public segundos:number = 0;

      public con=0;
      public colection:Array<any> = [];
      public contador:any;
      public contador2:any;
      public hora2:number = 0;
      public minutos2:number = 0;
      public segundos2:number = 0;
      mensaje: any;

      public horatext:any;
      public minutosext:string;
      public segundosext:string;

       confExamen: Observable<any>;

  constructor(
    private apollo?: Apollo,
      private _route?: ActivatedRoute,
    private _router?: Router,
       private storageService?: StorageService,
       private fileUploadService?: FileUploadService

   ) {
    this.captures = [];
   }

  ngOnInit() {

    this.user = this.storageService.getCurrentUser();





    /*

    this.confExamen = this.allSearchExamenGQL.watch({
      i: 10,
      n: ""
    }, {
      fetchPolicy: 'network-only'
    })
      .valueChanges
      .pipe(
        map(result => console.log(result.data))
      );
    console.log("---------------------Separador de Modulo-------------");

    console.log(this.confExamen);
    console.log("---------------------Separador de Modulo-------------");

    */

     this.persona = new PersonaVO();

     this.nombre = "Ejemplo";

     this.descripcion = "Ejemplo";



    this.persona.nombre = '';
    this.persona.primer_apellido = '';
    this.persona.segundo_apellido = '';
    this.persona.curp = '';

  }


  //Traemos los examenes disponibles

  traerexamenes(){
    console.log("---------------------Entra aqui-------------222222222222222222222222222222222");
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
   console.log("---------------------Entra aqui-------------");

  }



  //GuardarObjetoDeConfiguracionExamen

  configuExamen(configuraciondelexamen: any){
    this.configuracionExamen = configuraciondelexamen.examen;
  }

  //Guardamos una lista de objetos

  guardarExamenes(examenestipo: any){
    this.examenes = examenestipo.examenes;
    console.log(this.examenes);

    console.log(examenestipo.examenes);
    this.imagenes = this.imagenesAux;
  }

  crearexamen(examenaux: any){
     this.examenes = examenaux.examenes;
  }
  ////Metodo upvote para agregar

  upvote() {
    console.log(this.nombre);
    this.nombre = this.persona.nombre;
    console.log(this.descripcion);
    this.nombre = this.persona.nombre;
  }

  //Metodo que mandara el objeto PersonaVO por medio de HHTPREQUEST

  registrardatos() {

    if(this.captures[0]==null){
      alert("Favor de tomarse la foto");
     }else{

         this.onTest();
    }
    this.enviaralExamen();
  }

  onTest(): void{
    this.upPerson();
    console.log("Esta curp se envia -->"+this.curpenviar);
     //document.location.href='/test/' + this.curpenviar;
  }

  enviaralExamen(): void{
    this.quitartodo = false;
    this.mostrartest = true;
    this.ejemplo = true;
    // document.location.href='/test/' + this.curpenviar;
  }


  //Metodo para tomar foto de la camara web, y la guarda en una variable que se estara reemplazando cada vez que se lanze este evento

  public capture() {
      var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
      this.captures[0] = this.canvas.nativeElement.toDataURL("image/png");
      this.imagen = this.captures[0];
      console.log(this.imagen);

      var imagefile = this.dataURLtoFile(this.imagen, 'image/png');
      var blob = imagefile.slice(0, imagefile.size, 'image/png');
      var newFile = new File([blob], 'name.png', {type: 'image/png'});
       console.log(newFile);
        this.apollo
         .mutate({
           mutation: M.SINGLE_UPLOAD,
           variables: {
             file: newFile
           }
         }).subscribe(
           data => {
             console.log('upload successfully');
           },
           err => console.log(err)
         );
      this.tomarfoto = true;
      this.mostrarboton();


    //  uploader: FileUploader = new FileUploader({ url: "http://localhost:4200/", removeAfterUpload: false, autoUpload: true });


   }

     dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

   mostrarboton(){
     if((this.banderacurpcorrecta == true) && (this.tomarfoto == true)){
       this.mostrartBtnSelTest = true;
     }else{
       this.mostrartBtnSelTest = false;
     }
    }


   //Metodo para verificar la curp
   verificarCURP(){
     var regex =
                     "[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}" +
                     "(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])" +
                     "[HM]{1}" +
                     "(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)" +
                     "[B-DF-HJ-NP-TV-Z]{3}" +
                     "[0-9A-Z]{1}[0-9]{1}$";
                          let regexp = new RegExp(regex);
                          if(regexp.test(this.persona.curp)){
                            this.banderacurpcorrecta = true;
                            this.advertenciaCURP = false;

                            this.mostrarboton()
                             //Aqui mandaria a llamar para ver si la CURP no tiene bloqueo
                          }else{
                            this.advertenciaCURP = true;
                            this.mostrartBtnSelTest = false;

                          }
                          console.log(regexp.test(this.persona.curp));
   }

   //Metodo que muestra la camara web en pantalla

  public ngAfterViewInit() {
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
              this.video.nativeElement.srcObject = stream;
              this.video.nativeElement.play();
          });
      }
  }

  beforemostrarexamenes(){
    this.mostrartBtnSelTest = false;

    this.mostrarexamenes = true;

    this.traerexamenes();
  }

  aftermostrarexamenes(){
    this.mostrarexamenes = false;

  }

  //Metodo para guardar la foto


    ///guardar foto
/*
onFileUpload(event){
this.selecetdFile = event.target.files[0];
const reader = new FileReader();
reader.onload = () => {
this.imagePreview = reader.result;
};
reader.readAsDataURL(this.selecetdFile);
}
OnUploadFile() {
//Upload file here send a binary data
this.http.post(‘yourdomain.com/file-upload’, this.selectedFile)
.subscribe(…);
}

*/

  //Metodo para guardar una persona
  upPerson() {
    console.log(this.nombre);
    this.nombre = this.persona.nombre;
    this.primer_apellido = this.persona.primer_apellido;
    this.segundo_apellido = this.persona.segundo_apellido;
    this.curp = this.persona.curp;
  }

  //Sobreescribir curp
   sobreescribircurp(curpenvi: string){
     this.curpenviar = curpenvi;
     console.log("Guardar curp" + this.curpenviar);
     this.enviaralExamen();
   }

   //Seleccion de examen
   seleccionarExamen(exsel: any){
      console.log(exsel);

      console.log("---------------------Entra aqui-------------");

      this.configuracionExamen = exsel;
      this.mostrarbotonrealizarexamen = true;


          this.examenContestadoalmomento = new ExamenContestadoVO();
          var auxiliarexamen = [];

          let respuesta1A: RespuestaVO;
          respuesta1A = new RespuestaVO();
          respuesta1A.id = 1;
          respuesta1A.descripcion = "Opcion A";
          respuesta1A.correcto = true;
          respuesta1A.id_pregunta = 1;

          let respuesta1B: RespuestaVO;
          respuesta1B = new RespuestaVO();
          respuesta1B.id = 2;
          respuesta1B.descripcion = "Opcion B";
          respuesta1B.correcto = false;
          respuesta1B.id_pregunta = 1;

         this.respuestas1 = [respuesta1A,respuesta1B];

         let pregunta1: PreguntaVO;
         pregunta1 = new PreguntaVO();
         pregunta1.id = 2;
         pregunta1.descripcion= "Ejemplo de pregunta 1, respuesta correcta A"
         pregunta1.ruta = "";
         pregunta1.respuestas = this.respuestas1;

      let respuesta2A: RespuestaVO;
      respuesta2A = new RespuestaVO();
      respuesta2A.id = 3;
      respuesta2A.descripcion = "Verdadero";
      respuesta2A.correcto = false;
      respuesta2A.id_pregunta = 2;

      let respuesta2B: RespuestaVO;
      respuesta2B = new RespuestaVO();
      respuesta2B.id = 4;
      respuesta2B.descripcion = "Falso";
      respuesta2B.correcto = true;
      respuesta2B.id_pregunta = 2;
      this.respuestas2 = [respuesta2A,respuesta2B];

      let pregunta2: PreguntaVO;
      pregunta2 = new PreguntaVO();
      pregunta2.id = 1;
      pregunta2.descripcion= "Ejemplo de pregunta 2, respuesta correcta Falso"
      pregunta2.ruta = "https://www.google.com/logos/doodles/2019/elena-cornaro-piscopias-373rd-birthday-5158686585520128.4-s.png";
      pregunta2.respuestas = this.respuestas2;


      //////////////////////////////////++++

      let respuesta3A: RespuestaVO;
      respuesta3A = new RespuestaVO();
      respuesta3A.id = 5;
      respuesta3A.descripcion = "A";
      respuesta3A.correcto = false;
      respuesta3A.id_pregunta = 3;

      let respuesta3B: RespuestaVO;
      respuesta3B = new RespuestaVO();
      respuesta3B.id = 6;
      respuesta3B.descripcion = "B";
      respuesta3B.correcto = true;
      respuesta3B.id_pregunta = 3;

      let respuesta3C: RespuestaVO;
      respuesta3C = new RespuestaVO();
      respuesta3C.id = 7;
      respuesta3C.descripcion = "C";
      respuesta3C.correcto = false;
      respuesta3C.id_pregunta = 3;
      this.respuestas3 = [respuesta3A,respuesta3B,respuesta3C];

      let pregunta3: PreguntaVO;
      pregunta3 = new PreguntaVO();
      pregunta3.id = 3;
      pregunta3.descripcion= "Ejemplo de pregunta 3, respuesta correcta b"
      pregunta3.ruta = "";
      pregunta3.respuestas = this.respuestas3;


      ////////////////////////////

         this.preguntas = [pregunta1,pregunta2,pregunta3];

          this.examen = new ExamenVO();
          this.examen.id = 1;
          this.examen.descripcion = "Examen para Licencia Tipo A";
          this.examen.tiempolimite = "1";
          this.examen.calificacion_minima = 50.0;
          this.examen.total_preguntas = 3;
          this.examen.preguntas = this.preguntas;

          this.preguntaobjamostrar = this.examen.preguntas[0];

          this.respuestasobjamostrar = this.examen.preguntas[0].respuestas;

          this.crearrelacionespreguntasrespuestasasociadas();

          this.recibirDatos();
   }

   crearrelacionespreguntasrespuestasasociadas(){
     var auxiliarexamen = [];
     for (var paso = 0; paso < this.examen.total_preguntas; paso++) {
            let auxpregresp: PregAsigResp;
            auxpregresp = new PregAsigResp();
            auxpregresp.id_pregunta = paso;
            auxpregresp.id_respuestaasignada = null;
            auxiliarexamen.push(auxpregresp);
       };
         this.examenContestadoalmomento =  auxiliarexamen;
   }


   recibirDatos(){
     console.log("-----Empieza proceso para obtener datos mediantes parametros-------");
      this.id = 1;
     this.curp = "SAGC940106HOCNZS00";
   }

   cambiarpreguntamostrada(pregunta: number){

     ///Aqui mando a guardar la respuesta seleccionada por el usuario
     //Igual manda a pedir las respuesats correctas invalidando el codigo siguiente
        if(this.examenContestadoalmomento[pregunta-1].id_respuestaasignada!=null){

          if(pregunta == this.examen.total_preguntas){
            this.mostrarresultadosboton = true;
            this.mostrarcorrectas = true;


          }else{
            this.mostrarbotonsiguiente = true;
            this.mostrarcorrectas = true;
          }

             this.examenContestadoalmomento[pregunta-1].tiempo = this.minutos + ":" + this.segundos;
             this.puntero=this.puntero + 1;
             if(pregunta==1){
               this.examenContestadoalmomento[pregunta-1].minuto = this.minutos;
               this.acumuladorminutos = this.acumuladorminutos + this.minutos;
               this.examenContestadoalmomento[pregunta-1].segundo = this.segundos;
               this.acumuladorsegundos = this.acumuladorsegundos +  this.segundos;
             }else{
               this.examenContestadoalmomento[pregunta-1].minuto = this.minutos -   this.acumuladorminutos;
               this.acumuladorminutos = this.acumuladorminutos + (this.minutos -   this.acumuladorminutos);

               this.examenContestadoalmomento[pregunta-1].segundo = this.segundos - this.acumuladorsegundos;
               this.acumuladorsegundos = this.acumuladorsegundos +  (this.segundos - this.acumuladorsegundos);

              }
             this.examenContestadoalmomento[pregunta-1].tiempo = this.examenContestadoalmomento[pregunta-1].minuto + ":" +  this.examenContestadoalmomento[pregunta-1].segundo;

       }else{
          alert("Selecciona una opcion para continuar");
     }
   }

   asignarrespuestaalobjelegida(pregunta: number, elegida: number){
      this.examenContestadoalmomento[pregunta-1].id_respuestaasignada = elegida;
   }

   botonsiguiente(pregunta: number){
     this.preguntaobjamostrar = this.examen.preguntas[pregunta-1];
     this.respuestasobjamostrar = this.examen.preguntas[pregunta-1].respuestas;
     this.mostrarbotonsiguiente = false;
     this.mostrarcorrectas = false;

     if(pregunta == this.examen.total_preguntas){
       this.mostrarbotonsiguiente = false;
       this.mostrarresultadosboton = false;

     }

   }


     guardarresultadosycalcular(){
       console.log( this.acumuladorminutos);
       console.log(this.acumuladorsegundos);
       this.examenContestadoalmomento[this.examen.total_preguntas-1].minuto = this.minutos - this.acumuladorminutos ;
       this.examenContestadoalmomento[this.examen.total_preguntas-1].segundo = this.segundos - this.acumuladorsegundos;
     this.examenContestadoalmomento[this.examen.total_preguntas-1].tiempo = this.examenContestadoalmomento[this.examen.total_preguntas-1].minuto + ":" +  this.examenContestadoalmomento[this.examen.total_preguntas-1].segundo;

        var contadordebuenas = 0;

       for(var i = 0; i < this.examen.total_preguntas; i++) {
         if(this.examen.preguntas[i].respuestas[this.examenContestadoalmomento[i].id_respuestaasignada]!=undefined){
           if(this.examen.preguntas[i].respuestas[this.examenContestadoalmomento[i].id_respuestaasignada].correcto == true){
              contadordebuenas = contadordebuenas + 1;
           }
         }

       }

       for(var i = 0; i < this.examen.total_preguntas; i++) {
          console.log(this.examen.preguntas[i]);
          console.log(this.examenContestadoalmomento[i]);

       }


       var porcentaje = contadordebuenas * 10 / this.examen.total_preguntas;



       if(porcentaje>=this.examen.calificacion_minima){
         this.mensaje = "Aprobado Tiempo: " + this.minutos + ":" + this.segundos + "  Porcentaje->" + porcentaje ;
         this.siaprobo = true;
       }else{
         this.mensaje = "No aprobado Tiempo " + this.minutos + ":" + this.segundos + "  Porcentaje->" + porcentaje;
         this.siaprobo = false;
       }

       this.quitarpararesultados = false;

     }

     empezarexamen(){
       console.log("[[[[[[[[[[[[[[[[[[[[[this.configuracionExamen]]]]]]]]]]]]]]]]]]]]]");
       console.log(this.configuracionExamen);
       this.minutos2 = this.configuracionExamen.tiempo_limite;
       this.examen.calificacion_minima = this.configuracionExamen.calificacion_minima;
       this.mostrartest = true;
       this.start_cronometro();
       this.contador_regresivo()
       this.quitarempezar = true;


           let fechaActual = new Date();
         let dia = fechaActual.getDate().toString();
         let mes = (fechaActual.getMonth() + 1).toString();
         let anio = fechaActual.getFullYear().toString();
         let hora = fechaActual.getHours().toString();
         let minutos = fechaActual.getMinutes().toString();
         let segundos = fechaActual.getSeconds().toString();
           console.log(anio + "-" + mes + "-" + dia);

           this.diaempiezoexamen = anio + "-" + mes + "-" + dia;
           this.horaempiezoexamen = hora + ":" + minutos + ":" + segundos;
           console.log(hora + ":" + minutos + ":" + segundos);

           let finexamen = new Date();

           finexamen.setMinutes(fechaActual.getMinutes() + 30);

           let horatermino = finexamen.getHours().toString();
           let minutostermino = finexamen.getMinutes().toString();
           let segundostermino = finexamen.getSeconds().toString();

           this.horaterminoexamen = horatermino + ":" + minutostermino + ":" + segundostermino;

           console.log(horatermino + ":" + minutostermino + ":" + segundostermino);


     }

     start_cronometro(){
       if(this.contador == undefined) {
           this.contador = setInterval(()=> {

             if(this.minutos == this.configuracionExamen.tiempo_limite){
               this.stop();
             }
                   this.segundos += 1;
                   if (this.segundos == 60) {
                       this.segundos = 0;
                       this.minutos += 1;
                       if (this.minutos == 60) {
                           this.minutos = 0;
                           this.hora += 1;
                           if (this.hora = 24) {
                               this.hora = 0;
                           }
                       }
                   }
               }
               , 1000);
       }
     }

     contador_regresivo() {

       if(this.contador2 == undefined) {
           this.contador2 = setInterval(()=> {
             if (this.segundos2 > 0 && this.segundos2 <= 60) {
                 this.segundos2--;
             } else {

                 if (this.minutos2 > 0 && this.minutos2 <= 60) {
                     this.minutos2--;
                     this.segundos2 = 59;
                  } else {
                       //alert("Tiempo Finalizado");
                 }
             }
               }
               , 1000);
       }
     }


       stop(){
         alert("Se acabo el tiempo del examen");
         console.log(this.hora + ":"+this.minutos +":" +this.segundos);
           clearInterval(this.contador);
           this.hora = this.hora;
           this.minutos = this.minutos;
           this.segundos = 0;
           this.contador = null;
           this.guardarsinterminarexamen();



       }


       guardarsinterminarexamen(){

         var contadordebuenas = 0;

        for(var i = 0; i < this.examen.total_preguntas; i++) {
          if(this.examen.preguntas[i].respuestas[this.examenContestadoalmomento[i].id_respuestaasignada]!=undefined){
            if(this.examen.preguntas[i].respuestas[this.examenContestadoalmomento[i].id_respuestaasignada].correcto == true){
               contadordebuenas = contadordebuenas + 1;
            }
          }

        }

        if(this.examen.calificacion_minima<=contadordebuenas){
          this.mensaje = "Aprobado Tiempo: " + this.minutos + ":" + this.segundos;
        }else{
          this.mensaje = "No aprobado Tiempo " + this.minutos + ":" + this.segundos;
        }

         for(var i = 0; i < this.examen.total_preguntas; i++) {
            console.log(this.examen.preguntas[i]);
            console.log(this.examenContestadoalmomento[i]);

         }

         this.quitarpararesultados = false;


       }




}
