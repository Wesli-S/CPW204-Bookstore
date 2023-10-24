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
        addBook(userBook);
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
        addedBook.releaseDate = new Date (releaseDate);

        return addedBook;
    }
    return null; //if any invalid data is present
}

function isValidIsbn(data: string) {
    let regex = /^\d{13}$/; //exactly 13 digits
    return regex.test(data);
}

/**
 * Adds a Book object to storage. Assumes all data is valid
 * @param b The Book containing valid data to be added
 */
function addBook (b:Book): void {
    console.log(b);
    //Add the book to the webpage
    //Add book data to html using DOM manipulation
    let bookDiv:HTMLDivElement = document.createElement("div");

    let titleHeading = document.createElement("h2");
    titleHeading.textContent = b.title + "   ISBN: " + b.isbn; //This is the title and ISBN
    bookDiv.appendChild(titleHeading); //this is what actually adds the title

    let bookDescription = document.createElement("p");
    bookDescription.textContent = `This book was released on ${b.releaseDate} and costs $ ${b.price}`;
    bookDiv.appendChild(bookDescription);

    //add bookDiv to the webpage
    let bookListDisplay = document.querySelector("#book-display");//references book-display in the HTML
    bookListDisplay.appendChild(bookDiv); //adds the newly created book 
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