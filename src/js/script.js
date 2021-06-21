{
  'use strict'


  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      bookList: '.book-list',
    }
  }


  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  // const booksList = document.querySelector('.book-list');


  class Books {
    constructor() {

      this.getElements();
      this.render();
    }


    getElements() {
      this.bookProduct = document.querySelector(select.templateOf.bookProduct);
      this.bookList = document.querySelector(select.containerOf.bookList);
    }

    render() {

      for (let book of dataSource.books) {

        const generatedHTML = template(book);
        // console.log(generatedHTML);
        const generateDom = utils.createDOMFromHTML(generatedHTML);

        this.bookList.appendChild(generateDom);

      }


    }

  }

  const book = new Books();

}

