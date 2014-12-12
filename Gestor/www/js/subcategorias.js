var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        getJsonData();
    }
};

app.initialize();

function getSubcategoria(){
    var cadGet = location.search.substr(1, location.search.length);
    var aux = cadGet.split("=");
    var subcategoria = aux[1];
    return subcategoria;
}

function getJsonData(){
    //Se recupera JSON de txt generado en index
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
        fs.root.getFile("Gestor/datos_gestor.txt", null, function(fe){
            fe.file(function(f){
                var reader = new FileReader();
                reader.onloadend = function(evt){
                    var json = JSON.parse(reader.result);
                    cargarOpciones(json);
                }
                
                reader.readAsText(f);
            })
        });
    });
}

function cargarOpciones(json){
    // Se tratan las opciones de configuración
    var opcion_recibida = getSubcategoria();
    var categorias = json['categorias']; //Guardo a capón el array
    var categoria_seleccionada = categorias[opcion_recibida];
    var subcategorias = categoria_seleccionada['subcategoria'];
    
    for(var i = 0; i < subcategorias.length; i++){
        var nombre = subcategorias[i];
        pintarOpciones(nombre['nombre'], nombre['enlace'])
    }
}

function pintarOpciones(texto, enlace) {
    var li = document.createElement("LI");
    var ahref = document.createElement("A");
    var div = document.createElement("DIV");
    var p = document.createElement("P");
    var t = document.createTextNode(texto);

    p.appendChild(t).className = "ca-main";
    div.appendChild(p).className = "ca-content";
    ahref.appendChild(div);
    ahref.href = enlace;
    li.appendChild(ahref);
    document.getElementById("lista").appendChild(li);
}