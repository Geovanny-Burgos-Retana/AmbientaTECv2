import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class CampNoParti extends Component{
	constructor (){
		super();
		this.state = {
			campania: '',
			userId: '',
			show: false
		};
		this.cancelarAsistencia = this.cancelarAsistencia.bind(this);
	}

	componentDidMount() {
		const camp=this.props.campania;
		const user = this.props.user;
		this.setState({
			campania: camp,
			userId: user
		})
	}

	cancelarAsistencia(campana){
		fetch(`/api/cuentas/noParticipation/${this.props.user}`, {
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
		.then (data => {
			//console.log(data)
		})
		.catch(err => console.error(err));
		this.props.handleCloseModal();

	}

	render() {
		
		return (
			<div key={this.state.campania._id} style={{width: "80%"}} >
		      	<form>
		      		<p>      
		      			<label>
				    		<Button bsStyle="success" bsSize="large" onClick={this.cancelarAsistencia}>
								Cancelar Asistencia
							</Button>
			            </label>
		      		</p>
		      	</form>
			</div>
		)
	}

}


export default CampNoParti;