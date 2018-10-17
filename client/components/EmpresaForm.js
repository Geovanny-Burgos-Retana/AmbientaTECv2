/*import React, { Component } from 'react';
import { HelpBlock, FormControl, ControlLabel, Button, FormGroup } from 'react-bootstrap';

class CampForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            _id: '',
            nombre: '',
            direccion: '',
            dueno: '',
            productos: [],
            email: '',
            telefono: '',
            habilitada: true
        };
        this.agregar_empresa = this.agregar_empresa.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    agregar_empresa(e) {
        if (this.state._id) {
            fetch(`/api/empresas/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this,this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    window.M.toast({ html: 'Task Updated' });
                    this.setState({ _id: '', title: '', description: '' });
                    this.fetchTasks();
                });
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.M.toast({ html: 'Task Saved' });
                    this.setState({ title: '', description: '' });
                    this.fetchTasks();
                })
                .catch(err => console.error(err));
        }
    }

    componentDidMount() {
        this.state = this.props.empresa;
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form className="form-campanas" onSubmit={this.agregar_empresa}>
                <FormGroup role="form">
                    <ControlLabel>Nombre</ControlLabel>
                    <FormControl
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={this.state.nombre}
                        onChange={this.handleChange} />
                    <ControlLabel>Direccion</ControlLabel>
                    <FormControl
                        type="text"
                        className="form-control"
                        name="direccion"
                        value={this.state.direccion}
                        onChange={this.handleChange} />
                    <ControlLabel>Dueño</ControlLabel>
                    <FormControl
                        type="text"
                        className="form-control"
                        name="dueno"
                        value={this.state.dueno}
                        onChange={this.handleChange} />
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange} />
                    <ControlLabel>Teléfono</ControlLabel>
                    <FormControl
                        type="number"
                        className="form-control"
                        name="telefono"
                        value={this.state.telefono}
                        onChange={this.handleChange} />
                    <FormControl.Feedback />
                </FormGroup>
                <button type="submit" className="btn light-blue darken-4">ENVIAR</button>
            </form>

        );
    }
}

export default CampForm;*/