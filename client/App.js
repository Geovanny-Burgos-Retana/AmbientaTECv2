import React, { Component } from 'react';
import Navigation from './components/Navigation';
import { Carousel, Modal, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { auth, providerTwitter, providerFacebook } from '../firebase.js';
import { HelpBlock, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import '../style/style.css';

//SubComponents
import CampForm from './components/CampForm';
import Challenge from './components/Challenge';
import CentroAcopio from './components/CentroAcopio';
import CentroAcopioForm from './components/CentroAcopioForm';
import Campaign from './components/Campaign';
import SocialLogin from './components/SocialLogin';
import Empresa from './components/Empresa';
import ControladorSocial from './components/ControladorSocial';

// Esto es JSX: Consiste en javascript con html
//Se necesita el traductor Babel
class App extends Component {

	constructor(props, context) {
		super(props, context);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleShowLogros = this.handleShowLogros.bind(this);
		this.handleCloseLogros = this.handleCloseLogros.bind(this);
		this.loginTwitter = this.loginTwitter.bind(this); // <-- add this line
		this.loginFacebook = this.loginFacebook.bind(this); // <-- add this line
		this.logout = this.logout.bind(this); // <-- add this line
		this.insert = this.insert.bind(this);
		this.userExist = this.userExist.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleshowCentros = this.handleshowCentros.bind(this);

		this.state = {
			_id: "",
			show: false,
			isLoggedIn: false,
			provider: "",
			userID: "",
			score: 0,
			name: "",
			email: "",
			picture: "",
			contador: 0,
			retosParticipacion: [],
			retosGanados: [],
			campanias: [],
			tips: [],
			recomendaciones: [],
			tipActual: [],
			Hashtag1: 'fun',
			Hashtag2: 'trash',
			showLogros: false,
			showCentro: false,
			logros: []
		};
	}

	handleClose() {
		this.setState({ show: false });
	}
	handleCloseLogros() {
		this.setState({ showLogros: false });
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}

	handleshowCentros() {
		this.setState({ showCentro: !this.state.showCentro });
	}
	handleShow() {
		this.setState({ show: true });
	}

	handleShowLogros() {
		this.setState({ showLogros: true });
	}
	fetchTips() {
		fetch('/api/tips')
			.then(res => res.json())
			.then(data => {
				this.setState({ tips: data });

			});
	}


	fetchLogros() {
		fetch('/api/logros')
			.then(res => res.json())
			.then(data => {
				this.setState({ logros: data });

			});
	}

	fetchRecomendaciones() {
		fetch('/api/recomendaciones')
			.then(res => res.json())
			.then(data => {
				this.setState({ recomendaciones: data });

			});
	}
	userExist(user, register) {
		fetch(`/api/cuentas/${user.uid}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(data => {
				if (data && !register) {
					this.setState({
						_id: data._id,
						isLoggedIn: true,
						score: data.score,
						provider: data.provider,
						userID: data.uid,
						name: data.name,
						email: data.email,
						picture: user.photoURL,
						retosParticipacion: data.retosParticipacion,
						campanias: data.campanias,
						contador: 0
					});


					return true;
				}
				if (register && !data) {
					const user_data = ({
						provider: user.providerId,
						userID: user.uid,
						name: user.displayName,
						email: user.email,
						retosParticipacion: [],
						retosGanados: [],
						campanias: [],
						contador: 0
					});
					fetch('/api/cuentas', {
						method: 'POST',
						body: JSON.stringify(user_data),
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						}
					}).then(res => console.log("User agregado con exito: " + res))
						.catch(err => console.error("ERROR al registrar el usuasrio: " + err))
					this.setState({
						isLoggedIn: true,
						score: 0,
						provider: user.providerId,
						userID: user.uid,
						name: user.displayName,
						email: user.email,
						picture: user.photoURL,
						retosParticipacion: [],
						retosGanados: [],
						campanias: [],
						contador: 0
					});
					return false;
				}
				if (data && register)
					console.log("Este usuario no puede ser registrado por que ya lo está.");
				return true;
			})
			.catch(err => console.error(err))
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				const dataUser = user.providerData.find(function (element) {
					return element = "providerId";
				});
				this.userExist(dataUser, false);
			}
			else {
				console.log("No hay nadie conectado.");
				this.setState({ isLoggedIn: false });
			}
		});
		this.fetchTips();
		this.fetchRecomendaciones();
		this.fetchLogros();
	}

	logout() {
		auth.signOut()
			.then(() => {
				this.setState({
					isLoggedIn: false
				});
			});
	}
	insert(result) {
		const user = result.user;
		const data = user.providerData.find(function (element) {
			return element = "providerId";
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

	render() {
		const tips = this.state.tips.map((tip, i) => {
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

		const logros = this.state.logros.map((logro, i) => {
			if (logro.score <= this.state.score) {
				return (
					<div key={logro._id} style={{ width: "80%" }} >
						<Panel bsStyle="success">
							<Panel.Heading>
								<Panel.Title componentClass="h3">{logro.nombre}</Panel.Title>
							</Panel.Heading>
							<Panel.Body>
								<div className="logro_content">
									<img width={100} height={100} alt="200x100" src={logro.img} />
								</div>
							</Panel.Body>
						</Panel>
					</div>
				)
			}

		});

		const recomendaciones = this.state.recomendaciones.map((tip, i) => {
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

		return (
			<div className="App" id="App">
				<div className="wrapper">
					{this.state.isLoggedIn ?
						<div className="user-logged">
							<img src={this.state.picture} alt={this.state.name} />
							<p>Bienvenido {this.state.name}</p>
							<p><strong>Email:</strong> {this.state.email} </p>
							<p><strong>Score:</strong> {this.state.score}</p>
							<button onClick={this.handleShowLogros}>Ver Logros</button>
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

					<div className="container">
						<Modal show={this.state.showLogros} onHide={this.handleCloseLogros} style={{ maxHeight: "100%" }}>
							<Modal.Header closeButton>
								<Modal.Title>Logros</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								{logros}
							</Modal.Body>
							<Modal.Footer>
								<Button onClick={this.handleCloseLogros}>Close</Button>
							</Modal.Footer>
						</Modal>
					</div>

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
								<NavItem eventKey={2} href="#centro">
									Centro de Acopio
					      		</NavItem>
								<NavItem eventKey={4} href="#seccion_empresas">
									Empresas
								</NavItem>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
					{this.state.isLoggedIn ?
						<div className="content">
							<div className="element-wrapper">
								<a><img className="element-icon" src="https://cdn1.iconfinder.com/data/icons/material-audio-video/22/loop-512.png" alt="Report" /></a>
								<p className="element-title">Consejo del Día</p>
								<a><img className="element-icon" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/info-512.png" alt="Info" /></a>
								<Carousel key="1">
									{tips}
								</Carousel>
							</div>

							<div className="element-wrapper">
								<a><img className="element-icon" src="https://cdn1.iconfinder.com/data/icons/material-audio-video/22/loop-512.png" alt="Report" /></a>
								<p className="element-title">Recomendaciones</p>
								<a><img className="element-icon" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/info-512.png" alt="Info" /></a>
								<Carousel key="2">
									{recomendaciones}
								</Carousel>
							</div>
							<div className="title-separator">
								<a href="#App"><img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/65-512.png" alt="Hashtag" /></a>
								<h3 id="hashtag">Generar Hashtag</h3>
							</div>
							<form className="form-campanas">
								<FormGroup role="form">
									<ControlLabel>Hashtag</ControlLabel>
									<br />
									<label className="label1">#More</label>
									<FormControl className="selects" componentClass="select" placeholder="green" name="Hashtag1" onChange={this.handleChange}>
										<option value="fun">fun</option>
										<option value="life">life</option>
										<option value="time">time</option>
									</FormControl>
									<label className="label2">Less</label>
									<FormControl className="selects" componentClass="select" placeholder="trash" name="Hashtag2" onChange={this.handleChange}>
										<option value="trash">trash</option>
										<option value="plastic">plastic</option>
										<option value="paper">paper</option>
										<option value="cans">cans</option>
									</FormControl>
									<ControladorSocial provider={this.state.provider} Hashtag1={this.state.Hashtag1} Hashtag2={this.state.Hashtag2} />
								</FormGroup></form>
							<div className="title-separator">
								<a href="#App"><img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/65-512.png" alt="Campañas" /></a>
								<h3 id="campanha">Campañas</h3>
							</div>
							<h5>Si desea enviar una solicitud para organizar una campaña presione el siguiente boton.</h5>
							<Button bsStyle="success" bsSize="large" onClick={this.handleShow} style={{ margin: "20px" }}>
								Enviar solicitud
						</Button>

							<div className="container">
								<Modal show={this.state.show} onHide={this.handleClose} style={{ maxHeight: "100%" }}>
									<Modal.Header closeButton>
										<Modal.Title>Solicitar campaña</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<CampForm usuario={this.state} />
									</Modal.Body>
									<Modal.Footer>
										<Button onClick={this.handleClose}>Close</Button>
									</Modal.Footer>
								</Modal>
							</div>

							<h5>Puede participar en cualquiera de las siguientes campañas, solo marquela con un check.</h5>
							<Campaign usuario={this.state} />
							<div className="title-separator">
								<a href="#App"><img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/65-512.png" alt="Retos" /></a>
								<h3 id="centro">Centro de Acopio</h3>
							</div>
							<h5>Si desea enviar una solicitud para organizar un centro de acopio presione el siguiente boton.</h5>
							<Button bsStyle="success" bsSize="large" onClick={this.handleshowCentros} style={{ margin: "20px" }}>
								Enviar Solicitud
						</Button>

							<div className="container">
								<Modal show={this.state.showCentro} onHide={this.handleshowCentros} style={{ maxHeight: "100%" }}>
									<Modal.Header closeButton>
										<Modal.Title>Solicitar Centro de Acopio</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<CentroAcopioForm usuario={this.state} />
									</Modal.Body>
									<Modal.Footer>
										<Button onClick={this.handleshowCentros}>Close</Button>
									</Modal.Footer>
								</Modal>
							</div>
							<CentroAcopio usuario={this.state} />
							<div className="title-separator">
								<a href="#App"><img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/65-512.png" alt="Retos" /></a>
								<h3 id="reto">Challenges</h3>
							</div>

							<h5>Puede participar en cualquiera de los siguientes retos.</h5>
							<Challenge usuario={this.state} />

							<div className="title-separator">
								<a href="#App"><img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/65-512.png" alt="Empresas" /></a>
								<h3 id="seccion_empresas">Empresas</h3>
							</div>

							<Empresa usuario={this.state} />

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