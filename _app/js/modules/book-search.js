import {sanity} from '../sanity.js';

export default async function SearchList() {
	let bookSearchText = '';
	let bookResults = [];

	const bookListInput = document.querySelector('.book-list__input');
	const bookListResults = document.querySelector('.book-list__results');
	const bookListSearchButton = document.querySelector('.book-list__search-button');
	const bookListEmptySearchButton = document.querySelector('.book-list__empty-search');

	bookListSearchButton.addEventListener('click', handleSearchButtonClick);
	bookListInput.addEventListener('keyup', handleSearchInputKeyup);

	bookListEmptySearchButton.addEventListener('click', handleEmptySearchButtonClick);

	// Click or 'enter' to search
	function handleSearchButtonClick() {
		setBookSearchText(bookListInput);
		fetchBooks();
	}

	function handleSearchInputKeyup(event) {
		if (event.key === 'Enter') {
			setBookSearchText(event.target);
			fetchBooks();
		}
	}

	// Click to empty search-field
	function handleEmptySearchButtonClick() {
		bookListInput.value = '';
		setBookSearchText = '';
	}


	function setBookSearchText(input) {
		bookSearchText = input.value;
	}

	async function fetchBooks() {
		const query = `*[_type == 'book' && title match $bookTitle + '*'] {
			title,
			"bookCover": cover.asset->url,
			"bookAlt": cover.alt,
			"author": author->{firstName, lastName},
			price,
		}`;

		const params = {
			bookTitle: bookSearchText
		}

		bookResults = await sanity.fetch(query, params);
		console.log(bookResults);

		renderHTML();
	}

	function createBookListContainerDOM() {
		console.log(bookResults);
		const bookListContainer = document.createElement('div');
		
		bookListContainer.className = 'book-list__container';

		for (const book of bookResults) {
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
			bookCover.src = book.bookCover;

			bookTitle.className= 'book-title';
			bookTitle.innerText = book.title;

			authorName.className= 'author__name';
			authorName.innerText = book.author;

			bookPrice.className= 'book__price';
			bookPrice.innerText = book.price;
		}

		return bookListContainer;
	}

	function renderHTML() {
		const bookListContainer = createBookListContainerDOM();
		bookListResults.innerHTML = '';
		bookListResults.appendChild(bookListContainer);
	}
}
