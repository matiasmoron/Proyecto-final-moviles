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
        alert("espera unos segundos pls!");
       // app.receivedEvent('deviceready');
       navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },

    onSuccess: function(position){
      alert("cargando mapa");

        
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLong = new google.maps.LatLng(latitude, longitude);

        var mapOptions = {
            center: latLong,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("mapa_ruta"), mapOptions);
       

      var marker = new google.maps.Marker({
              icon: 'img/chincheta.png',
              position: latLong,
              map: map,
              title: 'my location'
          });

        var coordenadasZona1 = new google.maps.LatLng(20.969775, -89.622911);
        var Zona1 = new google.maps.Marker({
            position: coordenadasZona1,
            map: map,
            title: 'Edificio Central Uady'

        });

        var coordenadasZona2 = new google.maps.LatLng(20.253673, -89.455581);
        var Zona2 = new google.maps.Marker({
            position: coordenadasZona2,
            map: map,
            title: 'Grutas de Loltún'

        });

        var coordenadasZona3 = new google.maps.LatLng(21.273128, -89.736392);
        var Zona3 = new google.maps.Marker({
            position: coordenadasZona3,
            map: map,
            title: 'Chelem Yucatan'

        });

        var coordenadasZona4 = new google.maps.LatLng(21.095837, -89.595740);
        var Zona4 = new google.maps.Marker({
            position: coordenadasZona4,
            map: map,
            title: 'Dzibilchaltún Yucatán'

        });

        

 


    },// fin function onsuccess

    onError: function(error){
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    },
};

app.initialize();