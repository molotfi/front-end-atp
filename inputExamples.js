function loadExampleInput1() {
	clearInput();

	document.getElementById('Reduction').checked = true;
	document.getElementById('Sort').checked = true;
	let example1Text = 
	"% This problem corresponds to the formula F1 given in Section 2 of the article"
	+ "\n" + 
	"%A Non-clausal Connection Calculus by Jens Otten,"
	+ "\n" + 
	"% published at TABLEAUX 2011."
	+ "\n" + 
	"fof(1, conjecture, ((![X]: ((~p(X) | q(f(X))) => (q(X) & (q(a) => r(b)) & ~r(X))) & q(f(b))) => p(a))).";

	$('#problem').val(example1Text);
	
}

function loadExampleInput2() {

	clearInput();

	document.getElementById('Extension').checked = true;
	$("#Extension1").removeAttr("disabled");
	$("#Extension2").removeAttr("disabled");
	document.getElementById('Extension1').checked = true;
	document.getElementById('Reduction').checked = true;
	let example2Text =
	 "% This problem corresponds to the formula F# given in Section 2 of the article" 
	 +"\n" + 
	 "% nanoCoP: A Non-clausal Connection Prover by Jens Otten," 
	 +"\n"+
	 "%published at IJCAR 2016."
	 +"\n"+
	 "fof(1, conjecture, ("
	 +"\n"+
	 "( p(a)"
	 +"\n"+
	 "& ( ( (q(f(f(c))) & ![X]: (q(f(X)) => q(X)))"
	 +"\n"+
	 		"& ~q(c)"
	 +"\n"+
			 ")"
	 +"\n"+
	 		"| ![Y]: (p(Y) => p(g(Y)))"
	 +"\n"+
	 		")"
	 +"\n"+
	 ") => ?[Z]: p(g(g(Z)))))."
	 +"\n"+"\n"+
	 "%(~((q(f(f(c))) & ![X]: (q(f(X)) => q(X))) => q(c)))))."
	 +"\n";
	 //var ret = display_txt.replace(/\\n/g,'\n');
	 //console.log(ret);
	$('#problem').val(example2Text);
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
	let example3Text = 
	"fof(hm, axiom, ![X]: (human(X) => mortal(X)))."
	+"\n"+
	"fof(hs, axiom, human(sokrates))."
	+"\n"+
	"fof(ms, conjecture, mortal(sokrates)).";
	$('#problem').val(example3Text);
}


  
function clearInput(){
  $('.ATPinput').prop('checked', false);
  $('#problem').val('');
  $('#output').html('');
  $('#JSONdata').html('');
  $('#outputList').html('');

  document.getElementById("LSD1").value = "";
  $("#LSD1").attr("disabled", "disabled");  
  
  document.getElementById('Extension1').checked = false; 
  document.getElementById('Extension2').checked = false; 
  $("#Extension1").attr("disabled", "disabled");
  $("#Extension2").attr("disabled", "disabled");

  data = {};
  console.log(temp)
  console.log(proofs)
  console.log(addProofsToList)
}