import React, { Component } from 'react';
import {Panel, Button, Modal, PanelGroup,FormGroup,Radio} from 'react-bootstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react';

class CentroAcopio extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			userId:'',
			nombre: '',
			direccion: '',
			organizador: '',
			fechaDescripcion: '',
			telefono: '',
			email: '',
			descripcion: '',
			basura: '',
			habilitada: false,
			showComponent: true,
			lat:'',
			long: '',
            show: false,
            centros: []
		};
		this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.fetchCentros = this.fetchCentros.bind(this); 
	}
	//Para mostrar el MODAL con las campañas en participacion
	handleShow() {
    	this.setState({ show: true });
	}
	//Para ocultar el MODAL de las campañas en participacion
	handleClose() {
    	this.setState({ show: false });
  	}
	//Paso valores que recive el componente
	componentDidMount() {
		const usuario=this.props.usuario;
		this.setState({
			userId: usuario._id,
        });
        this.fetchCentros();
	}

	//Muestro las campañas que NO estan en participacion 
	fetchCentros() {
		fetch('/api/centros', {
            method: 'GET',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            }
        })
			.then(res => res.json())
			.then(data => {
                this.setState({centros: data});
			});
	}

	render() {
		const style = {
			height: "250px",
			width:"250px",
			overflow: "hidden"
		};

		//Muestro todas las campa;as y valido que la fecha sea despues de la actual
		const centros = this.state.centros.map((centro, i) => {
				return (
					<div key={centro._id} style={{ width: "80%" }} >
						<Panel bsStyle="success">
							<Panel.Heading>
								<Panel.Title componentClass="h3">{centro.nombre}</Panel.Title>
							</Panel.Heading>
							<Panel.Body>
								<div className="campana_content">
									
									<p>Direccion: {centro.direccion}</p>
									<p>Organizador: {centro.organizador}</p>
									<p>Fecha: {centro.fechaDescripcion}</p>
									<p>Telefono: {centro.telefono}</p>
									<p>Email: {centro.email}</p>
                                    <p>Basura que se recicla: {centro.basura}</p>
								</div>
								{centro.lat?
								<div className="map2">
									<Map google={this.props.google} zoom={14} style={style} initialCenter={{lat:centro.lat, lng:centro.long}}>
										<Marker position={{lat:centro.lat, lng:centro.long}}/>
									</Map>
								</div>
								:
								<h4>Este Centro de Acopio no presenta mapa.</h4>
								}
							</Panel.Body>
						</Panel>
					</div>
				)
			

		});
		
		return (
			<div className="container">
				<div className="row">
					{centros}
				</div>
			</div>
			
		)
	}

}

export default GoogleApiWrapper({
	apiKey: ("AIzaSyAAkugeeJzvEG8taA8Jq1-jhFHhd-Mlygw"),
  })(CentroAcopio)