var ControlesLayer = cc.Layer.extend({
    etiquetaMonedas:null,
    etiquetaMunicion:null,
    spriteVidas:null,
    spriteDigito1:null,
    spriteDigito2:null,
    spriteDigito3:null,
    spriteMunicion:null,
    spriteFondo:null,
    monedas:0,
    size:null,
    text_num:[],
    ctor:function () {
        this._super();
        this.size = cc.winSize;

        this.text_num = [ res.text_0_png , res.text_1_png , res.text_2_png , res.text_3_png , res.text_4_png , res.text_5_png , res.text_6_png , res.text_7_png , res.text_8_png , res.text_9_png ];

        // Contador Monedas
        this.etiquetaMonedas = new cc.LabelTTF("Monedas: 0", "Helvetica", 20);
        this.etiquetaMonedas.setPosition(cc.p(this.size.width - 90, this.size.height - 20));
        this.etiquetaMonedas.fillStyle = new cc.Color(0, 0, 0, 0);
        this.addChild(this.etiquetaMonedas);

        this.spriteFondo = cc.Sprite.create(res.fondo_toolbar_png);
        this.spriteFondo.setPosition(
            cc.p(this.size.width*0.4, this.size.height*0.99));

        this.addChild(this.spriteFondo);

        this.spriteVidas = cc.Sprite.create(res.corazon_png);
        this.spriteVidas.setPosition(
            cc.p(this.size.width*0.08, this.size.height*0.97));

        this.addChild(this.spriteVidas);

        this.spriteDigito1 = cc.Sprite.create(res.text_1_png);
        this.spriteDigito1.setPosition(
            cc.p(this.size.width*0.1, this.size.height*0.97));

        this.addChild(this.spriteDigito1);

        this.spriteDigito2 = cc.Sprite.create(res.text_0_png);
        this.spriteDigito2.setPosition(
            cc.p(this.size.width*0.12, this.size.height*0.97));

        this.addChild(this.spriteDigito2);

        this.spriteDigito3 = cc.Sprite.create(res.text_0_png);
        this.spriteDigito3.setPosition(
            cc.p(this.size.width*0.145, this.size.height*0.97));

        this.addChild(this.spriteDigito3);

        /*

        this.spriteCajaObjeto = cc.Sprite.create(res.fondo_toolbar);
        this.spriteCajaObjeto.setPosition(
            cc.p(size.width*0.4, size.height*0.97));

        this.addChild(this.spriteCajaObjeto);

        this.spriteObjeto = cc.Sprite.create(res.fondo_toolbar);
        this.spriteObjeto.setPosition(
            cc.p(size.width*0.4, size.height*0.97));

        this.addChild(this.spriteObjeto);

        this.spriteMunicion = cc.Sprite.create(res.fondo_toolbar);
        this.spriteMunicion.setPosition(
            cc.p(size.width*0.4, size.height*0.97));

        this.addChild(this.spriteMunicion);

        // Contador Monedas
        this.etiquetaMonedas = new cc.LabelTTF("Monedas: 0", "Helvetica", 20);
        this.etiquetaMonedas.setPosition(cc.p(size.width - 90, size.height - 20));
        this.etiquetaMonedas.fillStyle = new cc.Color(0, 0, 0, 0);
        this.addChild(this.etiquetaMonedas);

        this.spriteFondo = cc.Sprite.create(res.fondo_toolbar);
        this.spriteFondo.setPosition(
            cc.p(size.width*0.4, size.height*0.97));

        this.addChild(this.spriteFondo);*/



        return true;

    }, agregarMoneda:function(){
         this.monedas = this.monedas + 1;
         this.etiquetaMonedas.setString("Monedas: " + this.monedas);
    }, actualizarVida:function(jugador){
        if(jugador.digitos.length==3){
        this.removeChild(this.spriteDigito1);
        this.removeChild(this.spriteDigito2);
        this.removeChild(this.spriteDigito3);
        this.spriteDigito1 = cc.Sprite.create(this.text_num[jugador.digitos[2]]);
        this.spriteDigito1.setPosition(
            cc.p(this.size.width*0.1, this.size.height*0.97));

        this.addChild(this.spriteDigito1);

        this.spriteDigito2 = cc.Sprite.create(this.text_num[jugador.digitos[0]]);
        this.spriteDigito2.setPosition(
            cc.p(this.size.width*0.12, this.size.height*0.97));

        this.addChild(this.spriteDigito2);

        this.spriteDigito3 = cc.Sprite.create(this.text_num[jugador.digitos[1]]);
        this.spriteDigito3.setPosition(
            cc.p(this.size.width*0.145, this.size.height*0.97));

        this.addChild(this.spriteDigito3);
        }
        if(jugador.digitos.length==2){
        this.removeChild(this.spriteDigito1);
        this.removeChild(this.spriteDigito2);
        this.removeChild(this.spriteDigito3);
        this.spriteDigito1 = cc.Sprite.create(this.text_num[jugador.digitos[1]]);
        this.spriteDigito1.setPosition(
            cc.p(this.size.width*0.1, this.size.height*0.97));

        this.addChild(this.spriteDigito1);

        this.spriteDigito2 = cc.Sprite.create(this.text_num[jugador.digitos[0]]);
        this.spriteDigito2.setPosition(
            cc.p(this.size.width*0.12, this.size.height*0.97));

        this.addChild(this.spriteDigito2);

        }
        if(jugador.digitos.length==1){
        this.removeChild(this.spriteDigito1);
        this.removeChild(this.spriteDigito2);
        this.spriteDigito1 = cc.Sprite.create(this.text_num[jugador.digitos[0]]);
                this.spriteDigito1.setPosition(
                    cc.p(this.size.width*0.1, this.size.height*0.97));

                this.addChild(this.spriteDigito1);

        }
    }
});
