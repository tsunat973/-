let books = [];

const savedBooks = localStorage.getItem('books');

if (savedBooks) {
    books = JSON.parse(savedBooks);
}


const clearBtn = document.querySelector('#clearBtn');
const homeBtn = document.querySelector('#homeBtn');
const addBtn = document.querySelector('#addBtn');
const listBtn = document.querySelector('#listBtn');

const homePage = document.querySelector('#homePage');
const addPage = document.querySelector('#addPage');
const listPage = document.querySelector('#listPage');

const tabs = document.querySelectorAll('.tab');

const taskContainer = document.querySelector('#taskContainer');
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
    renderTodayTasks();

    //　←ここでフォームを空にする
    bookForm.requestFullscreen();
    console.log(books);

})

//一覧表示機能

function renderBooks() {
    bookList.innerHTML = '';

    books.forEach((book, index) => {

        const div = document.createElement('div');

        div.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.currentPage} / ${book.totalPages}</p>
            <p>${book.deadline}</p>
            <button class="deleteBtn">削除</button>
        `;

        const deleteBtn = div.querySelector('.deleteBtn');

        deleteBtn.addEventListener('click', () => {

            books.splice(index, 1);

            localStorage.setItem('books', JSON.stringify(books));

            renderBooks();
            renderTodayTasks();

        });

        bookList.append(div);

    });
}



function renderTodayTasks() {
    taskContainer.innerHTML = '';

    books.forEach(book => {
        const today = new Date();
        const deadline = new Date(book.deadline);

        const diffTime = deadline - today;
        const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const remainingPages = book.totalPages - book.currentPage;
        const pagesPerDay = Math.ceil(remainingPages / remainingDays);

        const startPage = book.currentPage + 1;
        const endPage = book.currentPage + pagesPerDay;

        const div = document.createElement('div');

        div.innerHTML = `
            <h3>${book.title}</h3>
            <p>今日やる範囲：${startPage}〜${endPage}ページ</p>
            <p>期限まであと${remainingDays}日</p>
        `;

        taskContainer.append(div);
    })
}



clearBtn.addEventListener('click', () => {

    const result = confirm('本当に全削除しますか？');

    if(result){

        books = [];

        localStorage.removeItem('books');

        renderBooks();
        renderTodayTasks();

    }

});





renderBooks();
renderTodayTasks();