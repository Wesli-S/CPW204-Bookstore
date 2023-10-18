class Book {
}
let myBook = new Book();
myBook.isbn = "34567810";
myBook.price = 16.99;
myBook.title = "FaeFolk";
myBook.releaseDate = new Date(2023, 9, 17);
console.log(myBook);
window.onload = function () {
    let addBookBtn = document.querySelector("#add-book");
    addBookBtn.onclick = processBook;
};
function processBook() {
    let userBook = getBook();
    if (userBook != null) {
        addBook(userBook);
    }
}
function getBook() {
}
function addBook(b) {
}
