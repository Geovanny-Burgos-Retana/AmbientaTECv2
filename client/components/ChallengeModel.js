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
	}

	componentDidMount() {
		const newReto=this.props.newReto;
		const user = this.props.user;
		this.setState({
			reto: newReto,
			userId: user
		})
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