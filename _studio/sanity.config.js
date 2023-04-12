import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import schemas from './schemas/schemas.js';
import information from './structure/information.js';
import book from './structure/book.js';


export default {
	title: 'Studio',

	projectId: '844qaqtv',
	dataset: 'production',

	plugins: [
		deskTool({
			title: 'Book', 
			name: 'book', 
			structure: book
		}), 

		deskTool({
			title: 'About Us',
			name: 'aboutUs',
			structure: information
		}),

		visionTool()
	],

	schema: {
		types: schemas,
	},
};
