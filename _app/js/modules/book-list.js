import { sanity } from '../sanity.js';

export default async function BookList (){
	const query = `*[_type == 'book']{
		title,
		"bookCover": cover.asset->url,
		"bookAlt": cover.alt,
		"author": author->{firstName, lastName},
		price,
		
		
	}`;



	const books = await sanity.fetch(query);

	function createBookListContainerDOM(){
		const bookListContainer = document.createElement('div');
		bookListContainer.className= 'book-list';

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
			bookCover.src = book.bookCover;
			bookCover.alt = book.bookAlt;

			bookTitle.className= 'book-title';
			bookTitle.innerText = book.title;

			authorName.className= 'author__name';
			authorName.innerText = `
				${ book.author && book.author.firstName } ${book.author && book.author.lastName }
				` ;
				
			bookPrice.className= 'book__price';
			bookPrice.innerText = book.price;
			

		}

		return bookListContainer;
	}

	function renderHTML (){
		const bookListContainer = createBookListContainerDOM();
		document.body.appendChild(bookListContainer);
	}

	renderHTML();
}