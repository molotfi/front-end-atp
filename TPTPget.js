var flag = true;
function showTable(){
  if(flag){
    buttonSelected("domains")
    $('.button').addClass('selected');
    document.getElementById("tptpTable").hidden = false;
  }
  else{
    $('.button').removeClass('selected');
    document.getElementById("tptpTable").hidden = true;
    $("#problemNamesTable").empty();
    document.getElementById("hiddentable").hidden = true;
  }
  flag = !flag
}

function getDomainNames() {
document.getElementById("tptpTable").hidden = true;
fetch('./data.json')
  .then (results => results.json())
  .then (data => {
    const length = Object.keys(data).length
    for(i = 0; i < length; i++){
      if((i % 9) == 0) {
        $(firstrow).append("<tr></tr>")
     }
      $(firstrow).append("<td>" + "<button class=domains " + "id= " + Object.keys(data)[i] + " onclick=getNamesJson(id)" + ">"  + Object.keys(data)[i] + "</button>" + "</td>");
    }  
  });

}

var toggle = true;
function getNamesJson(string){
  $("#problemNamesTable").empty();
  var name = string;
  // if(toggle){
    fetch('./data.json')
    .then (results => results.json())
    .then (data => {
      //$('.domains').addClass('active');
      document.getElementById("hiddentable").hidden = false;
      var length = data[name].length
      for(i = 0; i <length; i++){
        var str = data[name][i]
        if((i % 5) == 0) {$(problemNamesTable).append("<tr></tr>")}
        if((str.includes("-") || str.includes("+")) && !str.includes(".rm")){
          str = str.replace('.p','');
          $(problemNamesTable).append("<td>" + "<button class=tptpnames " + "id= " + data[name][i] + " name="+ name +" onclick=getProblem(id,name)" + ">"  + str + "</button>" + "</td>");
        }
        else{
          str = str.replace('.p','');
          str = str.replace('.rm','');
          $(problemNamesTable).append("<td>" + "<button class=tptpnamesUnused color=black>" + str + "</button> </td>");
        }
      }
      buttonSelected("domains")
      buttonSelected2("tptpnames")
    });
  // }
  // else{
  //   $("#problemNamesTable").empty();
  //   document.getElementById("hiddentable").hidden = true;
  // }
  // toggle = !toggle
}


function getProblem(string,name){
  buttonSelected2("tptpnames")
  const theButton = document.querySelector(".button");
  document.getElementById("loading").innerHTML = "Loading....Please wait";
  theButton.classList.add("button--loading");
  $.ajaxSetup({
    scriptCharset: "utf-8", //maybe "ISO-8859-1"
    contentType: "application/json; charset=utf-8"});

    $.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent('http://cl-informatik.uibk.ac.at/users/mfaerber/TPTP/6.3.0/Problems/' + name +"/" + string) + '&callback=?',
        function(data) {
            var thecontents = data.contents;
            let parser = new DOMParser();
            let htmlDoc = parser.parseFromString(thecontents, 'text/html');  
            htmlDoc = htmlDoc.getElementsByTagName('body').item(0);
            var problem = htmlDoc.innerText
            $('#problem').val(problem);
            theButton.classList.remove("button--loading");
            document.getElementById("loading").innerHTML = "";
            document.getElementById("loading").innerHTML = "Problem succesfully loaded!";
            setTimeout(() => {
              document.getElementById("loading").innerHTML = "";
            }, 3000);
            });
}

function buttonSelected(string){
  var btns = document.getElementsByClassName(string);
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("domainsselected");
      //If there's no active class
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" domainsselected", "");
      }
      // Add the active class to the current/clicked button
      //this.className += " active";
      this.classList.add("domainsselected");
    });
  }
}

function buttonSelected2(string){
  var buttons = document.getElementsByClassName(string);
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("chose");
  
      // If there's no active class
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" chose", "");
      }
      // Add the active class to the current/clicked button
      this.className += " chose";
    });
  }
}
