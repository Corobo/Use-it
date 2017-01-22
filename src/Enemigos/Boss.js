var Boss = cc.Class.extend({
    direccionX:null,
    space:null,
    sprite:null,
    shape:null,
    layer:null,
    disparoAnterior:0,
    ctor:function (space, posicion, layer,direccionX) {
        this.space = space;
        this.layer = layer;
        this.direccionX = direccionX;

    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 2; i++) {
        var str = "boss_0" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    var actionAnimacionBucle =
    new cc.RepeatForever(new cc.Animate(animacion));

    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#boss_01.png");
    // Cuerpo estática , no le afectan las fuerzas
    // Cuerpo dinámico, SI le afectan las fuerzas
    this.body = new cp.Body(5, Infinity);

    this.body.setPos(posicion);
    this.body.setAngle(0);
    this.sprite.setBody(this.body);

    // Se añade el cuerpo al espacio
    this.space.addBody(this.body);

    // forma
    this.shape = new cp.BoxShape(this.body,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height);
    // agregar forma dinamica
    this.space.addShape(this.shape);
    this.shape.setCollisionType(tipoBoss);
    // añadir sprite a la capa

    // ejecutar la animación
    this.sprite.runAction(actionAnimacionBucle);
    if(direccionX=="derecha")
        this.sprite.scaleX = -1;
    else
        this.sprite.scaleX = 1;

    layer.addChild(this.sprite,10);

}, moverAutomaticamente: function(){
    var d = new Date();
    var t = d.getTime();
    if(t-this.disparoAnterior>500){
        this.disparoAnterior = t;
        this.layer.disparaEnemigo(this,"boss",this.direccionX);
    }




} , eliminar: function (){
        // quita la forma
        this.space.removeShape(this.shape);

        // quita el cuerpo
        this.space.removeBody(this.shape.getBody());

        // quita el sprite
        this.layer.removeChild(this.sprite);
    }
});
