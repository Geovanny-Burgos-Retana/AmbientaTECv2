import React, {Component} from 'react';


class Navigation extends Component {
	render (){
		return(
		        <nav className="light-blue darken-4">
		            <a href="/" className="brand-logo">{this.props.tittle}</a>
		        </nav>
		)
	}
}

export default Navigation;