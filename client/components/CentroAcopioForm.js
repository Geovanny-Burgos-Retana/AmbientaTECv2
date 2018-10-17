import React, {Component} from 'react';
import { HelpBlock, FormControl, ControlLabel, Button, FormGroup} from 'react-bootstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react';


class CentroAcopioForm extends Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			nombre: '',
			direccion: '',
			organizador: '',
			fechaDescripcion: '',
			telefono:'',
			email:'',
			descripcion: '',
			habilitada: false,
			mapa: true,
			basura: '',
			lista: ["papel","plastico","aluminio","carton","vidrio","tetrapack", "electronicos"],
			lat: '',
			long: '',
			acc: ''
		};
		this.agregarCentro = this.agregarCentro.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.mapaActivo = this.mapaActivo.bind(this);
		this.generateSelectIn = this.generateSelectIn.bind(this);
		this.selected = this.selected.bind(this);
	}

	agregarCentro(e){
		console.log(this.state);
		fetch('/api/centros',{
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
				fechaDescripcion: '',
				telefono:'',
				email:'',
				descripcion: '',
				habilitada: false,
				mapa: true,
				basura: '',
				lista: ["papel","plastico","aluminio","carton","vidrio","tetrapack"],
				lat: '',
				long: '',
				acc: ''
			});
		})
		.catch(err => console.error(err));
		e.preventDefault();
	}

	componentDidMount() {
		//const uId = this.props.usuario.userID;
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
	selected(e){
		const {name, value} = e.target;
		//this.state.basura.push(value);
		this.setState({
				basura: this.state.basura+value+" "
		})
		console.log(this.state.basura);

		//var index = this.state.lista.indexOf(item);
		//if (index !== -1) this.state.lista.splice(index, 1);
		
	}


	generateSelectIn(){
		const items = [];
		for (let i = 0; i < this.state.lista.length; i++) {  
			items.push(<option value={this.state.lista[i]}>{this.state.lista[i]}</option>)
		}
		return items;
	}

  render() {
	const style = {
		height: "400px",
		overflow: "hidden"
	};
	const {nombre, direccion, fechaDescripcion, telefono, descripcion, habilitada, basura} = this.state;
	const coords = {lat: this.state.lat, lng: this.state.long};
    return (
      <form className= "form-campanas" 
      		onSubmit={this.agregarCentro}>
        <FormGroup role="form">
        	<ControlLabel>Nombre del Centro de Acopio</ControlLabel>
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
            	type="text"
            	placeholder="Lunes a Viernes, 8 a 3"
            	name="fechaDescripcion"
            	className="form-control"
            	value={fechaDescripcion}
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
			<FormGroup controlId="formControlsSelect">
			<ControlLabel>Basuras a recolectar</ControlLabel>
			<FormControl componentClass="select" placeholder="select" onChange={this.selected}>
				<option value="" disabled>...</option>
				{
					this.generateSelectIn()
				}
			</FormControl>
			</FormGroup>
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
  })(CentroAcopioForm)