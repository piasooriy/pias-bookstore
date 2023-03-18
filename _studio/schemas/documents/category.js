export default {
	title: 'Category',
	name: 'category',
	type: 'document',
	fields: [
		{
			title: 'Name',
			name: 'name', 
			type: 'string',
		},
		{
			title: 'Slug', 
			name: 'slug',
			type: 'slug', 
			options: {
				source: 'name'
			}
		}
	]
}