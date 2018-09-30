import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class ChallengeWin extends Component{
	constructor (){
		super();
		this.state = {
			reto: '',
			userId: '',
			show: false
		};
		this.ganarReto = this.ganarReto.bind(this);
	}

	componentDidMount() {
		const newReto=this.props.newReto;
		const user = this.props.user;
		this.setState({
			reto: newReto,
			userId: user
		})
	}

	ganarReto(){
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
		//this.removeChallenge(this.state.reto);
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
		console.log("data")
		this.setState({show: true});
	}

	render() {
		const submitDisabled = this.state.show;
		return (
			<div key={this.state.reto._id} style={{width: "80%"}} >
		      	<form>
		      		<p>      
		      			<label>
		      			    <Button bsStyle="success" bsSize="large" disabled={submitDisabled} onClick={this.ganarReto}>
								Completar
							</Button>
			            </label>
		      		</p>
		      	</form>
			</div>
		)
	}

}


export default ChallengeWin;