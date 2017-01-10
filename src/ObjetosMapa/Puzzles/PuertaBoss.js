var PuertaBoss = cc.Class.extend({
    space:null,
    sprite:null,
    shape:null,
    layer:null,
    id:null,
ctor:function (space, posicion, layer, id) {
    this.space = space;
    this.layer = layer;
    this.id = id;

    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite(res.puerta_boss_png);
    // Cuerpo estática , no le afectan las fuerzas
    var body = new cp.StaticBody();
    body.setPos(posicion);
    this.sprite.setBody(body);;
    // forma
    this.shape = new cp.BoxShape(body, 32 , 96);
    this.shape.setCollisionType(tipoPuertaBoss);
    // Nunca genera colisiones reales
    this.shape.setSensor(false);
    // forma estática
    this.space.addStaticShape(this.shape);
    // añadir sprite a la capa

    layer.addChild(this.sprite,10);
   }, eliminar: function (){
      // quita la forma
      this.space.removeShape(this.shape);

      // quita el cuerpo *opcional, funciona igual
      // NO: es un cuerpo estático, no lo añadimos, no se puede quitar.
      // this.space.removeBody(shape.getBody());

      // quita el sprite
      this.layer.removeChild(this.sprite);
   }
});
