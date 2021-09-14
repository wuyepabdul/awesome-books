const addBtn = document.querySelector('.addBtn');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const listDiv = document.querySelector('.listOfBooks');

let bookData = new Object();

let listOfBooks = [];
window.addEventListener('load', () => {
  if (localStorage.getItem('listOfBooks') === null) {
    localStorage.setItem('listOfBooks', JSON.stringify(listOfBooks));
    console.log('null');
  } else {
    console.log('books present');
  }
});

addBtn.onclick = (e) => {
  // e.preventDefault();
  let getLocalStorage = JSON.parse(localStorage.getItem('listOfBooks'));
  if (getLocalStorage !== null) {
    listOfBooks = [...getLocalStorage];
    //bookData.id = Math.floor(Math.random() * 10000);
    bookData.id = listOfBooks.length;
    bookData.title = titleInput.value;
    bookData.author = authorInput.value;
  }
  listOfBooks.push(bookData);
  localStorage.setItem('listOfBooks', JSON.stringify(listOfBooks));
};

function displayBooks() {
  const tempListofBooks = JSON.parse(localStorage.getItem('listOfBooks'));
  tempListofBooks.forEach((book) => {
    console.log(book);
    const bookItem = document.createElement('ul');
    bookItem.innerHTML = `
     <li> ${book.title} </li>
     <li> ${book.author} </li>
     <li> <button id="${book.id}" class="removeBtn"> Remove </button></li> `;
    //return bookItem;
    listDiv.appendChild(bookItem);
  });
}

const removeBtns = document.querySelectorAll('.removeBtn');

function deleteBook() {
  console.log('clicked');
}

removeBtns.forEach((btn) => {
  btn.onclick=(e)=>{
    console.log('clc')
  }
});

displayBooks();
/* 
removeEventListener.onclick = () => {
  let getLocalStorage = JSON.parse(localStorage.getItem('listOfBooks'));
  if (getLocalStorage !== null) {
  }
}; */
