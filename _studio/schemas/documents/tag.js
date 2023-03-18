export default {
	title: 'Tag', 
	name: 'tag', 
	type: 'document',
	fields: [
		{
			title: 'Name', 
			name: 'name', 
			type: 'string', 
		},
		{
			title: 'slug', 
			name: 'slug', 
			type: 'slug',
			options: {
				souce:'name'
			}
		}
	]
}