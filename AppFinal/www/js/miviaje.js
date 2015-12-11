document.addEventListener('deviceready', onDeviceReady);
function onDeviceReady() {
	navigator.globalization.getPreferredLanguage(
		function (language) {
			idioma =language.value;
			if(idioma == "en-US"){
				var ingles = {titulo:"The ideal companion for your trip",
				 subtitulo:"Travels knows, lives Yucatan",
				  zonaArqueologica: "archaeological area",
				  grutas:"grottos"
				};
				$("#titulo").text(ingles.titulo);
				$("#subtitulo").text(ingles.subtitulo);
			}
		},
	    	function () {alert('Error getting language\n');}
		);

}