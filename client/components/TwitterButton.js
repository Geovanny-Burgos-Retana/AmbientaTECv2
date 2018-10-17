import React, {Component} from 'react';
import {Button } from 'react-bootstrap';

class TwitterButton extends Component{
	constructor(props, context) {
		super(props, context);
		this.state = {
			campania: ''
		};
		this.contadorTwitter = this.contadorTwitter.bind(this);
	}

	componentDidMount() {
		const camp = this.props.camp;
		this.setState({
			campania: camp
		});
	}
	
	contadorTwitter(){
		fetch(`/api/campanas/twitterCont/${this.props.camp._id}`, {
			method: 'PUT',
					body: JSON.stringify({
					}),
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        }
		})
		.then(res => res.json())
		.then (data => {
			console.log(data)
		})
		.catch(err => console.error(err));
	}

	render() {
		return (
			<div key={this.props.camp._id} style={{width: "80%"}}>
				<label>
					<a onClick={this.contadorTwitter}  href={"https://twitter.com/intent/tweet?button_hashtag=AmbientaTEC_"+this.props.camp.nombre+"&ref_src=twsrc%5Etfw"} className="twitter-hashtag-button" data-show-count="false">
					<img src="http://static.sites.yp.com/var/m_6/6b/6bd/11192116/1470938-twitter.png?v=6.5.1.37806" alt="Twitter" />Tweet AmbientaTEC_{this.props.camp.nombre}</a>
					<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
				</label>
			</div>
		)
	}

}


export default TwitterButton;