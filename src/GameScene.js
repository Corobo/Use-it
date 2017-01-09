
var tipoJugador = 1;
var tipoMoneda = 2;
var tipoEnemigo = 3;
var tipoContenedor = 4;
var tipoDisparo = 5;
var tipoSuelo = 6;
var tipoDestructorBolas= 7;
var tipoBolas = 8;
var tipoTerrenoAgua = 9;
var tipoPuertaPuzzle = 10;
var tipoDestructorSouls = 11;
var tipoSoul = 12;
var tipoBala = 13;
var tipoInvulnerabilidad = 14;
var tipoProteccion = 15;
var tipoSalto = 16;
var tipoVida = 17;
var tipoCajaMonedas = 18;
var tipoLlave = 19;
var disparoEnemigo = 20;
var tipoMuroFantasma = 21;
var tipoDisparoEnemigo = 22;

var niveles = [ res.mapa_puzzles , res.mapa_boss ];
var nivelActual = 0;

var GameLayer = cc.Layer.extend({
    monedas:0,
    tiempoDisparar:0,
    disparos:[],
    disparosEliminar:[],
    enemigos:[],
    enemigosEliminar:[],
    formasEliminar:[],
    teclaIzquierda:false,
    teclaDerecha:false,
    teclaArriba:false,
    teclaBarra:false,
    monedas:[],
    contadoresBolas:[],
    jugador: null,
    space:null,
    puertasPuzzle:[],
    bola:null,
    destruirBola:null,
    pulsadoresRaton:[],
    alma:null,
    souls:[],
    bolas:[],
    balas:[],
    cajasMonedas:[],
    llaves:[],
    saltos:[],
    vidas:[],
    protecciones:[],
    invulnerabilidades:[],
    pulsacionAnterior:0,
    eliminarContador:-1,
    llave:null,
    destruirLlave:false,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.disparo_jugador_plist);
        cc.spriteFrameCache.addSpriteFrames(res.animacion_cuervo_plist);
        cc.spriteFrameCache.addSpriteFrames(res.walking_plist);
        cc.spriteFrameCache.addSpriteFrames(res.jumping_plist);
        cc.spriteFrameCache.addSpriteFrames(res.dieing_plist);
        cc.spriteFrameCache.addSpriteFrames(res.idle_plist);
        cc.spriteFrameCache.addSpriteFrames(res.soul_plist);
        cc.spriteFrameCache.addSpriteFrames(res.fantasma_plist);
        cc.spriteFrameCache.addSpriteFrames(res.volador_plist);
        cc.spriteFrameCache.addSpriteFrames(res.terrestre_plist);



        // Inicializar Space
        this.space = new cp.Space();
        this.space.gravity = cp.v(0, -350);

        // Depuración
        //this.depuracion = new cc.PhysicsDebugNode(this.space);
        //this.addChild(this.depuracion, 10);

        // jugador y moneda
        // IMPORTANTE: Invocamos el método antes de resolver la colisión (realmente no habrá colisión).
        this.space.addCollisionHandler(tipoJugador, tipoMoneda,
              null, this.colisionJugadorConMoneda.bind(this), null, null);


        this.jugador = new Jugador(this.space,
               cc.p(2842,978), this);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.teclaPulsada,
            onKeyReleased: this.teclaLevantada
        }, this);

        this.cargarMapa();
        this.scheduleUpdate();

        // jugador y moneda
        // IMPORTANTE: Invocamos el método antes de resolver la colisión (realmente no habrá colisión).
        this.space.addCollisionHandler(tipoJugador, tipoMoneda,
              null, this.colisionJugadorConMoneda.bind(this), null, null);

       // enemigo y contenedor
       // IMPORTANTE: Invocamos el método antes de resolver la colisión (realmente no habrá colisión).
       this.space.addCollisionHandler(tipoEnemigo, tipoContenedor,
            null, this.colisionEnemigoConContenedor.bind(this), null, null);

       // disparo y enemigo
       // IMPORTANTE: Invocamos el método antes de resolver la colisión (realmente no habrá colisión).
       this.space.addCollisionHandler(tipoDisparo, tipoEnemigo,
            null, this.colisionDisparoConEnemigo.bind(this), null, null);

      // disparo y muro
      // IMPORTANTE: Invocamos el método antes de resolver la colisión (realmente no habrá colisión).
      this.space.addCollisionHandler(tipoDisparo, tipoSuelo,
           null, this.colisionDisparoConSuelo.bind(this), null, null);

      this.space.addCollisionHandler(tipoJugador, tipoTerrenoAgua,
               null, this.colisionJugadorConAgua.bind(this), null, null);

      this.space.addCollisionHandler(tipoJugador, tipoBolas,
               null, this.colisionJugadorConBola.bind(this), null, null);

      this.space.addCollisionHandler(tipoBolas, tipoDestructorBolas,
                 null, this.colisionBolaConDestructor.bind(this), null, null);

      this.space.addCollisionHandler(tipoJugador, tipoPuertaPuzzle,
           null, this.colisionJugadorConPuerta.bind(this), null, null);

      this.space.addCollisionHandler(tipoJugador, tipoSoul,
               null, this.colisionJugadorConAlma.bind(this), null, null);

      this.space.addCollisionHandler(tipoSoul, tipoDestructorSouls,
                      null, this.colisionAlmaConDestructorAlmas.bind(this), null, null);

      this.space.addCollisionHandler(tipoJugador, tipoBala,
                            null, this.colisionJugadorConBala.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoInvulnerabilidad,
                                    null, this.colisionJugadorConInvulnerabilidad.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoProteccion,
                                    null, this.colisionJugadorConProteccion.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoSalto,
                                null, this.colisionJugadorConSalto.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoVida,
                                    null, this.colisionJugadorConVida.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoCajaMonedas,
                                    null, this.colisionJugadorConCajaMonedas.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoLlave,
                                    null, this.colisionJugadorConLlave.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoMuroFantasma,
                                            null, this.colisionJugadorMuroFantasma.bind(this), null, null);

        this.space.addCollisionHandler(tipoDisparoEnemigo, tipoJugador,
                                                    null, this.colisionDisparoEnemigoConJugador.bind(this), null, null);

        this.space.addCollisionHandler(tipoDisparoEnemigo, tipoSuelo,
                                                    null, this.colisionDisparoEnemigoConSuelo.bind(this), null, null);

      cc.eventManager.addListener({
                  event: cc.EventListener.MOUSE,
                  onMouseDown: this.procesarMouseDown
              }, this)



       return true;
},update:function (dt) {
     this.space.step(dt);

     var capaControles =
               this.getParent().getChildByTag(idCapaControles);

     if ( capaControles.monedas >= 40){
        nivelActual = nivelActual + 1;
        cc.director.runScene(new GameScene());
     }




      // Mover enemigos:
       for(var i = 0; i < this.enemigos.length; i++) {
          var enemigo = this.enemigos[i];
          enemigo.moverAutomaticamente();
      }

      console.log("Formas eliminar: "+this.formasEliminar.length);
     // Eliminar formas:
     for(var i = 0; i < this.formasEliminar.length; i++) {
         var shape = this.formasEliminar[i];

         for (var r = 0; r < this.monedas.length; r++) {
           if (this.monedas[r].shape == shape) {
               this.monedas[r].eliminar();
               this.monedas.splice(r, 1);
           }
         }

         for (var r = 0; r < this.enemigos.length; r++) {
            if (this.enemigos[r].shape == shape) {
                console.log("Enemigo eliminado");
                this.enemigos[r].eliminar();
                this.enemigos.splice(r, 1);
            }
         }

         for (var r = 0; r < this.disparos.length; r++) {
             if (this.disparos[r].shape == shape) {
                 this.disparos[r].eliminar();
                 this.disparos.splice(r, 1);
             }
         }

         for (var r = 0; r < this.puertasPuzzle.length; r++) {
              if (this.puertasPuzzle[r].shape == shape) {
                  this.puertasPuzzle[r].eliminar();
                  this.puertasPuzzle.splice(r, 1);
              }
         }

         for (var r = 0; r < this.souls.length; r++) {
               if (this.souls[r].shape == shape) {
                   this.souls[r].eliminar();
                   this.souls.splice(r, 1);

               }
          }

        for (var r = 0; r < this.bolas.length; r++) {
                 if (this.bolas[r].shape == shape) {
                     this.bolas[r].eliminar();
                     this.bolas.splice(r, 1);
                 }
            }

        for (var r = 0; r < this.balas.length; r++) {
             if (this.balas[r].shape == shape) {
                 this.balas[r].eliminar();
                 this.balas.splice(r, 1);
             }
        }

        for (var r = 0; r < this.vidas.length; r++) {
                 if (this.vidas[r].shape == shape) {
                     this.vidas[r].eliminar();
                     this.vidas.splice(r, 1);
                 }
            }
        for (var r = 0; r < this.protecciones.length; r++) {
                 if (this.protecciones[r].shape == shape) {
                     this.protecciones[r].eliminar();
                     this.protecciones.splice(r, 1);
                 }
            }

         if(this.destruirBola){
            this.bola.eliminar();
            this.destruirBola=false;
         }

         if(this.destruirAlma){
            this.alma.eliminar();
            this.destruirAlma=false;
            this.llave = new Llave(this.space,this.llaves[this.jugador.llavesRecogidas],this);
         }

         if(this.destruirLlave){
            this.llave.eliminar();
            this.destruirLlave=false;
         }

         if(this.eliminarContador!=-1){
            this.contadoresBolas[this.eliminarContador].eliminar();
            this.contadoresBolas.splice(this.eliminarContador,1);
            this.eliminarContador=-1;
            this.llave = new Llave(this.space,this.llaves[this.jugador.llavesRecogidas],this);
          }


     }

     this.formasEliminar = [];
     this.jugador.comprobarVelocidadMuerte();
     // Caída, sí cae vuelve a la posición inicial
     if( this.jugador.body.p.y < -100 || this.jugador.morir==true){
        this.jugador.body.vy = 0;
        this.jugador.body.p = cc.p(64,332);
        this.jugador.morir = false;
     }
     if(this.jugador.almas>0 && this.jugador.bolas==0){
         capaControles.dibujarAlmas();
     }
     if(this.jugador.almas==0 && this.jugador.bolas>0){
         capaControles.dibujarBolas();
     }
     if(this.jugador.almas==0 && this.jugador.bolas==0){
          capaControles.eliminarObjetos();
     }
     var d = new Date();
     var t = d.getTime();
     if(this.jugador.terreno=="agua"){
        if(t-this.jugador.tiempoEnAgua>250){
            this.jugador.actualizarAire(true);
            capaControles.actualizarAire(this.jugador
            );
            this.jugador.tiempoEnAgua=t;
        }
     }else{
        this.jugador.actualizarAire(false);
        capaControles.actualizarAire(this.jugador);
     }

     capaControles.actualizarMunicion(this.jugador);

     for (var r = 0; r < this.disparos.length; r++) {
          if (this.disparos[r] != null) {
              this.disparos[r].mantenerVelocidadDisparo();
          }
      }

    if ( this.teclaBarra && new Date().getTime() - this.tiempoDisparar > 1000 ){

        if(this.jugador.balas>0){
            this.tiempoDisparar = new Date().getTime();
            var disparo = new Disparo(this.space,
              cc.p(this.jugador.body.p.x+16, this.jugador.body.p.y-8),
              this);

              if ( this.jugador.sprite.scaleX > 0){
                   disparo.body.vx = 400;
                   disparo.body.vy = 10;
              } else {
                   disparo.body.vx = -400;
                   disparo.body.vy = 10;
              }

            this.disparos.push(disparo);
            this.jugador.disparar();
            var capaControles =
                       this.getParent().getChildByTag(idCapaControles);
            capaControles.actualizarVida(this.jugador);
        }

    }
     var capaControles = this.getParent().getChildByTag(idCapaControles);
             capaControles.actualizarVida(this.jugador);
     var d = new Date();
     var t = d.getTime();
     if ( this.teclaArriba ){
        if(this.jugador.terreno=="agua" && t-this.jugador.anteriorSalto>50){
            this.jugador.moverArriba();
            this.jugador.anteriorSalto = t;
        }
        else if(this.jugador.terreno="tierra"){
            this.jugador.moverArriba();
        }
     }
     if (this.teclaIzquierda){
        this.jugador.moverIzquierda();
     }
     if( this.teclaDerecha ){
        this.jugador.moverDerecha();
     }
     if ( !this.teclaIzquierda && !this.teclaIzquierda
        && !this.teclaDerecha ){
        this.jugador.body.vx = 0;
     }

     this.jugador.actualizarAnimacion();

     // actualizar camara (posición de la capa).
        var posicionX = this.jugador.body.p.x -200;
        var posicionY = this.jugador.body.p.y -200;

    if(posicionX < 0){
        posicionX = 0;
    }
    if(posicionY < 0){
        posicionY = 0;
    }

    this.setPosition(cc.p( -posicionX, -posicionY ));


     if (this.jugador.body.vx < -200){
          this.jugador.body.vx = -200;
     }

     if (this.jugador.body.vx > 200){
         this.jugador.body.vx = 200;
     }
},disparaEnemigo:function(enemigo){

    var disparo = new DisparoEnemigo(this.space,
      cc.p(enemigo.body.p.x+16, enemigo.body.p.y-8),
      this);

    this.disparos.push(disparo);

}, cargarMapa:function () {
       this.mapa = new cc.TMXTiledMap(niveles[0]);
       // Añadirlo a la Layer
       this.addChild(this.mapa);
       // Ancho del mapa
       this.mapaAncho = this.mapa.getContentSize().width;

       // Solicitar los objeto dentro de la capa Suelos
       var grupoSuelos = this.mapa.getObjectGroup("Suelos");
       var suelosArray = grupoSuelos.getObjects();

       // Los objetos de la capa suelos se transforman a
       // formas estáticas de Chipmunk ( SegmentShape ).
       for (var i = 0; i < suelosArray.length; i++) {
           var suelo = suelosArray[i];
           var puntos = suelo.polylinePoints;
           for(var j = 0; j < puntos.length - 1; j++){
               var bodySuelo = new cp.StaticBody();

               var shapeSuelo = new cp.SegmentShape(bodySuelo,
                   cp.v(parseInt(suelo.x) + parseInt(puntos[j].x),
                       parseInt(suelo.y) - parseInt(puntos[j].y)),
                   cp.v(parseInt(suelo.x) + parseInt(puntos[j + 1].x),
                       parseInt(suelo.y) - parseInt(puntos[j + 1].y)),
                   10);
               shapeSuelo.setFriction(0);
               shapeSuelo.setCollisionType(tipoSuelo);
               //shapeSuelo.setElasticity(0);
               this.space.addStaticShape(shapeSuelo);
           }
       }

       var grupoMonedas = this.mapa.getObjectGroup("Monedas");
       var monedasArray = grupoMonedas.getObjects();
       for (var i = 0; i < monedasArray.length; i++) {
           var moneda = new Moneda(this.space,
               cc.p(monedasArray[i]["x"],monedasArray[i]["y"]),
               this);

           this.monedas.push(moneda);
       }

       var grupoLlaves = this.mapa.getObjectGroup("Llaves");
        var llavesArray = grupoLlaves.getObjects();
        for (var i = 0; i < llavesArray.length; i++) {
          var llave = cc.p(llavesArray[i]["x"]+16,llavesArray[i]["y"]+16);

          this.llaves.push(llave);
        }


      var grupoContadorBolas = this.mapa.getObjectGroup("ContadorBolas");
             var contadorBolasArray = grupoContadorBolas.getObjects();
             for (var i = 0; i < contadorBolasArray.length; i++) {
                var contador = contadorBolasArray[i];
                var splitedName = contador.name.split("_");
                var contadorBolas = new ContadorBolas(this.space,cc.p(contadorBolasArray[i]["x"],
                  contadorBolasArray[i]["y"]),this,splitedName[1],splitedName[2]);
                this.contadoresBolas.push(contadorBolas);
      }

       var grupoSouls = this.mapa.getObjectGroup("Souls");
       var soulsArray = grupoSouls.getObjects();
       for (var i = 0; i < soulsArray.length; i++) {
          var soul = soulsArray[i];
          var splitedName = soul.name.split("_");
          var soulO = new Soul(this.space,cc.p(soulsArray[i]["x"],
            soulsArray[i]["y"]),this,false);
          this.souls.push(soulO);
       }

      var grupoBalas = this.mapa.getObjectGroup("Balas");
         var balasArray = grupoBalas.getObjects();
         for (var i = 0; i < balasArray.length; i++) {
            var balaO = new Bala(this.space,cc.p(balasArray[i]["x"]+16,
              balasArray[i]["y"]+16),this);
            this.balas.push(balaO);
         }


     var grupoVida = this.mapa.getObjectGroup("Vida");
          var vidaArray = grupoVida.getObjects();
          for (var i = 0; i < vidaArray.length; i++) {
             var vida = new Vida(this.space,cc.p(vidaArray[i]["x"]+16,
               vidaArray[i]["y"]+16),this);
             this.vidas.push(vida);
          }
     var grupoCajaMonedas = this.mapa.getObjectGroup("CajaMonedas");
               var cajaMonedasArray = grupoCajaMonedas.getObjects();
               for (var i = 0; i < cajaMonedasArray.length; i++) {
                  var caja = new CajaMonedas(this.space,cc.p(cajaMonedasArray[i]["x"]+16,
                    cajaMonedasArray[i]["y"]+16),this);
                  this.cajasMonedas.push(caja);
               }
       var grupoSalto = this.mapa.getObjectGroup("Salto");
                var saltoArray = grupoSalto.getObjects();
                for (var i = 0; i < saltoArray.length; i++) {
                   var salto = new Salto(this.space,cc.p(saltoArray[i]["x"]+16,
                     saltoArray[i]["y"]+16),this);
                   this.saltos.push(salto);
                }
        var grupoProteccion = this.mapa.getObjectGroup("Proteccion");
                 var proteccionArray = grupoProteccion.getObjects();
                 for (var i = 0; i < proteccionArray.length; i++) {
                    var proteccion = new Bala(this.space,cc.p(proteccionArray[i]["x"]+16,
                      proteccionArray[i]["y"]+16),this);
                    this.protecciones.push(proteccion);
                 }
        var grupoInvulnerable = this.mapa.getObjectGroup("Invulnerable");
                  var invulnerableArray = grupoInvulnerable.getObjects();
                  for (var i = 0; i < invulnerableArray.length; i++) {
                     var invulnerable = new Bala(this.space,cc.p(invulnerableArray[i]["x"]+16,
                       invulnerableArray[i]["y"]+16),this);
                     this.invulnerabilidades.push(invulnerable);
                  }


      var grupoBolas = this.mapa.getObjectGroup("Bolas");
      var bolasArray = grupoBolas.getObjects();
      for (var i = 0; i < bolasArray.length; i++) {
         var bolaL = bolasArray[i];
         var splitedName = bolaL.name.split("_");
         var bolaO = new Bola(this.space,cc.p(bolasArray[i]["x"]+16,
           bolasArray[i]["y"]+16),this,false);
         this.bolas.push(bolaO);
      }

       var grupoPuertas = this.mapa.getObjectGroup("Puertas");
       var puertasArray = grupoPuertas.getObjects();
       for (var i = 0; i < puertasArray.length; i++) {
         var puerta = puertasArray[i];
         var splitedName = puerta.name.split("_");
         var puertaO = new PuertaPuzzle(this.space,cc.p(puertasArray[i]["x"]+16,
           puertasArray[i]["y"]+48),this,splitedName[1]);
         this.puertasPuzzle.push(puertaO);
        }

       var grupoDestructorBolas = this.mapa.getObjectGroup("DestructorBolas");
       var destructorBolasArray = grupoDestructorBolas.getObjects();
          for (var i = 0; i < destructorBolasArray.length; i++) {
              var destructor = destructorBolasArray[i];
              var puntos = destructor.polylinePoints;

              for(var j = 0; j < puntos.length - 1; j++){
                  var bodyDestructor = new cp.StaticBody();

                  var shapeDestructor = new cp.SegmentShape(bodyDestructor,
                      cp.v(parseInt(destructor.x) + parseInt(puntos[j].x),
                          parseInt(destructor.y) - parseInt(puntos[j].y)),
                      cp.v(parseInt(destructor.x) + parseInt(puntos[j + 1].x),
                          parseInt(destructor.y) - parseInt(puntos[j + 1].y)),
                      5);

                  shapeDestructor.setSensor(true);
                  shapeDestructor.setCollisionType(tipoDestructorBolas);
                  shapeDestructor.setFriction(1);

                  this.space.addStaticShape(shapeDestructor);
              }
          }

         var grupoDestructorSouls = this.mapa.getObjectGroup("DestructorSouls");
         var destructorSoulsArray = grupoDestructorSouls.getObjects();
            for (var i = 0; i < destructorSoulsArray.length; i++) {
                var destructor = destructorSoulsArray[i];
                var puntos = destructor.polylinePoints;

                for(var j = 0; j < puntos.length - 1; j++){
                    var bodyDestructor = new cp.StaticBody();

                    var shapeDestructor = new cp.SegmentShape(bodyDestructor,
                        cp.v(parseInt(destructor.x) + parseInt(puntos[j].x),
                            parseInt(destructor.y) - parseInt(puntos[j].y)),
                        cp.v(parseInt(destructor.x) + parseInt(puntos[j + 1].x),
                            parseInt(destructor.y) - parseInt(puntos[j + 1].y)),
                        5);

                    shapeDestructor.setSensor(true);
                    shapeDestructor.setCollisionType(tipoDestructorSouls);
                    shapeDestructor.setFriction(1);

                    this.space.addStaticShape(shapeDestructor);
                }
         }

        var grupoAgua = this.mapa.getObjectGroup("Agua");
         var aguaArray = grupoAgua.getObjects();
            for (var i = 0; i < aguaArray.length; i++) {
                var agua = aguaArray[i];
                var puntos = agua.polylinePoints;

                for(var j = 0; j < puntos.length - 1; j++){
                    var bodyAgua = new cp.StaticBody();

                    var shapAgua = new cp.SegmentShape(bodyAgua,
                        cp.v(parseInt(agua.x) + parseInt(puntos[j].x),
                            parseInt(agua.y) - parseInt(puntos[j].y)),
                        cp.v(parseInt(agua.x) + parseInt(puntos[j + 1].x),
                            parseInt(agua.y) - parseInt(puntos[j + 1].y)),
                        5);

                    shapAgua.setSensor(true);
                    shapAgua.setCollisionType(tipoTerrenoAgua);
                    shapAgua.setFriction(1);

                    this.space.addStaticShape(shapAgua);
                }
            }

        var grupoFantasma = this.mapa.getObjectGroup("MurosFantasma");
         var fantasmaArray = grupoFantasma.getObjects();
            for (var i = 0; i < fantasmaArray.length; i++) {
                var fantasma = fantasmaArray[i];
                var puntos = fantasma.polylinePoints;

                for(var j = 0; j < puntos.length - 1; j++){
                    var bodyFantasma = new cp.StaticBody();

                    var shapeFantasma = new cp.SegmentShape(bodyFantasma,
                        cp.v(parseInt(fantasma.x) + parseInt(puntos[j].x),
                            parseInt(fantasma.y) - parseInt(puntos[j].y)),
                        cp.v(parseInt(fantasma.x) + parseInt(puntos[j + 1].x),
                            parseInt(fantasma.y) - parseInt(puntos[j + 1].y)),
                        5);

                    shapeFantasma.setSensor(true);
                    shapeFantasma.setCollisionType(tipoMuroFantasma);
                    shapeFantasma.setFriction(1);

                    this.space.addStaticShape(shapeFantasma);
                }
            }

     var grupoRaton = this.mapa.getObjectGroup("PulsarRaton");
     var ratonArray = grupoRaton.getObjects();
     for (var i = 0; i < ratonArray.length; i++) {
         var raton = new PulsarRaton(this.space,
             cc.p(ratonArray[i]["x"]+16,ratonArray[i]["y"]+16),
             this);

         this.pulsadoresRaton.push(raton);
     }

       var grupoEnemigos = this.mapa.getObjectGroup("Enemigos");
       var enemigosArray = grupoEnemigos.getObjects();
       for (var i = 0; i < enemigosArray.length; i++) {

           var name  = enemigosArray[i].name;
           var enemigo = null;
           switch(name){

           case "fantasma":
                    enemigo = new Fantasma(this.space,
                   cc.p(enemigosArray[i]["x"],enemigosArray[i]["y"]),
                   this);
                    break;
           case "terrestre":
                    enemigo = new Terrestre(this.space,
                       cc.p(enemigosArray[i]["x"],enemigosArray[i]["y"]),
                       this);
                    break;
           case "volador":
                    enemigo = new Volador(this.space,
                    cc.p(enemigosArray[i]["x"],enemigosArray[i]["y"]),
                    this);
                    break;
           }

           this.enemigos.push(enemigo);
           console.log("Enemigo agregado");
       }


       var grupoContenedores = this.mapa.getObjectGroup("Contenedores");
       var contenedoresArray = grupoContenedores.getObjects();
       for (var i = 0; i < contenedoresArray.length; i++) {
           var contenedor = contenedoresArray[i];
           var puntos = contenedor.polylinePoints;

           for(var j = 0; j < puntos.length - 1; j++){
               var bodyContenedor = new cp.StaticBody();

               var shapeContenedor = new cp.SegmentShape(bodyContenedor,
                   cp.v(parseInt(contenedor.x) + parseInt(puntos[j].x),
                       parseInt(contenedor.y) - parseInt(puntos[j].y)),
                   cp.v(parseInt(contenedor.x) + parseInt(puntos[j + 1].x),
                       parseInt(contenedor.y) - parseInt(puntos[j + 1].y)),
                   5);

               shapeContenedor.setSensor(true);
               shapeContenedor.setCollisionType(tipoContenedor);
               shapeContenedor.setFriction(1);

               this.space.addStaticShape(shapeContenedor);
           }
       }
    },procesarMouseDown:function(event) {
         var d = new Date();
         var t = d.getTime();
         var instancia = event.getCurrentTarget();
         if((t - instancia.pulsacionAnterior)>3000){
             instancia.pulsacionAnterior = t;
             console.log(event.getLocationX());
             console.log(event.getLocationY());

             var jugadorX = instancia.jugador.body.p.x;
             var jugadorY = instancia.jugador.body.p.y;
             var x = event.getLocationX();
             var y = event.getLocationY();
             if(instancia.jugador.bolas>0){
                 var random = Math.floor((Math.random() * 10) + 1);
                var encontrado = false;
                var posicion = cc.p(0,0);
                 for(var i =0; i<instancia.pulsadoresRaton.length;i++){
                    var pulsador = instancia.pulsadoresRaton[i];
                    if(pulsador.posicion.x-(jugadorX+x)<100 && pulsador.posicion.y-(jugadorY+y)<100 &&
                    pulsador.posicion.x-(jugadorX+x)>-300 && pulsador.posicion.y-(jugadorY+y)>-300){
                        encontrado = true;
                        posicion = pulsador.posicion;
                    }
                 }
                 if(random>5){
                    posicion = cc.p(posicion.x+random,posicion.y+random);
                    instancia.bola = new Bola(instancia.space,posicion,instancia,true);
                 }
                 if(random<5){
                    posicion = cc.p(posicion.x+random,posicion.y+random);
                    instancia.bola = new Bola(instancia.space,posicion,instancia,true);
                }
             }
             if(instancia.jugador.almas>0){
               var random = Math.floor((Math.random() * 10) + 1);
              var encontrado = false;
              var posicion = cc.p(0,0);
               for(var i =0; i<instancia.pulsadoresRaton.length;i++){
                  var pulsador = instancia.pulsadoresRaton[i];
                  if(pulsador.posicion.x-(jugadorX+x)<100 && pulsador.posicion.y-(jugadorY+y)<100 &&
                  pulsador.posicion.x-(jugadorX+x)>-300 && pulsador.posicion.y-(jugadorY+y)>-300){
                      encontrado = true;
                      posicion = pulsador.posicion;
                  }
               }
               if(random>5){
                  posicion = cc.p(posicion.x+random,posicion.y+random);
                  instancia.alma = new Soul(instancia.space,posicion,instancia,true);
               }
               if(random<5){
                  posicion = cc.p(posicion.x+random,posicion.y+random);
                  instancia.alma = new Soul(instancia.space,posicion,instancia,true);
              }
             }
         }


    },teclaPulsada: function(keyCode, event){
        var instancia = event.getCurrentTarget();

        // Flecha izquierda
        if( keyCode == 37){
            instancia.teclaIzquierda = true;
        }
        // Flecha derecha
        if( keyCode == 39){
            instancia.teclaDerecha = true;
        }
        // Flecha arriba
        if( keyCode == 38){
            instancia.teclaArriba = true;
        }
        // Barra espaciadora
        if( keyCode == 32){
            instancia.teclaBarra = true;
        }
    },teclaLevantada: function(keyCode, event){
        var instancia = event.getCurrentTarget();
        console.log("Tecla Levantada "+keyCode);
        // Flecha izquierda
        if( keyCode == 37){
            instancia.teclaIzquierda = false;
        }
        // Flecha derecha
        if( keyCode == 39){
            instancia.teclaDerecha = false;
        }
        // Flecha arriba
        if( keyCode == 38){
            instancia.teclaArriba = false;
        }
        // Barra espaciadora
        if( keyCode == 32){
            instancia.teclaBarra = false;
        }
     },colisionJugadorConMoneda:function (arbiter, space) {

        // Marcar la moneda para eliminarla
        var shapes = arbiter.getShapes();
        // shapes[0] es el jugador
        this.formasEliminar.push(shapes[1]);

        this.tiempoEfecto = 100;

        var capaControles =
           this.getParent().getChildByTag(idCapaControles);
        capaControles.agregarMoneda(1);
     },colisionEnemigoConContenedor:function (arbiter, space) {
          var shapes = arbiter.getShapes();
          // shapes[0] es el enemigo
          var formaEnemigo = shapes[0];
          formaEnemigo.body.vx = 0; // Parar enemigo
     }, colisionDisparoConEnemigo:function (arbiter, space) {
          var shapes = arbiter.getShapes();

          this.formasEliminar.push(shapes[0]);
          this.formasEliminar.push(shapes[1]);

          this.jugador.actualizarBalas(false);
     }, colisionDisparoConSuelo:function (arbiter, space) {
          var shapes = arbiter.getShapes();

          this.formasEliminar.push(shapes[0]);
     },colisionDisparoEnemigoConSuelo:function(arbiter,space){
            var shapes = arbiter.getShapes();

            this.formasEliminar.push(shapes[0]);
     }, colisionBolaConDestructor:function (arbiter, space) {
          var shapes = arbiter.getShapes();
          if(this.bola!=null){
            this.formasEliminar.push(shapes[0]);
            this.destruirBola = true;
            this.contadoresBolas[0].actualizarContador();
            this.jugador.actualizarBolas(false);
            this.eliminarContador = -1;
            for(var i = 0; i<this.contadoresBolas.length;i++){
                if(this.contadoresBolas[i].estaLleno()){
                    this.eliminarContador=i;
                    }
                }
             }


     }, colisionJugadorConBola: function(arbiter,space){
             var shapes = arbiter.getShapes();

             this.formasEliminar.push(shapes[1]);

             this.jugador.actualizarBolas(true);
     }, colisionJugadorConAgua:function(arbiter,space){
          this.jugador.terreno = "agua";
     }, colisionJugadorConPuerta:function(arbiter,space){
        if(this.jugador.key == true){
            var shapes = arbiter.getShapes();

            this.formasEliminar.push(shapes[1]);

            this.jugador.key=false;
        }else{
            this.jugador.body.p.x = this.jugador.body.p.x -20; // Para que salga de la colisión
        }
     }, colisionJugadorConAlma: function(arbiter,space){
        var shapes = arbiter.getShapes();

        this.formasEliminar.push(shapes[1]);

        this.jugador.actualizarAlmas(true);
     }, colisionAlmaConDestructorAlmas : function(arbiter,space){
        var shapes = arbiter.getShapes();
          if(this.alma!=null){
            this.formasEliminar.push(shapes[0]);
            this.destruirAlma = true;
            this.jugador.actualizarAlmas(false);
          }

     },colisionJugadorConBala: function(arbiter,space){
          var shapes = arbiter.getShapes();

          this.formasEliminar.push(shapes[1]);

          this.jugador.actualizarBalas(true);
     },colisionJugadorConInvulnerabilidad: function(arbiter,space){
         var shapes = arbiter.getShapes();

         this.formasEliminar.push(shapes[1]);

         this.jugador.actualizarInvulnerabilidad(true);
    },colisionJugadorConProteccion: function(arbiter,space){
        var shapes = arbiter.getShapes();

        this.formasEliminar.push(shapes[1]);

        this.jugador.actualizarProteccion(true);
    },colisionJugadorConVida: function(arbiter,space){
      var shapes = arbiter.getShapes();

      this.formasEliminar.push(shapes[1]);

      this.jugador.actualizarVida(true,0);

    },colisionJugadorConSalto: function(arbiter,space){
        var shapes = arbiter.getShapes();

        this.formasEliminar.push(shapes[1]);

        this.jugador.actualizarSalto(true);
    },colisionJugadorConCajaMonedas: function(arbiter,space){
          var shapes = arbiter.getShapes();

          this.formasEliminar.push(shapes[1]);

          var capaControles =
                     this.getParent().getChildByTag(idCapaControles);
                  capaControles.agregarMoneda(10);
    },colisionJugadorConLlave: function(arbiter,space){
        var shapes = arbiter.getShapes();

        this.formasEliminar.push(shapes[1]);

        this.jugador.actualizarLlaves(true);

        this.destruirLlave=true;
    },colisionJugadorMuroFantasma: function(arbiter,space){
        if(this.jugador.body.vx > 0)
            this.jugador.body.p.x = this.jugador.body.p.x -10;
        if(this.jugador.body.vx < 0)
                    this.jugador.body.p.x = this.jugador.body.p.x +10;
    },colisionDisparoEnemigoConJugador:function(arbiter,space){

    }
});

var idCapaJuego = 1;
var idCapaControles = 2;

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer, 0, idCapaJuego);

        var controlesLayer = new ControlesLayer();
        this.addChild(controlesLayer, 0, idCapaControles);

    }
});
