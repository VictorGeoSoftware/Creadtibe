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
        
        navigator.notification.activityStart("Cargando página", "Un momento, por favor...");
        window.open(enlace, "iframe");
        navigator.notification.activityStop();
    }
};

app.initialize();