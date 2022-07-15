/* Author: Kay (Kristin) Sweeney
   Purpose: NextWordList class constructs and contains methods for each nextwordlist object that 
            can be created as a field of a KeyWord object (KeyWord is a class nested inside KeyWordList)
   
    Date Created: 7/29/2020 */

public class NextWordList 
{
	// class variable to keep track of the size of the list
	private int size;
	private NextWord first;
	private NextWord last;
	private int totalCount;
	
	//NextWordList constructor
	public NextWordList()
	{
		// When you first create a new NextWordList object, set the references to the first and last
		// list elements to null and size to 0 because it starts empty until NextWord objects are added
		first = null;
		last = null;
		size = 0;
		totalCount = 0;
	}
	
	/********************* nested class List **********************/
	private class NextWord
	{
		// 
		private String word;
		private int count;
		private NextWord next; // reference to the one before it in the list
		
		// List constructor
		public NextWord(String word)
		{
			this.word = word;
			count = 0;
			next = null;
		}
	}
	
	/*************************** NextWordList Methods ***************/
	
	// getCount takes an integer as a parameter, uses that to iterate
	// through the elements of the NextWordList, find the NextWord object
	// at that index, and return it's count
	public int getCount(int index)
	{
		NextWord word1 = first;
		
		for(int i = 0; i<index; i++)
		{
			word1=word1.next;
		}
		return word1.count;
	}

	// Takes a potential NextWord, adds it to the list with a frequency of 1 if it’s not yet in 
	// the list, if already in the list increment the frequency 
	public void addAndIncrement(String newWord)
	{
		// to start at the beginning of the NextWordList, assign the reference that lies in the 
		// NextWordList field "first" to a new NextWord list element called word1
		NextWord word1 = first;
		
		boolean found = false;
		
		
		// use a for loop to iterate through the subsequent word elements until you reach
		// the matching new word and then return it's position
		for(int i = 0; i<size; i++)
		{
			// if the keyword object's word field value matches the searchWord return the index
			//System.out.println("               " + "Comparing " + newWord + " to " + word1.word);
			if(word1.word.equals(newWord)) 
			{
				
				found = true;
				word1.count++; totalCount++;
				//System.out.println("            " + newWord + " was already in the list, incrementing count to " + word1.count);
				break; // break the loop since it was found once, and you don't want to find it again
				       // and accidently increment the count each time it already existed in the list
			}
			else word1=word1.next; // move to the next element in the list
		}
		
		
		// if the newWord wasn't found in the NextWordList yet, add it
		if(found==false) 
		{ 
			//System.out.println("            " + newWord + " wasn't in the list, adding it");
			add(newWord); 
			//System.out.println("Added " + newWord); 
		}
	
	}
	
	
	// Method to return a particular word at a particular index location in the NextWordList
	public String get(int index)
	{
		// to start at the beginning of the KeyWordList, assign the reference that lies in the 
		// KeyWordList field "first" to a new KeyWord list element called keyword
		NextWord nextword = first;
		
		// use a for loop to iterate through the subsequent keyword elements until you reach
		// the index that the method call passed
		for(int i = 0; i<index; i++)
		{
			nextword=nextword.next;
		}
		// return the keyword object's field word
		return nextword.word;
	}
	
	
	// Method to add a new NextWord object to the NextWordList by passing a String word and setting the references
	public void add(String word)
	{
		// add method call passes a String word to the constructor of the NextWord class, which 
		// creates a NextWord link element, encapsulating the word. 
		NextWord nextword = new NextWord(word);
		
		//System.out.println("Calling the add method with " + word);
		
		// if this NextWord list element is the first one in the list, the prev will be null
		// and now set the NextWordList's first and last references to this new NextWord element
		if(first == null)
		{
			//System.out.println("Added first list element: " + word);
			first = nextword;
			last = nextword;
		}
		// if this NextWord list element is not the first to be added to the list, set
		// the NextWordList's new last element to the one that's being added
		else
		{
			//System.out.println("Added subsequent list element: " + word);
			last.next = nextword; // I'M NOT SURE THIS IS RIGHT
			last = nextword;
		}
		size++; // Increment the size of the NextWordList
		nextword.count++; // increment the count from 0 to 1 since the word is being added to the list
		totalCount++; // increment the totalCount
	}
	
	// Method to return the totalCount of all the elements inside the NextWordList
	public int totalCount()
	{
		return totalCount;
	}
	
	// Method to return the size of the NextWordList
	public int length()
	{
		return size;
	}
	
	public void print()
	{
		// to start at the beginning of the NextWordList, assign the reference that lies in the 
		// NextordList field "first" to a new NextWord list element called word
		NextWord word = first;
		
		for(int i = 0; i<size; i++)
		{
			System.out.println("\t" + word.word + " " + word.count);
			word=word.next;
		}
		
	}
	
}
