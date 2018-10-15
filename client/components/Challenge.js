import React, {Component} from 'react';
import { Modal, Panel, PanelGroup, Button } from 'react-bootstrap';

import ChallengeModel from './ChallengeModel';
import ChallengeWin from './ChallengeWin';

class Challenge extends Component{
	constructor(props, context){
		super(props, context);

		this.state = {
			aux: false,
			userId: '',
			challenges:[],
			challengesAux:[],
			retosParticipacion: [],
			retosGanados:[],
			show: false,
			showW: false,
			flag: false,
			flagWin: false
		};
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleShowWin = this.handleShowWin.bind(this);
		this.handleCloseWin = this.handleCloseWin.bind(this);
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
		this.fetchChallengesW(usuario._id);		
		this.fetchChallenges();	    
	}

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
			})

	}

	fetchChallenges() {
	    fetch('/api/challenges')
	    .then(res => res.json())
	    .then(data => {
	    	var retosQuitar = this.state.retosParticipacion.concat(this.state.retosGanados);
	    	var result = [];
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
			});	
			this.setState({challenges: result});
		})
	}

	render() {
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
								<a href={"https://twitter.com/intent/tweet?button_hashtag=RetoCompletado_"+reto.challengeName+"&ref_src=twsrc%5Etfw"} className="twitter-hashtag-button" data-show-count="false"><img src="http://static.sites.yp.com/var/m_6/6b/6bd/11192116/1470938-twitter.png?v=6.5.1.37806" alt="Twitter"/>Tweet RetoCompletado_{reto.challengeName}</a>
								<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
						      	<ChallengeWin newReto={reto} user={this.state.userId} />
					    	</Panel.Body>
					  	</Panel>
					</PanelGroup>
				</div>
			)
		});

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

		return(

	        <div className= "container">
	        	<div className="row">			    		
		            	{retosTodos}
		    	</div>	
		    	<div className="col">
			    	<Button bsStyle="success" bsSize="large" onClick={this.handleShow}>
							Ver Participaciones
					</Button>
			    	<Button bsStyle="success" bsSize="large"onClick={this.handleShowWin} >
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

	        </div>	
		)
	}

}


export default Challenge;