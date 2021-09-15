const addBtn = document.querySelector('.addBtn');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const listDiv = document.querySelector('.listOfBooks');

let bookData = { id: '', title: '', author: '' };
let listOfBooks = [];

function onAdd(e) {
  if (localStorage.getItem('listOfBooks') === null) {
    listOfBooks.push({ title: titleInput.value, author: authorInput.value });
    localStorage.setItem('listOfBooks', JSON.stringify(listOfBooks));
    console.log(listOfBooks);
  } else {
    listOfBooks = [...JSON.parse(localStorage.getItem('listOfBooks'))];
    listOfBooks.push({ title: titleInput.value, author: authorInput.value });
    localStorage.setItem('listOfBooks', JSON.stringify(listOfBooks));
    console.log(listOfBooks);
  }
}
addBtn.addEventListener('click', onAdd);

let html = '';
function generateHtml() {
  if (localStorage.getItem('listOfBooks') !== null) {
    let booksInStorage = [...JSON.parse(localStorage.getItem('listOfBooks'))];
    booksInStorage.forEach((book, index) => {
      html += `
       <ul>
       <li> ${book.title} </li>
       <li> ${book.author} </li>
       <li> <button id="${book.id}" class="removeBtn" onclick="deleteBook(${index})"> Remove </button></li>
       </ul>
       `;
    });

    listDiv.innerHTML = html;
  } else {
    console.log('storage is null');
    localStorage.setItem('listOfBooks', JSON.stringify(listOfBooks));
  }
}
generateHtml();

function deleteBook(index) {
  console.log('clicked');
  listOfBooks = [...JSON.parse(localStorage.getItem('listOfBooks'))];
  listOfBooks.splice(index, 1);
  localStorage.setItem('listOfBooks', JSON.stringify(listOfBooks));
  window.location.reload();
}

