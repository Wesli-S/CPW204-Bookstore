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
    
}

/**
 * Adds a Book object to storage. Assumes all data is valid
 * @param b The Book containing valid data to be added
 */
function addBook (b:Book): void {

}