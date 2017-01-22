var ControlesLayer = cc.Layer.extend({
    etiquetaMonedas:null,
    etiquetaMunicion:null,
    etiquetaVidas:null,
    spriteVidasN:null,
    spriteMoneda:null,
    spriteVidas:null,
    spriteDigito1:null,
    spriteDigito2:null,
    spriteDigito3:null,
    spriteMunicion:null,
    spriteFondo:null,
    cajaObjeto:null,
    objetoBola:null,
    objetoAlma:null,
    monedas:0,
    size:null,
    text_num:[],
    text_air:[],
    spriteTextAir:null,
    textAir1:null,
    textAir2:null,
    textAir3:null,
    relleno:null,
    etiquetaTiempo:0,
    tiempoMinuto:0,
    tiempoSegundo:0,
    spriteTiempo:null,
    ctor:function () {
        this._super();
        this.size = cc.winSize;

        this.text_num = [ res.text_0_png , res.text_1_png , res.text_2_png , res.text_3_png , res.text_4_png , res.text_5_png , res.text_6_png , res.text_7_png , res.text_8_png , res.text_9_png ];
        this.text_air = [res.text1_0_png , res.text1_1_png , res.text1_2_png , res.text1_3_png , res.text1_4_png , res.text1_5_png , res.text1_6_png , res.text1_7_png , res.text1_8_png , res.text1_9_png ]
        // Contador Monedas

        this.spriteFondo = cc.Sprite.create(res.fondo_toolbar_png);
        this.spriteFondo.setPosition(
            cc.p(this.size.width*0.4, this.size.height*0.99));

        this.addChild(this.spriteFondo);

        this.spriteVidas = cc.Sprite.create(res.corazon_png);
        this.spriteVidas.setPosition(
            cc.p(this.size.width*0.08, this.size.height*0.94));

        this.addChild(this.spriteVidas);

        this.spriteDigito1 = cc.Sprite.create(res.text_1_png);
        this.spriteDigito1.setPosition(
            cc.p(this.size.width*0.1, this.size.height*0.94));

        this.addChild(this.spriteDigito1);

        this.spriteDigito2 = cc.Sprite.create(res.text_0_png);
        this.spriteDigito2.setPosition(
            cc.p(this.size.width*0.12, this.size.height*0.94));

        this.addChild(this.spriteDigito2);

        this.spriteDigito3 = cc.Sprite.create(res.text_0_png);
        this.spriteDigito3.setPosition(
            cc.p(this.size.width*0.145, this.size.height*0.94));

        this.addChild(this.spriteDigito3);


        this.spriteTextAir = cc.Sprite.create(res.text_air_png);
        this.spriteTextAir.setPosition(
            cc.p(this.size.width*0.06, this.size.height*0.90));

        this.addChild(this.spriteTextAir);

        this.textAir1 = cc.Sprite.create(res.text1_1_png);
        this.textAir1.setPosition(
            cc.p(this.size.width*0.1, this.size.height*0.90));

        this.addChild(this.textAir1);

        this.textAir2 = cc.Sprite.create(res.text1_0_png);
        this.textAir2.setPosition(
            cc.p(this.size.width*0.12, this.size.height*0.90));

        this.addChild(this.textAir2);

        this.textAir3 = cc.Sprite.create(res.text1_0_png);
        this.textAir3.setPosition(
            cc.p(this.size.width*0.145, this.size.height*0.90));

        this.addChild(this.textAir3);

        this.cajaObjeto = cc.Sprite.create(res.caja_objeto_png);
        this.cajaObjeto.setPosition(
            cc.p(this.size.width*0.35, this.size.height*0.97));

        this.addChild(this.cajaObjeto);

        this.relleno = cc.Sprite.create(res.relleno_png);
        this.relleno.setPosition(cc.p(this.size.width*0.35,
            this.size.height*0.94));

        this.addChild(this.relleno);


        this.spriteMoneda = cc.Sprite.create(res.moneda_png);
        this.spriteMoneda.setPosition(cc.p(this.size.width - 125, this.size.height - 20));

        this.addChild(this.spriteMoneda);

        this.etiquetaMonedas = new cc.LabelTTF("0", "Comic Sans MS", 20);
        this.etiquetaMonedas.setPosition(cc.p(this.size.width - 90, this.size.height - 20));
        this.etiquetaMonedas.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaMonedas);

        this.spriteMunicion = cc.Sprite.create(res.bala_png);
        this.spriteMunicion.setPosition(cc.p(this.size.width - 185, this.size.height - 20));

        this.addChild(this.spriteMunicion);

        this.etiquetaMunicion = new cc.LabelTTF("0", "Comic Sans MS", 20);
        this.etiquetaMunicion.setPosition(cc.p(this.size.width - 150, this.size.height - 20));
        this.etiquetaMunicion.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaMunicion);

        this.spriteVidasN = cc.Sprite.create(res.vida_png);
        this.spriteVidasN.setPosition(cc.p(this.size.width - 650, this.size.height - 30));

        this.addChild(this.spriteVidasN);

        this.etiquetaVidas = new cc.LabelTTF("3", "Comic Sans MS", 20);
        this.etiquetaVidas.setPosition(cc.p(this.size.width - 625, this.size.height - 30));
        this.etiquetaVidas.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaVidas);

        this.spriteTiempo = cc.Sprite.create(res.reloj_png);
        this.spriteTiempo.setPosition(cc.p(this.size.width - 375, this.size.height - 30));

        this.addChild(this.spriteTiempo);

        this.etiquetaTiempo = new cc.LabelTTF("0:00", "Comic Sans MS", 20);
        this.etiquetaTiempo.setPosition(cc.p(this.size.width - 325, this.size.height - 30));
        this.etiquetaTiempo.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaTiempo);



        return true;

    }, agregarMoneda:function(num){
       this.monedas = this.monedas + num;
       this.etiquetaMonedas.setString(this.monedas);
   }, actualizarMunicion:function(jugador){
    this.etiquetaMunicion.setString(jugador.balas);
}, actualizarVidas:function(jugador){
  this.etiquetaVidas.setString(jugador.vidas);
},actualizarVida:function(jugador){
    if(jugador.digitos.length==3){
        this.removeChild(this.spriteDigito1);
        this.removeChild(this.spriteDigito2);
        this.removeChild(this.spriteDigito3);
        this.spriteDigito1 = cc.Sprite.create(this.text_num[jugador.digitos[2]]);
        this.spriteDigito1.setPosition(
            cc.p(this.size.width*0.1, this.size.height*0.94));

        this.addChild(this.spriteDigito1);

        this.spriteDigito2 = cc.Sprite.create(this.text_num[jugador.digitos[0]]);
        this.spriteDigito2.setPosition(
            cc.p(this.size.width*0.12, this.size.height*0.94));

        this.addChild(this.spriteDigito2);

        this.spriteDigito3 = cc.Sprite.create(this.text_num[jugador.digitos[1]]);
        this.spriteDigito3.setPosition(
            cc.p(this.size.width*0.145, this.size.height*0.94));

        this.addChild(this.spriteDigito3);
    }
    if(jugador.digitos.length==2){
        this.removeChild(this.spriteDigito1);
        this.removeChild(this.spriteDigito2);
        this.removeChild(this.spriteDigito3);
        this.spriteDigito1 = cc.Sprite.create(this.text_num[jugador.digitos[1]]);
        this.spriteDigito1.setPosition(
            cc.p(this.size.width*0.1, this.size.height*0.94));

        this.addChild(this.spriteDigito1);

        this.spriteDigito2 = cc.Sprite.create(this.text_num[jugador.digitos[0]]);
        this.spriteDigito2.setPosition(
            cc.p(this.size.width*0.12, this.size.height*0.94));

        this.addChild(this.spriteDigito2);

    }
    if(jugador.digitos.length==1){
        this.removeChild(this.spriteDigito1);
        this.removeChild(this.spriteDigito2);
        this.spriteDigito1 = cc.Sprite.create(this.text_num[jugador.digitos[0]]);
        this.spriteDigito1.setPosition(
            cc.p(this.size.width*0.1, this.size.height*0.94));

        this.addChild(this.spriteDigito1);

    }
}, dibujarBolas:function(){
   this.removeChild(this.relleno);
   this.relleno = cc.Sprite.create(res.relleno_png);
   this.relleno.setPosition(cc.p(this.size.width*0.35,
       this.size.height*0.94));

   this.addChild(this.relleno);
   this.objetoBola = cc.Sprite.create(res.bola_png);
   this.objetoBola.setPosition(
     cc.p(this.size.width*0.35, this.size.height*0.94));
   this.addChild(this.objetoBola);

}, dibujarAlmas:function(){

    this.removeChild(this.relleno);
    this.relleno = cc.Sprite.create(res.relleno_png);
    this.relleno.setPosition(cc.p(this.size.width*0.35,
       this.size.height*0.94));

    this.addChild(this.relleno);
    this.objetoAlma = cc.Sprite.create(res.soul_individual_png);
    this.objetoAlma.setPosition(
     cc.p(this.size.width*0.35, this.size.height*0.94));
    this.addChild(this.objetoAlma);
}, eliminarObjetos:function(){
    this.removeChild(this.relleno);
    this.relleno = cc.Sprite.create(res.relleno_png);
    this.relleno.setPosition(cc.p(this.size.width*0.35,
       this.size.height*0.94));

    this.addChild(this.relleno);
}, actualizarAire:function(jugador){
   if(jugador.digitosAire.length==3){
       this.removeChild(this.textAir1);
       this.removeChild(this.textAir2);
       this.removeChild(this.textAir3);
       this.textAir1 = cc.Sprite.create(this.text_air[jugador.digitosAire[2]]);
       this.textAir1.setPosition(
           cc.p(this.size.width*0.1, this.size.height*0.90));

       this.addChild(this.textAir1);

       this.textAir2 = cc.Sprite.create(this.text_air[jugador.digitosAire[0]]);
       this.textAir2.setPosition(
           cc.p(this.size.width*0.12, this.size.height*0.90));

       this.addChild(this.textAir2);

       this.textAir3 = cc.Sprite.create(this.text_air[jugador.digitosAire[1]]);
       this.textAir3.setPosition(
           cc.p(this.size.width*0.145, this.size.height*0.90));

       this.addChild(this.textAir3);
   }
   if(jugador.digitosAire.length==2){
       this.removeChild(this.textAir1);
       this.removeChild(this.textAir2);
       this.removeChild(this.textAir3);
       this.textAir1 = cc.Sprite.create(this.text_air[jugador.digitosAire[1]]);
       this.textAir1.setPosition(
           cc.p(this.size.width*0.1, this.size.height*0.90));

       this.addChild(this.textAir1);

       this.textAir2 = cc.Sprite.create(this.text_air[jugador.digitosAire[0]]);
       this.textAir2.setPosition(
           cc.p(this.size.width*0.12, this.size.height*0.90));

       this.addChild(this.textAir2);

   }
   if(jugador.digitosAire.length==1){
       this.removeChild(this.textAir1);
       this.removeChild(this.textAir2);
       this.textAir1 = cc.Sprite.create(this.text_air[jugador.digitosAire[0]]);
       this.textAir1.setPosition(
           cc.p(this.size.width*0.1, this.size.height*0.90));

       this.addChild(this.textAir1);

   }
},calcularTiempo:function(tiempo){
    var segundos = tiempo/1000;
    var minutos  = segundos/60;
    this.tiempoMinutos = Math.floor(minutos);
    this.tiempoSegundos = (minutos % 1)*60
    this.etiquetaTiempo.setString(Math.floor(this.tiempoMinutos)+" : "+Math.floor(this.tiempoSegundos));
}
});
