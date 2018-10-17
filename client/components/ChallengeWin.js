import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class ChallengeWin extends Component{
	constructor (){
		super();
		this.state = {
			reto: '',
			userId: '',
			show: false,
			score: 0
		};
		this.ganarReto = this.ganarReto.bind(this);
	}

	componentDidMount() {
		const newReto=this.props.newReto;
		const user = this.props.user;
		const puntuacion =  this.props.puntos;
		this.setState({
			reto: newReto,
			userId: user,
			score: puntuacion+newReto.points
		})
	}

	ganarReto(){
		//Aumento el score de la cuenta sumandole el score del reto
		fetch(`/api/cuentas/score/${this.props.user}`, {
			method: 'PUT',
					body: JSON.stringify({
						score: this.state.score
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
						reto: this.state.reto
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
						reto: this.state.reto
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
		fetch(`/api/challenges/twitter/${this.props.newReto._id}`, {
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
		//Variable para desabilitar un boton
		this.setState({show: true});
	}

	render() {
		const submitDisabled = this.state.show;
		return (
			<div key={this.state.reto._id} style={{width: "80%"}} >
		      	<form>
		      		<p>      
		      			<label>
		      				<a onClick={this.ganarReto} href={"https://twitter.com/intent/tweet?button_hashtag= AmbientaTEC_"+this.props.newReto.challengeName+"&ref_src=twsrc%5Etfw"} className="twitter-hashtag-button" data-show-count="false">
		      				<img src="http://static.sites.yp.com/var/m_6/6b/6bd/11192116/1470938-twitter.png?v=6.5.1.37806" alt="Twitter"/>Tweet  AmbientaTEC_{this.props.newReto.challengeName}</a>
							<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
			            </label>
		      		</p>
		      	</form>
			</div>
		)
	}

}


export default ChallengeWin;