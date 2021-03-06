// ----- VARIABLES GLOBALES
var configuracion_opciones;
var hayInternet;

//Se harcodea JSON, hasta que haya uno para leer
var json = {"logo":"img/logo.png", "imagen": "img/image_index.jpg", 
            "categorias":[{"nombre": "Cuidado de pacientes", "subcategoria": "", "enlace": "http://www.mayoclinic.org"},
                          {"nombre": "Instalaciones", "subcategoria": [
                              {"nombre": "Doctores y equipo médico", "enlace": "http://www.mayoclinic.org/appointments/find-a-doctor"},
                              {"nombre": "Instalaciones y departamentos", "enlace": "http://www.mayoclinic.org/departments-centers/index"}
                            ], "enlace": ""},
                          {"nombre": "Opciones académicas", "subcategoria": "", "enlace": "http://www.mayo.edu/education/?_ga=1.224352156.667299883.1416995256"},
                          {"nombre": "Para profesionales de la medicina", "subcategoria": "",  "enlace": "http://www.mayoclinic.org/medical-professionals"},
                          {"nombre": "Productos y servicios", "subcategoria": "",  "enlace": "http://www.mayoclinic.org/products-services"},
                          {"nombre": "Última fila de prueba", "subcategoria": "",  "enlace": "http://www.mayoclinic.org/products-services"}
                         ], 
            "configuracion":[{"nombre": "Terminos y condiciones", "subcategoria": "",  "enlace": "http://www.mayoclinic.org/about-this-site/terms-conditions-use-policy"},
                             {"nombre": "", "subcategoria": [
                                {"nombre": "Política de privacidad",  "enlace": "http://www.mayoclinic.org/about-this-site/privacy-policy"},
                                {"nombre": "Aviso de política de privacidad",  "enlace": "http://www.mayoclinic.org/about-mayo-clinic/notice-of-privacy-practices"},
                                {"nombre": "Detalles de LOPD",  "enlace": "http://www.mayoclinic.org/about-mayo-clinic/notice-of-privacy-practices"}
                             ]},
                             {"nombre": "Promociones y patrocinios", "subcategoria": "",  "enlace": "http://www.mayoclinic.org/about-this-site/advertising-sponsorship-policy"}
                            ]
           };


// ----- ARRANQUE

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('offline', onNoInternet, false);
        document.addEventListener('online', onInternet, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
            fs.root.getFile("Gestor/datos_gestor.txt", null, function(fe){
                fe.file(function(f){
                    var reader = new FileReader();
                    reader.onloadend = function(evt){
                        if(evt.target.result == null){ //NO EXISTE DOCUMENTO
                            console.log('NO Existe el fichero');
                            navigator.splashscreen.show();
                            if(hayInternet == 'true'){
                               getJsonData();

        //Se guarda el JSON en un txt.
        //De esta manera, cacheamos estructura y compartimos información entre diferentes vistas.
                                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
                            }else{
                                alert('Para iniciar la aplicación por primera vez, se requiere que el dispositivo esté conectado a internet');
                            }
                        }else{ //EXISTE DOCUMENTO
                            console.log('SI Existe el fichero');
                            if(hayInternet == 'true'){
                               getJsonData();

                                //Se guarda el JSON en un txt.
                                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
                            }else{
                                alert('No hay conexión a internet. No se podrá acceder a los contenidos de la aplicación');
                            }
                        }
                    }
                    
                    reader.readAsText(f);
                })
            });
        });
    },
};

app.initialize();



// ----- METODOS

function onNoInternet() {
    hayInternet = 'false';
}

function onInternet() {
    hayInternet = 'true';
}

function getJsonData(){
    //Se usa el json hacordeado
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
    
    // Se tratan las categorías
    var categorias = json['categorias'];
    
    for(var i = 0; i < categorias.length; i++){
        var categoria = categorias[i];
        
        //Añadimos filas de ListView en página principal
        if(categoria['subcategoria'].length > 0){
            var subCategorias = categoria['subcategoria'];
            var li = document.createElement("LI");
            var ahref = document.createElement("A");
            var div = document.createElement("DIV");
            var p = document.createElement("P");
            var t = document.createTextNode(categoria['nombre']);
            
            p.appendChild(t).className = "ca-main";
            div.appendChild(p).className = "ca-content";
            ahref.appendChild(div);
            ahref.href = "subcategorias.html?valor=" + i;
            li.appendChild(ahref);
            document.getElementById("lista").appendChild(li);
        }else{
            pintarOpciones(categoria['nombre'], categoria['enlace']);
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
    li.appendChild(ahref);
    li.onclick = function () { window.open("navegador.html?var=" + enlace); };
    document.getElementById("lista").appendChild(li);
}

function gotFS(fileSystem) {
    var entry = fileSystem.root;
    entry.getDirectory("Gestor",{create: true, exclusive: false}, success, fail);
    fileSystem.root.getFile("Gestor/datos_gestor.txt", {create: true}, gotFileEntry, fail);

    window.rootFS = fileSystem.root;
}

function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
    writer.onwrite = function(evt) {
        console.log("Fichero creado correctamente");
    };
    
    //writer.write(json);  Cuidao!! Así en iOS no vaaaa
    writer.write(JSON.stringify(json));
    writer.abort();
}

function success(parent){
    console.log("Directorio creado: " + parent.name)
}

function fail(error) {
    console.log("error en txt o directorio: " + error.code);
}

function cargarPaginaOpciones() {
    window.open("opciones.html", "_blank",  "location=yes");
}

function cargarPaginaSubcategoria(valor){
    window.open("subcategorias.html?var1="+valor, "_blank", "location=yes");
}