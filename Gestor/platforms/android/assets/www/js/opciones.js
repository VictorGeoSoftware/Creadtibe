var json;
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
        getJsonData();
    }
};

app.initialize();

function getJsonData(){
    //Se recupera JSON de txt generado en index
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
        fs.root.getFile("Gestor/datos_gestor.txt", null, function(fe){
            fe.file(function(f){
                var reader = new FileReader();
                reader.onloadend = function(evt){
                    json = JSON.parse(reader.result);
                    cargarOpciones();
                }
                
                reader.readAsText(f);
            })
        });
    });
    

    
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

function cargarOpciones(){
    // Se tratan las opciones de configuración
    console.log('se empeiza a rellenar el array');
    var opciones = json['configuracion'];
    configuracion_opciones = new Array(json['configuracion'].length);
    
    
    for(var i = 0; i < opciones.length; i++){
        var opcion = opciones[i];
        configuracion_opciones[i] = opcion['nombre'];
        
        if(opcion['subcategoria'].length > 0){
            var opcion_subcategorias = opcion['subcategoria'];
            configuracion_opciones[i] = new Array(opcion_subcategorias.length);

            for(var j = 0; j < opcion_subcategorias.length; j++){
                var subcategoria_nombre = opcion_subcategorias[j];
                configuracion_opciones[i][j] = subcategoria_nombre['nombre'];
            
                var li = document.createElement("LI");
                var ahref = document.createElement("A");
                var div = document.createElement("DIV");
                var p = document.createElement("P");                
                var t = document.createTextNode(configuracion_opciones[i][j]);
                
                p.appendChild(t).className = "ca-main";
                div.appendChild(p).className = "ca-content";
                ahref.appendChild(div);
                ahref.href = subcategoria_nombre['enlace'];
                li.appendChild(ahref);
                
                if(j < opcion_subcategorias.length - 1){
                    li.style.marginBottom = "0px";
                }

                document.getElementById("lista").appendChild(li);
            }
        }else{
            pintarOpciones(configuracion_opciones[i], opcion['enlace']);
        }
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



/*function pintarOpciones() {
    for(var i = 0; i < configuracion_opciones.length; i++){
        //Evaluamos si son sbcategorías o categoría sola
        var valorSubcategoria = configuracion_opciones[i][0];
        console.log('Valor subcategoria: ' + valorSubcategoria);
        
        if(valorSubcategoria == '0'){
            console.log('Pasa por opcion principal');
        }else{
            console.log('Pasa por opciones agrupadas');
        }
        
        //Añadimos filas de ListView en página principal
        var li = document.createElement("LI");
        var ahref = document.createElement("A");
        var div = document.createElement("DIV");
        var p = document.createElement("P");
        var t = document.createTextNode(configuracion_opciones[i]);
        
        p.appendChild(t).className = "ca-main";
        div.appendChild(p).className = "ca-content";
        ahref.appendChild(div);
        ahref.href = "opciones.html";
        li.appendChild(ahref);
        document.getElementById("lista").appendChild(li);

    }
}*/