import { h, Component, render } from 'preact';
import Shadow from '../preact-shadow-root';

// jsdom doesn't support Shadow DOM. This little mock will do.
if (!Element.prototype.attachShadow) {
	Element.prototype.attachShadow = function() {
		return this.shadowRoot = document.createDocumentFragment();
	};
}

describe('preact-shadow-root', () => {
	it('should render into a shadow root', () => {
		let parent = document.createElement('x-root');

		let root = render(
			<div class="outer">
				<h1>Light DOM</h1>
				<Shadow>
					<div class="inner">
						<h1>Shadow DOM</h1>
					</div>
				</Shadow>
			</div>,
			parent
		);

		expect(parent.innerHTML).toEqual(`<div class="outer"><h1>Light DOM</h1></div>`);
		expect(root).toHaveProperty('shadowRoot');
		expect(root.shadowRoot.childNodes).toHaveLength(1);
		expect(root.shadowRoot.firstChild.outerHTML).toEqual(`<div class="inner"><h1>Shadow DOM</h1></div>`);
	});

	it('should render updates within the shadow root', done => {
		let parent = document.createElement('x-root');

		class App extends Component {
			render({}, { count=0 }) {
				return (
					<div class="outer" data-count={count}>
						Counter ({count})
						<Shadow>
							<span class="counter">
								Count: {count}
							</span>
						</Shadow>
					</div>
				);
			}
		}

		let app;
		let root = render(<App ref={c => { app = c; }} />, parent);

		expect(parent.innerHTML).toEqual(`<div class="outer" data-count="0">Counter (0)</div>`);
		expect(root).toHaveProperty('shadowRoot');
		expect(root.shadowRoot.childNodes).toHaveLength(1);
		expect(root.shadowRoot.firstChild.outerHTML).toEqual(`<span class="counter">Count: 0</span>`);

		app.setState({ count: 1 }, () => {
			expect(parent.innerHTML).toEqual(`<div class="outer" data-count="1">Counter (1)</div>`);
			expect(root).toHaveProperty('shadowRoot');
			expect(root.shadowRoot.childNodes).toHaveLength(1);
			expect(root.shadowRoot.firstChild.outerHTML).toEqual(`<span class="counter">Count: 1</span>`);

			done();
		});
	});

	it('should unrender shadow roots', done => {
		let parent = document.createElement('x-root');

		class App extends Component {
			render({}, { shadow }) {
				return (
					<div class="outer">
						light
						{ shadow && (
							<Shadow>
								<span>shadow</span>
							</Shadow>
						) }
					</div>
				);
			}
		}

		let app;
		let root = render(<App ref={c => { app = c; }} />, parent);

		expect(parent.innerHTML).toEqual(`<div class="outer">light</div>`);
		expect(root).not.toHaveProperty('shadowRoot');

		app.setState({ shadow: true }, () => setTimeout( () => {
			expect(parent.innerHTML).toEqual(`<div class="outer">light</div>`);
			expect(root).toHaveProperty('shadowRoot');
			expect(root.shadowRoot.childNodes).toHaveLength(1);
			expect(root.shadowRoot.firstChild.outerHTML).toEqual(`<span>shadow</span>`);

			app.setState({ shadow: false }, () => {
				expect(parent.innerHTML).toEqual(`<div class="outer">light</div>`);
				expect(root).toHaveProperty('shadowRoot');
				expect(root.shadowRoot.childNodes).toHaveLength(0);

				done();
			});
		}));
	});
});
