export default Structure => {

	const { divider, editor, list, listItem, documentTypeList, documentTypeListItem} = Structure

	return list()
			.title('Book Content')
			.items([
				documentTypeListItem('book'), 
				documentTypeListItem('author'),

				divider(), 

				documentTypeListItem('category'),
				documentTypeListItem('tag'),

			]) 

}