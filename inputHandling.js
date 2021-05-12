
$(function enableInput() {
    $("#LSD").click(function () {
        if ($(this).is(":checked")) {
            $("#LSD1").removeAttr("disabled");
            $("#LSD1").focus();
        } else {   
            //console.log(container);
            document.getElementById('LSD1').value = '';
            $("#LSD1").attr("disabled", "disabled");
        }
    });
});

$(function enableInput() {
    $("#Extension").click(function () {
        if ($(this).is(":checked")) {
            $("#Extension1").removeAttr("disabled");
            $("#Extension1").focus();
            $("#Extension2").removeAttr("disabled");
            $("#Extension2").focus();
        } else {
            document.getElementById('Extension1').value = ''; 
            document.getElementById('Extension2').value = ''; 
            $("#Extension1").attr("disabled", "disabled");
            $("#Extension2").attr("disabled", "disabled");
        }
    });
});










































// function myFunction() {
//   var checkBox = document.getElementById("LSD");
//   var text = document.getElementById("LSD1");
//   if (checkBox.checked == true){
//     text.style.display = "block";
//   } else {
//      text.style.display = "none";
//   }
// }