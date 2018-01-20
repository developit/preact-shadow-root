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
	componentWillUnmount() {
		this.update(this.props, true);
	}
	update(props, unrender) {
		let root = render(unrender ? null : props.children[0], this.shadow, this.shadow.firstChild);
		if (unrender && root) root.remove();
	}
	render() {}
}
