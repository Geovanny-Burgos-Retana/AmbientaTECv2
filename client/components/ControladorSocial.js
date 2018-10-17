import React, {Component} from 'react';
import {Button, HelpBlock, FormControl, ControlLabel, FormGroup} from 'react-bootstrap';

class ControladorSocial extends Component{
	constructor (){
		super();
		this.state = {
			provider: '',
			esTwitter: false
		};
		this.tipoDeCuenta = this.tipoDeCuenta.bind(this);
	}

	componentDidMount() {
		const prov=this.props.provider;
		this.setState({
			provider: prov
		})
		this.tipoDeCuenta();
	}
	//Selecciona el boton para la cuenta logeada
	tipoDeCuenta(){
		if(this.props.provider === "twitter.com"){
			this.setState({
				esTwitter: true
			})
		}else{
			this.setState({
				esTwitter: false
			})
		}
	}

	render() {
		return (
			<div style={{width: "80%"}} >
				{this.state.esTwitter?
					<div>
						<a href={"https://twitter.com/intent/tweet?button_hashtag=AmbientaTEC_more_"+this.props.Hashtag1+"_less_"+this.props.Hashtag2+"&ref_src=twsrc%5Etfw"} className="twitter-hashtag-button" data-show-count="false">
						<img src="http://static.sites.yp.com/var/m_6/6b/6bd/11192116/1470938-twitter.png?v=6.5.1.37806" alt="Twitter"/>Tweet #AmbientaTEC_more_{this.props.Hashtag1}_less_{this.props.Hashtag2}</a>
						<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script><FormControl.Feedback />
					</div>
				:
					<Button bsStyle="primary" bsSize="large"  >
						Compartir Facebook
					</Button>
				}
			</div>
		)
	}
}

export default ControladorSocial;