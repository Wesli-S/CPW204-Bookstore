/**
 * represents a single book that can be purchased
 */
class Book {
    isbn: String;
    title: String;
    price: number;
    releaseDate: Date;
}

//Book object test code

let myBook = new Book();
myBook.isbn = "34567810";
myBook.price = 16.99;
myBook.title = "FaeFolk"
myBook.releaseDate = new Date(2023, 9, 17); //months start at index 0
console.log(myBook);