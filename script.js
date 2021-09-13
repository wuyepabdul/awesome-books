const addBtn = document.querySelector('.addBtn');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');

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

addBtn.onclick = () => {
  let getLocalStorage = JSON.parse(localStorage.getItem('listOfBooks'));
  if (getLocalStorage !== null) {
    listOfBooks = [...getLocalStorage];
    bookData.id = Math.floor(Math.random() * 10000);
    bookData.title = titleInput.value;
    bookData.author = authorInput.value;
  }
  listOfBooks.push(bookData);
  localStorage.setItem('listOfBooks', JSON.stringify(listOfBooks));
};
/* 
removeEventListener.onclick = () => {
  let getLocalStorage = JSON.parse(localStorage.getItem('listOfBooks'));
  if (getLocalStorage !== null) {
  }
}; */
