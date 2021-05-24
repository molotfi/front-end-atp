function getDomainNames(){
  const theButton = document.querySelector(".button");
  document.getElementById("loading").innerHTML = "Loading....";
  theButton.classList.add("button--loading");
  $.ajaxSetup({
      scriptCharset: "utf-8", //maybe "ISO-8859-1"
      contentType: "application/json; charset=utf-8"});

      $.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent('http://cl-informatik.uibk.ac.at/users/mfaerber/TPTP/6.3.0/Problems/') + '&callback=?',
          function(data) {
              var thecontents = data.contents;
              let parser = new DOMParser();
              let htmlDoc = parser.parseFromString(thecontents, 'text/html');
              let aTag = htmlDoc.querySelectorAll("a")

              var i;
              var str;
              domainNames = []
              for (i = 5; i < aTag.length; i++) {
                str = aTag[i].innerText
                str = str.replace(/\//g, "");
                domainNames.push(str)
              }
              aTag = []
              for(i = 0; i <domainNames.length; i++){
                if(i <= 8){
                  $(firstrow).append("<td>" + "<button class=domains " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
                else if(i > 8 && i <= 17){
                  $(secondrow).append("<td>" + "<button class=domains " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
                else if(i > 17 && i <= 26){
                  $(thirdrow).append("<td>" + "<button class=domains " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
                else if(i > 26 && i <= 35){
                  $(row4).append("<td>" + "<button class=domains " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
                else if(i > 35 && i <= 44){
                  $(row5).append("<td>" + "<button class=domains " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
                else if(i > 44 && i <= 50){
                  $(row6).append("<td>" + "<button class=domains " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
                else{
                  $(row7).append("<td>" + "<button class=domains " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
              }
              theButton.classList.remove("button--loading");
              document.getElementById("loading").innerHTML = "";
              });
}



function getNames(string){
  document.getElementById("loading").innerHTML = "Loading....";
  const theButton = document.querySelector(".button");
  theButton.classList.add("button--loading");
  $("#problemNamesTable").empty();
  var name = string
  $.ajaxSetup({
    scriptCharset: "utf-8", //maybe "ISO-8859-1"
    contentType: "application/json; charset=utf-8"});

    $.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent('http://cl-informatik.uibk.ac.at/users/mfaerber/TPTP/6.3.0/Problems/' + name + "/") + '&callback=?',
        function(data) {
            var thecontents = data.contents;
            let parser = new DOMParser();
            let htmlDoc = parser.parseFromString(thecontents, 'text/html');
            let aTag = htmlDoc.querySelectorAll("a")

            var j;
            var tempStr;
            problemNames = []
            for (j = 5; j < aTag.length; j++) {
              tempStr = aTag[j].innerText
              problemNames.push(tempStr)
            }
            for(i = 0; i <problemNames.length; i++){
              $(problemNamesTable).append("<td>" + "<button class=tptpnames " + "id= " + problemNames[i] + " name="+ name +" onclick=getProblem(id,name)" + ">"  + problemNames[i] + "</button>" + "</tr>");
            }
            theButton.classList.remove("button--loading");
            document.getElementById("loading").innerHTML = "";
            });
}




function getProblem(string,name){
  const theButton = document.querySelector(".button");
  document.getElementById("loading").innerHTML = "Loading....";
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
            });
}


function clearTPTP(){
  problemNames = []
  problem = []
  domainNames = []
  $("#problemNamesTable").empty();
}


