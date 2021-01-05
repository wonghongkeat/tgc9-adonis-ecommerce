# Walkthrough

## BookController

1. Create a new book controller
   `adonis make:controller BookController`

2. Add a route that refers to the `index` function inside `BookController`
   
   **route.js**
   ```
   Route.get('books/', 'BookController.index')
   ```

3. Create a view file for `BookController.index`:
   `adonis make:view books/index`(see the actual content at `resources/views/books/index.edge`)

4. Create a sample DB:
   ```
    const booksDB = [
    {
        'id': 1,
        'title': 'Lord of the Rings',
        'condition': 3
    },
    {
        'id': 2,
        'title': 'A Wizard in Rhyme',
        'condition': 2
    },
    {
        'id': 3,
        'title': 'Waylander',
        'condition': 2.5
    }

    ]
    ```

5. Add in code to pass the books to the view to the BookController class
   ```
   index({view}) {
        return view.render('books/index', {
        "books": booksDB
        })
   }
  ```

6. Add in the route to refer to a specific book by its id:
  `Route.get('books/:book_id', 'BookController.show').as('show_book')`

7. Add in the view function to show a book by its id
   ```
   show({view, params}) {
    // extract out the book_id parameter from the URL
    let bookId = params.book_id;
    let book = booksDB.find( b => b.id === parseInt(bookId));
    return view.render("books/show", {
      "book": book
    })
  }
  ```

  