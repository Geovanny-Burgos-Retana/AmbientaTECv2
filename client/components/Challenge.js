import React, {Component} from 'react';
import { Modal, Panel, PanelGroup, Button,FormGroup,Radio } from 'react-bootstrap';

import ChallengeModel from './ChallengeModel';
import SocialButton from './SocialButton';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';
import "../../node_modules/react-vis/dist/style.css";

class Challenge extends Component{
	constructor(props, context){
		super(props, context);

		this.state = {
			aux: false,
			userId: '',
			challenges:[],
			score: 0,
			retosParticipacion: [],
			retosGanados:[],
			fbChart: [],
			fbElements: [],
			twChart: [],
			ChartActual: [],
			chart_with_fb: true,
			show: false,
			showW: false,
			flag: false,
			flagWin: false,
			provider: ''
		};
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleShowWin = this.handleShowWin.bind(this);
		this.handleCloseWin = this.handleCloseWin.bind(this);
		this.changeChartFB = this.changeChartFB.bind(this);
		this.changeChartTW = this.changeChartTW.bind(this);
	}
	handleShow() {
		this.fetchChallengesW(this.state.userId);
    	this.setState({ show: true });
	}

	handleClose() {
    	this.setState({ show: false });
  	}

	handleShowWin() {
		this.fetchChallengesW(this.state.userId);
    	this.setState({ showW: true });
	}
	handleCloseWin() {
    	this.setState({ showW: false });
  	}

	componentDidMount() {
		const usuario=this.props.usuario;
		console.log("usuario")
		console.log(usuario.provider)
		this.setState({
			score: usuario.score,
			provider: usuario.provider
		})
		this.fetchChallengesW(usuario._id);	    
	}
	//Cargo los retos ganados y en participacion
	fetchChallengesW(usuario) {
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
					retosGanados: data.retosGanados,
					retosParticipacion: data.retosParticipacion
				}); 
				this.fetchChallenges();
			})
	}
	//Obtengo todos los retos pero muestro solo los que no estan en participacion  y que esten ganados
	fetchChallenges() {
	    fetch('/api/challenges')
	    .then(res => res.json())
	    .then(data => {
	    	var retosQuitar = this.state.retosParticipacion.concat(this.state.retosGanados);
			var result = [];
			var fbC = [];
			var twC = [];
			var fbEle = [];
			data.filter((retoAux, i) =>{
				retosQuitar.filter((entry, i) =>{
			  		if (retoAux._id === entry._id){
						this.setState({flag: true});
			  		}
				});
				if (this.state.flag){
					this.setState({flag: false});
				}else{
					result.push(retoAux);
				}
				if(retoAux.contadorFb)
						fbC.push({x:i, y:retoAux.contadorFb});
					else{
							fbC.push({x:i, y:0});
						}
					if(retoAux.contadorTwitter)
						twC.push({x:i, y:retoAux.contadorTwitter});
					else{
						twC.push({x:i, y:0});
						}
					fbEle.push(retoAux.challengeName);
			});	
			this.setState({challenges: result, fbChart:  fbC, fbElements: fbEle, twChart: twC});
		})
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
		//Cargo todos los retos en Participacion que esten despues de la fecha actual
		const retosP = this.state.retosParticipacion.map((reto, i) =>{
			return (
				<div key={reto._id} style={{width: "80%"}} >
					<PanelGroup accordion id="accordion-example">	
						<Panel eventKey= {i} >
					    	<Panel.Heading>
					      		<Panel.Title toggle>{reto.challengeName}</Panel.Title>
					    	</Panel.Heading>
					    	<Panel.Body collapsible>
					    		<p>Puntos al ganar el reto: {reto.points}</p>
				          		<p>Descripción: {reto.description}</p>
						      	<p>Fecha en que termina: {reto.endDate}</p>
						      	<SocialButton reto={reto} nombre={reto.challengeName} provider={this.state.provider} esCampania={false} idE={reto._id} user={this.state.userId} puntos={this.state.score} />
					    	</Panel.Body>
					  	</Panel>
					</PanelGroup>
				</div>
			)
		});
		//Cargo todos los retos que esten ganados por la cuenta
		const retosG = this.state.retosGanados.map((reto, i) =>{
			return (
				<div key={reto._id} style={{width: "80%"}} >
					<PanelGroup accordion id="accordion-example">	
						<Panel eventKey= {i} >
					    	<Panel.Heading>
					      		<Panel.Title toggle>{reto.challengeName}</Panel.Title>
					    	</Panel.Heading>
					    	<Panel.Body collapsible>
					    		<p>Puntos ganados: {reto.points}</p>
				          		<p>Descripción: {reto.description}</p>
					    	</Panel.Body>
					  	</Panel>
					</PanelGroup>
				</div>
			)
		});
		//Cargo todos los retos que esten despues de la fecha actual
		const retosTodos = this.state.challenges.map((reto, i) =>{
			return (
				<div key={reto._id} style={{width: "80%"}} >
					<PanelGroup accordion id="accordion-example">	
						<Panel eventKey= {i} >
					    	<Panel.Heading>
					      		<Panel.Title toggle>{reto.challengeName}</Panel.Title>
					    	</Panel.Heading>
					    	<Panel.Body collapsible>
					    		<p>Puntos al ganar el reto: {reto.points}</p>
				          		<p>Descripción: {reto.description}</p>
						      	<p>Fecha en que termina: {reto.endDate}</p>
						      	<ChallengeModel newReto={reto} allRetos={this.state.challenges} user={this.state.userId} />
					    	</Panel.Body>
					  	</Panel>
					</PanelGroup>
				</div>
			)
		});
		const listElements = this.state.fbElements.map((nombre, i) => {
			return (
				<div key={i} style={{ width: "80%" }} >
					<h4><span  style={{color:"Tomato"}}> {i}</span> - {nombre}</h4>
				</div>
			)
		});
		return(
	        <div className= "container">
	        	<div className="row">			    		
		            	{retosTodos}
		    	</div>	
		    	<div className="col">
			    	<Button bsStyle="success" bsSize="large" onClick={this.handleShow} style={{margin: "0 20px 0 0"}}>
							Ver Participaciones
					</Button>
			    	<Button bsStyle="success" bsSize="large"onClick={this.handleShowWin}>
						Ver Completados
					</Button>
				</div>

				<div className= "modal">
					<Modal show={this.state.show} onHide={this.handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Retos en los que esta participando.</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{retosP}
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.handleClose}>Close</Button>
						</Modal.Footer>
					</Modal>
				</div>

				<div className= "modal">
					<Modal show={this.state.showW} onHide={this.handleCloseWin}>
						<Modal.Header closeButton>
							<Modal.Title>Retos ganados.</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{retosG}
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.handleCloseWin}>Close</Button>
						</Modal.Footer>
					</Modal>
				</div>
				<div className= "title-separator" style={{width:"93.5%", margin:"10px -15px"}}>
							<h3 id="campanha">Estadisticas por Retos</h3>
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


export default Challenge;