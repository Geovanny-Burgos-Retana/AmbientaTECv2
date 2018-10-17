import React, { Component } from 'react';
import { Modal, Panel, PanelGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';

import ModeloEmpresa from './ModeloEmpresa';

class Empresa extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            empresas: [],
            productos: [],
            search: '',
            show_crear: false,
            show: false,
            show_crear_producto: false,
            count: 0,
            _id: "",
            empresa: ""
        }

        this.abc = this.abc.bind(this);
        this.delete_product = this.delete_product.bind(this);
        this.arreglar_productos = this.arreglar_productos.bind(this);
        this.agregar_producto = this.agregar_producto.bind(this);
        this.eliminar_empresa = this.eliminar_empresa.bind(this);
        this.fetch_empresas = this.fetch_empresas.bind(this);
        this.agregar_empresa = this.agregar_empresa.bind(this);
        this.fetch_productos = this.fetch_productos.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.handle_crear_empresa = this.handle_crear_empresa.bind(this);
        this.handle_show_productos = this.handle_show_productos.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseCrear = this.handleCloseCrear.bind(this);
        this.handle_crear_producto = this.handle_crear_producto.bind(this);
        this.handle_editar_empresa = this.handle_editar_empresa.bind(this);
    }

    componentDidMount() {
        this.fetch_empresas();
        console.log(this.props, this.state);
    }

    fetch_empresas() {
        fetch('/api/empresas')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ empresas: data });
            });
    }

    agregar_empresa() {
        this.arreglar_productos();
        console.log(this.state._id, this.state.creador, this.props.usuario.email);
        if (this.state._id != "" && this.state.empresa.creador == this.props.usuario.email) {            
            fetch(`/api/empresas/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    nombre: document.getElementById("nombre").value,
                    direccion: document.getElementById("direccion").value,
                    horario_apertura: document.getElementById("horario_apertura").value,
                    horario_cierre: document.getElementById("horario_cierre").value,
                    telefono: document.getElementById("telefono").value,
                    email: document.getElementById("email").value,
                    creador: this.props.usuario.email,
                    habilitada: true,
                    productos: this.state.productos,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ hmtl: 'Solicitud enviada' });
                    this.fetch_empresas();
                    this.setState({ show_crear: false, _id: '', nombre: '', direccion: '', dueno: '', productos: [], email: '', telefono: '' });
                    return false;
                })
                .catch(err => console.error(err));
        } else if(this.state._id == "" ) {

            fetch('/api/empresas', {
                method: 'POST',
                body: JSON.stringify({
                    nombre: document.getElementById("nombre").value,
                    direccion: document.getElementById("direccion").value,
                    horario_apertura: document.getElementById("horario_apertura").value,
                    horario_cierre: document.getElementById("horario_cierre").value,
                    telefono: document.getElementById("telefono").value,
                    email: document.getElementById("email").value,
                    creador: this.props.usuario.email,
                    habilitada: true,
                    productos: this.state.productos,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ hmtl: 'Solicitud enviada' });
                    this.fetch_empresas();
                    this.setState({ show_crear: false, _id: '', nombre: '', direccion: '', dueno: '', productos: [], email: '', telefono: '' });
                    return false;
                })
                .catch(err => console.error(err));
        }
        return false;
    }

    fetch_productos(id_empresa) {
        fetch(`/api/empresas/productos/${id_empresa}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ productos: data });
            });
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    handle_crear_empresa() {
        this.setState({ show_crear: true, productos: [] });
    }

    handle_editar_empresa(empresa) {
        this.fetch_productos(empresa._id);
        this.setState({ _id: empresa._id, show_crear: true, empresa: empresa});        
    }

    abc(){
        document.getElementById("nombre").value = this.state.empresa.nombre.toString();
        document.getElementById("direccion").value = this.state.empresa.direccion;
        document.getElementById("horario_apertura").value = this.state.empresa.horario_apertura;
        document.getElementById("horario_cierre").value = this.state.empresa.horario_cierre;
        document.getElementById("telefono").value = this.state.empresa.telefono;
        document.getElementById("email").value = this.state.empresa.email;
    }

    handle_show_productos(id_empresa) {
        if (id_empresa != "") {
            this.fetch_productos(id_empresa);
        }
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleCloseCrear() {
        this.setState({ show_crear: false });
    }

    handle_crear_producto() {
        document.getElementById("new_product_form").style.visibility = 'visible';
    }

    eliminar_empresa(_id_emp, creador_emp) {
        fetch('/api/empresas/', {
            method: 'DELETE',
            body: JSON.stringify({
                _id: _id_emp,
                creador: creador_emp
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status = "Empresa eliminada") {
                    this.fetch_empresas();
                }
            });
    }

    agregar_producto() {
        const producto = {
            _id: this.state.count.toString(),
            nombre: document.getElementById("nombre_producto").value,
            aporte: document.getElementById("aporte_producto").value,
            imagen: "Hola mundo.jpg"
        }
        this.state.count += 1;
        this.state.productos.push(producto);
        document.getElementById("new_product_form").reset();
        return false;
    }

    arreglar_productos() {
        var size = this.state.productos.length;
        for (var i = 0; i < size; i++) {
            if (parseInt(this.state.productos[i]._id) < 99999999) {
                this.state.productos.push({
                    nombre: this.state.productos[i].nombre,
                    aporte: this.state.productos[i].aporte,
                    imagen: this.state.productos[i].imagen
                });
                this.state.productos.splice(i, 1);
                i = i - 1;
            }
        }
    }

    delete_product(id) {        
        for (var i = 0; i < this.state.productos.length; i++) {
            if (this.state.productos[i]._id.toString() == id.toString()) {
                this.state.productos.splice(i, 1);
            }
        }
    }

    render() {
        let filteredEmpresas = this.state.empresas.filter(
            (empresa) => {
                return empresa.nombre.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        const productos_empresa = this.state.productos.map((producto, i) => {
            return (
                <div key={producto._id} >
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
            <div className="content">
                <div className="content form-inline" id="search_create">
                    <input className="form-control" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} style={{ width: "75%", marginLeft: "10px", marginBottom: "10px", marginRight: "10px" }} placeholder="Search or jump to…"></input>
                    <button className="btn btn-primary" style={{ width: "20%", marginBottom: "10px", marginRight: "10px" }} onClick={this.handle_crear_empresa}>CREAR <i className="fas fa-plus-circle"></i></button>
                </div>
                <div className="content">{
                    filteredEmpresas.map((empresa, i) => {
                        return (
                            <div >
                                <PanelGroup accordion id="accordion-example" style={{ padding: "0.1%" }}>
                                    <Panel eventKey={i} >
                                        <Panel.Heading>
                                            <Panel.Title toggle>{empresa.nombre}</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible>
                                            <p>Dirección: {empresa.direccion}</p>
                                            <p>Horario de apertura: {empresa.horario_apertura}</p>
                                            <p>Horario de cierre: {empresa.horario_cierre}</p>
                                            <p>Telefono: {empresa.telefono}</p>
                                            <p>Email: {empresa.email}</p>
                                            <button onClick={this.handle_show_productos.bind(this, empresa._id)} type="button" className="btn btn-light">
                                                PRODUCTOS
                                            </button>
                                            <button onClick={this.handle_editar_empresa.bind(this, empresa)} className="btn btn-success" style={{ marginLeft: "5px" }}>
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button onClick={this.eliminar_empresa.bind(this, empresa._id, empresa.creador)} className="btn btn-danger" style={{ marginLeft: "5px" }}>
                                                <i className="fa fa-trash"></i>
                                            </button>
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
                    <Modal show={this.state.show_crear} onHide={this.handleCloseCrear}>
                        <Modal.Header closeButton>
                            <Modal.Title>Solicitud de creación de empresa</Modal.Title>
                            <button onClick={this.abc}><i className="fas fa-sync-alt"></i></button>
                        </Modal.Header>
                        <form className="form-campanas" onSubmit={this.agregar_empresa}>
                            <ControlLabel>Nombre</ControlLabel>
                            <input required type="text" className="form-control" id="nombre" />
                            <ControlLabel>Direccion</ControlLabel>
                            <input required type="text" className="form-control" id="direccion" />
                            <ControlLabel>Horario de apertura</ControlLabel>
                            <input required type="time" className="form-control" id="horario_apertura" />
                            <ControlLabel>Horario de cierre</ControlLabel>
                            <input required type="time" className="form-control" id="horario_cierre" />
                            <ControlLabel>Teléfono</ControlLabel>
                            <input required type="text" className="form-control" id="telefono" />
                            <ControlLabel>Email </ControlLabel>
                            <input required type="email" className="form-control" id="email" />
                            <ControlLabel>
                                Productos
                                <button onClick={this.handle_show_productos.bind(this, "")} style={{ margin: "10px" }} type="button" className="btn btn-light">
                                    VER
                                </button>
                                <button type="button" onClick={this.handle_crear_producto} className="btn btn-primary" style={{ margin: "10px" }} ><i className="fas fa-plus-circle"></i></button>
                            </ControlLabel>
                            <FormControl.Feedback />
                            <Modal.Footer>
                                <button type="submit" className="btn light-blue darken-4">ENVIAR</button>
                            </Modal.Footer>
                        </form>
                        <form onSubmit={this.agregar_producto} className="form-campanas" id="new_product_form" style={{ visibility: "hidden" }}>
                            <Modal.Header>
                                <Modal.Title>Creación de producto nuevo</Modal.Title>
                            </Modal.Header>
                            <ControlLabel>Nombre</ControlLabel>
                            <input required type="text" className="form-control" id="nombre_producto" />
                            <ControlLabel>Aporte</ControlLabel>
                            <input required type="text" className="form-control" id="aporte_producto" />                            
                            <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }} >AGREGAR</button>
                        </form>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Empresa;