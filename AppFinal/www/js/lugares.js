document.addEventListener('deviceready', onDeviceReady);
function onDeviceReady() {
	navigator.globalization.getPreferredLanguage(
		function (language) {
			idioma =language.value;
			if(idioma == "en-US"){
				var ingles = {titulo:"The ideal companion for your trip",
				 subtitulo:"Travels knows, lives Yucatan",
				  zonaArqueologica: "archaeological area",
				  zonaArqueologica: "archaeological area",
				  zonaArqueologica: "archaeological area",
				  grutas:"grottos"
				};
				$("#titulo").text(ingles.titulo);
				$("#subtitulo").text(ingles.subtitulo);
				$("#boton-iniciar").text(ingles.boton);
				$("#zona-arquelogica1").text(ingles.zonaArqueologica);
				$("#zona-arquelogica2").text(ingles.zonaArqueologica);
				$("#zona-arquelogica3").text(ingles.zonaArqueologica);
				$("#grutas").text(ingles.grutas);
			}
		},
	    	function () {alert('Error getting language\n');}
		);

}