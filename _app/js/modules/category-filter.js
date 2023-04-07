import { sanity } from "../sanity.js";

export default async function CategoryFilter(){
  let books = [];

  const categorySelect = document.querySelector('.category__filter-select');
  const bookListResults = document.querySelector('.book-list__results');
  
  
  // Fetch categories
  const categoriesQuery = `*[_type == 'category']{
	 name 
	}`;
  const categories = await sanity.fetch(categoriesQuery);

  // Make options
  const allCategoriesOption = document.createElement('option');
  allCategoriesOption.value = 'all';
  allCategoriesOption.innerText = 'All';
  categorySelect.appendChild(allCategoriesOption);
  
  /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values  */
  for (const category of categories) {
    const categoryOption = document.createElement('option');
    categoryOption.value = category.name;
    categoryOption.innerText = category.name;
    categorySelect.appendChild(categoryOption);
  }

  // Fetch all books 
  
  const booksQuery = `*[_type == "book"]{  
    title,
    cover,
    author->{firstName, lastName},
    price,
    "categories": categories[]->name
  }`;
  books = await sanity.fetch(booksQuery);
 
  // Eventlistener to choose categories
  categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    const filteredBooks = filterBooksByCategory(books, selectedCategory);
    const filteredBookListContainer = createBookListContainerDOM(filteredBooks);
    renderHTML(filteredBookListContainer);
  });

  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter*/

  /* making filterBooks */ 
  function filterBooksByCategory(books, selectedCategory) {
	if (selectedCategory === 'all') {
	  return books;
	} else {
	return books.filter(book => book.categories && book.categories.includes(selectedCategory))}
 	};

  /* making filteredBookListContainer */
  function createBookListContainerDOM(books) {
   
    const bookListContainer = document.createElement('div');

	  bookListContainer.className='book-list';

    for (const book of books) {
      const bookCard = document.createElement('div');
      const bookCoverBox = document.createElement('figure')
      const bookTitle = document.createElement('figcaption');
      const bookCover = document.createElement('img');
      const authorName = document.createElement('div');
      const bookPrice = document.createElement('div');

      bookListContainer.appendChild(bookCoverBox);
			bookListContainer.appendChild(bookCard);
			bookCoverBox.appendChild(bookCover);
			bookCoverBox.appendChild(bookTitle);
			bookCard.appendChild(authorName);
			bookCard.appendChild(bookPrice);

      
      bookCard.className= 'book__card';
      bookCoverBox.className= 'book__cover-box';

      bookCover.className= 'book-cover';
      bookCover.src = book.cover.asset.url;
      bookCover.alt = book.cover.alt;

      bookTitle.className= 'book-title';
      bookTitle.innerText = book.title;

      authorName.className= 'author__name';
      authorName.innerText = `${book.author.firstName} ${book.author.lastName}`;

      bookPrice.className= 'book__price';
      bookPrice.innerText = book.price;
	}
	

    return bookListContainer;

	}
	

  function renderHTML(filteredBookListContainer) {
	bookListResults.innerHTML = '';
	bookListResults.appendChild(filteredBookListContainer);
  
}

  renderHTML();
}
