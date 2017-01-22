
var GameWinLayer = cc.LayerColor.extend({
    monedas:0,
    objetosUsados:0,
    tiempo:0,
    vidas:0,
    spriteMonedas:null,
    spriteTiempo:null,
    spriteVidas:null,
    spriteVidaExtra:null,
    etiquetaMonedas:null,
    etiquetaVidas:null,
    etiquetaTiempo:null,
    etiquetaObjetosUsados:null,
    etiquetaPuntuacionFinal:null,
    size:null,
    puntuacionFinal:null,
    tiempoSegundos:null,
    tiempoMinutos:null,
    ctor:function (monedas,objetosUsados,tiempo,vidas) {
        this.monedas = monedas;
        this.objetosUsados = objetosUsados;
        this.vidas = vidas;
        this.tiempo = tiempo;
        this._super();
        this.init();

    },
    init:function () {
        this._super(cc.color(0, 0, 0, 180));

        var winSize = cc.director.getWinSize();
        this.size = cc.director.getWinSize();

        var botonReiniciar = new cc.MenuItemSprite(
            new cc.Sprite(res.boton_jugar_png),
            new cc.Sprite(res.boton_jugar_png),
            this.pulsarReiniciar, this);

        var menu = new cc.Menu(botonReiniciar);
        menu.setPosition(winSize.width / 2, winSize.height / 4);

        this.addChild(menu);

        this.spriteMonedas = cc.Sprite.create(res.moneda_png);
        this.spriteMonedas.setPosition(cc.p((this.size.width/2)-45, (this.size.height*0.8)));

        this.addChild(this.spriteMonedas);

        this.etiquetaMonedas = new cc.LabelTTF(this.monedas, "Comic Sans MS", 20);
        this.etiquetaMonedas.setPosition(cc.p(this.size.width/2, (this.size.height*0.8)));
        this.etiquetaMonedas.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaMonedas);

        this.spriteVidas = cc.Sprite.create(res.vida_png);
        this.spriteVidas.setPosition(cc.p((this.size.width/2)-45, (this.size.height*0.7)));

        this.addChild(this.spriteVidas);

        this.etiquetaVidas = new cc.LabelTTF(this.vidas, "Comic Sans MS", 20);
        this.etiquetaVidas.setPosition(cc.p(this.size.width/2, (this.size.height*0.7)));
        this.etiquetaVidas.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaVidas);

        this.spriteTiempo = cc.Sprite.create(res.reloj_png);
        this.spriteTiempo.setPosition(cc.p((this.size.width/2)-45, (this.size.height*0.6)));

        this.addChild(this.spriteTiempo);

        this.calcularTiempo();

        this.etiquetaTiempo = new cc.LabelTTF(Math.floor(this.tiempoMinutos)+" : "+Math.floor(this.tiempoSegundos), "Comic Sans MS", 20);
        this.etiquetaTiempo.setPosition(cc.p(this.size.width/2, (this.size.height*0.6)));
        this.etiquetaTiempo.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaTiempo);

        this.etiquetaObjetosUsados = new cc.LabelTTF("Objetos usados: "+this.objetosUsados, "Comic Sans MS", 20);
        this.etiquetaObjetosUsados.setPosition(cc.p(this.size.width/2, (this.size.height*0.5)));
        this.etiquetaObjetosUsados.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaObjetosUsados);

        this.calcularPuntuacion();

        this.etiquetaPuntuacionFinal = new cc.LabelTTF("Puntuacion Final: "+Math.floor(this.puntuacionFinal), "Comic Sans MS", 20);
        this.etiquetaPuntuacionFinal.setPosition(cc.p(this.size.width/2, (this.size.height*0.4)));
        this.etiquetaPuntuacionFinal.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaPuntuacionFinal);

        if(this.puntuacionFinal>=1000)
            vidaExtra=true;

    },
    pulsarReiniciar:function (sender) {
        // Volver a ejecutar la escena Prinicpal
        cc.director.runScene(new GameScene());
    },calcularPuntuacion(){
       var puntuacion = 0;
       puntuacion = puntuacion + this.monedas * 20;
       puntuacion = puntuacion + this.vidas * 10;
       puntuacion = puntuacion - this.objetosUsados * 0.5;
       puntuacion = puntuacion - (this.tiempo/1000) * 0.1;
       this.puntuacionFinal = puntuacion;
   },calcularTiempo(){
     var segundos = this.tiempo/1000;
     var minutos  = segundos/60;
     this.tiempoMinutos = Math.floor(minutos);
     this.tiempoSegundos = (minutos % 1)*60

 }
});
