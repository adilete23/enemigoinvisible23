// Variables
// -----------------------------------------------------------------------------

var words = [
	new Word(0, "A", "Empieza por A:", " Cadena de supermercados en el que se inspiró tu nombre.", "Aldi"),
	new Word(1, "B", "Empieza por B:", " Persona de gran estatura.", "Bigardo"),
	new Word(2, "C", "Empieza por C:", " Persona de reducida estatura.", "Carajillo"),
	new Word(3, "D", "Empieza por D:", " Expresión que más usas. Algo fuera de lo normal. 2 palabras.", "De locos"),
	new Word(4, "E", "Empieza por E:", " Amiga tuya que se alquila para despedidas de soltero.", "Enana"),
	new Word(5, "F", "Empieza por F:", " Traficante gallego o nombre de gato.", "Fariña"),
	new Word(6, "G", "Empieza por G:", " Seres vivos que tiras contra el sofá como si no hubiera fuerza de gravedad.", "Gatas"),
	new Word(7, "H", "Empieza por H:", " La mayoría de personas que te rodean ahora mismo lo son.", "Homosexuales"),
	new Word(8, "I", "Empieza por I:", " Psicóloga que te aguanta sin motivo aparente.", "Irene"),
	new Word(9, "J", "Empieza por J:", " Empresa familiar con sede en el paseo del ferrocarril.", "Jardineria El Castell"),
	new Word(10, "L", "Empieza por L:", " Empresa de la competencia. Mejor precio y calidad.", "Lidl"),
	new Word(11, "M", "Empieza por M:", " Gentilicio para referirse a tu persona con cariño.", "Moro"),
	new Word(12, "N", "Empieza por N:", " Arte digital único, vendido como estafa piramidal en la que estás metido.", "NFT"),
	new Word(13, "O", "Empieza por O:", " Lo que te gusta que te coman.", "Ojete"),
	new Word(14, "P", "Empieza por P:", " Deporte que practicas con poca gracia, holgazán.", "Padel"),
	new Word(15, "Q", "Empieza por Q:", " Escribe lo que quieras. Aquí cucharada porque sí :)", "Qué rico!!"),
	new Word(16, "R", "Empieza por R:", " Tu insulto favorito. Persona de pocas luces.", "Retrasao"),
	new Word(17, "S", "Empieza por S:", " Persona que, contra todo pronóstico, te aguanta un fin de semana entero.", "Silvia"),
	new Word(18, "T", "Empieza por T:", " Cosa que no haces a partir de las 12.", "Trabajar"),
	new Word(19, "U", "Empieza por U:", " País de nacimiento de tu mejor amigo.", "Uruguay"),
	new Word(20, "V", "Empieza por V:", " Persona que vive la vida, según tú, trabajando poco.", "Vividor"),
	new Word(21, "W", "Empieza por W:", " Persona que vive la vida, según tú, trabajando poco.", "Wambas"),
	new Word(22, "X", "Empieza por X:", " Palabra más larga con X que conoces, el sustantivo.", "Xenofobia"),
	new Word(23, "Y", "Empieza por Y:", " Consumidor de drogas.", "Yonki"),
	new Word(24, "Z", "Empieza por Z:", " Estado del usuario habitual del fentanilo.", "Zombi")
];

// Functions
// -----------------------------------------------------------------------------

function Word(idNumber, letter, hint, definition, word, correct) {
	this.idNumber = idNumber;
	this.letter = letter;
	this.hint = hint;
	this.definition = definition;
	this.word = word;
	this.correct = null;
}

function showDefinition(pos) {
	$("#js--hint").html(words[pos].hint);
	$("#js--definition").html(words[pos].definition);
}

var remainingWords = 25;

function checkAnswer(pos) {
	var userAnswer = $("#js--user-answer").val().toLowerCase();
	if (userAnswer == words[pos].word.toLowerCase()) {
		words[pos].correct = true;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--success");

	} else {
		words[pos].correct = false;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--failure");
		showAnswer(pos)
	}
	remainingWords--;
	$("js--score").html(remainingWords);

	return count++;
}

function showAnswer(pos){
	// Get the modal
	var modal = document.getElementById("myModal");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	modal.style.display = "block";
	$("#js--word").html(words[pos].word);
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() { 
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) { 
			modal.style.display = "none";
		}
	}
}

function pasapalabra(pos) {
	var w = words.splice(pos, 1)[0];
	words.push(w);

}

function continuePlaying(pasapalabra) {
	if (count != 25) {
		$("#js--user-answer").val("");
		showDefinition(count);
	} else {
		endGame();
	}
}

var seconds;
var temp;

function countdown() {
	seconds = $("#js--timer").html();
	seconds = parseInt(seconds, 10);
	if (seconds == 1) {
		temp = $("#js--timer");
		temp.innerHTML = 0;
		endGame();
		return;
	}
	seconds--;
	temp = $("#js--timer");
	temp.html(seconds);
	timeoutMyOswego = setTimeout(countdown, 1000);
}

function endGame() {
	$("#js--question-controls").addClass("hidden");
	$("#js--pa-controls").removeClass("hidden");
	$("#js--end-title").html("Fin de partida!");
	$("#js--end-subtitle").html(showUserScore());
	$("#js--close").addClass("hidden")
}

function showUserScore() {
	var counter = 0;
	for (i = 0; i < words.length; i++) {
		if (words[i].correct == true) {
			counter++;
		}
	}
	return "Has conseguido un total de " + counter + " aciertos.";
}


// Main Program
// ----------------------------------------------------------------------------- */

// New game
var count = 0; // Counter for answered words
$("#js--new-game").click(function() {
	$("#js--ng-controls").addClass("hidden");
	$("#js--question-controls").removeClass("hidden");
	$("#js--close").removeClass("hidden");
	showDefinition(count);
	countdown();
});

// Send the answer
$("#js--send").click(function() {
	checkAnswer(count);
	continuePlaying();
});

// Key bindings for send the answer
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "13") {
		checkAnswer(count);
		continuePlaying();
	}
});

// Skip the word
$("#js--pasapalabra").click(function() {
	pasapalabra(count);
	continuePlaying();
});

// Key bindings for skip the word
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "8") {
		pasapalabra(count);
		continuePlaying();
	}
});

// Play again
$("#js--pa").click(function() {
	location.reload()
});

// End the game
$("#js--close").click(function() {
	endGame();
});
