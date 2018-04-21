window.onload = function(){
  var phones = [{ "mask": "+#-###-###-####"}];
  $('#phone').inputmask({ 
    mask: phones, 
    greedy: false, 
    definitions: { '#': { validator: "[0-9]", cardinality: 1}} 
  });
  var inputs = document.querySelectorAll('input');
  for(var i=0;i<inputs.length;i++) {
    inputs[i].addEventListener('blur', function(){
      if(!this.checkValidity()) {
        // if(this.type == 'file'){
        //   document.getElementById(this.id).parentElement.classList.add('file-field-error');
        // }
        if(this.style)
          this.classList.add('has-error');  
        } else {
        // if(this.type == 'file'){
        //   document.getElementById(this.id).parentElement.classList.remove('file-field-error');
        // }
         this.classList.remove('has-error');
       }
     }); 
    }
}

function pickFile(selectedFile){
  document.getElementById(selectedFile).click();
  // var itemVal = document.getElementById(selectedFile).value;
  setInVldFileField(selectedFile);
}

function setInVldFileField(itemId){
  console.log(document.getElementById(itemId).parentElement);
  document.getElementById(itemId).parentElement.classList.add('file-field-error');
}

function setVldFileField(itemId){
  console.log(document.getElementById(itemId).parentElement);
  document.getElementById(itemId).parentElement.classList.remove('file-field-error');
}

function changeBubble(fileName, item){
  item.title = fileName;
}

function changeFileField(item){
  console.log(item.reportValidity());
  var fileName;
  var parent = document.getElementById(item.id).parentElement;
  var fileNameWrap = parent.childNodes[1];
  if(item.value != ''){
    fileName = item.value.split('\\');
    console.log(fileNameWrap);
    fileNameWrap.innerHTML = fileName[fileName.length - 1];
    changeBubble(fileName[fileName.length - 1], parent.childNodes[5]);
    setVldFileField(item.id);
  }
  // else if(parent.childNodes[3].value !=''){
  //   setVldFileField(item.id);
  // }
  else{
    fileNameWrap.innerHTML = 'Choose file ...';
    changeBubble('Choose file ...', parent.childNodes[5]);
  }
}

