function init() {
	Parse.initialize("5hMF1NvusVsToSS4oZigavhlztvTcOBklhD5mjCS", "4Kegwn8USK2AUJyQgPAprt6lzLYJKUnPegyZzDZC");
}

function setcandidate(id)
{
	candidateId = id;
}
function doVotePop()
{
	var name = $('#txtName').val();
	var mail = $('#txtMail').val();

	if (name.length <= 0)
	{
		alert('El nombre es un dato obligatorio.');
		return;
	}
	if (mail.length <= 0)
	{
		alert('El correo electrónico es un dato obligatorio.');
		return;
	}

	doVote(name,mail,candidateId);

}

function doVote(name,fmail,id) {

	//var fmail = prompt("Please enter your email:", "Your mail")


	if (validateEmail(fmail))
		isvoterExirts(fmail,id,name);
	else
	{
		alert("Correo invalido, ingresa una dirección de correo valida!");
	}
}

function isvoterExirts(email,id,name) {

	var VoteScore = Parse.Object.extend("VoteScoreShe");
	var query = new Parse.Query(VoteScore);
	query.equalTo("voterMail", email);
	query.find({
		success : function(results) {
			//alert("Successfully retrieved " + results.length + " scores.");
			// Do something with the returned Parse.Object values
			/*
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				alert(object.id + ' - ' + object.get('playerName'));
			}
		*/
		if (results.length > 0)
		{
			// no se puede votar...
			alert("Lo sentimos, solo se permite 1 voto por cuenta de correo.!");
			return false;
		}
		else
		{

			disp_prompt(email,id,name);
			// si se puede votar
			return true;	
		}

		},
		error : function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});

	return false;
}

function disp_prompt(fmail,id,name) {



	if (fmail) {
		if (fmail.length > 0) {

			var VoteScore = Parse.Object.extend("VoteScoreShe");
			var votescore = new VoteScore();

			votescore.set("score", 1);
			votescore.set("voterMail", fmail);
			votescore.set("voteid", id);
			votescore.set("name", name);

			votescore.save(null, {
				success : function(votescore) {
					// Execute any logic that should take place after the object is saved.
					alert("Gracias por votar!");
					loadvotes(id);
				},
				error : function(votescore, error) {
					// Execute any logic that should take place if the save fails.
					// error is a Parse.Error with an error code and description.
					alert('Los sentimos, ocurrio un error. :: ' + error.description);
				}
			});
		}
	}


}

function validateEmail(email) { 
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
if (filter.test(email)) {
  // Yay! valid
  return true;
}
else
  {return false;}
} 


function loadvotesPrivate(countVotes,id)
	{
		document.getElementById("vot" + id).innerHTML = "Cargando votos...";
		var VoteScore = Parse.Object.extend("VoteScoreShe");
		var query = new Parse.Query(VoteScore);
		query.equalTo("voteid", id);


		//query.equalTo("score", 1);

	query.count({
  success: function(count) {
    
    var num = 0;
    num = (count / countVotes) * 100;
    
  	//document.getElementById("vot" + id).innerHTML = Math.round(num).toString() + "%";
 document.getElementById("vot" + id).innerHTML = count.toString() ;//+ "%";
	document.getElementById("percentC" + id).style.width = Math.round(num).toString() + "%";


  },
  error: function(error) {
    // The request failed
  }
});
	}

function loadvotes(id)
{
	document.getElementById("vot" + id).innerHTML = "Cargando votos...";
	var VoteScore = Parse.Object.extend("VoteScoreShe");
	var query = new Parse.Query(VoteScore);
	//query.equalTo("voteid", id);
	query.equalTo("score", 1);

	query.count({
  success: function(count) {
    // The count request succeeded. Show the count
   // alert("Sean has played " + count + " games");
  	loadvotesPrivate(count,id);
  
  },
  error: function(error) {
    // The request failed
  }
});

	return;
	query.find({
		success : function(results) {


		var num = 0; 

		if (results.length > 0)
		{
			// no se puede votar...
			 num = results.length;

		}
		else
		{

			num = 0;
		}

		document.getElementById("vot" + id).innerHTML = num.toString();


		},
		error : function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}
function saveContactInfo()
{
	var Contactinfo = Parse.Object.extend("contactInfo");
			var contact = new Contactinfo();

			contact.set("contacName", $('#txtContactName').val());
			contact.set("contaccEmail", $('#txtContactEmail').val());
			contact.set("contacCity", $('#txtContactCity').val());
			contact.set("contactPhone", $('#txtContactPhone').val());
			contact.set("sex", $('#cmdSex').val());
			contact.set("contactAge", $('#txtContactAge').val());


			contact.save(null, {
				success : function(contact) {
					// Execute any logic that should take place after the object is saved.
					alert("Informacion Registrada");

				},
				error : function(votescore, error) {
					// Execute any logic that should take place if the save fails.
					// error is a Parse.Error with an error code and description.
					alert('Los sentimos, ocurrio un error. :: ' + error.description);
				}
			});
}

function test() {
	return;
	var TestObject = Parse.Object.extend("TestObject");
	var testObject = new TestObject();
	testObject.save({
		foo : "bar"
	}, {
		success : function(object) {
			alert("yay! it worked");
		}
	});
}

var _AllHomes = new Array();
var orders = new Array();
var index = 0;
//segments..
function loadReport() {

	var person = new Object;
	person.name = "Andrea Reyes";
	person.votes = 0;
	person.id = 1;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Bianca Corea";
	person.votes = 0;
	person.id = 2;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Brenda Grande";
	person.votes = 0;
	person.id = 3;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Carmen Castro";
	person.votes = 0;
	person.id = 4;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Erika Cruz";
	person.votes = 0;
	person.id = 5;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Franshesca Ramirez";
	person.votes = 0;
	person.id = 10;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Gigi Constanza";
	person.votes = 0;
	person.id = 11;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Ivette Moreira";
	person.votes = 0;
	person.id = 12;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Kathya Guevara";
	person.votes = 0;
	person.id = 6;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Lisbeth Guerrero";
	person.votes = 0;
	person.id = 7;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Michelle Velez";
	person.votes = 0;
	person.id = 8;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Natali Guerrero";
	person.votes = 0;
	person.id = 9;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Natali Guerrero";
	person.votes = 0;
	person.id = 9;
	person.loading = true;

	_AllHomes.push(person);

	var i = 0;

	lokkcandidate(0);

}
function totalVote()
{
//totaldevotos
var VoteScore = Parse.Object.extend("VoteScoreShe");
	var query = new Parse.Query(VoteScore);
	//query.equalTo("voteid", id);
	query.equalTo("score", 1);

	query.count({
  success: function(count) {
  
	document.getElementById("totaldevotos").innerHTML = count.toString();
  },
  error: function(error) {
    // The request failed
  }
});
}
function lokkcandidate(i)
{
	//alert(candidate.name);
		var candidate = _AllHomes[i];
		var VoteScore = Parse.Object.extend("VoteScoreShe");
		var query = new Parse.Query(VoteScore);
		query.equalTo("voteid", candidate.id);
		//query.equalTo("score", 1);

		query.count({
			success : function(count) {
				//candidate = _AllHomes[index];
				candidate.loading = false;
				candidate.votes = count;

				
				
				orders.push(candidate);
				orderCandidates()
				index++;
				lokkcandidate(index);
			

			},
			error : function(error) {
				candidate.loading = false;
				candidate.votes = 0;
				

			}
		});
}

function orderCandidates() {
	for (var xs = 0; xs < orders.length; xs++) {
		sortCategoria(orders, 1);
	}

	var html = "";
	for ( i = 0; i < orders.length; i++) {
		var candidate = orders[i];

		html += "<span>" + candidate.name + " " + candidate.votes.toString();

		html += "</span>  <br />";

	}

	document.getElementById("content").innerHTML = html;

}

function sortCategoria(x, dir) {//x contiene el arreglo ya sea OW o RT
	function Categoriacompare(a, b) {

		if (a.votes < b.votes)
			return 1 * dir
		else
			return -1 * dir;
	}


	x.sort(Categoriacompare);

}



var _AllHomes = new Array();
var orders = new Array();
var index = 0;
//segments..
function loadReport() {

	var person = new Object;
	person.name = "Andrea Reyes";
	person.votes = 0;
	person.id = 1;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Bianca Corea";
	person.votes = 0;
	person.id = 2;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Brenda Grande";
	person.votes = 0;
	person.id = 3;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Carmen Castro";
	person.votes = 0;
	person.id = 4;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Erika Cruz";
	person.votes = 0;
	person.id = 5;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Franshesca Ramirez";
	person.votes = 0;
	person.id = 10;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Gigi Constanza";
	person.votes = 0;
	person.id = 11;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Ivette Moreira";
	person.votes = 0;
	person.id = 12;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Kathya Guevara";
	person.votes = 0;
	person.id = 6;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Lisbeth Guerrero";
	person.votes = 0;
	person.id = 7;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Michelle Velez";
	person.votes = 0;
	person.id = 8;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Yoselyn Zelaya";
	person.votes = 0;
	person.id = 15;
	person.loading = true;

	_AllHomes.push(person);

	person = new Object;
	person.name = "Natali Guerrero";
	person.votes = 0;
	person.id = 9;
	person.loading = true;

	_AllHomes.push(person);
person = new Object;
	person.name = "Stephanie Chicas";
	person.votes = 0;
	person.id = 13;
	person.loading = true;

	_AllHomes.push(person);
	person = new Object;
	person.name = "Vanessa Guardado";
	person.votes = 0;
	person.id = 14;
	person.loading = true;

	_AllHomes.push(person);
	//
	
	var i = 0;

	lokkcandidate(0);

}

function lokkcandidate(i)
{
	//alert(candidate.name);
		var candidate = _AllHomes[i];
		var VoteScore = Parse.Object.extend("VoteScoreShe");
		var query = new Parse.Query(VoteScore);
		query.equalTo("voteid", candidate.id);
		//query.equalTo("score", 1);

		query.count({
			success : function(count) {
				//candidate = _AllHomes[index];
				candidate.loading = false;
				candidate.votes = count;

				
				
				orders.push(candidate);
				orderCandidates()
				index++;
				lokkcandidate(index);
			

			},
			error : function(error) {
				candidate.loading = false;
				candidate.votes = 0;
				

			}
		});
}

function orderCandidates() {
	for (var xs = 0; xs < orders.length; xs++) {
		sortCategoria(orders, 1);
	}

	var html = "<table class='table'> ";
	for ( i = 0; i < orders.length; i++) {
		var candidate = orders[i];

		html += "<tr>"
		html += "<td>" + candidate.name + "</td> <td class='nvotos'>" + candidate.votes.toString() + "</td>"; 
		html += "</tr> ";

	}

	html += " </table>";
	document.getElementById("content").innerHTML = html;

}

function sortCategoria(x, dir) {//x contiene el arreglo ya sea OW o RT
	function Categoriacompare(a, b) {

		if (a.votes < b.votes)
			return 1 * dir
		else
			return -1 * dir;
	}


	x.sort(Categoriacompare);

}


function checkDomain()
	{
	//alert(1);
//alert(window.location.href);
		//$(document).ready(function () {
    if(window.location.href.indexOf("letsolutions") > -1) {
        window.location.href = "http://www.misselsalvadorus.com";
	   }
	   
	   }