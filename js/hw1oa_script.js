/* Designer: Kay Rubio
   Project: Children's Math Learning Software
   Class: Software Engineering Spring 2021

   Program flow:

   1. Declares variables
   2. Set up event listeners. Event listeners wait for click events on multiple parts of the
      page including:
      a. Grade-selection buttons
      b. The next/back arrow that allows users to move through the questions with or without 
         answering them
      c. The answer options where users can select their answer to each question
   3. Call the displayRewards function when the page loads, which updates the image at the top 
      showing the number of candy rewards that the user has earned so far
   4. Part of page loads per the unhidden HTML DOM elements, then page waits for user to click 
      on a grade button
   5. A user click event on grade button calls function getGrade()
   6. getGrade() gets the grade, then calls additional functions:
      a. setQuestionsAnswers() which initializes the grade-dependent question and answer set
      b. displays the right image on the page
      c. sets the answer set for the specific question
      d. unhides the question and answer set, hides the grade selection div
      e. activates blinky directions on the question-answer set
      f. displayQuestion() which displays the right question on the page
   7. Page waits until user clicks on either a next/back arrow, or an answer option
   8. A user click event on an answer option calls the function processAnswer(option)
      a. remove the blinky directions on the answers and add it to the arrows if this is the first time the user selected an answer
      b. if this is the first time the user is answering the question, process the answer by:
        i. update panda image dependent upon if answer was correct or not
        ii. if correct, incrementing the number correct, 
        iii. if correct, update the number of rewards pic
        iv. Update the progress bar at the bottom of the screen
        v. Change the firstTry variable to false so they can't answer the same question twice
        vi. Increment the number answered and update the percentComplete shown on bottom of screen
        vii. Call the displayReward() which uses a switch statement based on the numberCorrectOA variable 
             to show the correct candy rewards picture
        vii. Display the submit button if the user has answered all 10 questions, and set up an event listener
             on the submit button which will run the submit function
   9. User click on a next/back arrow will call the functions nextQ() and previousQ (respectively)
      and these functions:
      a. if this is the first time they clicked on the arrows, remove the blinky directions
      b. show alerts if there's no more questions
      c. Otherwise update the question number variable i
      d. display the correct question, question image, and answer options
      e. update the panda image to a neutral panda
   10. User click on the submit buttom (which only appears once all 10 questions have been answered)
      runs the submit() function which:
      a. displays a feedback section telling the user the number they got correct, and displaying a 
         specific panda image depending on if they got 7+, 5+, or less than 5 answers correct
      b. update their rewards
      c. create an event listener so they can click to return to the home page
  11. A user click on anywhere with an event lister that runs the returnHome() function will re-start
      homework

  About: I designed the homework page as part of a larger group project with math tutorials and games.
  The homework page can be incorporated into a larger program where the variables (e.g., rewards, 
  numberCorrect) can be stored in a database, and username can be pulled from a database
  
*/

/********************* Updating Username at top of Page ************/

// Get student's first name and store in a variable
var name = "Username";

// store the DOM node with id="username" in a variable
var updateUsername = document.getElementById('usernamehere'); 

// update the inner HTML of this node to the name from the student object
updateUsername.innerHTML = name;

/****** Declare variables for the question answer set and it's pictures *******/
var grade; // Declare the varible for the student grade
var questionSet = new Map(); // Question set for the 10 questions
var answerSet = new Map(); // Answer set for the 10 answers
var imageSet0 = new Map(); // Image set so each question has a helpful image
var i = 1; // Variable keeps track of what question is being displayed, initialized to 1
var numAnswered = 0; // Variable keeps track of how many they've answered, initialized to 0
var numCorrectOA = 0; // Variable will be used to keep track of the number correct, initalized to 0

// Answer options as a two-dimensional array, 3 answer options for each of the 10 questions
let answerOptions = [
        ['','',''],
        ['','',''],
      ['','',''],
      ['','',''],
      ['','',''],
      ['','',''],
      ['','',''],
      ['','',''],
      ['','',''],
      ['','',''],
      ];

var firstTry = new Map(); // Variable that tracks if this is their first try for each question
// Initialize these variables to start at true.  These will be updated to False when the
// student answers a question to ensure they can only try each question once per HW session
firstTry.set(1, true);
firstTry.set(2, true);
firstTry.set(3, true);
firstTry.set(4, true);
firstTry.set(5, true);
firstTry.set(6, true);
firstTry.set(7, true);
firstTry.set(8, true);
firstTry.set(9, true);
firstTry.set(10, true);

// Display-direction related variables
//This variable starts at true but turns to false after their first click on an answer option
// It will help remove the blinking direciton
var first_answer_click = true;
//This variable starts at true but turns to false after their first click on the next arrow.
// It will help remove the second blinking direction
var first_arrow_click = true;


// store the DOM element for the "% Complete" in an object so it can be updated
var percentComplete = document.getElementById('percentComplete');

/*************************************** Event Listeners *********************************/
//event listeners to respond to click on a grade
// get each grade-selection button by it's ID (e.g., gk), then when the user 
// clicks on that DOM element, the function getGrade will run
document.getElementById('gk').addEventListener('click', getGrade, false);
document.getElementById('g1').addEventListener('click', getGrade, false);
document.getElementById('g2').addEventListener('click', getGrade, false);
document.getElementById('g3').addEventListener('click', getGrade, false);
document.getElementById('g4').addEventListener('click', getGrade, false);

/* Use event listener to respond to a click on the next/back arrow, and call the next/previous functions */
var el1 = document.getElementById('next');
el1.addEventListener('click', nextQ, false);

var el2 = document.getElementById('back');
el2.addEventListener('click', previousQ, false);

/* use event listener to respond to click on the answer1 option */
var an1 = document.getElementById('answer1');
//an1.addEventListener('click', processAnswer, false);

an1.addEventListener('click', function(){processAnswer(1);}, false); 
// wrap the function in an anonymous function and pass the number 1 to the function
    
var an2 = document.getElementById('answer2');
an2.addEventListener('click', function(){processAnswer(2);}, false); 

var an3 = document.getElementById('answer3');
an3.addEventListener('click', function(){processAnswer(3);}, false); 

/****************** Call the displayReward() function when the page first loads ***************/
// call the function to display the right number of rewards
// Currently, this starts at 0, but could be updated if the number of pre-existing rewards is pulled 
// from a database as the homework is integrated into a larger program.
displayReward();


/********************* Get grade from click event ************/
// Note: This code could be changed to pull grade from a database for future integration
// into a larger program



// Declare a function which says if there's no event object, use an old IE event object
// Otherwise, get the target of the event. This helps with the getGrade function
function getTarget(e) {
  if(!e) {e = window.event;}
  return e.target || e.srcElement;
}

// Function getGrade runs when user clicks on a grade
function getGrade(e) {

        // Set the grade variable to what the user clicked on by calling the getTarget function
        // Pass the event object e to the getTarget function
        var target = getTarget(e);
        // store the grade in the grade variable
        grade = target.id;

        //Run the function to set the questions and answers now that the global grade variable
        // has been initialized
        setQuestionsAnswers();

        // Display the correct question image re-setting the image src 
        var a0 = document.getElementById('question_image');
        a0.setAttribute('src', imageSet0.get(i));

        // display the answer set
        document.getElementById('answer1').innerHTML = answerOptions[0][0];
        document.getElementById('answer2').innerHTML = answerOptions[0][1];
        document.getElementById('answer3').innerHTML = answerOptions[0][2];

        //Once they click on an grade for the first time, hide the get grade div
        document.getElementById('choose_grade').setAttribute('class', 'hidden');

        //unhide the question and answer set by removing the class of 'hidden' in the HTML code
        document.getElementById('question_answer').removeAttribute('class');
        document.getElementById('answer_options').removeAttribute('class');

        // Activate the blinky directions on the answer_options by adding a class attribute of borderBlink
        // .borderBlink is defined in the CSS file
        document.getElementById('answer_options').setAttribute('class', 'borderBlink');

        //call displayQuestion function to display the correct question on the page 
        // using the grade and the question that that the student starts on (question 1)
        displayQuestion(); 
}


/****** Function to initialize the question/answer set and associated pictures depending on grade *******/
function setQuestionsAnswers() {
  if(grade=='gk') {

        /* Set up the Map() objects for the questions, answers, and image for the answer options */
        questionSet.set(1, "2 + 3 = ?"); 
        questionSet.set(2, "Add:");
        questionSet.set(3, "Fill in the first blank");
        questionSet.set(4, "Fill in the second blank");
        questionSet.set(5, "Fill in the third blank");
        questionSet.set(6, "Add:");
        questionSet.set(7, "Add:");
        questionSet.set(8, "4 + 3 = ");
        questionSet.set(9, "Add:");
        questionSet.set(10, "5 + 3 = ?");

        answerSet.set(1, "2");
        answerSet.set(2, "1");
        answerSet.set(3, "3");
        answerSet.set(4, "1");
        answerSet.set(5, "2");
        answerSet.set(6, "2");
        answerSet.set(7, "3");
        answerSet.set(8, "1");
        answerSet.set(9, "2");
        answerSet.set(10, "3");

        imageSet0.set(1, "../images/hw/koa_rec_1.png");
        imageSet0.set(2, "../images/hw/koa_rec_2.png");  
        imageSet0.set(3, "../images/hw/koa_rec_3.png");
        imageSet0.set(4, "../images/hw/koa_rec_4.png");
        imageSet0.set(5, "../images/hw/koa_rec_5.png");
        imageSet0.set(6, "../images/hw/koa_rec_6.png");
        imageSet0.set(7, "../images/hw/koa_rec_7.png");
        imageSet0.set(8, "../images/hw/koa_rec_8.png");
        imageSet0.set(9, "../images/hw/koa_rec_9.png");
        imageSet0.set(10, "../images/hw/koa_rec_10.png");
        // answer options will be a two-dimensional array
      answerOptions = [
          ['3','5','6'],
          ['8','6','7'],
        ['2','5','1'],
        ['5','2','4'],
        ['7','6','5'],
        ['2','6','8'],
        ['0','9','8'],
        ['7','4','6'],
        ['8','9','4'],
        ['9','6','8'],
        ];

  }
  else if(grade=='g1') {
        /* Set up the Map() objects for the questions, answers, and image for the answer options */
        questionSet.set(1, "Add:");
        questionSet.set(2, "7 + 2 + 3 = 12");
        questionSet.set(3, "2 + 8 + 3 can be reduced to ? + 3 = 13");
        questionSet.set(4, "10 + ? = 18");
        questionSet.set(5, "10 + 6");
        questionSet.set(6, "6 + 2 + 4");
        questionSet.set(7, "6 + 6 + 1 = 15");
        questionSet.set(8, "5 + 5 + 4 can be reduced to ? + 4 = 14");
        questionSet.set(9, "3 + 5 + 4 = ?");
        questionSet.set(10, "? + 3 = 5");

        answerSet.set(1, "2");
        answerSet.set(2, "1");
        answerSet.set(3, "2");
        answerSet.set(4, "3");
        answerSet.set(5, "1");
        answerSet.set(6, "2");
        answerSet.set(7, "3");
        answerSet.set(8, "2");
        answerSet.set(9, "2");
        answerSet.set(10, "1");

        imageSet0.set(1, "../images/hw/1oa_rec_1.png");
        imageSet0.set(2, "../images/hw/1oa_rec_tf.png");  
        imageSet0.set(3, "../images/hw/1oa_rec_nl.png");
        imageSet0.set(4, "../images/hw/1oa_rec_4.png");
        imageSet0.set(5, "../images/hw/1oa_rec_5.png");
        imageSet0.set(6, "../images/hw/1oa_rec_6.png");
        imageSet0.set(7, "../images/hw/1oa_rec_tf.png");
        imageSet0.set(8, "../images/hw/1oa_rec_nl.png");
        imageSet0.set(9, "../images/hw/1oa_rec_9.png");
        imageSet0.set(10, "../images/hw/1oa_rec_10.png");

        // answer options will be a two-dimensional array
      answerOptions = [
          ['16','17','18'],
          ['True','Unknown','False'],
        ['3','10','13'],
        ['6','7','8'],
        ['16','18','36'],
        ['10','12','16'],
        ['True','Unknown','False'],
        ['4','10','14'],
        ['11','12','14'],
        ['2','3','4'],
        ];

  }
  else if(grade=='g2') {
        /* Set up the Map() objects for the questions, answers, and image for the answer options */
        questionSet.set(1, "Pablo has 3 apples. Maria has 8 apples. They decide to combine their apples together. How many apples do they have together?:");
        questionSet.set(2, "11 - 5 = ?");
        questionSet.set(3, "Shaquille has 17 pet hermit crabs. Does he have an even or odd number of hermit crabs?");
        questionSet.set(4, "Janet has an ice tray with two rows and 6 columns. How many pieces of ice will she have if she fills the whole tray?");
        questionSet.set(5, "20 - 13 = ?");
        questionSet.set(6, "Shiva has 10 books. He decides to give one book to Joan. How many books does he have left?");
        questionSet.set(7, "5 + 14 = ?");
        questionSet.set(8, "Mark has 8 siblings. Does he have an even or odd number of siblings?");
        questionSet.set(9, "Ha-yoon has 3 shelves on his bookshelf. Each shelf can fit 10 books. How many books can he fit on his bookshelf?");
        questionSet.set(10, "Akua has 20 cookies. She gives 3 to Jonas. How many cookies does she have left?");

        answerSet.set(1, "2");
        answerSet.set(2, "1");
        answerSet.set(3, "3");
        answerSet.set(4, "2");
        answerSet.set(5, "2");
        answerSet.set(6, "3");
        answerSet.set(7, "2");
        answerSet.set(8, "1");
        answerSet.set(9, "2");
        answerSet.set(10, "3");

        imageSet0.set(1, "../images/hw/2oa_rec_1.png");
        imageSet0.set(2, "../images/hw/2oa_rec_2.png");  
        imageSet0.set(3, "../images/hw/2oa_rec_3.png");
        imageSet0.set(4, "../images/hw/2oa_rec_4.png");
        imageSet0.set(5, "../images/hw/1oa_rec_nl.png");
        imageSet0.set(6, "../images/hw/2oa_rec_6.png");
        imageSet0.set(7, "../images/hw/1oa_rec_nl.png");
        imageSet0.set(8, "../images/hw/2oa_rec_8.png");
        imageSet0.set(9, "../images/hw/2oa_rec_9.png");
        imageSet0.set(10, "../images/hw/2oa_rec_10.png");

        // answer options will be a two-dimensional array
      answerOptions = [
          ['6','11','13'],
          ['6','8','10'],
        ['Even','Unknown','Odd'],
        ['10','12','14'],
        ['5','7','10'],
        ['6','8','9'],
        ['17','19','20'],
        ['Even','Unknown','Odd'],
        ['10','30','40'],
        ['3','15','17'],
        ];

  }

  else if(grade=='g3') {
        /* Set up the Map() objects for the questions, answers, and image for the answer options */
        questionSet.set(1, "Sachin has 3 best friends.  He wants to give each of his best friends 5 cookies.  How many cookies will he need to bake?");
        questionSet.set(2, "Maria's school has 50 students in her third grade.  There are 10 students in each class.  How many third grade classes does her school have?");
        questionSet.set(3, "6 x 3 = ?");
        questionSet.set(4, "8 x ? = 48");
        questionSet.set(5, "38 x 1 = ?");
        questionSet.set(6, "97 x ? = 97");
        questionSet.set(7, "Omolara says that 82 x 37 is the same as 37 x 82.  Is that true or false? Does the order matter in multiplication?");
        questionSet.set(8, "Sri Harsha says that if 9 x 5 = 45, then 45 / 5 = 9.  Is that true or false?");
        questionSet.set(9, "Denise says that if you multiply an even number by another even number, the answer is always odd.  Is that true or false?");
        questionSet.set(10, "Ayesha wants to make the same number of pastries for her mom, her dad, her grandma, and her grandpa.  She has enough ingredients to make 16 pastries.  How many can she make for each family member?");

        answerSet.set(1, "2");
        answerSet.set(2, "3");
        answerSet.set(3, "1");
        answerSet.set(4, "2");
        answerSet.set(5, "1");
        answerSet.set(6, "2");
        answerSet.set(7, "1");
        answerSet.set(8, "1");
        answerSet.set(9, "3");
        answerSet.set(10, "2");

        imageSet0.set(1, "../images/hw/3oa_rec_1.png");
        imageSet0.set(2, "../images/hw/3oa_rec_2.png");  
        imageSet0.set(3, "../images/hw/3oa_rec_3.png");
        imageSet0.set(4, "../images/hw/3oa_rec_3.png");
        imageSet0.set(5, "../images/hw/3oa_rec_3.png");
        imageSet0.set(6, "../images/hw/3oa_rec_3.png");
        imageSet0.set(7, "../images/hw/1oa_rec_tf.png");
        imageSet0.set(8, "../images/hw/1oa_rec_tf.png");
        imageSet0.set(9, "../images/hw/1oa_rec_tf.png");
        imageSet0.set(10, "../images/hw/3oa_rec_10.png");

        // answer options will be a two-dimensional array
      answerOptions = [
          ['5','15','20'],
          ['50','100','500'],
        ['18','21','24'],
        ['5','6','7'],
        ['38','76','114'],
        ['0','1','97'],
        ['True','Unknown','False'],
        ['True','Unknown','False'],
        ['True','Unknown','False'],
        ['3','4','5'],
        ];

  }

  else if(grade=='g4') {
        /* Set up the Map() objects for the questions, answers, and image for the answer options */
        questionSet.set(1, "Choose the right math sentence for this story. Kat has 3 homework assignments due on Monday, another 3 homework assignments due on Tuesday, and another 3 homework assignments due on Wednesday.  She doesn't have any other homework due on Thursday or Friday.  How many homework assignments does she have due this week?");
        questionSet.set(2, "Choose the right math sentence for this story.  Emmanuel starts the school year with an empty locker. In September, he puts 5 books in his locker.  In October he adds another 5 books.  In November he adds another 5 books.  In December, he adds another 5 books.  If he doesn't remove any books, how many books will he have in his locker by winter break?");
        questionSet.set(3, "12 x 12 = ?");
        questionSet.set(4, "3 a multiple of 8. True or False?");
        questionSet.set(5, "4 a multiple of 16. True or False?");
        questionSet.set(6, "Complete the pattern:");
        questionSet.set(7, "Which pattern fits the rule?");
        questionSet.set(8, "8 x ? = 24");
        questionSet.set(9, "10 x ? = 90");
        questionSet.set(10, "10 / 2 = ?");

        answerSet.set(1, "1");
        answerSet.set(2, "1");
        answerSet.set(3, "2");
        answerSet.set(4, "3");
        answerSet.set(5, "1");
        answerSet.set(6, "3");
        answerSet.set(7, "2");
        answerSet.set(8, "1");
        answerSet.set(9, "3");
        answerSet.set(10, "3");

        imageSet0.set(1, "../images/hw/4oa_rec_1.png");
        imageSet0.set(2, "../images/hw/4oa_rec_2.png");  
        imageSet0.set(3, "../images/hw/3oa_rec_3.png");
        imageSet0.set(4, "../images/hw/1oa_rec_tf.png");
        imageSet0.set(5, "../images/hw/1oa_rec_tf.png");
        imageSet0.set(6, "../images/hw/4oa_rec_6.png");
        imageSet0.set(7, "../images/hw/4oa_rec_7.png");
        imageSet0.set(8, "../images/hw/3oa_rec_3.png");
        imageSet0.set(9, "../images/hw/3oa_rec_3.png");
        imageSet0.set(10, "../images/hw/3oa_rec_3.png");

        // answer options will be a two-dimensional array
      answerOptions = [
          ['3 x 3 = 9','3 + 3 = 6','3 + 4 = 7'],
          ['4 x 5 = 20','4 + 5 = 9','4 x 3 = 12'],
        ['120','144','184'],
        ['True','Unknown','False'],
        ['True','Unknown','False'],
        ['8, 9, 10...','9, 11, 13...','10, 13, 16...'],
        ['2, 5, 8, 11...','2, 6, 10, 14...','1, 4, 7, 10...'],
        ['3','4','5'],
        ['6','8','9'],
        ['3','4','5'],
        ];

  }
}

// function to display the correct question, depending on the grade (global variable grade) 
// and the question number (global variable i)
function displayQuestion() {
  if(grade=='gk') {
    document.getElementById('qNum').innerHTML = "Grade K Operations and Algebraic Thinking: Q" + i;
  }  
  else if(grade=='g1') {
    document.getElementById('qNum').innerHTML = "Grade 1 Operations and Algebraic Thinking: Q" + i;
  }
  else if (grade=='g2') {
    document.getElementById('qNum').innerHTML = "Grade 2 Operations and Algebraic Thinking: Q" + i;
  }
    else if (grade=='g3') {
    document.getElementById('qNum').innerHTML = "Grade 3 Operations and Algebraic Thinking: Q" + i;
  }
    else if (grade=='g4') {
    document.getElementById('qNum').innerHTML = "Grade 4 Operations and Algebraic Thinking: Q" + i;
  }

  /* Display the right question on the page*/
  document.getElementById('question').innerHTML = "" + questionSet.get(i);
}


/******* Function to change the panda pic to show if they got the answer right or wrong */
function processAnswer(option) {

        //Once they click on an answer for the first time, remove .borderBlink class attribute from the 
        //element with the id="answer_options" and add a .borderBlink class attribute to the element
        //with the id="back_next"
        if(first_answer_click==true) {
          document.getElementById('answer_options').removeAttribute('class');
          document.getElementById('direction1').setAttribute('class', 'hidden');

          document.getElementById('back_next').setAttribute('class', 'borderBlink');
          document.getElementById('direction2').removeAttribute('class');
          first_answer_click = false;
        }

        // run only if this is their first try for this question, otherwise do nothing
       if(firstTry.get(i) == true) {


        /* if the answer is right, show the right panda and increment how  many they have correct */
        if(option == answerSet.get(i)) {
          var panda = document.getElementById('responding_panda');
          panda.setAttribute('src', "../images/hw/great_job_panda.png");
          numCorrectOA++;
          // call the function to display the right number of rewards
          displayReward();
          // Permanently update the background color of that question on the progress bar
        document.getElementById(i).setAttribute('class', 'backgroundColorBlue');
        // select the DOM element from the progress bar with an ID corresponding to the question
        // number and then update it's text to show a checkmark
        document.getElementById(i).innerHTML = "Q" + i + " &#10003";

        }
    
        // If the answer is wrong, show the wrong_panda
        else {
          var panda = document.getElementById('responding_panda');
          panda.setAttribute('src', "../images/hw/wrong_panda.png");
          // Permanently update the background color of that question on the progress bar
        document.getElementById(i).setAttribute('class', 'backgroundColorRed');
        // select the DOM element from the progress bar with an ID corresponding to the question
        // number and then update it's text to show a checkmark
        document.getElementById(i).innerHTML = "Q" + i + " X";

        }
        firstTry.set(i, false); // change to false so they can't try this question again
        // Permanently increase the % complete
      numAnswered++;
      document.getElementById('percentComplete').innerHTML = numAnswered * 10 +"% Complete";
      }
  

     //if numAnswered has reached 10, display the submit button will appear by removing it's class attribute of hidden

      if(numAnswered == 10) {
      document.getElementById('hidden').setAttribute('id', 'submit');
      /* once submit button apperas, set up event listener to respond to click and call submit function */
      var submitButton = document.getElementById('submit');
      submitButton.addEventListener('click', submit, false);
    	}

}

  /* Function to move to the next question */
function nextQ() {
      //Once they click on the next arrow for the first time, remove the .borderBlink class attribute
      //from the element with the id="back_next"
      if(first_answer_click==false && first_arrow_click==true) {
          document.getElementById('back_next').removeAttribute('class');
          document.getElementById('direction2').setAttribute('class', 'hidden');
          first_arrow_click = false;
      }

      // if there's no more questions, show the last thing
      if (i == 10) {
        /*window.location.assign("goodjob.html");*/
        alert("This is the last question. Please press Submit or use the back arrow to finish the questions.");

    } else {

      i++;

      displayQuestion();
      /* When go to the next question, Re-set the panda pic back to the neutral panda */
      var panda = document.getElementById('responding_panda');
        panda.setAttribute('src', "../images/hw/waiting_panda.png");

      /* Update question on the page*/
      document.getElementById('question').innerHTML = questionSet.get(i);
        // update the question image
      var a0 = document.getElementById('question_image');
        a0.setAttribute('src', imageSet0.get(i));
        // update the 3 answer options on the page
        document.getElementById('answer1').innerHTML = answerOptions[i-1][0];
      document.getElementById('answer2').innerHTML = answerOptions[i-1][1];
      document.getElementById('answer3').innerHTML = answerOptions[i-1][2];
      
    }
}

    /* Function to move to the previous question */
    function previousQ() {
      if (i == 1) {
        alert("This is the 1st question!");
    } else {
      i--;

  
      displayQuestion();
      /* Update question on the page*/
      document.getElementById('question').innerHTML = questionSet.get(i);

      /* When go to the next question, Re-set the panda pic back to the neutral panda */
      var a1 = document.getElementById('responding_panda');
        a1.setAttribute('src', "../images/hw/waiting_panda.png");

      /* Update the question image by re-setting the image src */
        var a0 = document.getElementById('question_image');
        a0.setAttribute('src', imageSet0.get(i));
        // update the 3 answer options on the page
        document.getElementById('answer1').innerHTML = answerOptions[i-1][0];
      document.getElementById('answer2').innerHTML = answerOptions[i-1][1];
      document.getElementById('answer3').innerHTML = answerOptions[i-1][2];
  
    }
    }


    /* function for when they click on submit */
    function submit() {
      // create variables for message and pic to display in the feedback section
      var message;
      var pic;
      // create a message and pick a picture based on how many they got correct
      if(numCorrectOA > 7)
      {
        message = "You got " + numCorrectOA + " out of 10 correct! Great job!";
        pic = "../images/hw/pandaconfetti.png";
      }
      else if(numCorrectOA > 5)
      {
        message = "You got " + numCorrectOA + " out of 10 correct. Good work, you passed!";
        pic = "../images/hw/pandathumbsup.png";
      }
      else
      {
        message = "You got " + numCorrectOA + " out of 10 correct. Good effort, try again next time";
        pic = "../images/hw/pandashrug.png";
      }

      // Now show them how their rewards have increased
      displayReward();

      // remove the hidden ID from the feedback section to show it
      document.getElementById('hidden2').setAttribute('id', 'feedback');

      // update the message shown in the feedback section
      document.getElementById('message').innerHTML = message;
      document.getElementById('panda').src = pic;

    /* event listener on the feedback section so they can click to return to the right home page */
    var feedback = document.getElementById('feedback');
    feedback.addEventListener('click', returnHome, false); 
    }

    // return home function
function returnHome() {
  /********** Write NumCorrect to file here ******/
  window.location.assign("p-hw1oa.html");
}

  
  /* Function to show the right reward picture */
  // Depending on the number of rewards stored in the student object
// display the right picture by changing the image source
function displayReward() {
  switch(numCorrectOA) {
  case 0:
    document.getElementById("candybowl").src='../images/hw/zerocandy.png';
    break;
  case 1:
    document.getElementById("candybowl").src='../images/hw/onecandy.png';
    break;
  case 2:
    document.getElementById("candybowl").src='../images/hw/twocandy.png';
    break;
  case 3:
    document.getElementById("candybowl").src='../images/hw/threecandy.png';
    break;
  case 4:
    document.getElementById("candybowl").src='../images/hw/fourcandy.png';
    break;
  case 5:
    document.getElementById("candybowl").src='../images/hw/fivecandy.png';
    break;
  case 6:
    document.getElementById("candybowl").src='../images/hw/sixcandy.png';
    break;
  case 7:
    document.getElementById("candybowl").src='../images/hw/sevencandy.png';
    break;
  case 8:
    document.getElementById("candybowl").src='../images/hw/eightcandy.png';
    break;
  case 9:
    document.getElementById("candybowl").src='../images/hw/ninecandy.png';
    break;
  case 10:
    document.getElementById("candybowl").src='../images/hw/tencandy.png';
    break;
	default:
		document.getElementById("candybowl").src='images/hw/zerocandy.png';
		break;
  }
} 
