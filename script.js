let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


myLibrary.push(new Book('The Book of Eli', 'Denzel Washington', 3, true));
myLibrary.push(new Book('Harry Potter', 'Joanne Rowling', 300, false));

function addBookToLibrary() {

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
    
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook) 
 }


const addBookButton = document.querySelector('.addBookButton');
addBookButton.addEventListener('click', toggleForm);

const deleteForm = document.querySelector('.deleteForm');
deleteForm.addEventListener('click', toggleForm);

const form = document.querySelector('form');

function toggleForm() {
  if (form.style.display === 'flex') {
    form.style.display = 'none';
    form.reset();
  } else {
    form.style.display = 'flex'
  }
}

form.addEventListener('submit', (e) => {
  addBookToLibrary();
  e.preventDefault();
  displayNewBook();
  toggleForm();
});

const main = document.querySelector('main');

function displayLibrary() {
  for (let i = 0; i < myLibrary.length; i++) {
    let book = createBookElelment(i, myLibrary[i]);
    main.appendChild(book);  
  }
}

displayLibrary();  

function displayNewBook() {
  let i = myLibrary.length - 1;
  const book = createBookElelment(i, myLibrary[i]);
  main.appendChild(book);
}

function createBookElelment(i, bookInfo) {
  
  const book = document.createElement('div');
  book.classList.add('book');
  
  const deleteButton = document.createElement('img');
  deleteButton.setAttribute('src', './images/cross.svg');
  book.appendChild(deleteButton);
  deleteButton.addEventListener('click', (e) => {
    e.target.parentElement.remove();
    deleteBook(i);
  })

  const title = document.createElement('div');
  title.innerText = bookInfo.title;
  book.appendChild(title);

  const author = document.createElement('div');
  author.innerText = 'By ' + bookInfo.author;
  book.appendChild(author);

  const pages = document.createElement('div');
  pages.innerText = 'Pages: ' + bookInfo.pages;
  book.appendChild(pages);

  const read = document.createElement('div');
  if (bookInfo.read) {
    read.innerText = 'Read';
    read.classList.add('yesRead');
  } else {
    read.innerText = 'Not Read';
    read.classList.add('notRead');
  }
  book.appendChild(read);
  read.addEventListener('click', () => {
    toggleRead(read, bookInfo)
  });
  return book;
}

function deleteBook(i) {
  myLibrary.splice(i, 1);
  console.log(myLibrary);
}

function toggleRead(read, book) {
  if (book.read) {
    book.read = false;
    read.className = 'notRead';
    read.innerText = 'Not Read';
  } else {
    book.read = true;
    read.className = 'yesRead';
    read.innerText = 'Read';
  }
}

