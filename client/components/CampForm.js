import React, {Component} from 'react';
import { HelpBlock, FormControl, ControlLabel, Button, FormGroup} from 'react-bootstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react';


class CampForm extends Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			nombre: '',
			direccion: '',
			organizador: '',
			fecha: '',
			telefono:'',
			email:'',
			descripcion: '',
			habilitada: false,
			hashtag: '',
			contadorFb: 0,
			contadorTwitter: 0,
			mapa: true,
			lat: '',
			long: '',
			acc: ''
		};
		this.agregarCampana = this.agregarCampana.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.mapaActivo = this.mapaActivo.bind(this);
	}

	agregarCampana(e){
		var re = / /gi;
		this.state.hashtag = "#AmbientaTEC_" + String(this.state.nombre).replace(re,"");
		console.log(this.state);
		fetch('/api/campanas',{
			method: 'POST',
			body: JSON.stringify(this.state),
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        }
		})
		.then(res => res.json())
		.then (data => {
			this.setState({
				nombre: '',
				direccion: '',
				organizador: '',
				fecha: '',
				telefono:'',
				email:'',
				descripcion: '',
				habilitada: false,
				hashtag: '',
				contadorFb: 0,
				contadorTwitter: 0,
				lat: '',
				long: ''
			});
		})
		.catch(err => console.error(err));
		e.preventDefault();
	}

	componentDidMount() {
		this.setState({
			organizador: this.props.usuario.name,
			email: this.props.usuario.email
		})
		navigator.geolocation.getCurrentPosition(position=>
			this.setState({
			  lat:position.coords.latitude,
			  long:position.coords.longitude,
			  acc: position.coords.accuracy
			})),(error=>console.log(error)),{maximumAge:600000, timeout:5000, enableHighAccuracy: true};
	}
	
	handleChange(e){
		const {name, value} = e.target;
		this.setState({
			[name]: value
		});
	}
	mapaActivo(e){
		this.setState({
			mapa: !this.state.mapa
		});
	}

  render() {
	const style = {
		height: "400px",
		overflow: "hidden"
	};
	const {nombre, direccion, fecha, telefono, descripcion, habilitada, hashtag} = this.state;
	const coords = {lat: this.state.lat, lng: this.state.long};
    return (
      <form className= "form-campanas" 
      		onSubmit={this.agregarCampana}>
        <FormGroup role="form">
        	<ControlLabel>Nombre de campaña</ControlLabel>
          	<FormControl
            	type="text"
            	placeholder="Digite el nombre"
            	className="form-control"
            	name="nombre"
            	value={nombre}
            	onChange = {this.handleChange}/>
            <ControlLabel>Direccion</ControlLabel>
            <FormControl
            	type="text"
            	placeholder="Digite la direccion"
            	className="form-control"
            	name="direccion"
            	value={direccion}
            	onChange = {this.handleChange}/>
            <ControlLabel>Seleccione la fecha</ControlLabel>
            <FormControl
            	type="date"
            	placeholder=""
            	name="fecha"
            	className="form-control"
            	value={fecha}
            	onChange = {this.handleChange}/>
            <ControlLabel>Telefono</ControlLabel>
            <FormControl
            	type="number"
            	placeholder="Celular"
            	className="form-control"
            	name="telefono"
            	value={telefono}
            	onChange = {this.handleChange}/>
            <ControlLabel>Descripción</ControlLabel>
            <FormControl
            	type="text"
            	placeholder="Detalles"
            	className="form-control"
            	name="descripcion"
            	value={descripcion}
            	onChange = {this.handleChange}/>
			<ControlLabel>Ubicación aproximada</ControlLabel>
			
			<FormControl
				type="checkbox"
				checked
				placeholder="Detalles"
				onChange={this.mapaActivo}/>
			{this.state.mapa?
			<div className="map">
				<Map google={this.props.google} zoom={10} style={style} initialCenter={{lat:9.934739,lng:-84.087502}}>
					<Marker position={coords}/>
				</Map>
			</div>
			:
			<h4>Active el checkbox para mostrar el mapa</h4>
			}
          	<FormControl.Feedback />
        </FormGroup>
		<button  type="submit" className="btn light-blue darken-4">
			Enviar
		</button>
      </form>
	  
    );
  }

}

export default GoogleApiWrapper({
	apiKey: ("AIzaSyAAkugeeJzvEG8taA8Jq1-jhFHhd-Mlygw"),
  })(CampForm)