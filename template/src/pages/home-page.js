const { Page, layout, text } = require('larana-js')

const { header } = require('../components')

class HomePage extends Page {
	title() {
		return 'Home page'
	}

	root({ w }) {
		return layout({
			style: ['body', 'column'],
			children: [
				header({}),
				layout({
					style: {
						size: 9,
						padding: 'var:u2',
						gap: 'var:u2',
					},
					children: [
						text({ value: 'Hello, WWorld!', style: 'h0' }),
					],
				}),
			],
		})
	}
}

module.exports = { HomePage }
