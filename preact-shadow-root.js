import { render } from 'preact';

/* Shadow Root component */
export default class Shadow {
	shouldComponentUpdate(nextProps) {
		this.update(nextProps);
		return false;
	}
	componentDidMount() {
		let parent = this.base && this.base.parentNode;
		if (parent) {
			this.shadow = parent.attachShadow({ mode: 'open' });
			this.update(this.props);
		}
	}
	update(props) {
		render(props.children[0], this.shadow, this.shadow.firstChild);
	}
	render() {}
}
