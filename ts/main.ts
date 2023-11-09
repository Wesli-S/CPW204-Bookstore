/**
 * represents a single book that can be purchased
 */
class Book {
    isbn: String; //13 digit isbn number
    title: String; //title of the book
    price: number; //retail price of the book6
    releaseDate: Date; //the publish date of the book
}

//Book object test code

/*let myBook = new Book();
myBook.isbn = "34567810";
myBook.price = 16.99;
myBook.title = "FaeFolk"
myBook.releaseDate = new Date(2023, 9, 17); //months start at index 0
console.log(myBook);*/

window.onload = function(){
    //Set up button click for add book form
    let addBookBtn = document.querySelector("#add-book") as HTMLButtonElement;
    addBookBtn.onclick = processBook;
}

function processBook () {
    //validate
    let userBook = getBook();
    if(userBook != null) {
        addBookToWebpage(userBook);
        addBookToStorage (userBook);
    }
}

/**
 * This function will retrieve all the book data from the HTML page.
 * If all data is valid a Book object will be returned. If any data 
 * is invalid, null will be returned
 */
function getBook ():Book {
    clearAllErrorMessages();

    //get all inputs
    let isbnTextBox = document.querySelector("#isbn") as HTMLInputElement;
    let titleTextBox = document.querySelector("#title") as HTMLInputElement;
    let priceTextBox = document.querySelector("#price") as HTMLInputElement;
    let releaseDateTextBox = document.querySelector("#release-date") as HTMLInputElement;

    //validate data
    let isValidData:boolean = true;

    //validate isbn
    let isbn:string = isbnTextBox.value;
    if(!isValidIsbn(isbn)) {
        isValidData = false;
        isbnTextBox.nextElementSibling.textContent = "ISBN must be 13 digits only";
    }

    //validate title

    let title: string = titleTextBox.value;
    if(title.trim() =="") {
        isValidData = false;
        let titleErrorSpan = titleTextBox.nextElementSibling;
        titleErrorSpan.textContent = "You must provide a title";
    } 

    //validate price
    let price = parseFloat(priceTextBox.value);
    if (isNaN(price) || price < 0) {
        isValidData = false;
        priceTextBox.nextElementSibling.textContent = "Price must be a positive number";
    }

    //validate release-date
    let releaseDate = releaseDateTextBox.value;
    let releaseDateCheck = Date.parse(releaseDate); //mental note: the clear error message isn't working for this one, the text doesn't even turn red
    if (isNaN(releaseDateCheck)) {
        isValidData = false;
        releaseDateTextBox.nextElementSibling.textContent = "Release date must be a valid date";
    }

    if(isValidData) {
        let addedBook = new Book();
        addedBook.isbn = isbn;
        addedBook.price = price;
        addedBook.title = title;

        //splits date into an array. For example "2023-10-24" would be {"2023", "10", "24"}
        const dateParts:string[] = releaseDate.split("-"); //this part is so the date matches the current timezone
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; //the -1 is there because months are index based
        const day = parseInt(dateParts[2]);
        const correctDate = new Date (year, month, day)

        addedBook.releaseDate = correctDate;

        return addedBook;
    }
    return null; //if any invalid data is present
}

function isValidIsbn(data: string) {
    let regex = /^\d{13}$/; //exactly 13 digits
    return regex.test(data);
}

/**
 * Adds a Book object to webpage. Assumes all data is valid
 * @param b The Book containing valid data to be added
 */
function addBookToWebpage (b:Book): void {
    console.log(b);
    //Add the book to the webpage
    //Add book data to html using DOM manipulation
    let bookDiv:HTMLDivElement = document.createElement("div");

    let titleHeading = document.createElement("h2");
    titleHeading.textContent = b.title + "   ISBN: " + b.isbn; //This is the title and ISBN
    bookDiv.appendChild(titleHeading); //this is what actually adds the title

    let bookDescription = document.createElement("p");
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }); //format the currency so it looks like a price
    let formattedPrice = currencyFormatter.format(b.price);
    bookDescription.textContent = `This book was released on ${b.releaseDate} and costs ${formattedPrice}`;
    bookDiv.appendChild(bookDescription);

    //add bookDiv to the webpage
    let bookListDisplay = document.querySelector("#book-display");//references book-display in the HTML
    bookListDisplay.appendChild(bookDiv); //adds the newly created book 
}

/**
 * Adds a single Book object to existing Book list in storage
 * If no books are currently stored, a new list will be created and stored
 * @param b The Book that is going to be added to localStorage
 */
function addBookToStorage (b:Book): void {
    const BookStorageKey = "Books"
    //Read existing books out of storage
    let bookData = localStorage.getItem(BookStorageKey);

    // if bookData is null, "Books" key did not exist
    if (bookData == null) {
        //Create a new list and add current book
        let books:Book[] = [];
        books.push(b);

        //add to localStorage
        bookData = JSON.stringify(books);
        localStorage.setItem(BookStorageKey, bookData);
    }
    else {
        //Parse string into a list of books and add new book to the list
        //store the newly modified list back in storage
        let books:Book[] = JSON.parse(bookData);
        books.push(b);

        //Add back ot local storage
        bookData = JSON.stringify(books);
        localStorage.setItem(BookStorageKey, bookData);
    }
}

//clears all validation  error message spans
function clearAllErrorMessages(){
    //Get all error-spans
    let allSpans = document.querySelectorAll("form span.error-msg");

    //Loop through, and set each span to an empty string
    for (let i = 0; i < allSpans.length; i++) {
        allSpans[i].textContent = "";
    }
}