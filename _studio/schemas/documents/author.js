export default {
	title: 'Author', 
	name:	'author',
	type: 'document',
	fields: [
		{
			title: 'First Name',
			name: 'firstName', 
			type: 'string'
		},
		{
			title: 'Last Name',
			name: 'lastName',
			type: 'string',
		},
		{
			title: 'Image',
			name: 'image',
			type: 'image',
			fields: [
				{ 
				  name: 'alt',
				  type: 'string',
				  validation: rule => rule.required()
				}
			 ]
		},
		{
			title: 'Description', 
			name: 'description',
			description: 'Add a short description about the author',
			type: 'text',
			vaidation: rule => rule.max(500).warning('Max 500 characters'),
		},
		{
			title: 'Date of Birth',
			name: 'dateOfBirth',
			type: 'date',
			options: {
				dateformat: 'YYYY-MM-DD', 
				calendarTodayLabel: 'today',
			}
		},
		{
			title: 'Date of Passing',
			name: 'dateOfPassing', 
			type: 'date', 
			options: {
				dateformat: 'YYYY-MM-DD',
				calendarTodayLabel: 'today',
			}
		}
	]
}