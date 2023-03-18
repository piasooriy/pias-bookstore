export default {
	title: 'Book', 
	name: 'book',
	type: 'document', 
	fields: [
		{
			title: 'Title', 
			name: 'title', 
			type: 'string',
		},
		{
			title: 'Slug',
			name: 'slug', 
			type: 'slug',
			validation: rule => rule.required(), 
			options: {
				source: 'title'
			} 
		},
		{
			title: 'Author', 
			name: 'author', 
			type: 'reference', 
			to: {type: 'author'}	
		},
		{
			title: 'Cover',
			name: 'cover',
			type: 'image',
			validation: rule => rule.required(),
		},
		{
			title: 'Price', 
			name: 'price', 
			type: 'number', 
			description: 'Enter book retail price here',
		},

		{
			title: 'Blurb', 
			name: 'blurb', 
			type: 'text',
			validation: rule => rule.required(),
		}, 
		{
			title: 'Format', 
			name: 'format', 
			type: 'string',
			options: {
				list: [
					'hardback', 
					'paperback',
					'e-book',
				]
			}
		}, 
		{
			title: 'ISBN',
			name: 'isbn',
			type: 'string'
		},
	 	{
			title: 'Category',
			name: 'category', 
			type: 'reference', 
			to: {type: 'category' }
		},
	
		{
			title: 'Tags',
			name: 'tags',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: {
						type: 'tag'
					}
				}
			]
		},
 

	]
}