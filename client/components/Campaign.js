import React, { Component } from 'react';
import { Panel, Button, Checkbox } from 'react-bootstrap';

class Campaign extends Component {
	constructor() {
		super();
		this.state = {
			nombre: '',
			direccion: '',
			organizador: '',
			fecha: '',
			telefono: '',
			email: '',
			descripcion: '',
			campanas: [],
			habilitada: false,
			hashtag: ''
		};
		this.participar = this.participar.bind(this);
	}
	componentDidMount() {
		this.fetchCampanas();
		console.log(this.props);
	}

	participar(event, idCampana) {
		if (event.target.checked) {
			fetch(`api/cuentas/addCampania/${this.props.usuario._id}`, {
				method: 'PUT',
				body: JSON.stringify({
					campania: idCampana
				}),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
				.then(res => res.json())
				.then(data => {
					console.log(data);
				})
				.catch(err => console.error(err));
		} else {
			if (confirm('Quieres cancelar la asistencia?')) {
				fetch(`/api/cuentas/delCampania/${this.props.usuario._id}`, {
					method: 'PUT',
					body: JSON.stringify({
						campania: idCampana
					}),
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
				})
					.then(res => res.json())
					.then(data => {
						console.log(data);
					});
			}
		}
	}

	fetchCampanas() {
		fetch('/api/campanas')
			.then(res => res.json())
			.then(data => {
				this.setState({ campanas: data });
				console.log(this.state.campanas);
			});
	}

	render() {
		const campanas = this.state.campanas.map((campana, i) => {
			return (
				<div key={campana._id} style={{ width: "80%" }} >
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
											this.participar(e, campana._id)}
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
		return (

			<div className="container">
				<div className="row">
					{campanas}
				</div>
			</div>
		)
	}

}

export default Campaign;