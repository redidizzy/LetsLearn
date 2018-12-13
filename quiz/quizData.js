var quizHtml = [
	{
		question : 'Quelle est la balise qui permet d\'indiquer des meta-données ?',
		reponses : [
			'meta', 'html', 'body', 'footer'
		],
		bonneReponse : 0
	},
	{
		question : 'Quelle est l\'attribut qui permet d\'indiquer le chemin d\'un fichier css externe ?',
		reponses : [
			'src', 'width', 'href', 'name'
		],
		bonneReponse: 2
	},
	{
		question : 'la balise input est une balise de type...',
		reponses : [
			'block', 'inline', 'inline-block', 'table'
		],
		bonneReponse : 1
	},
	{
		question : 'Quelle est la balise permettant de mettre du code javascript ?',
		reponses : [
			'java', 'noscript', 'javascript', 'script'
		],
		bonneReponse : 3
	}
];
var quizCss = [
	{
		question : 'Ou mettre le code css si on veut le reutiliser dans plusieurs pages',
		reponses : [
			'dans l\'attribut style', 'dans la balise style', 'dans un fichier externe', 'aucune idée'
		],
		bonneReponse : 2
	},
	{
		question : 'quelle est la propriéte qui permet de changer le type d\'affichage d\'un element',
		reponses : [
			'display', 'flex', 'border', 'show'
		],
		bonneReponse : 0
	},
	{
		question : 'Quelle est la propriéte qui permet de faire flotter un element',
		reponses : [
		'float', 'flex', 'floated', 'floati'
		],
		bonneReponse : 0
	},
	{
		question : 'Quelle est la propriété qui permet de changer la couleur de fond',
		reponses : [
			'color', 'background-color', 'colorate', 'rgb'
		],
		bonneReponse : 1
	}
];
var quizJavascript = [
	{
		question : 'ou mettre le code javascript',
		reponses : [
			'dans link', 'dans meta', 'dans body', 'dans script'
		],
		bonneReponse : 3
	},
	{
		question : 'quelle est l\'element qui represente la racine du DOM',
		reponses : [
			'body', 'html', 'document', 'window'
		],
		bonneReponse : 2
	},
	{
		question : 'quelle est la methode qui permet de decouper un string',
		reponses : [
			'split', 'cut', 'throw', 'scisor'
		],
		bonneReponse : 0
	},
	{
		question : 'Que signifie JSON',
		reponses : [
			'Javascript Orientated Notes', 'JavaScript Object Node', 'Javascript Or Node', 'JavaScript Object Notation'
		],
		bonneReponse : 3
	}
];
var quizPhp = [
	{
		question : 'quelle est le signe qui permet de designer une variable',
		reponses : [
		',', '$', '|', '*'
		],
		bonneReponse: 1
	},
	{
		question : 'ou mettre le php ?',
		reponses : [
		 	"dans <link></link>", "dans <script></script>","dans <?php ?>", "dans <?php> </?php>"
		],
		bonneReponse:2
	},
	{
		question : 'Quelle est la variable qui contient les variables de sessions',
		reponses : [
			"$_SESSION", "$sessions", "$_COOKIES", "ca n'existe pas"
		],
		bonneReponse: 0
	},
	{
		question : 'comment inclure un autre fichier php',
		reponses : [
		 	"include", "open", "get", "include_php_file"
		],
		bonneReponse : 0
	}
];
var bravo = new Audio("applause2.mp3");
var pathname = window.location.pathname.split("/");
var frag = document.createDocumentFragment();
var main = document.querySelector("main#quiz form");
switch(pathname[pathname.length - 1]){
	case "quizHtml.html" : insertQuestions(quizHtml);
							break;
	case "quizCss.html" : insertQuestions(quizCss);
						  break;
	case "quizJavascript.html" : insertQuestions(quizJavascript);
								 break;
	case "quizPhp.html" : insertQuestions(quizPhp);
						  break;
}

function insertQuestions(quiz){
	var questionSection, question;
	for(var questionNumber in quiz){
		var questionSection = document.createElement("fieldset");
		//creation de la question
		var questionTitle = document.createElement("h5");
		var questionText = document.createTextNode(quiz[questionNumber].question);
		questionTitle.appendChild(questionText);
		questionSection.appendChild(questionTitle);
		//creation des reponses
		var reponses = quiz[questionNumber].reponses;
		for(var answerNumber in  reponses){
			var reponseRadio = document.createElement("input");
			reponseRadio.setAttribute("type", "radio");
			reponseRadio.setAttribute("name", questionNumber);
			reponseRadio.setAttribute("value", answerNumber);
			var reponseLabel = document.createElement("label");
			var reponseText = document.createTextNode(reponses[answerNumber]);
			reponseLabel.appendChild(reponseText);
			questionSection.appendChild(reponseRadio);
			questionSection.appendChild(reponseLabel);
		}
		var message = document.createElement("div");
		message.setAttribute("class", "answer");
		questionSection.appendChild(message);
		frag.appendChild(questionSection);
	};
	var confirm = document.createElement("button");
	confirm.setAttribute("type", "submit");
	confirm.setAttribute("id", "confirm")
	confirm.appendChild(document.createTextNode("Confirmer"));
	frag.appendChild(confirm);
	main.appendChild(frag);
	document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'confirm'){
    	e.preventDefault();
    	var goodAnswers = 0;
    	var questionNumber = 4;
    	for(var i = 0; i<questionNumber; i++){
    		var choices = document.getElementsByName(i);
    		var question = choices[0].parentNode;
    		choices.forEach(function(choice){
    			if(choice.checked){
    				var message = question.querySelector(".answer");
    				if(choice.value == quiz[i].bonneReponse){
    					message.setAttribute("class", "answer goodAnswer");
    					message.textContent = "Vous avez repondu la bonne reponse !";
    					goodAnswers++;
    				}else{
    					message.setAttribute("class", "answer wrongAnswer");
    					message.textContent = "Vous avez repondu la mauvaise reponse ! la bonne reponse est la " +(quiz[i].bonneReponse + 1);
    				}
    			}	
    		});
    	}
    	if(goodAnswers < 4){
    		alert("Vous avez eu un score de "+goodAnswers+" sur 4, appuyez sur OK pour voir vos mauvaises reponses ");
    	}else{
    		bravo.play();
    		alert("Bravo ! Vous avez eu un score de "+goodAnswers+" sur 4, vous maitrisez ce langage !");
    	}
    }
 });
}
