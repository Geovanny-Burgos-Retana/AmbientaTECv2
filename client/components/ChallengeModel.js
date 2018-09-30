import React, {Component} from 'react';
import {ProgressBar, Modal, Panel, PanelGroup, Button, Checkbox } from 'react-bootstrap';

class ChallengeModel extends Component{
	constructor (){
		super();
		this.state = {
			reto: '',
			userId: '',
			show: false
		};
		this.participarReto = this.participarReto.bind(this);
		this.removeChallenge = this.removeChallenge.bind(this);
	}

	componentDidMount() {
		const newReto=this.props.newReto;
		const user = this.props.user;
		this.setState({
			reto: newReto,
			userId: user
		})
	}

	//Para terminar
	fetchChallenges() {
	    fetch('/api/challenges')
	      .then(res => res.json())
	      .then(data => {
	      	const lista = data;
	      	const lista1 = this.state.retosParticipacion
	      	for (var entry of data) {
	      		console.log("En la ");
	      		for (var entry1 of lista1) {
					if (entry._id === entry1){
						console.log("En la ostia");
						var index = lista.indexOf(entry);
						console.log(index);
						if(index >= 0){
							console.log("IF if");
							lista.splice(index, 1);
						}
					}
				}
				
			}
			this.setState({challenges: lista});
	        //this.setState({challenges: data});
	        //console.log(this.state.challenges);
	      });
	}

	participarReto(){
		fetch(`/api/cuentas/${this.props.user}`, {
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
		this.setState({show: true});
		//this.removeChallenge(this.state.reto);
	}

	removeChallenge(reto) {
		var array = this.state.retos; 
  		var index = array.indexOf(reto)
  		console.log(index)
  		array.splice(reto, 1);
  		this.setState({retos: array});
		console.log(this.state.retos)
	}

	render() {
		const submitDisabled = this.state.show;
		return (
			<div key={this.state.reto._id} style={{width: "80%"}} >
		      	<form>
		      		<p>      
		      			<label>
		      			    <Button bsStyle="primary" bsSize="large" disabled={submitDisabled} onClick={this.participarReto}>
								Participar
							</Button>
			            </label>
		      		</p>
		      	</form>
			</div>
		)
	}

}


export default ChallengeModel;