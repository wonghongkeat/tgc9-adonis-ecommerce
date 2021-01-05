'use strict'

const authorsDB = [
  {
    "id": 1,
    "name": "JRR Tolkien"
  },
  {
    "id": 2,
    "name": "CS Lewis"
  },
  {
    "id": 3,
    "name": "Goh Sin Tub"
  },
  {
    "id": 4,
    "name": "Catherine Lee"
  }

]

class AuthorController {
  index({ view }) {
    return view.render('authors/index', {
      'authors': authorsDB
    })
  }

  show({ params, view }) {
    let author = authorsDB.find(a => a.id === parseInt(params.author_id))
    return view.render('authors/show',{
      "author": author
    })
  }
}

module.exports = AuthorController
