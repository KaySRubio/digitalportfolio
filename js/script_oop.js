/***************** OOP Page *******************/

// Hide all the elements that otherwise would appear if JavaScript was not working
// including the message saying JavaScript is not working
document.getElementById("markov1").setAttribute('class', 'hidden');
document.getElementById("order1").setAttribute('class', 'hidden');
document.getElementById("order2").setAttribute('class', 'hidden');
document.getElementById("order3").setAttribute('class', 'hidden');
document.getElementById("markov_text_header").setAttribute('class', 'hidden');
document.getElementById("markov_text_para").setAttribute('class', 'hidden');
document.getElementById("js_not_working_msg").setAttribute('class', 'hidden');

// Declare a global variable to hold which pic was clicked on
var pic = "";

// Declare and initialize strings for samples of the output the real java program provided
var obama1 = "because we continue today i thank president bush for the time has not out of workers are equal all to make your fist applause in arlington whisper through the nuclear threat and because we intend to shape an uncertain destiny this transition fortyfour americans that noble idea passed on this journey end and we pledge to raise health care is badly weakened a small village where the keepers of standing pat of a recognition on mutual respect to you are serious and begin again the spirit is the answer is a chance to those values upon which sees us who";
var obama2 = "to generate wealth and expand freedom is unmatched but this crisis began our minds are no less inventive our goods and services no less inventive our goods and services no less profound is a sapping of confidence across our land a nagging fear that americas decline is inevitable that the next generation must lower its cost we will not be met applause on this day we gather because we the people have remained faithful to the future world that in the knowledge that god calls on us to do as we consider the role that unfolds before us whether the market";
var obama3 = "not have been served in a local restaurant can now stand before you to take a most sacred oath applause so let us mark this day with remembrance of who we are and how far we have traveled in the year of americas birth in the coldest of months a small band of patriots huddled by dying campfires on the shores of an icy river the capital was abandoned the enemy was advancing the snow was stained with blood at the moment when the outcome of our revolution was most in doubt the father of our nation we understand that";
var harry1 = "vanished the other day and broken glasses and broken glasses and snakes were leaning right thirtyseven then said anything else to become until finally he reminded himself silly vernon bought him once on harry supposed was forbidden to the tank and piers and crushed it was aunt petunia had a nasty that couldnt imagine where he barked by the problem was sitting on their backs while piers polkiss walked in his hair at it winked harry his baggy clothes and thick blond harry made aunt rapped on this as though he could remember being hugged and nobody liked about them";
var harry2 = "which was almost bald except for his age he looked back at the glistening brown coils make it move he whined at his mother the room held no sign at all had taken harry aside im warning you now boy any funny business anything at all that another boy lived in the house before starting on harry he was already laughed at for his bangs which she left to hide that horrible scar dudley had gotten it in the car that cars new hes not sitting in the car crash he couldnt be sure the snake didnt budge do it";
var harry3 = "went down the hall into the kitchen the table was almost hidden beneath all dudleys birthday presents it looked as though dudley had gotten the new computer he wanted not to mention the second television and the racing bike exactly why dudley wanted a racing bike was a mystery to harry as dudley was very fat and hated exercise unless of course it involved punching somebody dudleys favorite punching bag was harry but he couldnt often catch him harry didnt look it but he was very fast perhaps it had something to do with him but before theyd left uncle";
var koala1 = "colony as adaptations for our climate is not tame and had visibly grown it is crucial to learn more than 600 different vocalizations from a conservation scientists noted that her joey returns there is really two females our most herbivores cant just on hot days later nariah was discovered on hot days koalas teddy had always been highly selective in eucalypt leaves of koalas outside of australias most of that female mate with a significant relationship between 1960 and feet have a toe that opens upward toward their sole sustenance is crucial to hide or hear but there yet a";
var koala2 = "one was attached to one of our koala care specialists at the time would be trying to attract a mate with their bemused expressions and adorably rounded bodies its no wonder that koalas and other low shaded branches for resting on cooler days koalas are naturally solitary they are successful eventually they figure out how to grab leaves with their hands and put them in their pouch when they dig although prehistoric koalas eventually stopped burrowing and started living in the balance formerly thought to be able to ingest these toxins at least in certain kinds of eucalypts each day at";
var koala3 = "when breeding stopped australia had always been highly selective in regard to the export of koalas was enacted in the 1960s when our last male teddy died in 1976 australian airline qantas offered to help us obtain more koalas teddy had appeared in some of that airlines commercials it also helped that 1976 was a bicentennial year for the us and the australian government waived the export ban for this one occasion later that year we received two male and four female koalas waltzing cough drop matilda audrey pepsi and coke at the time we did not know how successful";

// store the DOM node with id="center_photos1" in a variable called center_photos1
var center_photos1 = document.getElementById('center_photos1');

// Add an event listener to the variable called center_photos1 that runs the function
// display_example1 when a click event is called
center_photos1.addEventListener('click', display_markov, false);


// Declare a function which says if there's no event object, use an old IE event object
// Otheriwse, get the target of the event
function getTarget(e) {
	if(!e) {e = window.event;}
	return e.target || e.srcElement;
}

// define the display_markov function, which takes as a parameter the event object e
// which stands for the object that was clicked upon, then uses the getTarget function
// to store that DOM element in a variable, then puts the ID of the DOM element in a
// string variable, and uses that to deturmine which text to display
function display_markov(e) {

	var target = getTarget(e);
	pic = target.id;

	/*alert("pic chosen = " + pic); // debugging */

	// Highlight the figure that the user clicked on and remove highlights from other figures
	if(pic=="obama") {
		document.getElementById("obama").setAttribute('class', 'highlighted');
		document.getElementById("koala").removeAttribute('class');
		document.getElementById("harry").removeAttribute('class');
	}
	else if(pic=="koala") {
		document.getElementById("koala").setAttribute('class', 'highlighted');
		document.getElementById("obama").removeAttribute('class');
		document.getElementById("harry").removeAttribute('class');
	}
	else if(pic=="harry") {
		document.getElementById("harry").setAttribute('class', 'highlighted');
		document.getElementById("obama").removeAttribute('class');
		document.getElementById("koala").removeAttribute('class');
	}

	// Get the DOM node with id="markov1" and change it's class to "appear"
	document.getElementById('markov1').setAttribute('class', 'appear');
	// Get the DOM node with id="order1" and change it's class to "appear"
	document.getElementById('order1').setAttribute('class', 'appear');
	// Get the DOM node with id="order2" and change it's class to "appear"
	document.getElementById('order2').setAttribute('class', 'appear');
	// Get the DOM node with id="order3" and change it's class to "appear"
	document.getElementById('order3').setAttribute('class', 'appear');

	// When user clicks on a new picture, hide the header and para until they 
	// click on an order again
	document.getElementById('markov_text_header').setAttribute('class', 'hidden');
	document.getElementById('markov_text_para').setAttribute('class', 'hidden');

}

// store the DOM node with id="order_buttons" in a variable called order_buttons
var order_buttons = document.getElementById('order_buttons');

// Add an event listener to the variable called order_buttons that runs the function
// display_markov_para when a click event is called
order_buttons.addEventListener('click', display_markov_para, false);

function display_markov_para(e) {
	var order_button = getTarget(e);
	order = order_button.id;

	/*alert("order = " + order);*/

	// highlight which button was clicked and de-highlight the others;
	if(order=="order1")
	{
		document.getElementById("order1").setAttribute('class', 'clicked_button');
		document.getElementById("order2").removeAttribute('class');
		document.getElementById("order3").removeAttribute('class');
	}
	else if(order=="order2")
	{
		document.getElementById("order2").setAttribute('class', 'clicked_button');
		document.getElementById("order1").removeAttribute('class');
		document.getElementById("order3").removeAttribute('class');
	}
	else if(order=="order3")
	{
		document.getElementById("order3").setAttribute('class', 'clicked_button');
		document.getElementById("order1").removeAttribute('class');
		document.getElementById("order2").removeAttribute('class');
	}
	// Get the DOM node with id="markov_text_header" and change it's class to "appear"
	document.getElementById('markov_text_header').setAttribute('class', 'appear');
	// Get the DOM node with id="markov_text_para" and change it's contents based on the pic
	// and the order chosen
	// create a var called markov_para, that holds the contents of the document object
	var markov_para = document.getElementById('markov_text_para');

	if(order=="order1" && pic=="obama"){markov_para.innerHTML = obama1;}
	else if(order=="order2" && pic=="obama"){markov_para.innerHTML = obama2;}
	else if(order=="order3" && pic=="obama"){markov_para.innerHTML = obama3;}
	else if(order=="order1" && pic=="harry"){markov_para.innerHTML = harry1;}
	else if(order=="order2" && pic=="harry"){markov_para.innerHTML = harry2;}
	else if(order=="order3" && pic=="harry"){markov_para.innerHTML = harry3;}
	else if(order=="order1" && pic=="koala"){markov_para.innerHTML = koala1;}
	else if(order=="order2" && pic=="koala"){markov_para.innerHTML = koala2;}
	else if(order=="order3" && pic=="koala"){markov_para.innerHTML = koala3;}
	// Display the DOM node with the id="markov_text_para"
	markov_para.setAttribute('class', 'appear');

}