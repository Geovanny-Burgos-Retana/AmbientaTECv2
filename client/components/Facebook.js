import React, { Component } from "react";
import { auth, providerFacebook } from '../../firebase.js';

export default class Facebook extends Component {
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
        this.login = this.login.bind(this); // <-- add this line
        this.logout = this.logout.bind(this); // <-- add this line
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            user.providerData.forEach(function (profile) {
              console.log("Sign-in provider: " + profile.providerId);
              console.log("  Provider-specific UID: " + profile.uid);
              console.log("  Name: " + profile.displayName);
              console.log("  Email: " + profile.email);
              console.log("  Photo URL: " + profile.photoURL);
            });
            var proveededor = "";
            provider: user.providerData.forEach(function (profile) {
              proveededor= profile.providerId
            });
            this.setState({
              isLoggedIn: true,
              provider: provider,
              userID: user.getIdToken(),
              name: user.displayName,
              email: user.email,
              picture: user.photoURL
          });
          console.log("Usuario: "+this.state.provider);
        } 
        else{
          this.setState({ isLoggedIn: false });
        } 
        });
    }
    handleChange(e) {
        /* ... */
    }
    logout() {
        auth.signOut()
        .then(() => {
        this.setState({
            isLoggedIn: false
        });
        });
    }
    login() {
        auth.signInWithPopup(providerFacebook) 
          .then((result) => {
            const user = result.user;
            console.log("DATA");
            console.log(user);
            this.setState({
                isLoggedIn: true,
                userID: user.uid,
                name: user.displayName,
                email: user.email,
                picture: user.photoURL
            });
            console.log("El usuario es");
            console.log(this.state.user);
            fetch('/api/cuentas', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{ 
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            }).then(res => console.log(res))
            .catch(err => console.error(err))
            
          });
    }

    render(){
        return(
            <div>
            {this.state.isLoggedIn ?
                <div>
                    <div
          style={{
            width: "400px",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px"
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
        </div>
                    <button style={{  
                   width: "245px",
                   margin: "auto",
                   background: "#3b5998",
                   color: "#fff",
                   fontSize:"1.2em",
                   fontWeight:"bold",
                   padding: "20px"}} onClick={this.logout}>LOG OUT</button>
                </div>            
                :
                <div>
                    <button onClick={this.login} style={{  
                    width: "245px",
                    margin: "auto",
                    background: "#3b5998",
                    color: "#fff",
                    fontSize:"1.2em",
                    fontWeight:"bold",
                    padding: "20px"}}>
                          LOGIN WITH FACEBOOK
                    </button>
                </div>         
            }
            {this.state.isLoggedIn ?
        <div className='user-profile-facebook'>
            
        </div>
        :
        <div className='wrapper'>

        </div>
        }
            </div>
        );
    }
}
