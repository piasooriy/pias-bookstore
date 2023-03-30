import { sanity } from "../sanity.js";

export default async function authorList(){
	const query = `*[_type == 'author']{
		"name": {
			firstName, 
			lastName,  
			  },
		  dateOfBirth, 
		  dateOfPassing, 
		  description, 
		  "altText": image.alt,  
		  "Picture": image.asset->url,
		}`;

		const authors = await sanity.fetch(query);

		 function createAuthorListContainerDOM(){
			const authorListContainer = document.createElement('div');
			authorListContainer.className = 'author-list';


			for (const author of authors) {
				const authorCard = document.createElement('div');
				const authorbox = document.createElement('figure');
				const authorImage = document.createElement('img');
				const authorDescription = document.createElement('div');
				const authorBirthDate = document.createElement('div');
				const authorPassingDate = document.createElement('div');
				const authorName = document.createElement('figcaption');
				
				authorListContainer.appendChild(authorCard);
				authorListContainer.appendChild(authorbox);
				authorCard.appendChild(authorDescription);
				authorCard.appendChild(authorBirthDate);
				authorCard.appendChild(authorPassingDate);
				authorbox.appendChild(authorName);
				authorbox.appendChild(authorImage);


				authorCard.className = 'author__card';
				authorbox.classname = 'author__cover-box';

				authorImage.className = 'author__picture';
				authorImage.src = author.Picture;

				authorDescription.className = 'author__description';
				authorDescription.innerText = author.description;

				authorBirthDate.className = 'author__irth-date';
				authorBirthDate.innerText = author.dateOfBirth;

				authorPassingDate.className = 'author__passing-date';
				authorPassingDate.innerText = author.dateOfPassing;
			}

			

			return authorListContainer;
		}

		function renderHTML(){
			const authorListContainer = createAuthorListContainerDOM();
			document.body.appendChild(authorListContainer);
		}
		renderHTML();
}