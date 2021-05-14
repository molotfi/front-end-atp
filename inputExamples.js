function loadExampleInput1() {
	clearInput();

	document.getElementById('Reduction').checked = true;
	document.getElementById('Extension').checked = true;
	$("#Extension1").removeAttr("disabled");
	$("#Extension2").removeAttr("disabled");
	document.getElementById('Extension1').checked = true;
	document.getElementById('Sort').checked = true;
	$('#problem').html('fof(hm, axiom, ![X]: (human(X) => mortal(X)))');
	
}

function loadExampleInput2() {

	clearInput();

	document.getElementById('Extension').checked = true;
	$("#Extension1").removeAttr("disabled");
	$("#Extension2").removeAttr("disabled");
	document.getElementById('Extension2').checked = true;
	document.getElementById('LSD').checked = true;
	$("#LSD1").removeAttr("disabled");
	document.getElementById("LSD1").value = 8;
	$('#problem').html('fof(hm, axiom, ![X]: (human(X) => mortal(X)))');
}

function loadExampleInput3() {

	clearInput();

	document.getElementById('Reduction').checked = true;
	document.getElementById('Extension').checked = true;
	$("#Extension1").removeAttr("disabled");
	$("#Extension2").removeAttr("disabled");
	document.getElementById('Extension2').checked = true;
	document.getElementById('LSD').checked = true;
	$("#LSD1").removeAttr("disabled");
	document.getElementById("LSD1").value = 3;
	document.getElementById('Sort').checked = true;
	document.getElementById('Conjunctive').checked = true;
	$('#problem').html('fof(hm, axiom, ![X]: (human(X) => mortal(X)))');
}

  
function clearInput(){
  $('.ATPinput').prop('checked', false);
  $('#problem').html('');
  document.getElementById("LSD1").value = "";
  $("#LSD1").attr("disabled", "disabled");  
  document.getElementById('Extension1').checked = false; 
  document.getElementById('Extension2').checked = false; 
  $("#Extension1").attr("disabled", "disabled");
  $("#Extension2").attr("disabled", "disabled");
  data = {};
  const dataContainer = document.getElementsByClassName('results__display')[0];
  dataContainer.textContent = JSON.stringify(data, null, "  ");
  console.log(data);
}