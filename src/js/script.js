{
  'use strict';


  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    booksList: {
      bookImage: '.book__image',
    },
    filtersBooks: {
      filters: '.filters',
    }
  };

  const links = {
    favoriteImg: 'favorite'
  };
  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  // const favoriteBooks = [];
  // const filtersBooks = [];


  class Books {
    constructor() {

      this.getElements();
      this.render();
      this.initActions();
    }


    getElements() {
      this.bookProduct = document.querySelector(select.templateOf.bookProduct);
      this.bookList = document.querySelector(select.containerOf.bookList);
      this.filters = document.querySelector(select.filtersBooks.filters);
      // this.booksList = document.querySelectorAll(select.booksList.bookImage);
      this.filtersArr = [];
      this.favoriteBooks = [];
    }

    render() {

      for (let book of dataSource.books) {

        const generatedHTML = template(book);
        // console.log(generatedHTML);
        const generateDom = utils.createDOMFromHTML(generatedHTML);
        // console.log(generateDom);
        this.bookList.appendChild(generateDom);

      }


    }

    initActions() {
      // const favoriteBooks = [];
      // const filters = [];

      this.booksList = document.querySelectorAll(select.booksList.bookImage);
      for (let img of this.booksList) {
        img.addEventListener('dblclick', function (e) {
          e.preventDefault();
          const idImg = img.getAttribute('data-id');

          // if (favoriteBooks.includes(idImg)) {
          //   img.classList.remove('favorite');
          //   const idImg = img.getAttribute('data-id');
          //   const indexOf = favoriteBooks.indexOf(idImg);
          //   favoriteBooks.splice(indexOf, 1);
          // } else if (!(favoriteBooks === [])) {
          //   img.classList.add('favorite');
          //   console.log(idImg);
          //   favoriteBooks.push(idImg);
          //   console.log(favoriteBooks);
          // }

          if (e.target.offsetParent.classList.contains(links.favoriteImg)) {
            // const idImg = img.getAttribute('data-id');
            img.classList.remove(links.favoriteImg);

            const indexOf = this.favoriteBooks.indexOf(idImg);

            this.favoriteBooks.splice(indexOf, 1);

            console.log(favoriteBooks);

          } else if (!(this.favoriteBooks === [])) {
            img.classList.add(links.favoriteImg);

            console.log(idImg);

            this.favoriteBooks.push(idImg);

            console.log(this.favoriteBooks);
          }
        });
      }

      this.filters.addEventListener('click', function (e) {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox' && e.target.name === 'filter') {
          // console.log(e.target.value);
        }

        if (e.target.checked) {
          this.filtersArr.push(e.target.value);
          console.log(this.filtersArr);

        } else if (!e.target.checked) {
          const indexOf = this.filtersArr.indexOf(e.target.value);
          this.filtersArr.splice(indexOf, 1);
          console.log(this.filtersArr);
        }

      });
      this.filterBooks();
    }

    filterBooks() {

      for (let element of dataSource.books) {

        let shouldBeHidden = false;

        for (let filter of this.filtersArr) {
          if (element.details[filter]);
          shouldBeHidden = true;
          break;
        }
        const bookId = element.id;
        const selectedImg = document.querySelector('.book__image[data-id="' + bookId + '"]');


        if (shouldBeHidden === true) {
          selectedImg.classList.add('hidden');
        }
        else {
          selectedImg.classList.remove('hidden');
        }
      }
    }
  }



  const newBook = new Books();
  console.log(newBook);

}
