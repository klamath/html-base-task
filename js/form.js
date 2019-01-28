const EMAIL_REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const PHONE_REGEX = /^\+[0-9]-[0-9]{3}-[0-9]{3}-[0-9]{4}$/;


var last_elem = null;


const validate_email = () => {
    const email = document.forms[0]["email"];
    const box = email.parentNode;
    if(email.value.match(EMAIL_REGEX)) {
	box.className = "focused input-box"
	return true;
    } else {
	box.className = "focused_error input-box";
	return false;
    }
}

const validate_phone = () => {
    const phone = document.forms[0]["phone"];
    const box = phone.parentNode;
    if(phone.value.match(PHONE_REGEX)) {
	box.className = "focused input-box"
	return true;
    } else {
	box.className = "focused_error input-box";
	return false;
    }
}

const validate = () => {
    const email = validate_email();
    const phone = validate_phone();
    return email && phone;
};

const show_file_name = (name) => (event) => {
    const input = event.srcElement;
    var files = [];
    for(i=0;i<input.files.length;i++)
	files.push(input.files[i].name);
    const text = files.join(", ");
    document.getElementById(name).innerHTML = text;
}

const trigger_download = (name) => {
    const file_input = document.forms[0][name];
    file_input.click();
};

const focus_on = (next) => {
    if(!(last_elem === null)) {
	if(last_elem.className.includes("error")) {
	    last_elem.className = "error input-box";
	} else {
	    last_elem.className = "input-box";
	}
    }
    if(next.className.includes("error")){
	next.className = "focused_error input-box"
    } else {
	next.className = "focused input-box";
    }
    last_elem = next;
};

const attachListener = (elem) => {
    const children_p = elem.querySelector("p");
    const children_input = elem.querySelector("input");
    elem.onclick = children_p.onclick = () => { focus_on(elem); children_input.focus(); };
};

const attachListeners = () => {
    var elems = document.getElementsByClassName("input-box");
    for(var i=0;i<elems.length;i++) {
	attachListener(elems[i]);
    }

    form = document.forms[0];
    
    form.onsubmit = validate;
    form["photo"].addEventListener('change', show_file_name("photo-label"));
    form["docs"].addEventListener('change', show_file_name("docs-label"));
    form["transcript"].addEventListener('change', show_file_name("transcript-label"));
    form["recommendation"].addEventListener('change', show_file_name("recommendation-label"));
};

