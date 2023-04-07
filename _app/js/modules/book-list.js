import { sanity } from '../sanity.js';

export default async function bookList () {
	const query = `*[_type == 'book']{
		title,
		"bookCover": cover.asset->url,
		"bookAlt": cover.alt,
		"author": author->{firstName, lastName},
		price,
	}`;

	const books = await sanity.fetch(query);

	function createBookListContainerDOM() {
		const bookListContainer = document.createElement('div');
			bookListContainer.className = 'book-list';

		const searchContainer = document.querySelector('.book-list__search');
			searchContainer.className = 'book-list__search';

		const searchInput = document.createElement('input');
			searchInput.className = 'book-list__search-input';
			searchInput.id = 'search';
			searchInput.type = 'text';
			searchInput.name = 'search';
			searchInput.placeholder = 'Search by title or author';
			searchInput.autocomplete = 'on';

		const searchButton = document.createElement('button');
			searchButton.className = 'book-list__search-button';
			searchButton.innerText = 'Search';

		const emptySearchButton = document.createElement('button');
			emptySearchButton.className = 'book-list__empty-search-button';
			emptySearchButton.innerText = 'X';

		searchContainer.appendChild(searchInput);
		searchContainer.appendChild(searchButton);
		searchContainer.appendChild(emptySearchButton);

		const bookResultsContainer = document.createElement('div');
			bookResultsContainer.className = 'book-list__results';

		searchContainer.appendChild(bookResultsContainer);

		function updateBookList(searchQuery) {
			bookResultsContainer.innerHTML = '';

			let filteredBooks;
				if(!searchQuery) {
					filteredBooks = books;
				} else {
					filteredBooks = books.filter((book) => {
					const title = book.title.toLowerCase();
					const author = `${book.author && book.author.firstName} ${book.author && book.author.lastName}`.toLowerCase();
					const query = searchQuery.toLowerCase();
					return title.includes(query) || author.includes(query);
				});
			}
			if (filteredBooks.length === 0) {
				const noResults = document.createElement('p');
					noResults.innerText = 'No books found';
					bookResultsContainer.appendChild(noResults);
				} else { 
					for (const book of filteredBooks) {
						const bookCard = document.createElement('div');
						const bookCoverBox = document.createElement('figure')
						const bookTitle = document.createElement('figcaption');
						const bookCover = document.createElement('img');
						const authorName = document.createElement('div');
						const bookPrice = document.createElement('div');
					
						bookResultsContainer.appendChild(bookCard);

						bookCard.appendChild(bookCoverBox);
						bookCard.appendChild(authorName);
						bookCard.appendChild(bookPrice);		

						bookCoverBox.appendChild(bookCover);
						bookCoverBox.appendChild(bookTitle);
						
						bookCard.className= 'book__card';
						bookCoverBox.className= 'book__cover-box';
			
						bookCover.className= 'book-cover';
						bookCover.src = book.bookCover;
						bookCover.alt = book.bookAlt || book.title; //use the bookTitle as alt if bookAlt is not to be found
			
						bookTitle.className= 'book-title';
						bookTitle.innerText = book.title;
			
						authorName.className= 'author__name';
						authorName.innerText = `
							${ book.author && book.author.firstName } ${book.author && book.author.lastName }
							` ;
							
						bookPrice.className= 'book__price';
						bookPrice.innerText = `NOK ${book.price}`;

				}
			}
		}

		// debounce-function to limit the amount of times the method can be called
		function debounce(func, delay) {
			let timeoutId;
			return function (...args) {
				if (timeoutId) {
					clearTimeout(timeoutId);
				}
				timeoutId = setTimeout(() => {
					func.apply(null, args);
				}, delay);
			};
		}
		
		searchInput.addEventListener('input', debounce(() => {
			const searchQuery = searchInput.value.trim();
			updateBookList(searchQuery);
		}, 500));

		searchButton.addEventListener('click', () => {
			const searchQuery = searchInput.value.trim();
			updateBookList(searchQuery);
		});

		searchInput.addEventListener('keyup', (event) => {
			if (event.key === 'Enter') {
				const searchQuery = searchInput.value.trim();
				updateBookList(searchQuery);
			}
		});


		emptySearchButton.addEventListener('click', () => {
			searchInput.value = '';
			updateBookList('');
		});

		updateBookList('');

		return bookListContainer;
	}

	function renderHTML (){
		const bookListContainer = createBookListContainerDOM();
		document.body.appendChild(bookListContainer);
	}

	renderHTML();
	
}
