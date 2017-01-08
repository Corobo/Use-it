var ContadorBolas = cc.Class.extend({
    space:null,
    sprite:null,
    shape:null,
    layer:null,
    id:null,
    posicion:null,
    numeroBolas:null,
    bolasActuales:0,
    contadores:[],
ctor:function (space, posicion, layer, id, numeroBolas) {
    this.space = space;
    this.layer = layer;
    this.id = id;
    this.numeroBolas = numeroBolas;
    this.posicion = posicion;
    this.contadores = [res.contador_0_5_png,res.contador_1_5_png,res.contador_2_5_png,res.contador_3_5_png,res.contador_4_5_png,res.contador_5_5_png];

    this.sprite = cc.Sprite.create(this.contadores[this.bolasActuales]);
    this.sprite.setPosition(posicion);
    this.layer.addChild(this.sprite);


   }, eliminar: function (){
      this.space.removeShape(this.shape);
      this.layer.removeChild(this.sprite);
   }, actualizarContador:function(){
        this.bolasActuales++;
        this.layer.removeChild(this.sprite);
        this.sprite = cc.Sprite.create(this.contadores[this.bolasActuales]);
        this.sprite.setPosition(this.posicion);
        this.layer.addChild(this.sprite);
   }
});
