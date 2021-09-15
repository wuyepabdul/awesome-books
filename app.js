let bookData = { id: '', title: '', author: '' };
let listOfBooks = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UI {
  static displayBooks() {
    const storedBooks = Storage.getBooks();
    storedBooks.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const listDiv = document.querySelector('.listOfBooks');
    const ul = document.createElement('ul');
    ul.innerHTML = ` 
        <li> ${book.title} </li>
        <li> ${book.author} </li>
        <li> <button id="${book.id}" class="removeBtn" > Remove </button></li>`;
    listDiv.appendChild(ul);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }

  static deleteBook(element) {
    if (element.classList.contains('removeBtn')) {
      element.parentElement.parentElement.remove();
    }
  }
}

class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem('listOfBooks') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('listOfBooks'));
    }
    return books;
  }

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    listOfBooks = books;
    localStorage.setItem('listOfBooks', JSON.stringify(books));
  }

  static removeBook(bookTitle) {
    const books = Storage.getBooks();
    books.forEach((book, index) => {

      if (book.title === bookTitle) {
        console.log('is it true?' + (book.title === bookTitle));
        console.log('lenght book.title ' + book.title.length + ' lenght bookTitle' + bookTitle.length);
        books.splice(index, 1);
      }
    });
    listOfBooks = books;
    localStorage.setItem('listOfBooks', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('.addBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const book = new Book(title, author);
  UI.addBookToList(book);
  Storage.addBook(book);
  UI.clearFields();
});

document.querySelector('.listOfBooks').addEventListener('click', (e) => {
  //console.log(e.target);
  UI.deleteBook(e.target);
  Storage.removeBook(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent.toString().trim()
  );
  // console.log(e.target.parentElement.previousElementSibling.previousElementSibling
  //   .textContent.toString().trim());
});
