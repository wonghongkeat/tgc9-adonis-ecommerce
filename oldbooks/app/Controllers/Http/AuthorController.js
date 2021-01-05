'use strict'

const Author= use('App/Models/Author')

class AuthorController {
  async index({ view }) {
    let allAuthors = await Author.all()
    return view.render('authors/index', {
      'authors': allAuthors.toJSON()
    })
  }

  async show({ params, view }) {
    let author = await Author.find(params.author_id)
    return view.render('authors/show',{
      "author": author.toJSON()
    })
  }
}

module.exports = AuthorController
