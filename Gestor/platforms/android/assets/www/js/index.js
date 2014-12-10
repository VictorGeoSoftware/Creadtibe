// Variables globales
var splashLanzado = "false";
var configuracion_opciones;




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
        console.log("Splash lanzado? " + splashLanzado);
        if(splashLanzado == "false"){
            navigator.splashscreen.show();
            splashLanzado = "true";
            getJsonData();
        }
    }
};

app.initialize();

function getJsonData(){
    //Se harcodea JSON, hasta que haya uno para leer
    var json = {"logo":"img/logo.png", "imagen": "img/image_index.jpg", 
                "categorias":[{"nombre": "Categoría desde json 1", "subcategoria": ""},
                              {"nombre": "Categoría desde json 2", "subcategoria": [
                                  {"nombre": "Subcategoria 1"},
                                  {"nombre": "Subcategoria 2"}]},
                              {"nombre": "Categoría desde json 3", "subcategoria": ""},
                             {"nombre": "Categoría Pepote", "subcategoria": ""},
                             {"nombre": "Categoría Victor", "subcategoria": ""}], 
                "configuracion":[{"nombre": "Opción 1", "subcategoria": ""},
                                 {"nombre": "", "subcategoria": [
                                    {"nombre": "Opción 2"},
                                    {"nombre": "Opción 3"}]},
                                 {"nombre": "Opción 4", "subcategoria": ""}]
               };
    
    // Se tratan las categorías
    var categorias = json['categorias'];
    var i = 0;
    
    for(i = 0; i < categorias.length; i++){
        var categoria = categorias[i];
        
        if(categoria['subcategoria'].length > 0){
            var subCategorias = categoria['subcategoria'];
            var j = 0;
            for(j = 0; j < subCategorias.length; j++){
                var subCategoria = subCategorias[j];
                
            }
        }
        
        //Añadimos filas de ListView en página principal
        var div = document.createElement("DIV");
        var p = document.createElement("P");
        var t = document.createTextNode(categoria['nombre']);
        
        var imageNext = document.createElement("IMG");
        imageNext.src = "img/next.png";
        imageNext.className = "imagenNext"
        
        p.appendChild(t);
        p.appendChild(imageNext);
        div.appendChild(p).className = "contenidoFila";
        document.getElementById("lista").appendChild(div);
    }
    
    // Se tratan las opciones de configuración
    configuracion_opciones = new Array(json['configuracion'].length);
    var opciones = json['configuracion'];
    
    for(var i = 0; i < opciones.length; i++){
        var opcion = opciones[i];
        configuracion_opciones[i] = opcion['nombre'];
        
        if(opcion['subcategoria'].length > 0){
            var opcion_subcategorias = opcion['subcategoria'];
            configuracion_opciones[i] = new Array(opcion_subcategorias.length);
            
            for(var j = 0; j < opcion_subcategorias.length; j++){
                var subcategoria_nombre = opcion_subcategorias[j];
                configuracion_opciones[i][j] = subcategoria_nombre['nombre'];
            }
        }
    }
    
    /*
    $.ajax({
        url: 'https://api.themoviedb.org/3/discover/movie?&api_key=8ef4fa6a00af69b09d14335cc80e1f15',
        type: "GET",
        dataType: "json",
        success: function(data, status){
            console.log('Peticion realizada');
        },
        error: function(request, status, error){
            console.log('Error en petición: ' + status);
        }
    }).done(function(data){
        console.log('En Done');
        console.log('Numer de datos: ' + data['results'].length);
        
        var i = 0;
        var lista = data['results'];
        for(i = 0; i < data['results'].length; i++){
            var pelicula = lista[i];
            console.log('Pelicula: ' + pelicula['original_title']);
        }
    });
    */
}

function cargarPaginaOpciones() {
    window.open("opciones.html", "_blank", "location=yes");
    
    for(var i = 0; i < configuracion_opciones.length; i++){
        //Evaluamos si son sbcategorías o categoría sola
        console.log('Valores array segundo indice: ' + configuracion_opciones[i][0]);
        
        if(configuracion_opciones[i][0] == 0){
            //Añadimos filas de ListView en página principal
            var div = document.createElement("DIV");
            var p = document.createElement("P");
            var t = document.createTextNode(configuracion_opciones[i]);

            var imageNext = document.createElement("IMG");
            imageNext.src = "img/next.png";
            imageNext.className = "imagenNext"

            p.appendChild(t);
            p.appendChild(imageNext);
            div.appendChild(p).className = "contenidoFila";
            document.getElementById("lista_opciones").appendChild(div);            
        }else{
            
        }
        
        

    }
}