var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    boton_jugar_png : "res/boton_jugar.png",
    menu_titulo_png : "res/menu_titulo.png",
    mapa_puzzles : "res/Mapas/Mapa_puzzles/mapa_puzzles.tmx",
    PrtRiver_png: "res/Mapas/Mapa_puzzles/PrtRiver.png",
    moneda_png : "res/moneda.png",
    moneda_plist : "res/moneda.plist",
    disparo_png : "res/disparo.png",
    disparo_plist : "res/disparo.plist",
    animacion_cuervo_png: "res/animacion_cuervo.png",
    animacion_cuervo_plist: "res/animacion_cuervo.plist",
    disparo_png: "res/disparo.png",
    disparo_plist: "res/disparo.plist",
    walking_plist : "res/Jugador/Caminando/walking.plist",
    walking_png : "res/Jugador/Caminando/walking.png",
    jumping_plist : "res/Jugador/Saltando/jumping.plist",
    jumping_png : "res/Jugador/Saltando/jumping.png",
    dieing_plist : "res/Jugador/Muriendo/dieing.plist",
    dieing_png : "res/Jugador/Muriendo/dieing.png",
    idle_plist : "res/Jugador/Parado/idle.plist",
    idle_png : "res/Jugador/Parado/idle.png",
    fondo_toolbar : "res/Interfaz/Fondo/fondoToolBar.png",

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}