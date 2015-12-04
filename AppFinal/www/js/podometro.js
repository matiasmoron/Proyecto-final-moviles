    var pasos = 0;
    var contenido = "-";
    function onAccelSuccess(acceleration) {
        var element = document.getElementById('podometro');
        var x = acceleration.x;
        var y = acceleration.y;
        var z = acceleration.z;
        var esPaso = esUnPaso(x,y,z);

        if(esPaso == true){
            pasos = pasos + 1;
            element.innerHTML = "Pasos: " + pasos + '<br>';
            var kilometros = calcularKilometros(pasos);
            element.innerHTML = element.innerHTML + kilometros.toFixed(2) + " kilómetros";

        }

        
    }

    function esUnPaso(x,y,z){
        var GRAVEDAD_TERRESTRE = 9.80665;
        var gravedadTelefono = Math.sqrt(x*x + y*y + z*z);    
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

    function calcularKilometros(pasosCapturados){
        var pasosPorKilometro = 1428;
        return (pasosCapturados / pasosPorKilometro);
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