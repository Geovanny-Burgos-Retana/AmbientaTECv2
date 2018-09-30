import React, {Component} from 'react';
import Navigation from './components/Navigation';
import {Carousel, Modal, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { auth, providerTwitter, providerFacebook } from '../firebase.js';
import { HelpBlock, FormControl, ControlLabel, FormGroup} from 'react-bootstrap';
import  '../style/style.css';

//SubComponents
import CampForm from './components/CampForm';
import Challenge from './components/Challenge';
import Campaign from './components/Campaign';
import SocialLogin from './components/SocialLogin';

// Esto es JSX: Consiste en javascript con html
//Se necesita el traductor Babel
class App extends Component{
	
	constructor(props, context) {
		super(props, context);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.loginTwitter = this.loginTwitter.bind(this); // <-- add this line
		this.loginFacebook = this.loginFacebook.bind(this); // <-- add this line
		this.logout = this.logout.bind(this); // <-- add this line
		this.insert = this.insert.bind(this);
		this.userExist = this.userExist.bind(this);
		this.escogerTip = this.escogerTip.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
				_id: "",
				show: false,
				isLoggedIn: false,
				provider: "",
				userID: "",
				name: "",
				email: "",
				picture: "",
				contador: 0,
				retosParticipacion: [],
				retosGanados: [],
				tips:[],
				recomendaciones:[],
				tipActual:[],
				Hashtag1: 'fun',
				Hashtag2: 'trash'
		};
  	}

  	handleClose() {
    	this.setState({ show: false });
	  }
	  
	handleChange(e){
		const {name, value} = e.target;
		this.setState({
			[name]: value
		});
	}

  	handleShow() {
    	this.setState({ show: true });
	}

	fetchTips() {
	    fetch('/api/tips')
	      .then(res => res.json())
	      .then(data => {
	        this.setState({tips: data});
	        
	      });
	}
	
	fetchRecomendaciones() {
	    fetch('/api/recomendaciones')
	      .then(res => res.json())
	      .then(data => {
	        this.setState({recomendaciones: data});
	        
	      });
	}
	userExist(user, register){
		fetch(`/api/cuentas/${user.uid}`, {
				method: 'GET',
				headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
				}
		})	.then(res => res.json())
			.then(data => 
				{   if(data && !register){
						this.setState({
								_id: data._id,
								isLoggedIn: true,
								provider: data.provider,
								userID: data.uid,
								name: data.name,
								email: data.email,
								picture: user.photoURL,
								retosParticipacion: data.retosParticipacion,
								contador:0
						}); 


					return true;
				}
				if(register && !data){
						const user_data = ({
								provider: user.providerId,
								userID: user.uid,
								name: user.displayName,
								email: user.email,
								retosParticipacion: [],
								retosGanados:[],
								contador:0
						});
						fetch('/api/cuentas', {
								method: 'POST',
								body: JSON.stringify(user_data),
								headers:{ 
										'Accept': 'application/json',
										'Content-Type':'application/json'
								}
						}).then(res => console.log("User agregado con exito: "+res))
						.catch(err => console.error("ERROR al registrar el usuasrio: "+err))
						this.setState({
								isLoggedIn: true,
								provider: user.providerId,
								userID: user.uid,
								name: user.displayName,
								email: user.email,
								picture: user.photoURL,
								retosParticipacion: [],
								retosGanados:[],
								contador:0
						}); 
						return false;
				}
				if(data && register)
						console.log("Este usuario no puede ser registrado por que ya lo está.");
						return true;
				})
		.catch(err => console.error(err))

}
	
	componentDidMount() {
			auth.onAuthStateChanged((user) => {
					if (user) {
							const dataUser = user.providerData.find(function(element){
									return element="providerId";
							});
							this.userExist(dataUser, false);
					} 
					else{
							console.log("No hay nadie conectado.");
							this.setState({ isLoggedIn: false });
					}
			});
			this.fetchTips();
			this.fetchRecomendaciones();
	}

	logout() {
			auth.signOut()
			.then(() => {
					this.setState({
							isLoggedIn: false
					});
			});
	}
	insert(result){
			const user = result.user;
			const data = user.providerData.find(function(element){
					return element="providerId";
			});
			this.userExist(data, true);
	}

	loginTwitter() {
			auth.signInWithPopup(providerTwitter).then((result) => {
					this.insert(result);
			});
	}

	loginFacebook() {
			auth.signInWithPopup(providerFacebook).then((result) => {
					this.insert(result);
			});
	}

	escogerTip(){
    	if(this.state.contador <= this.state.tips.length()){
    		this.setState({
				contador: this.state.contador +1,
				tipActual: this.state.tips.map((tip, i) =>{
					console.log(this.state.tips.length)
					if (i === this.state.contador){
						console.log("Dentro IFFF");
						return (
							<div key={tip._id} style={{width: "80%"}} >	
								<p>{tip.nombre}</p>
								<img className="element-img" src={tip.foto} alt="Info"/>
								<p>{tip.descripcion}</p>

							</div>
						)
					}
				})
			});
    	}else{
    		this.setState({
    			contador: 0
    		})
    	}
		

		
	}

	render() {
		const tips = this.state.tips.map((tip, i) =>{

			return (
		  		<Carousel.Item key={tip._id}>
		    		<img width={900} height={500} alt="900x500" src={tip.foto} />
		    		<Carousel.Caption>
		      			<h3>{tip.nombre}</h3>
		      			<p>{tip.descripcion}</p>
		    		</Carousel.Caption>
		  		</Carousel.Item>				
			)
		});

		const recomendaciones = this.state.recomendaciones.map((tip, i) =>{
			return (
		  		<Carousel.Item key={tip._id}>
		    		<img width={900} height={500} alt="900x500" src={tip.foto} />
		    		<Carousel.Caption>
		      			<h3>{tip.nombre}</h3>
		      			<p>{tip.descripcion}</p>
		    		</Carousel.Caption>
		  		</Carousel.Item>				
			)
		});

		return(
			<div className ="App" id="App">
				<div className="wrapper">
            	{this.state.isLoggedIn ?
                <div className="user-logged">	
                    <img src={this.state.picture} alt={this.state.name} />
                    <p>Estás logueado con {this.state.provider}</p>
                    <p>Bienvenido {this.state.name}</p>
                 <p><strong>Email:</strong> {this.state.email} </p>
                    <button onClick={this.logout}>LOG OUT</button>
                </div>   
                :
                <div>
                    <button className="btn-twitter" onClick={this.loginTwitter}>
                          LOGIN WITH TWITTER
                    </button>
                    <button className="btn-facebook" onClick={this.loginFacebook}>
                          LOGIN WITH FACEBOOK
                    </button>
                </div>         
            	}
				<img className="img-portada" src="https://noticias.utpl.edu.ec/sites/default/files/imagenes_editor/gestion_ambiental-02.jpg" alt="Portada" />
				<Navbar id="navver" inverse collapseOnSelect >
					<Navbar.Header>
				    	<Navbar.Brand>
				      		<a href="#brand">AmbientaTEC</a>
				    	</Navbar.Brand>
				    	<Navbar.Toggle />
				  	</Navbar.Header>
				  		<Navbar.Collapse>
					    	<Nav>
					      		<NavItem eventKey={1} href="#hashtag">
					        		Hashtag
					      		</NavItem>
					      		<NavItem eventKey={2} href="#campanha">
					        		Campañas
					      		</NavItem>
								<NavItem eventKey={2} href="#reto">
					        		Challenges
					      		</NavItem>
					    	</Nav>
				  		</Navbar.Collapse>
				</Navbar>
				{this.state.isLoggedIn?
					<div className="content">
						<div className="element-wrapper">
							<a><img className="element-icon" src="https://cdn1.iconfinder.com/data/icons/material-audio-video/22/loop-512.png" alt="Report"/></a>
							<p className="element-title">Consejo del Día</p>
							<a><img className="element-icon" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/info-512.png" alt="Info"/></a>
							<Carousel key="1">
								{tips}
							</Carousel>
						</div>

						<div className="element-wrapper">
							<a><img className="element-icon" src="https://cdn1.iconfinder.com/data/icons/material-audio-video/22/loop-512.png" alt="Report"/></a>
							<p className="element-title">Recomendaciones</p>
							<a><img className="element-icon" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/info-512.png" alt="Info"/></a>
							<Carousel key="2">
								{recomendaciones}
							</Carousel>
						</div>
						<div className= "title-separator">
							<a href="#App"><img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/65-512.png" alt="Hashtag"/></a>
							<h3 id="hashtag">Generar Hashtag</h3>
						</div>
						<form className= "form-campanas">
							<FormGroup role="form">
								<ControlLabel>Hashtag</ControlLabel>
								<br/>
								<label className="label1">#More</label>
								<FormControl className="selects" componentClass="select" placeholder="green" name="Hashtag1" onChange={this.handleChange}>
									<option value="fun">fun</option>
									<option value="life">life</option>
									<option value="time">time</option>
								</FormControl>
								<label className="label2">Less</label>
								<FormControl className="selects" componentClass="select" placeholder="trash" name="Hashtag2"onChange={this.handleChange}>
									<option value="trash">trash</option>
									<option value="plastic">plastic</option>
									<option value="paper">paper</option>
									<option value="cans">cans</option>
								</FormControl>
								
						<a href={"https://twitter.com/intent/tweet?button_hashtag=AmbientaTEC_more_"+this.state.Hashtag1+"_less_"+this.state.Hashtag2+"&ref_src=twsrc%5Etfw"} className="twitter-hashtag-button" data-show-count="false"><img src="http://static.sites.yp.com/var/m_6/6b/6bd/11192116/1470938-twitter.png?v=6.5.1.37806" alt="Twitter"/>Tweet #AmbientaTEC_more_{this.state.Hashtag1}_less_{this.state.Hashtag2}</a>
						<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script><FormControl.Feedback />
							</FormGroup></form>
						<div className= "title-separator">
							<a href="#App"><img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/65-512.png" alt="Campañas"/></a>
							<h3 id="campanha">Campañas</h3>
						</div>
						<h5>Si desea enviar una solicitud para organizar una campaña presione el siguiente boton.</h5>
						<Button bsStyle="success" bsSize="large" onClick={this.handleShow}>
							Enviar solicitud
						</Button>		 
						       	
						<div className= "container">
							<Modal show={this.state.show} onHide={this.handleClose}>
								<Modal.Header closeButton>
									<Modal.Title>Solicitar campaña</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<CampForm usuario={this.state}/>
								</Modal.Body>
								<Modal.Footer>
									<Button onClick={this.handleClose}>Close</Button>
								</Modal.Footer>
							</Modal>
						</div>

						<h5>Puede participar en cualquiera de las siguientes campañas, solo marquela con un check.</h5>			    
						<Campaign/>

						<div className= "title-separator">
							<a href="#App"><img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/65-512.png" alt="Retos"/></a>
							<h3 id="reto">Challenges</h3>
						</div>	 
						       	
						<h5>Puede participar en cualquiera de los siguientes retos.</h5>			    
						<Challenge usuario={this.state} />

					</div>
				:
					<div className="not-connected">
						<p className="title-not-connected" >Parece que todavía no estás conectado :(</p>
						<p className="not-connected-text">Para acceder a este contenido deberás conectarte con alguna de tus redes sociaes, Facebook o Twitter.</p>
					</div>
				}
				</div>
				<footer>
					<p id="footer">Desarrollado por Josué Fernández, Wilbert Gonzalez y Geovanny Burgos</p>
				</footer>
			</div>
		)
	}
}

export default App;