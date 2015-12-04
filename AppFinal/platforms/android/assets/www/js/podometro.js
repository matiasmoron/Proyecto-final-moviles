    var pasos = 0;
    var contenido = "-";
    function onAccelSuccess(acceleration) {
        var element = document.getElementById('accelerometer');
        var x = acceleration.x;
        var y = acceleration.y;
        var z = acceleration.z;
        var esPaso = esUnPaso(x,y,z);
       //contenido = contenido + Math.sqrt(x*x + y*y + z*z)+ '<br>';
       //element.innerHTML = contenido;
        if(esPaso == true){
            pasos = pasos + 1;
            /*contenido = contenido + Math.sqrt(x*x + y*y + z*z);
            element.innerHTML = contenido + '<br>';*/
            element.innerHTML = "Pasos: " + pasos + '<br>' + Math.sqrt(x*x + y*y + z*z)+ '<br>' ;
            var calorias = calcularCalorias(pasos);
            element.innerHTML = element.innerHTML + calorias;

        }
        /*element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
                            'Acceleration Y: ' + acceleration.y         + '<br />' +
                            'Acceleration Z: ' + acceleration.z         + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';*/
        
    }

    function esUnPaso(x,y,z){
        var GRAVEDAD_TERRESTRE = 9.80665;
        var gravedadTelefono = Math.sqrt(x*x + y*y + z*z);
        /*var PICO_MENOR_ESTATICO = 8.4;
        var PICO_MAYOR_ESTATICO = 10.39;
        var PICO_MENOR_PASO = 7.7;
        var PICO_MAYOR_PASO = 13.1;   */     
        var PICO_MENOR_ESTATICO = 8.4;
        var PICO_MAYOR_ESTATICO = 10.30;
        var PICO_MENOR_PASO = 7.7;
        var PICO_MAYOR_PASO = 13.1;
        var esPaso = false;
        if(PICO_MENOR_PASO <= gravedadTelefono && PICO_MAYOR_PASO >=gravedadTelefono){
            if(PICO_MENOR_ESTATICO >= gravedadTelefono || PICO_MAYOR_ESTATICO <= gravedadTelefono){
                esPaso = true;
            }
        }
        return esPaso;
    }

    function onError() {
        alert('onError!');
    }

    function calcularCalorias(pasosCapturados){
        var pasosPorCaloria = 20;
        return (pasosCapturados / pasosPorCaloria);
    }
    function iniciarPodometro() {
        // actualizar la aceleración cada 1 segundos
        frecuenciaSegundos = .3;
        var options = { frequency: frecuenciaSegundos*1000};

        watchID = navigator.accelerometer.watchAcceleration(onAccelSuccess, onError, options);
    }

    function detenerPodometro() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }