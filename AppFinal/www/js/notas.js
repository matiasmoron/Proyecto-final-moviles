document.addEventListener('deviceready', onDeviceReady);
function onDeviceReady() {
	navigator.globalization.getPreferredLanguage(
		function (language) {
			idioma =language.value;
			if(idioma == "en-US"){
				var ingles = {titulo:"The ideal companion for your trip",
				 subtitulo:"Travels knows, lives Yucatan",
				  botonguardar: "Save",
				  botoncancelar:"Cancel",
				  tituloNota: "Note Title",
				  contenidoNota: "Note Content"
				};
				$("#titulo").text(ingles.titulo);
				$("#subtitulo").text(ingles.subtitulo);
				$("#boton-guardar").text(ingles.botonguardar);
				$("#boton-cancelar").text(ingles.botoncancelar);
				$("#note-title").text(ingles.tituloNota);
				$("#note-content").text(ingles.contenidoNota);
			}
		},
	    	function () {alert('Error getting language\n');}
		);

}