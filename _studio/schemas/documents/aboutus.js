import { Preview } from "sanity";

export default {
	title: 'About Us', 
	name: 'aboutUs', 
	type: 'document', 
	fields: [
		{
			title: 'History', 
			name: 'history', 
			type: 'string'
		}, 
		{
			title: 'Location', 
			name: 'location', 
			type: 'string',
		},
		
		{
			title: 'Opening Hours', 
			name: 'openingHours', 
			type: 'string', 
		}
	],

	preview: {
		prepare: () => {
			return{
				title: 'About Us'
			}
		}
	}
}