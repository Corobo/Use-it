var quieto = "quieto";
var correr = "correr";
var saltar = "saltar";
var disparando = "disparando";

var Jugador = cc.Class.extend({
    contadorVelYCero: 0,
    estado: quieto,
    tiempoDisparando: 0,
    animacionDisparar:null,
    animacionQuieto:null,
    animacionCorrer:null,
    animacionSaltar:null,
    terreno: "tierra",
    space:null,
    sprite:null,
    shape:null,
    body:null,
    layer:null,
    vida:100,
    vidas:3,
    digitos:[],
    digitosAire:[],
    aire:100,
    key:false,
    anteriorSalto:0,
    almas:0,
    bolas:0,
    balas:1,
    morir:false,
    llavesRecogidas:0,
    saltoPotenciado:false,
    invulnerabilidad:false,
    tiempoInvulnerabilidad:0,
    tiempoEnAgua:0,
    tiempoInmunidad:0,
    proteccion:false,
    objetosUsados:0,
ctor:function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;

    // animaciones - correr
    var framesAnimacion = [];
    for (var i = 1; i <= 3; i++) {
        var str = "walking_0" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionCorrer = new cc.RepeatForever(new cc.Animate(animacion));
    //this.animacionCorrer.retain();

    // animaciones - saltar
    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "jumping_0" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.3);
    this.animacionSaltar = new cc.RepeatForever(new cc.Animate(animacion));


    // animaciones - quieto
    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "idle_0" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.3);
    this.animacionQuieto = new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - disparar
    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "idle_0" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.05);
    this.animacionDisparar =
        new cc.Repeat(new cc.Animate(animacion),1);

    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 1; i++) {
        var str = "idle_0" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    var actionAnimacionBucle =
        new cc.RepeatForever(new cc.Animate(animacion));


    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#idle_01.png");
    // Cuerpo dinamico, SI le afectan las fuerzas


    this.body = new cp.Body(1, Infinity);
    this.body.setPos(posicion);
    //body.w_limit = 0.02;
    this.body.setAngle(0);
    this.sprite.setBody(this.body);

    // Se añade el cuerpo al espacio
    this.space.addBody(this.body);

    // forma
    this.shape = new cp.BoxShape(this.body,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height);
    this.shape.setFriction(0);
    this.shape.setCollisionType(tipoJugador);
    //this.shape.setElasticity(0);
    // forma dinamica
    this.space.addShape(this.shape);
    // añadir sprite a la capa

    // ejecutar la animación
    this.sprite.runAction(actionAnimacionBucle);
    layer.addChild(this.sprite,10);


    }, moverIzquierda: function(){
        if (this.estado != correr && this.tiempoDisparando <= 0 ) {
            this.estado = correr;
            this.sprite.stopAllActions();
            this.sprite.runAction(this.animacionCorrer);
        }
        this.sprite.scaleX = -1;

        this.body.applyImpulse(cp.v(-100, 0), cp.v(0, 0));

    }, moverDerecha: function(){
        if (this.estado != correr && this.tiempoDisparando <= 0) {
            this.estado = correr;
            this.sprite.stopAllActions();
            console.log("correr" );
            this.sprite.runAction(this.animacionCorrer);
        }
        this.sprite.scaleX = 1;

        this.body.applyImpulse(cp.v(100, 0), cp.v(0, 0));

    }, moverArriba: function(){

       if ( this.body.vy < 3 && this.body.vy > - 3   ){
           this.contadorVelYCero  = this.contadorVelYCero +1 ;
       }

       console.log("vel Y:"+this.body.vy );

       if ( this.contadorVelYCero  > 1 || this.terreno=="agua" || this.terreno=="escalera" ){
          if ( this.estado != saltar && this.tiempoDisparando <= 0) {
               this.estado = saltar;
               this.sprite.stopAllActions();
               console.log("Saltando" );
               this.sprite.runAction(this.animacionSaltar);
           }

           if(this.terreno=="agua")
            this.body.applyImpulse(cp.v(0, 50), cp.v(0, 0));
           else if(this.terreno=="escalera")
            this.body.applyImpulse(cp.v(0, 25), cp.v(0, 0));
           else{
            if(this.saltoPotenciado)
                this.body.applyImpulse(cp.v(0, 400), cp.v(0, 0));
            else
                this.body.applyImpulse(cp.v(0, 300), cp.v(0, 0));
            this.contadorVelYCero = 0;
            cc.audioEngine.playEffect(res.sonido_salto_wav,false);
            }
            this.terreno="tierra";

       }

    }, actualizarAnimacion: function(){
        if ( this.tiempoDisparando  > 0 ){
            this.tiempoDisparando  = this.tiempoDisparando  - 1;
        }
        if ( this.body.vy <= 10 && this.body.vy >= -10
           && this.body.vx <= 0.1 && this.body.vx >= -0.1 ){
              if(this.estado != quieto && this.tiempoDisparando <= 0){
                  this.estado = quieto;
                  this.sprite.stopAllActions();
                  console.log("parado" );
                  this.sprite.runAction(this.animacionQuieto);
              }
        }

        if ( this.body.vy >= 10 || this.body.vy <= -10 ){
              if( this.estado != saltar && this.tiempoDisparando <= 0){
                  this.estado = saltar;
                  this.sprite.stopAllActions();
                  console.log("Saltando" );
                  this.sprite.runAction(this.animacionSaltar);
              }

        }
    }, disparar: function(){
         this.sprite.stopAllActions();
         this.sprite.runAction(this.animacionDisparar);
         this.tiempoDisparando = 40;
         this.estado = disparando;
    }, actualizarAlmas:function(bool){
       if(bool)
        this.almas++;
       else
        this.almas--;
    }, actualizarBolas:function(bool){
       if(bool)
       this.bolas++;
      else
       this.bolas--;
    }, comprobarMuerte:function(){
        if(this.body.vy<-425 && this.terreno=="tierra"){
            this.morir=true;
        }
        if(this.aire<=1){
            this.morir=true;
        }
        if(this.vida<=1){
            this.morir=true;
        }
    }, actualizarBalas:function(bool){
            if(bool)
            this.balas++;
           else
            this.balas--;
    }, actualizarLlaves:function(bool){
         if(bool){
         this.key=true;
         this.llavesRecogidas++;
         }
        else
         this.key=false;
    },actualizarSalto:function(bool){
        if(bool)
        this.saltoPotenciado=true;
       else
        this.saltoPotenciado=false;
    },actualizarProteccion:function(bool){
         if(bool)
         this.proteccion=true;
        else
         this.proteccion=false;
    },actualizarInvulnerabilidad:function(bool,tiempo){
      if(bool){
        this.invulnerabilidad=true;
        this.tiempoInvulnerabilidad = tiempo;
      }
     else{
      this.invulnerabilidad=false;
      this.tiempoInvulnerabilidad=tiempo;
      }
    },actualizarVida:function(bool,num){
        if(bool){
          this.vida=100;
          this.digitos[0]= 0;
          this.digitos[1]= 0;
          this.digitos[2]= 1;
          this.vidas = this.vidas + num;
          }
         else{
          if(this.proteccion==false && this.invulnerabilidad==false){
            this.vida= this.vida-num;
            var copiaVida = this.vida;
            this.digitos = [];
            while(copiaVida >= 1) {
                    this.digitos.push(copiaVida % 10);
                    copiaVida /= 10;
            }
            }
           if(this.proteccion==true){
            this.proteccion=false;
           }
        }
    }, actualizarAire:function(bool){
       if(bool){
        this.aire = this.aire - 1;
        var copiaAire = this.aire;
        this.digitosAire = [];
        while(copiaAire >= 1) {
                this.digitosAire.push(copiaAire % 10);
                copiaAire /= 10;
        }
       }else{
        this.aire=100;
        this.digitosAire[0]= 0;
        this.digitosAire[1]= 0;
        this.digitosAire[2]= 1;

       }
    },actualizarObjetosUsados:function(){
        this.objetosUsados++;
    }
});
