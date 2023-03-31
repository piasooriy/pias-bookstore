import { sanity } from "../sanity.js";

export default async function CategoryFilter(){
	const query = `
		*[_type == 'book']{  
			title,
			"category": category->name, 
	}`;
		

	const categories = await sanity.fetch(query);

	function createCategoryElementDOM(){
		return bookCategoryContainer;
	}

	function renderHTML(){
		const bookCategoryContainer = createCategoryElementDOM();
		document.body.appendChild(bookCategoryContainer);
	}	

	renderHTML();

	let currentFilter = null;
	let filteredCategories = returnFilteredCategories();

	const bookCategoryContainer = document.createElement('select');	
	bookCategoryContainer.className = 'book__category-container';

	const bookCategory = document.createElement('option');
	bookCategory.className = 'book__category';
	bookCategory.innerHTML = book.category;

	bookCategoryContainer.appendChild(bookCategory);

}
