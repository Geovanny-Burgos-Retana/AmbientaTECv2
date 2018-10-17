import React, { Component } from 'react';
import CampParticipation from './CampParticipation';
import TwitterButton from './TwitterButton';
import {Panel, Button, Modal, PanelGroup} from 'react-bootstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react';

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
			campsActuales:[],
			habilitada: false,
			hashtag: '',
			showComponent: true,
			lat:'',
			long: '',
			show: false
		};
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
		
	}
	//Para mostrar el MODAL con las campañas en participacion
	handleShow() {
		//this.fetchChallengesW(this.state.userId);
    	this.setState({ show: true });
	}
	//Para ocultar el MODAL de las campañas en participacion
	handleClose() {
    	this.setState({ show: false });
  	}
	hideCampaign(){
		this.setState({
			showComponent:false
		})
	}
	//Paso valores que recive el componente
	componentDidMount() {
		const usuario=this.props.usuario;
		this.setState({
			userId: usuario._id,
			campsActuales: usuario.campanias
		});
		this.fetchCampanas();
	}
	//Muestro las campañas que NO estan en participacion 
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
		const style = {
			height: "250px",
			width:"250px",
			overflow: "hidden"
		};

		const campanas = this.state.campanas.map((campana, i) => {
			return (
				<div key={campana._id} style={{ width: "80%" }} >
					<Panel bsStyle="success">
						<Panel.Heading>
							<Panel.Title componentClass="h3">{campana.nombre}</Panel.Title>
						</Panel.Heading>
						<Panel.Body>
							<div className="campana_content">
								<p>{campana.description}</p>
								<p>Direccion: {campana.direccion}</p>
								<p>Organizador: {campana.organizador}</p>
								<p>Fecha: {campana.fecha}</p>
								<p>Telefono: {campana.telefono}</p>
								<p>Email: {campana.email}</p>
								<p>Hashtag: {campana.hashtag}</p>
								<CampParticipation camp={campana} user={this.state.userId}/>
							</div>
							{campana.lat?
							<div className="map2">
								<Map google={this.props.google} zoom={14} style={style} initialCenter={{lat:campana.lat, lng:campana.long}}>
									<Marker position={{lat:campana.lat, lng:campana.long}}/>
								</Map>
							</div>
							:
							<h4>Esta campaña no presenta mapa.</h4>
							}
						</Panel.Body>
					</Panel>
				</div>
			)
		});

		const campaniasP = this.state.campsActuales.map((camp, i) =>{
			return (
				<div key={camp._id} style={{width: "80%"}} >
					<PanelGroup accordion id="CampParticipation">	
						<Panel eventKey= {i} >
					    	<Panel.Heading>
					      		<Panel.Title toggle>{camp.nombre}</Panel.Title>
					    	</Panel.Heading>
					    	<Panel.Body collapsible>
								<p>{camp.description}</p>
								<p>Direccion: {camp.direccion}</p>
								<p>Organizador: {camp.organizador}</p>
								<p>Fecha: {camp.fecha}</p>
								<p>Telefono: {camp.telefono}</p>
								<p>Email: {camp.email}</p>
								<p>Hashtag: {camp.hashtag}</p>
								<TwitterButton camp={camp} user={this.state.userId}/>
								{camp.lat?
								<div className="map2">
									<Map google={this.props.google} zoom={14} style={style} initialCenter={{lat:camp.lat, lng:camp.long}}>
										<Marker position={{lat:camp.lat, lng:camp.long}}/>
									</Map>
								</div>
								:
								<h4>Esta campaña no presenta mapa.</h4>
								}
					    	</Panel.Body>
					  	</Panel>
					</PanelGroup>
				</div>
			)
		});

		return (
			<div className="container">
				<div className="row">
					{campanas}
				</div>
				<div className="col">
			    	<Button bsStyle="success" bsSize="large" onClick={this.handleShow} style={{margin: "20px"}}>
							Ver Participaciones
					</Button>
				</div>

				<div className= "modal">
					<Modal show={this.state.show} onHide={this.handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Campañas en participación.</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{campaniasP}
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.handleClose}>Close</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
		)
	}

}



export default GoogleApiWrapper({
	apiKey: ("AIzaSyAAkugeeJzvEG8taA8Jq1-jhFHhd-Mlygw"),
  })(Campaign)