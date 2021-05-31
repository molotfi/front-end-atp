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
          data.cuts ={reduction: true, extension: null };
          Reduction.value = true;
          Extension.value = false;
        }
        if(Extension.checked && !Reduction.checked)
        {
          data.cuts =({reduction: false, extension: element.value });
          Reduction.value = false;
          Extension.value = true;
        }
        if((Extension.checked) && (Reduction.checked))
        {
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
      }
  }

  if(!element.checked && isCheckbox(element)){
       if(!(Reduction.checked) && !(Extension.checked))
        { 
          data.cuts =({reduction: false, extension: null });
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
        else{
          delete data['Reduction'];
          delete data['Extension'];
          data[element.name] = false;
        }
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
  //const dataContainer = document.getElementsByClassName('JSONdata')[0];
  
  //Use `JSON.stringify()` to make the output valid, human-readable JSON.
  //dataContainer.textContent = JSON.stringify(data, null, "  ");

  var dataJSON = JSON.stringify(data); 
   
  (async () => {
    const theButton = document.querySelector(".proof");
    try {
      theButton.classList.add("proof--loading");
      var proofout =  await webassembly(dataJSON); 
      document.getElementById("output").innerHTML = proofout;
    } catch(err) {
      console.log(err)
      document.getElementById("confirm").innerHTML = "Error: No proof found" + err;
      $('#output').html('');
    }
    theButton.classList.remove("proof--loading");
  })()
  data = {};
};

const form = document.getElementsByClassName('ATP-form')[0];
form.addEventListener('submit', handleFormSubmit);