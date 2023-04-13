import { sanity } from '../sanity.js';

export default async function bookList () {
	const query = `*[_type == 'book']{
		title,
		"bookCover": cover.asset->url,
		"bookAlt": cover.alt,
		"author": author->{firstName, lastName},
		price,
	}`;

	// Fetch books from the sanity database using query
	const books = await sanity.fetch(query);

	// Create the DOM elements to display the data
	function createBookListContainerDOM() {

		// Create the container element and its children
		const bookListContainer = document.createElement('div');
			bookListContainer.className = 'book-list';

		const searchContainer = document.createElement('div');
			searchContainer.className = 'book-list__search';

		// Create an input-element for the search-bar and set the attributes
		const searchInput = document.createElement('input');
			searchInput.className = 'book-list__search-input';
			searchInput.id = 'search';
			searchInput.type = 'text';
			searchInput.name = 'search';
			searchInput.placeholder = 'Search by title or author';
			searchInput.autocomplete = 'on';

		// Create the buttons in the search-bar
		const searchButton = document.createElement('button');
			searchButton.className = 'book-list__search-button';
			searchButton.innerText = 'Search';

		const emptySearchButton = document.createElement('button');
			emptySearchButton.className = 'book-list__empty-search-button';
			emptySearchButton.innerText = 'Clear';

		searchContainer.appendChild(searchInput);
		searchContainer.appendChild(emptySearchButton);
		searchContainer.appendChild(searchButton);

		// Add the search-bar to the bookListContainer
		bookListContainer.appendChild(searchContainer);

		// Create the container for the search-results
		const bookResultsContainer = document.createElement('div');
			bookResultsContainer.className = 'book-list__results';
			bookListContainer.appendChild(bookResultsContainer);


		// Update the book-results based on the search-query
		function updateBookList(searchQuery) {
			// Clear the previous search-result
			bookResultsContainer.innerHTML = '';


			// Get the filtered books based on the search-query
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

			// Display the search-results
			// If there are no filtered books, add a message to the book-results
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
						// Use the bookTitle as book.alt if bookAlt is not to be found
						bookCover.alt = book.bookAlt || book.title; 
			
						bookTitle.className= 'book-title';
						bookTitle.innerText = book.title;
			
						authorName.className= 'author__name';
						authorName.innerText = `
							${book.author && book.author.firstName } ${book.author && book.author.lastName }
							` ;
							
						bookPrice.className= 'book__price';
						bookPrice.innerText = `NOK ${book.price}`;

				}
			}
		}

		// Debounce-function to limit the amount of times the method can be called
		// https://www.freecodecamp.org/news/javascript-debounce-example/
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


	// This function renders/updats the needed HTML DOM elements
	function renderHTML (){
		const bookListContainer = createBookListContainerDOM();
		document.body.appendChild(bookListContainer);
	}

	renderHTML();
}
