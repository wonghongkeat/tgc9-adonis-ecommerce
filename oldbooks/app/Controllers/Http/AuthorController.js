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

  create({view}) {
    return view.render('authors/create')
  }

  async processCreate({request, response}) {
    // step 1: extract the user's response from the form
    let body = request.post();
    // step 2: fill in a new instance of the author entity
    let newAuthor = new Author();
    newAuthor.first_name = body.first_name;
    newAuthor.last_name = body.last_name;
    newAuthor.dob = body.dob;
    // step 3: save
    await newAuthor.save();
    response.route('show_all_authors')
  }
}

module.exports = AuthorController
