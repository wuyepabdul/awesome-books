/* eslint-disable max-classes-per-file */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
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

  static removeBook(bookTitle) {
    const books = Storage.getBooks();
    books.forEach((book, index) => {
      if (book.title === bookTitle) {
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
      <li> <button id="${book.id}" class="removeBtn" > Remove </button></li>`;
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

  if (title.length < 1) {
    document.querySelector('.alert.title').textContent =
      'Title cannot be empty';
    return;
  }

  if (author.length < 1) {
    document.querySelector('.alert.author').textContent =
      'Author cannot be empty';
    return;
  }

  const book = new Book(title, author);
  UI.addBookToList(book);
  Storage.addBook(book);
  UI.clearFields();
});

document.querySelector('.listOfBooks').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  Storage.removeBook(
    e.target.parentElement.previousElementSibling.textContent
      .toString()
      .trim()
  );
});
