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

function loadvotes(id)
{
	document.getElementById("vot" + id).innerHTML = "Loading...";
	var VoteScore = Parse.Object.extend("VoteScoreShe");
	var query = new Parse.Query(VoteScore);
	query.equalTo("voteid", id);
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

function test() {
	//return;
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