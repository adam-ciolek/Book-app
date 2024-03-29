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

  class Books {
    constructor() {

      this.getElements();
      this.render();
      this.favoriteBooks = [];
      this.filtersArr = [];
      this.initActions();
    }


    getElements() {
      this.bookProduct = document.querySelector(select.templateOf.bookProduct);
      this.bookList = document.querySelector(select.containerOf.bookList);
      this.filters = document.querySelector(select.filtersBooks.filters);
      // this.booksList = document.querySelectorAll(select.booksList.bookImage);
    }

    render() {

      for (let book of dataSource.books) {

        const ratingBgc = this.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;

        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;

        const generatedHTML = template(book);
        // console.log(generatedHTML);
        const generateDom = utils.createDOMFromHTML(generatedHTML);
        // console.log(generateDom);
        this.bookList.appendChild(generateDom);

      }


    }

    initActions() {

      this.booksList = document.querySelectorAll(select.booksList.bookImage);
      const that = this;
      for (let img of this.booksList) {
        img.addEventListener('dblclick', function (e) {
          e.preventDefault();

          const idImg = img.getAttribute('data-id');

          if (e.target.offsetParent.classList.contains(links.favoriteImg)) {
            // const idImg = img.getAttribute('data-id');
            img.classList.remove(links.favoriteImg);

            const indexOf = that.favoriteBooks.indexOf(idImg);

            that.favoriteBooks.splice(indexOf, 1);

            // console.log(favoriteBooks);

          } else if (!(that.favoriteBooks === [])) {
            img.classList.add(links.favoriteImg);

            console.log(idImg);

            console.log(that);
            that.favoriteBooks.push(idImg);
            // console.log(this.favoriteBooks);
          }
        });
      }

      this.filters.addEventListener('click', function (e) {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox' && e.target.name === 'filter') {

          if (e.target.checked) {
            that.filtersArr.push(e.target.value);

          } else if (!e.target.checked) {
            const indexOf = that.filtersArr.indexOf(e.target.value);
            that.filtersArr.splice(indexOf, 1);

          }

        }
        that.filterBooks();
      });
    }

    filterBooks() {

      for (let element of dataSource.books) {
        let shouldBeHidden = false;


        for (let filter of this.filtersArr) {

          if (element.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const id = element.id;
        const selectedImg = document.querySelector('.book__image[data-id="' + id + '"]');

        if (shouldBeHidden) {
          selectedImg.classList.add('hidden');
        } else {
          selectedImg.classList.remove('hidden');
        }
      }

    }

    determineRatingBgc(rating) {

      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }

  }



  const newBook = new Books();
  console.log(newBook);

}
