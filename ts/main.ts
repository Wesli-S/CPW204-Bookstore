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

let myBook = new Book();
myBook.isbn = "34567810";
myBook.price = 16.99;
myBook.title = "FaeFolk"
myBook.releaseDate = new Date(2023, 9, 17); //months start at index 0
console.log(myBook);

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
    //get all inputs
    let isbnTextBox = document.querySelector("#isbn") as HTMLInputElement;
    let titleTextBox = document.querySelector("#title") as HTMLInputElement;
    let priceTextBox = document.querySelector("#price") as HTMLInputElement;
    let releaseDateTextBox = document.querySelector("#release-date") as HTMLInputElement;

    //validate data
    let isValidData = true;

    //validate isbn
    let isbn:string = isbnTextBox.value;
    if(!isValidIsbn(isbn)) {
        isValidData = false;
        isbnTextBox.nextElementSibling.textContent = "ISBN must be 13 digits only";
    }
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

}