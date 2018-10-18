import React, { Component } from 'react';
import CampParticipation from './CampParticipation';
import SocialButton from './SocialButton';
import {Panel, Button, Modal, PanelGroup,FormGroup,Radio} from 'react-bootstrap';
import CampNoParti from './CampNoParti';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';
import "../../node_modules/react-vis/dist/style.css";

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
			fbChart: [],
			fbElements: [],
			twChart: [],
			ChartActual: [],
			habilitada: false,
			chart_with_fb: true,
			hashtag: '',
			showComponent: true,
			lat:'',
			long: '',
			show: false,
			provider: ''
		};
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.changeChartFB = this.changeChartFB.bind(this);
		this.changeChartTW = this.changeChartTW.bind(this);
	}
	//Para mostrar el MODAL con las campañas en participacion
	handleShow() {
		this.fetchCampaniasW(this.state.userId);
    	this.setState({ show: true });
	}
	//Para ocultar el MODAL de las campañas en participacion
	handleClose() {
		this.fetchCampaniasW(this.state.userId);
    	this.setState({ show: false });
  	}
	//Paso valores que recibe el componente
	componentDidMount() {
		const usuario=this.props.usuario;
		this.setState({
			userId: usuario._id,
			provider: usuario.provider,
			campsActuales: usuario.campanias
		});
		this.fetchCampaniasW(usuario._id);
	}
	//Cargo las campañas en participacion
	fetchCampaniasW(usuario) {
		fetch(`/api/cuentas/unica/${usuario}`, {
				method: 'GET',
				headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
				}
		}).then(res => res.json())
		.then(data => {
				this.setState({
					userId: data._id,
					campsActuales: data.campanias
				}); 
				this.fetchCampanas();
			})
	}
	//Muestro las campañas que NO estan en participacion 
	fetchCampanas() {
		fetch('/api/campanas')
			.then(res => res.json())
			.then(data => {
				var campsParticipando = this.state.campsActuales;
				var result = [];
				var fbC = [];
				var twC = [];
				var fbEle = [];
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
					if(camp.contadorFb)
						fbC.push({x:i, y:camp.contadorFb});
					else{
							fbC.push({x:i, y:0});
						}
					if(camp.contadorTwitter)
						twC.push({x:i, y:camp.contadorTwitter});
					else{
						twC.push({x:i, y:0});
						}
					fbEle.push(camp.nombre);
				});	
				this.setState({ campanas: result, fbChart:  fbC, fbElements: fbEle, twChart: twC});
				
			});
	}

	changeChartFB(){
		this.setState({
			chart_with_fb: true
		})
	}
	changeChartTW(){
		this.setState({
			chart_with_fb: false
		})
	}
	render() {
		const style = {
			height: "250px",
			width:"250px",
			overflow: "hidden"
		};
		const listElements = this.state.fbElements.map((nombre, i) => {
			return (
				<div key={i} style={{ width: "80%" }} >
					<h4><span  style={{color:"Tomato"}}> {i}</span> - {nombre}</h4>
				</div>
			)
		});

		const campanas = this.state.campanas.map((campana, i) => {
			var today = new Date(),
			date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			if(campana.fecha >= date){
				return (
					<div key={campana._id} style={{ width: "80%" }} >
						<Panel bsStyle="success">
							<Panel.Heading>
								<Panel.Title componentClass="h3">{campana.nombre}</Panel.Title>
							</Panel.Heading>
							<Panel.Body>
								<div className="campana_content">
									<p>Descripcion: {campana.descripcion}</p>
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
			}

		});
		
		const campaniasP = this.state.campsActuales.map((camp, i) =>{
			var today = new Date(),
			date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			if(camp.fecha >= date){
				return (
					<div key={camp._id} style={{width: "80%"}} >
						<PanelGroup accordion id="CampParticipation">	
							<Panel eventKey= {i} >
						    	<Panel.Heading>
						      		<Panel.Title toggle>{camp.nombre}</Panel.Title>
						    	</Panel.Heading>
						    	<Panel.Body collapsible>
						    		{this.state.show  && <CampNoParti campania={camp} user={this.state.userId} handleCloseModal={this.handleClose} />}
									<p>{camp.description}</p>
									<p>Direccion: {camp.direccion}</p>
									<p>Organizador: {camp.organizador}</p>
									<p>Fecha: {camp.fecha}</p>
									<p>Telefono: {camp.telefono}</p>
									<p>Email: {camp.email}</p>
									<p>Hashtag: {camp.hashtag}</p>
									<SocialButton nombre={camp.nombre} provider={this.state.provider} esCampania={true} idE={camp._id} user={this.state.userId} />
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
			}
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
				<div className= "title-separator" style={{width:"93.5%", margin:"10px -15px"}} >
					<h3 id="campanha">Estadisticas por Campaña</h3>
				</div>
				<form>
					<FormGroup>
						<Radio name="radioGroup" inline onClick={this.changeChartFB}>
							Facebook
						</Radio>{' '}
						<Radio name="radioGroup" inline onClick={this.changeChartTW}>
							Twitter
						</Radio>{' '}
					</FormGroup>
					
				</form>
				{this.state.chart_with_fb?
					<XYPlot
					width={400}
					height={400}
					className="chart">
					<VerticalGridLines />
					<HorizontalGridLines />
					<XAxis title="Hashtag"/>
					<YAxis title="Uso total por hashtag" />
					<LineSeries
						data={this.state.fbChart}
						style={{stroke: '#3b5998', strokeWidth: 4}}/>
				</XYPlot>
				:
				<XYPlot
					width={400}
					height={400}
					className="chart">
					<VerticalGridLines />
					<HorizontalGridLines />
					<XAxis title="Hashtag"/>
					<YAxis title="Uso total por hashtag" />
					<LineSeries
						data={this.state.twChart}
						style={{stroke: '#1da1f2', strokeWidth: 4}}/>
				</XYPlot>}
				<div className="char_info">
					<h3>Tabla de Hashtags</h3>
					{listElements}
				</div>
			</div>
		)
	}

}

export default GoogleApiWrapper({
	apiKey: ("AIzaSyAAkugeeJzvEG8taA8Jq1-jhFHhd-Mlygw"),
  })(Campaign)