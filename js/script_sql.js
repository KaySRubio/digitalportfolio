/************** SQL Page - make examples appear when boxes are clicked ****************/

// Hide all the elements that otherwise would appear if JavaScript was not working
document.getElementById('sqlexample1').setAttribute('class', 'hidden');
document.getElementById('sqlexample2').setAttribute('class', 'hidden');

// store the DOM node with id="left_box" in a variable called left_box
var left_box = document.getElementById('left_box');

// Add an event listener to the variable called left_box that runs the function
// display_example1 when a click event is called
left_box.addEventListener('click', display_example1, false);

// define the display_example1 function
function display_example1() {
	// Get the DOM node with id="sqlexample1" and change it's class to "appear"
	document.getElementById('sqlexample1').setAttribute('class', 'appear');
	// Get the DOM node with id="left_box" and change it's class to "shadow"
	document.getElementById('left_box').setAttribute('class', 'shadow');

	// Get the DOM node with id="sqlexample2" and change it's class to "hidden"
	document.getElementById('sqlexample2').setAttribute('class', 'hidden');

	// Get the DOM node with id="right_box" and remove a class of "hidden"
	document.getElementById('right_box').removeAttribute('class');
	//Permanently hide the direction
	document.getElementById('direction3').setAttribute('class', 'hidden');
}

// store the DOM node with id="right_box" in a variable called right_box
var right_box = document.getElementById('right_box');

// Add an event listener to the variable called right_box that runs the function
// display_example2 when a click event is called
right_box.addEventListener('click', display_example2, false);

// define the display_example1 function
function display_example2() {
	// Get the DOM node with id="sqlexample2" and change it's class to "appear"
	document.getElementById('sqlexample2').setAttribute('class', 'appear');
	// Get the DOM node with id="right_box" and change it's class to "shadow"
	document.getElementById('right_box').setAttribute('class', 'shadow');

	// Get the DOM node with id="sqlexample1" and change it's class to "hidden"
	document.getElementById('sqlexample1').setAttribute('class', 'hidden');

	// Get the DOM node with id="left_box" and remove a class of "hidden"
	document.getElementById('left_box').removeAttribute('class');
	//Permanently hide the direction
	document.getElementById('direction3').setAttribute('class', 'hidden');
}
