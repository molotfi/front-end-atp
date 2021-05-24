function readJSON(){
  $.ajaxSetup({
      scriptCharset: "utf-8", //maybe "ISO-8859-1"
      contentType: "application/json; charset=utf-8"});

      $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('http://cl-informatik.uibk.ac.at/users/mfaerber/TPTP/6.3.0/Problems/') + '&callback=?',
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
              for(i = 0; i <domainNames.length; i++){
                // $(myUL).append("<li " + "id=" + domainNames[i] + ">" + "<span class=caret>" + domainNames[i] + "</span>");
                console.log(domainNames.length)
                if(i <= 8){
                  $(firstrow).append("<td>" + "<button " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
                else if(i > 8 && i <= 17){
                  $(secondrow).append("<td>" + "<button " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
                else if(i > 17 && i <= 26){
                  $(thirdrow).append("<td>" + "<button " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
                else if(i > 26 && i <= 35){
                  $(row4).append("<td>" + "<button " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
                else if(i > 35 && i <= 44){
                  $(row5).append("<td>" + "<button " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
                else if(i > 44 && i <= 50){
                  $(row6).append("<td>" + "<button " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
                else{
                  $(row7).append("<td>" + "<button " + "id= " + domainNames[i] + " onclick=getNames(id)" + ">"  + domainNames[i] + "</button>" + "</td>");
                }
              }
              });
}

function getNames(string){
  var name = string
  console.log(string)
  $.ajaxSetup({
    scriptCharset: "utf-8", //maybe "ISO-8859-1"
    contentType: "application/json; charset=utf-8"});

    $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('http://cl-informatik.uibk.ac.at/users/mfaerber/TPTP/6.3.0/Problems/' + name + "/") + '&callback=?',
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
              // str = str.replace(/\//g, "");
              problemNames.push(tempStr)
            }
            console.log(problemNames)

            for(i = 0; i <problemNames.length; i++){
              $(ok).append("<td>" + "<button " + "id= " + problemNames[i] + " name="+ name +" onclick=getProblem(id,name)" + ">"  + problemNames[i] + "</button>" + "</tr>");
            }
            });
}


function getProblem(string,name){
  console.log(string)
  console.log(name)
  $.ajaxSetup({
    scriptCharset: "utf-8", //maybe "ISO-8859-1"
    contentType: "application/json; charset=utf-8"});

    $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('http://cl-informatik.uibk.ac.at/users/mfaerber/TPTP/6.3.0/Problems/' + name +"/" + string) + '&callback=?',
        function(data) {
            var thecontents = data.contents;
            let parser = new DOMParser();
            let htmlDoc = parser.parseFromString(thecontents, 'text/html');  
            htmlDoc = htmlDoc.getElementsByTagName('body').item(0);
            var problem = htmlDoc.innerText
            $('#problem').val(problem);
            });
}
