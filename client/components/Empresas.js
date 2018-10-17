/*import React, { Component } from 'react';
import { Modal, Panel, PanelGroup, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import ModeloEmpresa from './ModeloEmpresa';

class Empresa extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			empresas: [],
			show: false,
			show_crear: false,
			productos: [],
			search: '',			
		};

		this.producto = {
			nombre: '',
			aporte: '',
			imagen: ''
		}

		this.empresa = {
			_id: '',
            nombre: '',
            direccion: '',
            dueno: '',
            productos: [],
            email: '',
            telefono: '',
            habilitada: true
		}

		this.handleChange = this.handleChange.bind(this);
		this.agregar_empresa = this.agregar_empresa.bind(this);
		this.handle_crear_empresa = this.handle_crear_empresa.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handle_show_productos = this.handle_show_productos.bind(this);
		this.fetch_productos = this.fetch_productos.bind(this);
		this.fetch_empresas = this.fetch_empresas.bind(this);
	}

	componentDidMount() {
		this.fetch_empresas();
	}

	fetch_empresas() {
		fetch('/api/empresas')
			.then(res => res.json())
			.then(data => {
				this.setState({ empresas: data });
			});
	}

	fetch_productos(id_empresa) {
		fetch(`/api/empresas/productos/${id_empresa}`)
			.then(res => res.json())
			.then(data => {
				this.setState({ productos: data });
			});
	}

	handle_crear_empresa() {
		this.setState({ show_crear: true });
	}

	handle_show_productos(id_empresa) {
		this.fetch_productos(id_empresa);
		this.setState({ show: true });
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}

	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}

	agregar_empresa() {
		fetch('/api/empresas', {
			method: 'POST',
			body: JSON.stringify(this.S)
		})
		this.setState({ show_crear: false });
	}



	render() {
		let filteredEmpresas = this.state.empresas.filter(
			(empresa) => {
				return empresa.nombre.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
			}
		);

		const productos_empresa = this.state.productos.map((producto, i) => {
			return (
				<div key={producto._id} style={{ width: "80%" }} >
					<PanelGroup accordion id="accordion-example">
						<Panel eventKey={i} >
							<Panel.Heading>
								<Panel.Title toggle>{producto.nombre}</Panel.Title>
							</Panel.Heading>
							<Panel.Body collapsible>
								<p>Aporte de reciclaje: {producto.aporte}</p>
							</Panel.Body>
						</Panel>
					</PanelGroup>
				</div>
			)
		});

		return (
			<div className="container">
				<div className="form-inline" id="search_create">
					<input className="form-control" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} style={{ width: "70%", marginBottom: "10px", marginRight: "10px" }} placeholder="Search or jump to…"></input>
					<button className="form-control" style={{ marginBottom: "10px", marginRight: "10px" }} onClick={this.handle_crear_empresa}><i className="fas fa-plus-circle"></i></button>
				</div>
				<div className="row">
					{filteredEmpresas.map((empresa, i) => {
						return (
							<div key={empresa._id} style={{ width: "80%" }} >
								<PanelGroup accordion id="accordion-example">
									<Panel eventKey={i} >
										<Panel.Heading>
											<Panel.Title toggle>{empresa.nombre}</Panel.Title>
										</Panel.Heading>
										<Panel.Body collapsible>
											<p>Dirección: {empresa.direccion}</p>
											<p>Email: {empresa.email}</p>
											<p>Telefono: {empresa.telefono}</p>
											<Button bsStyle="success" bsSize="large" onClick={this.handle_show_productos.bind(this, empresa._id)} >
												Productos
											</Button>
										</Panel.Body>
									</Panel>
								</PanelGroup>
							</div>
						)
					})}
				</div>

				<div className="modal">
					<Modal show={this.state.show} onHide={this.handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Productos de la empresa que aportan al medio ambiente</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{productos_empresa}
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.handleClose}>Close</Button>
						</Modal.Footer>
					</Modal>
				</div>

				<div className="container">
					<Modal show={this.state.show_crear} onHide={this.handleClose}>
						<ModeloEmpresa empresa={this.empresa}/>
					</Modal>
				</div>

			</div>
		)
	}
}

export default Empresa;*/