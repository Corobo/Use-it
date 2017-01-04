
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
    ctor:function () {
        this._super();
        var size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.disparo_jugador_plist);
        cc.spriteFrameCache.addSpriteFrames(res.animacion_cuervo_plist);
        cc.spriteFrameCache.addSpriteFrames(res.moneda_plist);
        cc.spriteFrameCache.addSpriteFrames(res.walking_plist);
        cc.spriteFrameCache.addSpriteFrames(res.jumping_plist);
        cc.spriteFrameCache.addSpriteFrames(res.dieing_plist);
        cc.spriteFrameCache.addSpriteFrames(res.idle_plist);



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
               cc.p(64,377), this);

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

      this.space.addCollisionHandler(tipoBolas, tipoDestructorBolas,
                 null, this.colisionBolaConDestructor.bind(this), null, null);

      this.space.addCollisionHandler(tipoJugador, tipoPuertaPuzzle,
           null, this.colisionJugadorConPuerta.bind(this), null, null);

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

         if(this.destruirBola==true){
            this.bola.eliminar();
            this.destruirBola=false;
         }


     }

     this.formasEliminar = [];

     // Caída, sí cae vuelve a la posición inicial
     if( this.jugador.body.p.y < -100){
        this.jugador.body.p = cc.p(50,150);
     }

    if ( this.teclaBarra && new Date().getTime() - this.tiempoDisparar > 1000 ){
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

       var grupoContadorBolas = this.mapa.getObjectGroup("ContadorBolas");
       var contadorBolasArray = grupoContadorBolas.getObjects();
       for (var i = 0; i < contadorBolasArray.length; i++) {
          var contador = contadorBolasArray[i];
          var splitedName = contador.name.split("_");
          var contadorBolas = new ContadorBolas(this.space,cc.p(contadorBolasArray[i]["x"],
            contadorBolasArray[i]["y"]),this,splitedName[1],splitedName[2]);
          this.contadoresBolas.push(contadorBolas);
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

       var grupoMonedas = this.mapa.getObjectGroup("Llaves");
          var monedasArray = grupoMonedas.getObject("llave1");
          for (var i = 0; i < monedasArray.length; i++) {
              var moneda = new Moneda(this.space,
                  cc.p(monedasArray[i]["x"],monedasArray[i]["y"]),
                  this);

              this.monedas.push(moneda);
          }

       var grupoEnemigos = this.mapa.getObjectGroup("Enemigos");
       var enemigosArray = grupoEnemigos.getObjects();
       for (var i = 0; i < enemigosArray.length; i++) {
           var enemigo = new Enemigo(this.space,
               cc.p(enemigosArray[i]["x"],enemigosArray[i]["y"]),
               this);

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
         console.log(event.getLocationX());
         console.log(event.getLocationY());
         var instancia = event.getCurrentTarget();
         var jugadorX = instancia.jugador.body.p.x;
         var jugadorY = instancia.jugador.body.p.y;
         var x = event.getLocationX();
         var y = event.getLocationY();
         instancia.bola = new Bola(instancia.space,cc.p(x+(jugadorX*0.95),y+(jugadorY*0.95)),instancia);


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
        capaControles.agregarMoneda();
     },colisionEnemigoConContenedor:function (arbiter, space) {
          var shapes = arbiter.getShapes();
          // shapes[0] es el enemigo
          var formaEnemigo = shapes[0];
          formaEnemigo.body.vx = 0; // Parar enemigo
     }, colisionDisparoConEnemigo:function (arbiter, space) {
          var shapes = arbiter.getShapes();

          this.formasEliminar.push(shapes[0]);
          this.formasEliminar.push(shapes[1]);
     }, colisionDisparoConSuelo:function (arbiter, space) {
          var shapes = arbiter.getShapes();

          this.formasEliminar.push(shapes[0]);
     }, colisionBolaConDestructor:function (arbiter, space) {
          var shapes = arbiter.getShapes();
          if(this.bola!=null){
            this.formasEliminar.push(shapes[0]);
            this.destruirBola = true;
            this.contadoresBolas[0].actualizarContador();
          }

     }, colisionJugadorConAgua:function(arbiter,space){
          this.jugador.terreno = "agua";
     }, colisionJugadorConPuerta:function(arbiter,space){
        if(this.jugador.key == true){
            var shapes = arbiter.getShapes();

            this.formasEliminar.push(shapes[1]);
        }
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
