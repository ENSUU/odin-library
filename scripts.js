class Book { 
    constructor(title, author, pages, isRead = false) {
        this.title = title
        this.author = author 
        this.pages = pages 
        this.isRead = isRead; 
    }
    
    get bookInfo() {
        return `${this.title} by ${this.author} has ${this.pages} pages. Completed: ${this.isRead}` ; 
    }
}

class Library {
    constructor() {
        this.books = []; 
    }

    addBook(book) {
        if (!this.alreadyExists(book)) {
            this.books.push(book); 
        }
    }

    removeBook(bookTitle) {
        this.books = this.books.filter(book => book.title != bookTitle); 
    }

    getBook(bookTitle) {
        return this.books.includes(bookTitle); 
    }

    alreadyExists(book) {
        return this.books.includes(book);
    }
}

const bookshelf = document.querySelector('.bookshelf'); 
const myLibrary = new Library(); 
const myBook = new Book('A', 'Me', 123, false); 

function displayBooks() {

    bookshelf.innerHTML = ''; 

    // Creating a "card" for each book in the library.
    myLibrary.books.forEach(book => {
        const bookCard = document.createElement('div'); 
        bookCard.classList.add('card');

        const bookCardTitle = document.createElement('h1'); 
        bookCardTitle.textContent = book.title;

        const bookCardAuthor = document.createElement('h3'); 
        bookCardAuthor.textContent = book.author; 

        // Adding remove button to each book card 
        const removeBookButton = document.createElement('button'); 
        removeBookButton.textContent = 'Remove'; 

        removeBookButton.addEventListener('click', (e) => {
            e.preventDefault(); 

            myLibrary.removeBook(book.title); 
            // const index = myLibrary.indexOf(this.title); 
            // myLibrary.splice(index, 1); 
        
            displayBooks(); 
        })

        // Adding button to toggle read status
        const readStatusButton = document.createElement('button'); 
        readStatusButton.textContent = 'Not Read'; 

        readStatusButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            book.isRead = true; 
        })

        bookCard.appendChild(bookCardTitle); 
        bookCard.appendChild(bookCardAuthor); 
        bookCard.appendChild(removeBookButton); 
        bookCard.appendChild(readStatusButton);
        bookshelf.appendChild(bookCard); 
    })
}


const createButton = document.querySelector('.createBook'); 
createButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent page reload. 
    const bookTitle = document.querySelector("#title").value; 
    const bookAuthor = document.querySelector("#author").value; 
    const pageNumber = document.querySelector("#pageNumber").value; 
    // .checked is checking if user clicked the checkbox. If checked, isComplete = true. Else, isComplete = false. 
    const isComplete = document.querySelector("#isRead").checked; 

    // console.log(bookTitle, bookAuthor, pageNumber, isComplete);
    let newBook = new Book(bookTitle, bookAuthor, pageNumber, isComplete);
    
    myLibrary.addBook(newBook);  
    displayBooks();

    // .reset will clear the residual text inside the input HTML elements. 
    const addBookForm = document.querySelector('.addBookForm'); 
    addBookForm.reset(); 
})

