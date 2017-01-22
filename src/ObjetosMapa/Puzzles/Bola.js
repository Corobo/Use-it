var Bola = cc.Class.extend({
    space:null,
    sprite:null,
    shape:null,
    layer:null,
    fisica:null,
    ctor:function (space, posicion, layer,fisica) {
        this.space = space;
        this.layer = layer;
        this.fisica = fisica;

    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite(res.bola_png);
        // Cuerpo estática , no le afectan las fuerzas
        if(fisica==false){
            var body = new cp.StaticBody();
            body.setPos(posicion);
            this.sprite.setBody(body);
        // Los cuerpos estáticos nunca se añaden al Space
        var radio = this.sprite.getContentSize().width / 2;
        // forma
        this.shape = new cp.CircleShape(body, radio , cp.vzero);
        this.shape.setCollisionType(tipoBolas);
        // Nunca genera colisiones reales
        this.shape.setSensor(true);
        // forma estática
        this.space.addStaticShape(this.shape);
        // añadir sprite a la capa
    }else{
        // Crear Sprite - Cuerpo y forma
        this.sprite = new cc.PhysicsSprite(res.bola_png);
            // Cuerpo estática , no le afectan las fuerzas
            // Cuerpo dinámico, SI le afectan las fuerzas
            var body = new cp.Body(5, Infinity);


            body.setPos(posicion);
            body.setAngle(0);
            this.sprite.setBody(body);

            this.space.addBody(body);

            var radio = this.sprite.getContentSize().width / 2;
            this.shape = new cp.CircleShape(body, radio , cp.vzero);
            this.space.addShape(this.shape);
            this.shape.setCollisionType(tipoBolas);
        }

        this.layer.addChild(this.sprite,10);

    } , eliminar: function (){
        // quita la forma
        this.space.removeShape(this.shape);

        // quita el cuerpo
        if(this.fisica)
            this.space.removeBody(this.shape.getBody());


        // quita el sprite
        this.layer.removeChild(this.sprite);
    }
});
