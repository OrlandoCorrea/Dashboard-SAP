import React, { Component } from 'react';
import axios from 'axios'
import imgNutresaLogo from '../assets/img/Grupo-Nutresa-logo-bg.png'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user_roll:"",user: '',pass:'',login:'',load:'',alerta:'',flag:false,redirectToReferrer: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  check_login(e){
      this.setState({
        flag: true
      })
      let data = {
        user:this.state.user,
        password: this.state.pass
      }
      console.log(data);
      this.props.onChange("dashboard");
      // return axios.post('https://backendreportsdynamicot.mybluemix.net/check_login', {
      //   method: 'POST',
      //   body:data,
      //   mode: 'cors',
      //   headers: { 'Access-Control-Allow-Origin': true }
      //   })
      //   .then(response => this.get_status_login(response))
      //   .catch(err => console.log('err', err));
  }
  get_status_login(response){
    if (response.data.login) {
        console.log('Successfully Login');
        this.setState({
          user_roll: response.data.roll
        })
        this.props.rollChange(response.data.roll);
        this.props.userChange(this.state.user);
        this.props.onChange("dashboard");
      }
      else {
        console.log("Credenciales incorrectas!")
        alert("Porfavor introduzca las credenciales correctas")
        this.setState({
            user: '',
            pass:''
          })
      }
      this.setState({
        flag: false
      })
  }

 render() {
   let view_button

  if (this.state.flag) {
    view_button = <button className="btn btn-lg btn-outline-dark btn-block text-uppercase" type="button" onClick={this.check_login.bind(this)} disabled>Login</button>
  }
  else {
    view_button = <button className="btn btn-lg btn-outline-dark btn-block text-uppercase" type="button" onClick={this.check_login.bind(this)}>Login</button>
  }
   return (
    <div className="box-d">
    <div className="wrapper">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card-signin my-5">
            <div className="card-body text-center">
              <img src={imgNutresaLogo} width="140" height="150"/>
              <h2 className="card-title text-center">Technical Evaluation</h2>
              <hr className="my-4"/>
              <form className="form-signin" data-id="login">
                <input type="text" name="user" className="form-label-group form-control text-center" placeholder="Username" value={this.state.user} onChange={this.handleChange} required autoFocus/>
                <input type="password" name="pass" className="form-label-group form-control text-center" placeholder="Password" value={this.state.pass} onChange={this.handleChange} required/>
                {view_button}
              </form>
            </div>
          </div>
      </div>
    </div>
    </div>
   )
 }
}

export default Login