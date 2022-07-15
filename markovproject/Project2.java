import java.io.FileReader;
import java.io.IOException;
import java.util.Scanner;

/* Author: Kay (Kristin) Sweeney
   Purpose: Markov model to generate predictive text based upon a text file
   
   IMPORTANT: save the NextWordList.java and KeyWordList.java files in the same folder as Project2.java for 
   			  the program to run.
   
   All parts completed:
   1. Read the words from the text file into KeyWordList and each KeyWord element's NextWordList object
      See java files for NextWordList and KeyWordList classes
   2. Build the Markov model
   3. Randomly choose a word from KeyWordList, then using weighted choices, randomly choose a next word, then
      use what has been printed so far to make the next KeyWord and using weighted choices, randomly choose a 
      next word
   4-5. Markov model modified to allow order of n
   
    Date Created: 7/29/2020
    Date last modified: 8/1/2020 */

public class Project2 
{
	// Static Variables
	static KeyWordList list1 = new KeyWordList(); // Create a KeyWordList object
	public static FileReader infile; // Create a FileReader object for many methods that will read from a file
	public static Scanner input; // Create a Scanner object to for many methods that will scan from the file passed to FileReader
	
	// method to clean the words prior to adding them
	public static String cleanWords(String s1)
	{
		String s2 = s1.toLowerCase();
		s2 = s2.replaceAll("[^a-z0-9]","");
		return s2;
		
	}
	
	// method to populate the KeyWordList and NextWordLists with words from the file
	public static void createList(String filename, int order)
	{
		// initialize Scanner object with file name as argument for input in a try block
		try 
		{ 
			infile = new FileReader(filename);
			input = new Scanner(infile); // initialize the input object
			
			/**************** Code to create Markov model with order of 1 ***************/
			if(order<=1)
			{
				// get the first word that has content in it. If it's empty after cleaning, keep trying 
				// until you get a word
				String word1 = input.next();
				word1 = cleanWords(word1);
				while(word1.equals(""))
				{
					word1 = input.next();
					word1 = cleanWords(word1);
				}
			
				// Now that the program has identified the first word, a while loop runs as long as the file has 
				// more words in it, and identifies the next word, then passes the first and next word to a 
				// method located in KeyWordList that will initialize the KeyWord element and add to each 
				// KeyWord element's nextwordlist
				while(input.hasNext())
				{
					// get the second word that has content in it. If it's empty after cleaning, keep trying until 
					// you get a word
					String word2 = input.next();
					word2 = cleanWords(word2);  
					while(word2.equals(""))
					{
						word2 = input.next();
						word2 = cleanWords(word2);
					}
				
					// Using the KeyWordList object list1, call the addUniqueAndMakeNextWordList method
					// and pass word1 and word2. word1 will become the next KeyWord element if it's not yet in
					// the KeyWordList, and word2 will go into that KeyWord element's nextwordlist
					list1.addUniqueAndMakeNextWordList(word1, word2);
				
					//reassign, so word2 becomes the new word1, and run the loop again if the file has more words
					word1 = word2;
					
				}
			
			}
			/**************** Code to create Markov model with order higher than 1 ***************/
			else
			{
				// wordgroup1 will become a KeyWord element in KeyWordList. For instance, for 
				// Markov model order 2, a KeyWord element would consent of 2 words, like "alice saw"
				// Also declare word2, which will be a single next-word that follows the wordgroup1
				String wordgroup1 = "";
				String word2 = "";
				
				/*********** Code to create first wordgroup1 for first KeyWordList ********/
				
				// Read in the first word from the text, ensuring you get letters/numbers
				if(input.hasNext()==true)
				{
					wordgroup1 = input.next();
					wordgroup1 = cleanWords(wordgroup1);
				}
				while(wordgroup1.equals("") && input.hasNext()==true)
				{
					
					wordgroup1 = input.next();
					wordgroup1 = cleanWords(wordgroup1);
				}
				
				// Append more words onto wordgroup1 based upon the order, so if order is 2, one more word
				// will be added, or if order is 3, 2 more words will be added. Only add more words if there's
				// more content in the file using input.hasNext() == true
				for(int i = 0; i<order-1; i++)
				{
					if(input.hasNext() == true)
					{
						String next = input.next();
						next = cleanWords(next);
						
						while(next.equals("") && input.hasNext() == true)
						{
							next = input.next();
							next = cleanWords(next);
						}
						wordgroup1 = wordgroup1.concat(" " + next);
					}
				}
				
				/*********** Code to get the next word following the first wordgroup1 the nextwordlist  ********/
				// while loop runs as long as the file has more words in it, and puts each word in the list
				while(input.hasNext())
				{
					
					// Get a the word immediately following wordgroup1, clean it, and if it's empty, keep trying
					word2 = input.next();
					word2 = cleanWords(word2);  
					while(word2.equals(""))
					{
						word2 = input.next();
						word2 = cleanWords(word2);
					}
					
					// Now that you have wordgroup1, and word2, call the KeyWordList method on the KeyWordList object
					// which will put wordgroup1 into the KeyWordList as a KeyWord element, and then add word2 to the
					// to the KeyWord element's nextwordlist, or increment if it's already in there
								//System.out.println("Calling method on wordgroup1 = " + wordgroup1 + " and wordgroup2 = " + word2);
					list1.addUniqueAndMakeNextWordList(wordgroup1, word2);	
						
					/*********** Code to create the next wordgroup1 ********/
					//reassign wordgroup1, so wordgroup1 loses it's first word, and word2 gets tacked onto the end
					// for instance, in order =2, if wordgroup1 was "alice saw" and nextword was "a", the goal will be
					// to turn wordgroup1 into "saw a"
					
					// cut off beginning word of wordgroup1 by putting all it's words into an array
					String[] words1 = wordgroup1.split(" ");
					
					// make wordgroup1 blank
					wordgroup1 = "";
					
					// put all the words from the array back into wordgroup1 except for the first word
					for(int i = 1; i<words1.length; i++)
					{
						wordgroup1 = wordgroup1.concat(words1[i] + " ");
						
					}
					// add word2 on to the end of wordgroup1
					wordgroup1 = wordgroup1.concat(word2);
					// now that a new wordgroup1 has been created, ready to run the while loop again, 
					// to get the new word2, as long as the file has more input
				}
			}
		
			// Once the while loop identifies that there's no more words to process in the file, the program
			// will move to this statement to close the input scanner object and the infile FileReader object
			if(input != null) input.close(); 
			infile.close();
		}
		// Catch file opening errors and end program
		catch(IOException e){ System.err.println("Error opening and reading from file");  System.exit(1); }
	}

	public static void main(String[] args) 
	{
	
		// Prompt user for filename and order of Markov model
		Scanner userInput = new Scanner(System.in);
		System.out.print("Enter the name of the text: ");
		final String FILENAME = userInput.next();
		System.out.print("Enter the order of the Markov model as an integer: ");
		final int order = userInput.nextInt();
		
		// Call the createlist method to open the file, and create the Markov model
		createList(FILENAME, order);
		
		// Print the Markov model
		System.out.println("\nThe Markov model is: ");
		list1.print();
		
		// Get the number of words
		System.out.println("\nHow many words do you want for random text generation?");
		int numWords = userInput.nextInt();
		
		
		/************** Generate text for Markov models of order 1 *************/
		if(order <= 1)
		{
			
			// Use the KeyWordList method randomKeyWord to pick a random word from the keywords list
			// and print it
			String printWord = list1.randomKeyWord();
			System.out.print(printWord + " ");
	
			// run this for loop to call the KeyWordList object's randomNextWord method to find a 
			// randomly chosen nextwordlist from weighted nextwordlist options, and print it
			// print that randomly chosen word, and then it will go back into the randomNextWord 
			// method to find the KeyWordList element containing that word, and print the 
			// randomly chosen nextwordlist again
			for(int i = 1; i < numWords; i++)
			{
				printWord = list1.randomNextWord(printWord);
				System.out.print(printWord + " ");
				//System.out.println("Loop ran iteration " + i);
			}
		}
		/************** Generate text for Markov models of order higher than 1 *************/
		
		else
		{
			//Create 2 strings, a printKeyWordGroup which will contain the String encapsulated in a
			// KeyWord element of KeyWordList, and a nextWord which will exist in a KeyWord elements
			// nextwordlist
			String printKeyWordGroup;
			String nextWord;
			
			// pick a random wordgroup from the keywords list, print it
			printKeyWordGroup = list1.randomKeyWord();
			System.out.print(printKeyWordGroup + " ");
			
			// using the current word, pick the random word from it's nextWordsList as the next printWord
			nextWord = list1.randomNextWord(printKeyWordGroup);
			System.out.print(nextWord + " ");
			
			// Run this for loop to print a randomly chosen next word,
			// then reassign keywordgroup by shifting rightwards by 1 word
			// then print the next randomly chosen next word
			// Also, Markov model of 2 prints 2 extra words every time, Markov model of 3 prints 3 extra words every time
			// so ensure printing the right number of words by using i < numWords - order - 1
			for(int i = 0; i < numWords -order-1; i++)
			{
				// create a new printKeyWord based upon removing the first word in the word group, and appending the nextWord
				String words1[] = printKeyWordGroup.split(" ");
				printKeyWordGroup = "";
				// put all the words back in except for the first word
				for(int j = 1; j<words1.length; j++)
				{
					printKeyWordGroup = printKeyWordGroup.concat(words1[j] + " ");
			
				}
				// add word2 on to the end
				printKeyWordGroup = printKeyWordGroup.concat(nextWord);
				
				// using the current printKeyWordGroup, pick the random word from it's nextWordsList as the next printWord
				nextWord = list1.randomNextWord(printKeyWordGroup);
				System.out.print(nextWord + " ");
			}
		}
		
		userInput.close();
		
	}

}


