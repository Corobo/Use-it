var PulsarRaton = cc.Class.extend({
    space:null,
    sprite:null,
    shape:null,
    layer:null,
    id:null,
    posicion:null,
    numeroBolas:null,
    bolasActuales:0,
    contadores:[],
ctor:function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;
    this.posicion = posicion;

    this.sprite = cc.Sprite.create(res.pulsar_raton_png);
    this.sprite.setPosition(posicion);
    this.layer.addChild(this.sprite);


   }, eliminar: function (){
      this.space.removeShape(this.shape);
      this.layer.removeChild(this.sprite);
   }
});
