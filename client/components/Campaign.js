import React, {Component} from 'react';
import { Panel, Button, Checkbox } from 'react-bootstrap';

class Campaign extends Component{
	constructor (){
		super();
		this.state = {
			nombre: '',
			direccion: '',
			organizador: '',
			fecha: '',
			telefono:'',
			email:'',
			descripcion: '',
			campanas:[],
			habilitada: false,
			hashtag: ''
		};
		this.participar = this.participar.bind(this);
	}
	componentDidMount() {
	    this.fetchCampanas();
	}

	participar(event, idCampana, idUser){
		console.log('Checkbox checked:', (event.target.checked));
		console.log('Campana:', idCampana);
		if (event.target.checked){
			console.log('Entra IF');
			fetch('api/participantes', {
				method: 'POST',
						body: JSON.stringify({
							organizador: idUser,
							idCamp: idCampana
						}),
		        headers: {
		          'Accept': 'application/json',
		          'Content-Type': 'application/json'
		        }
			})
			.then(res => res.json())
			.then (data => {
			M.toast({html: 'Se espera su participacion.'});
			})
			.catch(err => console.error(err));
		}else{
			console.log('ELSE');
		    if(confirm('Quieres cancelar la asistencia?')) {
		      fetch(`/api/participantes/${idUser}`, {
		        method: 'DELETE',
		        headers: {
		          'Accept': 'application/json',
		          'Content-Type': 'application/json'
		        }
		      })
		        .then(res => res.json())
		        .then(data => {
		          console.log(data);
		          M.toast({html: 'Asistencia cancelada'});
		          this.fetchTasks();
		        });
		    }
		}
		
		//.catch(err => console.error(err));
		//e.preventDefault();
	}

	fetchCampanas() {
	    fetch('/api/campanas')
	      .then(res => res.json())
	      .then(data => {
	        this.setState({campanas: data});
	        console.log(this.state.campanas);
	      });
	}


	render() {
		const campanas = this.state.campanas.map((campana, i) =>{
			return (
				<div key={campana._id} style={{width: "80%"}} >	
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
					      	<form>
					      		<p>      
					      			<label>
					      			    <Checkbox inline onChange={(e) =>
						                	//lo que debo pasar es el idUser
						                	this.participar(e, campana._id, campana.organizador)}
						                	disabled={this.state.disabled}>
									    	Participar
									    </Checkbox>
						            </label>
					      		</p>
					      	</form>
				    	</Panel.Body>
				  	</Panel>
				</div>
			)
		});
		return(

	        <div className= "container">
	        	<div className="row">			    		
		            	{campanas}
		    	</div>	
	        </div>	
		)
	}

}


export default Campaign;