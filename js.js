/**
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}             true if the element is an input, false if not
 */
const isValidElement = element => {
  return element.name && element.value;
};

/**
 * Checks if an element’s value can be saved (e.g. not an unselected checkbox).
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the value should be added, false if not
 */
const isValidValue = element => {
  return (!['checkbox', 'radio'].includes(element.type) || element.checked);
};

/**
 * Checks if an input is a checkbox, because checkboxes allow multiple values.
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the element is a checkbox, false if not
 */
const isCheckbox = element => element.type === 'checkbox';

/**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                               form data as an object literal
 */
const formToJSON = elements => [].reduce.call(elements, (data, element) => {

  // Make sure the element has the required properties and should be added.
  if (isValidElement(element) && isValidValue(element)) {

    /*
     * Some fields allow for more than one value, so we need to check if this
     * is one of those fields and, if so, store the values as an array.
     */
      if((element.name == 'Reduction') || ((element.name == 'Extension')))
      {
        if(Reduction.checked && !Extension.checked)
        {
          //delete data['Reduction'];
          //delete data['Extension'];
          //data.cut = true;
          data.cuts ={reduction: true, extension: null };
          Reduction.value = true;
          Extension.value = false;
        }
        if(Extension.checked && !Reduction.checked)
        {
          // delete data['Reduction'];
          // delete data['Extension'];
          //data.cut = true;
          data.cuts =({reduction: false, extension: element.value });
          Reduction.value = false;
          Extension.value = true;
        }
        if((Extension.checked) && (Reduction.checked))
        {
          // delete data['Reduction'];
          // delete data['Extension'];
          //data.cut = true;
          data.cuts =({reduction: true, extension: element.value });
        }
      }
      if(Conjunctive.checked && element.name == "conj"){
        data.conj = true;
      }
      if(Sort.checked && element.name == "nopaths"){
        data.nopaths = true;
      }
      if(LSD.checked && element.name == "lim"){
        data.lim = Number(LSD1.value);
      }
      if(element.name == "problem")
      {
        data[element.name] = element.value;
        if(addFunctionClicked){
          temp.push(element.value);
        }
      }
  }

  if(!element.checked && isCheckbox(element)){
       if(!(Reduction.checked) && !(Extension.checked))
        { 
          //data.cut = false;
          data.cuts =({Reduction: false, Extension: null });
        }
        if(!Conjunctive.checked)
        {
          data.conj = false;
        }
        if(!Sort.checked)
        {
          data.nopaths = false;
        }
        if(!LSD.checked)
        {
          data.lim = null;
        }
        delete data['Reduction'];
        delete data['Extension'];
        data[element.name] = false;
  }

  return data;
}, {});

/**
 * A handler function to prevent default submission and run our custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
const handleFormSubmit = event => {
  
  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();
  
  // Call our function to get the form data.
  var data = formToJSON(form.elements);

  // Demo only: print the form data onscreen as a formatted JSON object.
  const dataContainer = document.getElementsByClassName('JSONdata')[0];
  
  //Use `JSON.stringify()` to make the output valid, human-readable JSON.
  dataContainer.textContent = JSON.stringify(data, null, "  ");

  var dataJSON = JSON.stringify(data);

  (async () => {
    try {
      var proofout = await webassembly(dataJSON);
      document.getElementById("output").innerHTML = proofout;
    } catch(err) {
      console.log(err)
      document.getElementById("confirm").innerHTML = "Error: No solution available, try different settings";
    }
    
  })()
  data = {};
};

var addProofsToList = [];
var temp = [];
var proofs = [];
var addFunctionClicked = false;

function addProofToList(){
  addFunctionClicked = true;
  var dataList = formToJSON(form.elements);
  dataList = JSON.stringify(dataList);
  addProofsToList.push(dataList);
  dataList = "";
  clearInput();
  if(addProofsToList.length == 0 || temp.length == 0 || (temp.length != addProofsToList.length))
  {
    document.getElementById("confirm").innerHTML = "Error: No input found!";
    //$("#confirm").delay(1000).fadeOut(3000);
    temp.length = 0;
    proofs.length = 0;
    addProofsToList.length = 0;
  }
  else{
    document.getElementById("confirm").innerHTML = "Added succesfully! Problem added to list";
  }
  //$("#confirm").delay(1000).fadeOut(3000); 
  addFunctionClicked = false;
}

function prooflist(){
    
    if(addProofsToList.length == 0 || temp.length == 0 || (temp.length != addProofsToList.length))
    {
      temp.length = 0;
      proofs.length = 0;
      addProofsToList.length = 0;
      document.getElementById("confirm").innerHTML = "Error: No input found!";
      //$("#confirm").delay(1000).fadeOut(3000);
      return;
    }
    else{
    (async () => {
      document.getElementById("table3").style.visibility = "visible";

      for (let i = 0; i < addProofsToList.length; i++) { 
      var getSol = await webassembly(addProofsToList[i]);
      proofs.push(getSol);
      }

      //var str = proofs.join("\n" + "///////////////////////////////////////////////////////////////////////" + "\n" + "\n");
      document.getElementById("confirm").innerHTML = "Succes! Answer will show up now";
      //$("#confirm").delay(1000).fadeOut(3000); 
      
      for (var j = 0; j < proofs.length; j++) {
        $(divdiv).append("Problem: " + (j + 1));
        $(divdiv).append("<td>" + "<textarea rows=8 cols=75>" + temp[j] + "</textarea>" + "<textarea rows=8 cols=75>" + proofs[j] + "</textarea>" + "</td>");
      }

      temp.length = 0;
      proofs.length = 0;
      addProofsToList.length = 0;
    })()
  }
}


/*
 * This is where things actually get started. We find the form element using
 * its class name, then attach the `handleFormSubmit()` function to the 
 * `submit` event.
 */
  const form = document.getElementsByClassName('ATP-form')[0];
  form.addEventListener('submit', handleFormSubmit);
