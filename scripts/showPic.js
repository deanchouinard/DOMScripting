
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func()
		}
	}
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling)
	}
}

function preparePlaceholder() {
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "images/placeholder.gif");
	placeholder.setAttribute("alt", "my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var destext = document.createTextNode("Choose an image");
	description.appendChild(destext);

	var gallery = document.getElementById("imagegallery");
	insertAfter(placeholder, gallery);
	insertAfter(description, placeholder);
//	var body = document.getElementsByTagName("body")[0];
//	body.appendChild(placeholder);
//	body.appendChild(description);
	
}

function prepareGallery() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	
	for (var i=0; i < links.length; i++) {
		links[i].onclick = function() {
			return !showPic(this);
		}
	}
}


function showPic(whichpic) {
	if (!document.getElementById("placeholder")) return false;
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
	if (placeholder.nodeName != "IMG") return false;
  placeholder.setAttribute("src",source);
	if (document.getElementById("description")) {
  	var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
  	var description = document.getElementById("description");
  	description.firstChild.nodeValue = text;
	}
	return true;
}