/* Author: Kay (Kristin) Sweeney
   Purpose: KeyWordList class is a list, and nested inside this class is another class called KeyWord.
   			The KeyWordList class keeps track of the size (number of KeyWord objects) and contains 
   			references to the first and last KeyWord object.
   			Each KeyWord contains a String word field that helps identify it, a reference to the next
   			KeyWord in the KeyWordList, and it's own NextWordList class, which will be initialized as 
   			all the nextwords in a text that follow the word

    Date Created: 7/29/2020 */

public class KeyWordList 
{
	// class variable to keep track of the size of the list, and references to it's first and last KeyWord elements
	private int size;
	private KeyWord first;
	private KeyWord last;
	
	//KeyWordList constructor
	public KeyWordList()
	{
		// When you first create a new KeyWordList object, set the references to the first and last
		// list elements to null and size to 0 because it starts empty until KeyWord objects are added
		first = null;
		last = null;
		size = 0;
	}
	
	/********************* nested KeyWord class **********************/
	private class KeyWord
	{
		// each KeyWord element inside a KeyWordList holds a String word, a reference to the next KeyWord
		// element, and a nextwordlist
		private String word;
		KeyWord next; // reference to the one before it in the list
		NextWordList nextwordlist = new NextWordList(); // each KeyWord has it's own NextWordList object
		
		// List constructor
		public KeyWord(String keyword)
		{
			this.word = keyword;
			next = null;
		}
	}
	
	/*************************** KeyWordList Methods ***************/
	
	// Method that is called on a KeyWordList object, and takes a word1 and word2 String parameters
	// this Method will construct a KeyWord element inside the KeyWordList
	// if there's no KeyWord elements already that have a matching word1 value
	// and will also use word2 to add to that KeyWord element's nextwordlist
	public void addUniqueAndMakeNextWordList(String word1, String word2)
	{
		
		// Create a keyword object which will hold the reference to the keyword that contains word1
		KeyWord keyword;
		
		// Call the find method to see if a KeyWord element already exists in the list containing this word1
		int inListYet = find(word1);
		
		// If there's no KeyWord elements in the KeyWord list that contain word1, create one
		if(inListYet==-1)
		{
			//System.out.println("Word " + word1 + " was not in the KeyWordList yet, adding it");
			keyword = new KeyWord(word1);
			if(first == null)
			{
						//System.out.println("   Added first list element: " + word);
				first = keyword;
				last = keyword;
			}
			// if this KeyWord list element is not the first to be added to the list, set
			// the KeyWordList's new last element to the one that's being added
			else
			{
						//System.out.println("   Added subsequent list element: " + word);
				last.next = keyword;
				last = keyword;
			}
			size++; // Increment the size of the KeyWordList
		}
		// If there's a KeyWord element containing word1 that already exists in the KeyWordList object
		// assign it to keyword
		else 
		{
			//System.out.println("Word " + word1 + " was already in the KeyWordList");
			keyword = this.getKey(inListYet);
		}
		
		// Put word2 in the keyword's nextwordlist by calling the addAndIncrement method that exists in the
		// NextWordList class
		keyword.nextwordlist.addAndIncrement(word2);
		
	}
	
	
	// take the particular KeyWordList object as a parameter so you know this particular KeyWordList instance's size
	public String randomKeyWord()
	{
		// find a random number between 0 and the size of the calling KeyWordList, accessed by "this"
		int randomNum = (int)(Math.random()*this.size);
		
		//System.out.println("The list size is " + this.size + " and the random number is " + randomNum);
		
		// use the get method to return the word at that index
		String randomWord = get(randomNum);
		//System.out.println("The list size is " + this.size + " and the random word is " + randomWord);
		
		// return that word back to the caller
		return randomWord;
	}
	
	// take a keyword from the caller and return a random word from that particular word's nextwordlist
	// weighted by frequency
	public String randomNextWord(String word)
	{
		//took in a string word paramter
		//need to find this list's keyword object that holds that string

		// start at the first keyword element, iterate through each keyword
		// till you find the one that contains a matching word
		KeyWord keyword = first;
		for(int i = 0; i<size; i++)
		{
			if(keyword.word.equals(word)) 
				break;
			else keyword=keyword.next;
		}
		
					//System.out.println("Ran this method with the String " + word + " and found the KeyWord element containing " + keyword.word);
		
		// find a random number between 0 and the the totalCount of the nextwordlist, accessed via keyword's nextlist object, 
		// which has the public method totalCount()
		int randomNum = (int)(Math.random()*keyword.nextwordlist.totalCount());
		
					//System.out.println("Running randomNextWord method with the String " + word + " which has a nextwordlist with a total count of " + keyword.nextwordlist.totalCount());
					//System.out.println("Chose random number" + randomNum);
		
		int runningCount = 0;
		int i;
		for(i = 0; i <= keyword.nextwordlist.length(); i++)
		{
						//System.out.println("RunningCount is " + runningCount + " and adding the nextWordList element " + i + " which has a count of " + keyword.nextwordlist.getCount(i));
						//System.out.println("RunningCount is now " + runningCount);
			runningCount += keyword.nextwordlist.getCount(i);
			if(runningCount > randomNum) break;
			
		}
					//System.out.println("Broke out of the loop with " + runningCount + " which corresponds to word at index " + i + " which is " + keyword.nextwordlist.get(i));
		
		return keyword.nextwordlist.get(i);
	}
	
	// Method to add a new KeyWord object to the KeyWordList by passing a String word and setting the references
	public void add(String word)
	{
		// add method call passes a String word to the constructor of the KeyWord class, which 
		// creates a KeyWord link element, encapsulating the word. 
		KeyWord keyword = new KeyWord(word);
		
		//System.out.println("Calling the add method with " + word);
		
		// if this KeyWord list element is the first one in the list, the prev will be null
		// and now set the KeyWordList's first and last references to this new KeyWord element
		if(first == null)
		{
			//System.out.println("Added first list element: " + word);
			first = keyword;
			last = keyword;
		}
		// if this KeyWord list element is not the first to be added to the list, set
		// the KeyWordList's new last element to the one that's being added
		else
		{
			//System.out.println("Added subsequent list element: " + word);
			last.next = keyword; // I'M NOT SURE THIS IS RIGHT
			last = keyword;
		}
		size++; // Increment the size of the KeyWordList
	}
	
	// Method to return the size of the KeyWordList
	public int length()
	{
		return size;
	}
	
	// Method to return a particular word at a particular index location in the KeyWordList
	public String get(int index)
	{
		// to start at the beginning of the KeyWordList, assign the reference that lies in the 
		// KeyWordList field "first" to a new KeyWord list element called keyword
		KeyWord keyword = first;
		
		// use a for loop to iterate through the subsequent keyword elements until you reach
		// the index that the method call passed
		for(int i = 0; i<index; i++)
		{
			keyword=keyword.next;
		}
		// return the keyword object's field word
		return keyword.word;
	}
	
	// Method to return a particular KeyWord object inside the list, based upon it being at a particular index
	public KeyWord getKey(int index)
	{
		// to start at the beginning of the KeyWordList, assign the reference that lies in the 
		// KeyWordList field "first" to a new KeyWord list element called keyword
		KeyWord keyword = first;
		
		// use a for loop to iterate through the subsequent keyword elements until you reach
		// the index that the method call passed
		for(int i = 0; i<index; i++)
		{
			keyword=keyword.next;
		}
		// return the keyword object's field word
		return keyword;
	}

	public int find(String searchWord)
	{
		// to start at the beginning of the KeyWordList, assign the reference that lies in the 
		// KeyWordList field "first" to a new KeyWord list element called keyword
		KeyWord keyword = first;
		
		// use a for loop to iterate through the subsequent keyword elements until you reach
		// the matching word and then return it's position
		for(int i = 0; i<size; i++)
		{
			// if the keyword object's word field value matches the searchWord return the index
			if(keyword.word.equals(searchWord)) return i;
			// else, keep moving through the KeyWordList's KeyWord elements by assigning the
			// reference to the next keyword to the current keyword
			else keyword=keyword.next;
		}
		// if word was never found, return -1
		return -1;
	}
	
	public void print()
	{
		// to start at the beginning of the KeyWordList, assign the reference that lies in the 
		// KeyWordList field "first" to a new KeyWord list element called keyword
		KeyWord keyword = first;
		
		for(int i = 0; i<size; i++)
		{
			System.out.println(keyword.word + ":");
			keyword.nextwordlist.print();
			
			keyword=keyword.next;
		}
	}

	
}
