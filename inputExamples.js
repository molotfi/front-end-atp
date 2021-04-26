function loadExampleInput2() {
  // var text = "TESTING TESTING TESTING";
  // document.forms.ATP-form.problem.value = text;
  if(document.getElementById('example1').checked) {
  	  //first clear the input
  	  clearInput();

	  document.getElementById('Extension').checked = true;
	  $("#Extension1").removeAttr("disabled");
	  $("#Extension2").removeAttr("disabled");
	  document.getElementById('Extension1').checked = true;
	  document.getElementById('Reduction').checked = true;
	  document.getElementById('Sort').checked = true;
	  $('#problem').html('fof(hm, axiom, ![X]: (human(X) => mortal(X)))');
	}

  if(document.getElementById('example2').checked) {
      //first clear the input
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
}