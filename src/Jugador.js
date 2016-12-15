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
    space:null,
    sprite:null,
    shape:null,
    body:null,
    layer:null,

ctor:function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;

    // animaciones - correr
    var framesAnimacion = [];
    for (var i = 1; i <= 31; i++) {
        if(i<10)
            var str = "alucard_walking_0" + i + ".png";
        else
            var str = "alucard_walking_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionCorrer = new cc.RepeatForever(new cc.Animate(animacion));
    //this.animacionCorrer.retain();

    // animaciones - saltar
    var framesAnimacion = [];
    for (var i = 1; i <= 12; i++) {
        if(i<10)
            var str = "alucard_jump_0" + i + ".png";
        else
            var str = "alucard_jump_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.1);
    this.animacionSaltar = new cc.RepeatForever(new cc.Animate(animacion));


    // animaciones - quieto
    var framesAnimacion = [];
    for (var i = 1; i <= 14; i++) {
        if(i<10)
            var str = "alucard_idle_0" + i + ".png";
        else
            var str = "alucard_idle_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.3);
    this.animacionQuieto = new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación - disparar
    var framesAnimacion = [];
    for (var i = 1; i <= 11; i++) {
        if(i<10)
            var str = "alucard_hit_0" + i + ".png";
        else
            var str = "alucard_hit_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.05);
    this.animacionDisparar =
        new cc.Repeat(new cc.Animate(animacion),1);

    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 14; i++) {
        if(i<10)
            var str = "alucard_idle_0" + i + ".png";
        else
            var str = "alucard_idle_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    var actionAnimacionBucle =
        new cc.RepeatForever(new cc.Animate(animacion));


    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#alucard_idle_01.png");
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
        if ( this.estado != correr && this.tiempoDisparando <= 0 ) {
            this.estado = correr;
            this.sprite.stopAllActions();
            this.sprite.runAction(this.animacionCorrer);
        }
        this.sprite.scaleX = -1;

        this.body.applyImpulse(cp.v(-100, 0), cp.v(0, 0));

    }, moverDerecha: function(){
        if ( this.estado != correr && this.tiempoDisparando <= 0) {
            this.estado = correr;
            this.sprite.stopAllActions();
            this.sprite.runAction(this.animacionCorrer);
        }
        this.sprite.scaleX = 1;

        this.body.applyImpulse(cp.v(100, 0), cp.v(0, 0));

    }, moverArriba: function(){

       if ( this.body.vy < 3 && this.body.vy > - 3   ){
           this.contadorVelYCero  = this.contadorVelYCero +1 ;
       }

       console.log("vel Y:"+this.body.vy );

       if ( this.contadorVelYCero  > 1 ){
          if ( this.estado != saltar && this.tiempoDisparando <= 0) {
               this.estado = saltar;
               this.sprite.stopAllActions();
               this.sprite.runAction(this.animacionSaltar);
           }

           this.body.applyImpulse(cp.v(0, 300), cp.v(0, 0));
           this.contadorVelYCero = 0;
       }

    }, actualizarAnimacion: function(){
        if ( this.tiempoDisparando  > 0 ){
            this.tiempoDisparando  = this.tiempoDisparando  - 1;
        }
        if ( this.body.vy <= 10 && this.body.vy >= -10
           && this.body.vx <= 0.1 && this.body.vx >= -0.1 ){
              if( this.estado != quieto && this.tiempoDisparando <= 0){
                  this.estado = quieto;
                  this.sprite.stopAllActions();
                  this.sprite.runAction(this.animacionQuieto);
              }
        }

        if ( this.body.vy >= 10 || this.body.vy <= -10 ){
              if( this.estado != saltar && this.tiempoDisparando <= 0){
                  this.estado = saltar;
                  this.sprite.stopAllActions();
                  this.sprite.runAction(this.animacionSaltar);
              }
        }
    }, disparar: function(){
         this.sprite.stopAllActions();
         this.sprite.runAction(this.animacionDisparar);
         this.tiempoDisparando = 40;
         this.estado = disparando;
     }
});