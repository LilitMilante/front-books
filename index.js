let bookList = document.querySelector("#book_list")
let btn = document.querySelector("#btn")

function insertBook(book) {
    bookList.insertAdjacentHTML("beforeend", `
            <article class="book_list_item">
                <h3>${book.title}</h3>
                <span>${book.author.firstname} ${book.author.lastname}</span>
            </article>
            `)
}

function getBooks() {
    fetch("http://localhost:8080/books")
        .then((data)=> data.json())
        .then((data) => {
           data.forEach((elm) => {
               insertBook(elm)
           })
        })
}

function createBook() {
    let bookTitle = document.querySelector("#book_title").value
    let authorFn = document.querySelector("#author_fn").value
    let authorLn = document.querySelector("#author_ln").value

    let body = {
        title: bookTitle,
        author: {
            firstname: authorFn,
            lastname: authorLn
        }
    }

    let jBody = JSON.stringify(body)

    fetch("http://localhost:8080/books", {
        method: "POST",
        headers: {
            "Accept": "application/json"
        },
        body: jBody
    })
        .then((data) => data.json())
        .then((data) => {
            console.log("ok", data)
            insertBook(data)
    })
        .catch((err) => {
            console.log("Err:", err)
        })
}

btn.addEventListener("click", createBook)

getBooks()