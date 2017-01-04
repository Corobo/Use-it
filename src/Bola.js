var Bola = cc.Class.extend({
    space:null,
    sprite:null,
    shape:null,
    layer:null,
ctor:function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;

    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite(res.bola_png);
    // Cuerpo estática , no le afectan las fuerzas
    // Cuerpo dinámico, SI le afectan las fuerzas
    this.body = new cp.Body(5, Infinity);

    this.body.setPos(posicion);
    this.body.setAngle(0);
    this.sprite.setBody(this.body);

    this.space.addBody(this.body);

    var radio = this.sprite.getContentSize().width / 2;
    this.shape = new cp.CircleShape(this.body, radio , cp.vzero);
    this.space.addShape(this.shape);
    this.shape.setCollisionType(tipoBolas);

    layer.addChild(this.sprite,10);

   } , eliminar: function (){
        // quita la forma
        this.space.removeShape(this.shape);

        // quita el cuerpo
        this.space.removeBody(this.shape.getBody());

        // quita el sprite
        this.layer.removeChild(this.sprite);
    }
});
