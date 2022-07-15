
/***************** Make Dropdown Menu Appear/Disappear on click event *************/
/* On a phone-sized screen, when the user clicks on the "Portfolio"
menu button, make the dropdown menu appear" then make it disappear 
on another click event */

// Store a value in a boolean variable if this is the first menu click or not
var first_menu_click = true;

// store the DOM node with id="dropdown_phone" in a variable called menu_button
var menu_button = document.getElementById('dropdown_phone');

// Add an event listener to the variable called menu_button that runs the function
// display_dropdown when a click event is called
menu_button.addEventListener('click', display_dropdown, false);

// define the display_dropdown function
function display_dropdown() {
	// If this is the first click on the menu button, get the DOM node with 
	// id="dropdown_phone" and change it's class to "appear" so it appears per the CSS
	if(first_menu_click == true) {
		document.getElementById('dropdown-content_phone').setAttribute('class', 'appear');
		// change the first_menu_click to false, so the next time this function runs, it 
		// will hide the menu
		first_menu_click = false;
	}
	// If this is the second click on the menu button, get the DOM node with 
	// id="dropdown_phone" and change it's class to "hidden" so it hides per the CSS
	else if(first_menu_click == false){
		document.getElementById('dropdown-content_phone').setAttribute('class', 'hidden');
		// change the first_menu_click to true again, so the next time this function runs, it 
		// will show the menu
		first_menu_click = true;
	}

}








