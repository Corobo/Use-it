var ControlesLayer = cc.Layer.extend({
    etiquetaMonedas:null,
    etiquetaMunicion:null,
    spriteVidas:null,
    spriteMunicion:null,
    spriteFondo:null,
    monedas:0,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        // Contador Monedas
        this.etiquetaMonedas = new cc.LabelTTF("Monedas: 0", "Helvetica", 20);
        this.etiquetaMonedas.setPosition(cc.p(size.width - 90, size.height - 20));
        this.etiquetaMonedas.fillStyle = new cc.Color(0, 0, 0, 0);
        this.addChild(this.etiquetaMonedas);

        this.spriteFondo = cc.Sprite.create(res.fondo_toolbar);
        this.spriteFondo.setPosition(
            cc.p(size.width*0.4, size.height*0.97));

        this.addChild(this.spriteFondo);

        /*this.spriteVidas = cc.Sprite.create(res.vidas_iniciales);
        this.spriteVidas.setPosition(
            cc.p(size.width*0.4, size.height*0.97));

        this.addChild(this.spriteVidas);

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
    }
});
