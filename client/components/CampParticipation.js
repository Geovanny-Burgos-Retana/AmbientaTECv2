import React, {Component} from 'react';
import {Button } from 'react-bootstrap';

class CampParticipation extends Component{
	constructor (){
		super();
		this.state = {
			campania: '',
			userId: '',
			show: false
		};
		this.participar = this.participar.bind(this);
	}

	componentDidMount() {
		const user=this.props.user;
		const camp = this.props.camp;
		this.setState({
			userId: user,
			campania: camp
		});
	}
	
	participar() {
		fetch(`api/cuentas/addCampania/${this.props.user}`, {
			method: 'PUT',
			body: JSON.stringify({
				campania: this.state.campania
			}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log("Se espera su participacion.");
			})
			.catch(err => console.error(err));
			this.setState({show: true});
	}

	render() {
		const submitDisabled = this.state.show;
		return (
			<div key={this.state.campania._id} style={{width: "80%"}}>
				<label>
      			    <Button bsStyle="primary" bsSize="large"  disabled={submitDisabled}  onClick={this.participar}>
						Participar
					</Button>
				</label>
			</div>
		)
	}

}


export default CampParticipation;