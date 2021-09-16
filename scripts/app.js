/* eslint-disable max-classes-per-file */

class Book {
  constructor(title, author, bookId) {
    this.title = title;
    this.author = author;
    this.bookId = bookId;
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
    localStorage.setItem('listOfBooks', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = Storage.getBooks();
    books.forEach((book, index) => {
      if (book.bookId === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('listOfBooks', JSON.stringify(books));
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
      <li> "${book.title}" by ${book.author} </li>
      <li> <button id="${book.bookId}" class="removeBtn" > Remove </button></li>`;
    listDiv.appendChild(ul);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('.alert.title').textContent = '';
    document.querySelector('.alert.author').textContent = '';
  }

  static deleteBook(element) {
    if (element.classList.contains('removeBtn')) {
      element.parentElement.parentElement.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('.addBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const bookId = Math.floor(Math.random() * 1000) + title.replace(/^\s+|\s+$/g, '');
  if (title.length < 1) {
    document.querySelector('.alert.title').textContent = 'Title cannot be empty';
    return;
  }

  if (author.length < 1) {
    document.querySelector('.alert.author').textContent = 'Author cannot be empty';
    return;
  }

  const book = new Book(title, author, bookId);
  UI.addBookToList(book);
  Storage.addBook(book);
  UI.clearFields();
});

document.querySelector('.listOfBooks').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  Storage.removeBook(e.target.id);
});

function printout (){
  console.log('hii')
}