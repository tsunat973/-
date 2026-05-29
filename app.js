let books = [];

const savedBooks = localStorage.getItem('books');

if (savedBooks) {
    books = JSON.parse(savedBooks);
}



const homeBtn = document.querySelector('#homeBtn');
const addBtn = document.querySelector('#addBtn');
const listBtn = document.querySelector('#listBtn');

const homePage = document.querySelector('#homePage');
const addPage = document.querySelector('#addPage');
const listPage = document.querySelector('#listPage');

const tabs = document.querySelectorAll('.tab');
//タブ切り替え
function showPage(page) {
    homePage.classList.add('hidden');
    addPage.classList.add('hidden');
    listPage.classList.add('hidden');

    page.classList.remove('hidden');
}

//active切り替え
function activeTab(button) {

    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    button.classList.add('active');
}

//ホーム
homeBtn.addEventListener('click', () => {
    showPage(homePage);
    activeTab(homeBtn);
})

//教材追加
addBtn.addEventListener('click', () => {
    showPage(addPage);
    activeTab(addBtn);
})

//一覧

listBtn.addEventListener('click', () => {
    showPage(listPage);
    activeTab(listBtn);
})


const bookForm = document.querySelector('#bookForm');

const titleInput = document.querySelector('#title');
const totalPagesInput = document.querySelector('#totalPages');
const currentPageInput = document.querySelector('#currentPage');
const deadlineInput = document.querySelector('#deadline');

const bookList = document.querySelector('#bookList');

//保存用配列



//フォーム送信イベント

bookForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const book = {

        title: titleInput.value,
        totalPages: Number(totalPagesInput.value),
        currentPage: Number(currentPageInput.value),
        deadline: deadlineInput.value

    };

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
    console.log(books);

})

//一覧表示機能

function renderBooks() {
    bookList.innerHTML = '';

    books.forEach(book => {

        const div = document.createElement('div');

        div.innerHTML = `
        <h3>${book.title}</h3>
        <p>${book.currentPage} / ${book.totalPages}</p>
        <p>${book.deadline}</p>
        `
        bookList.append(div);
    });
    
    bookForm.reset();
}

renderBooks();