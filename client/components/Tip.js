import React, {Component} from 'react';
import { Panel, Button, Checkbox } from 'react-bootstrap';

class Tip extends Component{
	constructor (){
		super();
		this.state = {
			nombre: '',
			foto: '',
			descripcion: '',
			tips: []
		};
		this.participar = this.participar.bind(this);
	}
	componentDidMount() {
	    this.fetchTips();
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

	fetchTips() {
	    fetch('/api/tips')
	      .then(res => res.json())
	      .then(data => {
	        this.setState({tips: data});
	        console.log(this.state.campanas);
	      });
	}


	render() {
		const tips = this.state.tips.map((tip, i) =>{
			return (
				<div key={tip._id} style={{width: "80%"}} >	
					<Panel bsStyle="success">
				    	<Panel.Heading>
				      		<Panel.Title componentClass="h3">{tip.nombre}</Panel.Title>
				    	</Panel.Heading>
				    	<Panel.Body>
				    		<p>{tip.foto}</p>
				    		<p>{tip.description}</p>
					      	<form>
					      		<p>      
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
		            	{tips}
		    	</div>	
	        </div>	
		)
	}

}


export default Tip;