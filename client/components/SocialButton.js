import React, {Component} from 'react';
import {Button } from 'react-bootstrap';

class SocialButton extends Component{
	constructor(props, context) {
		super(props, context);
		this.state = {
			nombre: '',
			show: false
		};
		this.contadorTwitter = this.contadorTwitter.bind(this);
		this.contadorFace = this.contadorFace.bind(this);
		this.tipoDeCuenta = this.tipoDeCuenta.bind(this);
	}

	componentDidMount() {
		const name = this.props.nombre;
		const campania = this.props.esCampania;
		const id = this.props.idE;
		const user = this.props.user;
		this.setState({
			nombre: name
		});
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
	//Aumenta los contadores de facebook
	contadorFace(){
		if (this.props.esCampania){
			//Aumenta el contador de # en facebook en 1 solo en camppa;as
			fetch(`/api/campanas/facebookCont/${this.props.idE}`, {
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
			this.setState({show: true});
		}else{
			//Aumento el score de la cuenta sumandole el score del reto
			fetch(`/api/cuentas/score/${this.props.user}`, {
				method: 'PUT',
						body: JSON.stringify({
							score: this.props.puntos+this.props.reto.points
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
			//Inserto el reto en retos que la cuenta ha ganado
			fetch(`/api/cuentas/ganar/${this.props.user}`, {
				method: 'PUT',
						body: JSON.stringify({
							reto: this.props.reto
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
			//Saco el reto de los que estan en participacion
			fetch(`/api/cuentas/participaPop/${this.props.user}`, {
				method: 'PUT',
						body: JSON.stringify({
							reto: this.props.reto
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
			//Aumento el contador # en facebook en 1 solo para los retos
			fetch(`/api/challenges/facebook/${this.props.idE}`, {
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
			this.setState({show: true});
	}
	//Aumenta los contadores de Twitter
	contadorTwitter(){
		if (this.props.esCampania){
			//Aumenta el contador de # en twitter en 1 solo en camppa;as
			fetch(`/api/campanas/twitterCont/${this.props.idE}`, {
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
		}else{
			//Aumento el score de la cuenta sumandole el score del reto
			fetch(`/api/cuentas/score/${this.props.user}`, {
				method: 'PUT',
						body: JSON.stringify({
							score: this.props.puntos+this.props.reto.points
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
			//Inserto el reto en retos que la cuenta ha ganado
			fetch(`/api/cuentas/ganar/${this.props.user}`, {
				method: 'PUT',
						body: JSON.stringify({
							reto: this.props.reto
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
			//Saco el reto de los que estan en participacion
			fetch(`/api/cuentas/participaPop/${this.props.user}`, {
				method: 'PUT',
						body: JSON.stringify({
							reto: this.props.reto
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
			//Aumento el contador # en twitter en 1 solo para los retos
			fetch(`/api/challenges/twitter/${this.props.idE}`, {
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
	}

	render() {
		const submitDisabled = this.state.show;
		return (
			<div style={{width: "80%"}} >
				{this.state.esTwitter?
					<div key={this.props.idE} style={{width: "80%"}}>
						<label>
							<a onClick={this.contadorTwitter}  href={"https://twitter.com/intent/tweet?button_hashtag=AmbientaTEC_"+this.props.nombre+"&ref_src=twsrc%5Etfw"} className="twitter-hashtag-button" data-show-count="false">
							<img src="http://static.sites.yp.com/var/m_6/6b/6bd/11192116/1470938-twitter.png?v=6.5.1.37806" alt="Twitter" />Tweet AmbientaTEC_{this.props.nombre}</a>
							<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
						</label>
					</div>
				:
					<Button bsStyle="primary" bsSize="large" disabled={submitDisabled}  onClick={this.contadorFace} >
						Compartir Facebook
					</Button>
				}
			</div>
		)
	}

}


export default SocialButton;