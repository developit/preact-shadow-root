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
		let child = props.children;
		let replace;
		// support Preact 8 and prior
		if (child && child[0] && 'nodeName' in child[0]) {
			child = child[0];
			replace = this.shadow.firstChild;
		}
		let root = render(unrender ? null : child, this.shadow, replace);
		if (unrender && root) root.remove();
	}
	render() {}
}
