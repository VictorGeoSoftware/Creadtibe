// ----- VARIABLES GLOBALES



// ----- ARRANQUE

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
// Abrir pagina en iframe
        var url_recibida = location.search.substr(1, location.search.length);
        var aux = url_recibida.split("=");
        var enlace = aux[1];
        console.log("url_recibida: " + enlace);
        window.open(enlace, "iframe");
    }
};

app.initialize();