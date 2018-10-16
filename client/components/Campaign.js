import React, { Component } from 'react';
import {Button, Panel } from 'react-bootstrap';
import CampParticipation from './CampParticipation';

class Campaign extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			userId:'',
			nombre: '',
			direccion: '',
			organizador: '',
			fecha: '',
			telefono: '',
			email: '',
			descripcion: '',
			campanas: [],
			habilitada: false,
			hashtag: '',
			showComponent: true
		};
		this.hideCampaign = this.hideCampaign.bind(this);
	}

	hideCampaign(){
		this.setState({
			showComponent:false
		})
	}
	componentDidMount() {
		const usuario=this.props.usuario;
		this.setState({
			userId: usuario._id,
			campsActuales: usuario.campanias
		});
		this.fetchCampanas();
	}

	fetchCampanas() {
		fetch('/api/campanas')
			.then(res => res.json())
			.then(data => {
				var campsParticipando = this.state.campsActuales;
		    	var result = [];
				data.filter((camp, i) =>{
					campsParticipando.filter((entry, i) =>{
				  		if (camp._id === entry._id){
							this.setState({flag: true});
				  		}
					});
					if (this.state.flag){
						this.setState({flag: false});
					}else{
						result.push(camp);
					}
				});	
				this.setState({ campanas: result });
			});
	}


	render() {
		const campanas = this.state.campanas.map((campana, i) => {
			return (
				<div key={campana._id} style={{ width: "80%" }} >
					<Panel bsStyle="success">
						<Panel.Heading>
							<Panel.Title componentClass="h3">{campana.nombre}</Panel.Title>
						</Panel.Heading>
						<Panel.Body>
							<p>{campana.description}</p>
							<p>Direccion: {campana.direccion}</p>
							<p>Organizador: {campana.organizador}</p>
							<p>Fecha: {campana.fecha}</p>
							<p>Telefono: {campana.telefono}</p>
							<p>Email: {campana.email}</p>
							<p>Hashtag: {campana.hashtag}</p>
							<CampParticipation camp={campana} user={this.state.userId}/>
						</Panel.Body>
					</Panel>
				</div>
			)
		});
		return (

			<div className="container">
				<div className="row">
					{campanas}
				</div>
			</div>
		)
	}

}


export default Campaign;