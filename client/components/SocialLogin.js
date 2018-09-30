import React, { Component } from "react";
import { auth, providerTwitter, providerFacebook } from '../../firebase.js';

export default class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            provider: "",
            userID: "",
            name: "",
            email: "",
            picture: ""
        }
        
        this.loginTwitter = this.loginTwitter.bind(this); // <-- add this line
        this.loginFacebook = this.loginFacebook.bind(this); // <-- add this line
        this.logout = this.logout.bind(this); // <-- add this line
        this.insert = this.insert.bind(this);
        this.userExist = this.userExist.bind(this);
    }

    userExist(user, register){
        fetch(`/api/cuentas/${user.uid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => 
            {   if(data && !register){
                this.setState({
                    isLoggedIn: true,
                    provider: data.provider,
                    userID: data.uid,
                    name: data.name,
                    email: data.email,
                    picture: user.photoURL
                }); 
                return true;
            }
            if(register && !data){
                const user_data = ({
                    provider: user.providerId,
                    userID: user.uid,
                    name: user.displayName,
                    email: user.email
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
                    picture: user.photoURL
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

    render(){
        return(
            <div>
            {this.state.isLoggedIn ?
                <div
                    style={{
                        margin: "auto",
                        fontSize: "1em",
                        float: "left",
                        display: "flex",
                        position: "relative",

                    }}
                    >
                    <img src={this.state.picture} alt={this.state.name} style={{margin: "5px 20px" }}/>
                    <p style={{fontSize:"1em", margin: "10px 15px", padding: "10px"}}> Estás logueado con {this.state.provider}</p>
                    <p style={{fontSize:"1em", margin: "10px 15px", padding: "10px" }}>Bienvenido {this.state.name}</p>
                    <p style={{fontSize:"1em", margin: "10px 15px", padding: "10px" }}><strong>Email:</strong> {this.state.email} </p>
                    
                    <button style={{  
                   background: "#232931",
                   color: "#fff",
                   width: "auto",
                   margin: "10px 15px",
                   padding: "10px",
                   fontSize:"1em",
                   fontWeight:"bold",
                   padding: "5px"}} onClick={this.logout}>LOG OUT</button>
                   </div>   
                :
                <div>
                    <button onClick={this.loginTwitter} style={{  
                    margin: "auto",
                    background: "#598DCA",
                    color: "#fff",
                    fontSize:"1em",
                    fontWeight:"bold",
                    padding: "20px"}}>
                          LOGIN WITH TWITTER
                    </button>
                    <button onClick={this.loginFacebook} style={{  
                    margin: "auto",
                    background: "#3b5998",
                    color: "#fff",
                    fontSize:"1em",
                    fontWeight:"bold",
                    padding: "20px"}}>
                          LOGIN WITH FACEBOOK
                    </button>
                </div>         
            }
            </div>
        );
    }
}
