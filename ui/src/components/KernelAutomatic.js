import React, { Component } from 'react';
import axios from 'axios'
import PasswordMask from 'react-password-mask';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class KernelAutomata extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCustomDescription = this.handleChangeCustomDescription.bind(this);
    this.handleChangeCustom = this.handleChangeCustom.bind(this);
    this.handleChangePasswordDB = this.handleChangePasswordDB.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeUserDB = this.handleChangeUserDB.bind(this);
    this.handleChangeUserci = this.handleChangeUserci.bind(this);
    this.updateKernelDate = this.updateKernelDate.bind(this);
    this.state = {
      state:props.states,
      alerts:props.alerts,
      custom:'Nutresa',array_ips: [],array_sid: [],array_descripcion: [],systems_ips: [],systems_sid: [],systems_description: [],
      host_custom: '',host_db: '',sid_custom: '',user_custom: '',pass_custom: '',user_db: '', pass_db: '',
      host_rhel:'129.39.170.55',user_rhel:'ibmsapoc',pass_rhel:'dr@g0n3S',startDate:'',program_kernel:false
    }
  }

  updateKernelDate(){
    this.setState({program_kernel:true})
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  handleChangeCustom(event) {
    this.setState({array_ips: []})
    this.setState({array_sid: []})
    this.setState({array_descripcion: []})
    this.get_systems_by_custom(this.state.custom);
  }

  get_systems_by_custom(sys){
    return axios.get('http://localhost:3030/system_custom?customer='+sys, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': true },
      })
       .then(response => this.getSystems(response.data.systems))
       .catch(err => console.log('err', err))
  }

  getSystems(sys){
    if (sys) {
      for (var i = 0; i < sys.length; i++) {
        if (sys[i]!==null) {
          var cadena = sys[i].last_result.match(new RegExp("Host:" + "(.*)" + "Own Host"));
          var sid = sys[i].last_result.match(new RegExp("ID:" + "(.*)" + "SAP System Number:"));
          var descripcion = sys[i].name
          if (cadena!==null) {
            this.state.array_ips.push(cadena[1])
            this.state.array_sid.push(sid[1])
            this.state.array_descripcion.push(descripcion)
          }
        }
      }
      this.setState({systems_ips: this.state.array_ips})
      this.setState({systems_sid: this.state.array_sid})
      this.setState({systems_description: this.state.array_descripcion})
    }
  }

  handleChangeCustomDescription(event) {
    this.setState({description_custom: event.target.value});
    if (event.target.value === "localhost") {
      this.setState({host_custom: "localhost"});
      this.setState({host_db:"localhost"})
    } else {
      this.setState({host_custom: this.state.systems_ips[this.state.array_descripcion.indexOf(event.target.value)]});
      this.setState({host_db: this.state.systems_ips[this.state.array_descripcion.indexOf(event.target.value)]});
    }
    if (event.target.value === "localhost") {
      this.setState({sid_custom: "NPL"});
    } else {
      this.setState({sid_custom: this.state.systems_sid[this.state.array_descripcion.indexOf(event.target.value)]});
    }
  }

  handleChangeUserci(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeUserDB(e) {
    this.setState({
      user_db: e.target.value
    });
  }

  handleChangePassword(e) {
    this.setState({
      pass_custom: e.target.value
    });
  }

  handleChangePasswordDB(e) {
    this.setState({
      pass_db: e.target.value
    });
  }

  componentWillMount() {
    this.setState({ alerts: this.props.alerts,state:this.props.states});
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({ alerts: nextProps.alerts,state:nextProps.states});
    }
  }
  componentDidMount(){
    this.handleChangeCustom()
  }
  handleClick(e) {
    this.props.onChange(e.currentTarget.dataset.id );
  }
  render(){
    //ALERTAS
    let kernel_programados
    const host = String(this.state.host_custom)
    const date = String(this.state.startDate)
    if (this.state.program_kernel) {
      kernel_programados = 
      <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography >Actualizaciones Programadas</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Actualizacion de Kernel para el servidor {host} programada en la fecha {date}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    } else {
      kernel_programados = 
      <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography >Actualizaciones Programadas</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    }

    var alerts = []
    if (this.state.alerts.length>0) {
      for (var i = 0; i < this.state.alerts.length; i++) {
        var icon
        if (this.state.alerts[i].type==='danger') {
          icon = <i className="fa fa-thumbs-down bg-danger"></i>
        }
        else if (this.state.alerts[i].type==='warning') {
          icon = <i className="fa fa-warning bg-warning"></i>
        }
        alerts.push(<li key={i}>
          <a  className="clearfix">
            <div className="image">
              {icon}
            </div>
            <span className="title">{this.state.alerts[i].title}</span>
            <span className="message">{this.state.alerts[i].message}</span>
          </a>
        </li>)
      }
    }
    return(
      <div>
      <header className="header">
        <div className="logo-container">
          <a  className="logo">
            <img src="https://cdn3.iconfinder.com/data/icons/brands-applications/512/IBM-128.png" height="35" alt="Porto Admin" />
            <img src="https://corra.com/wp-content/uploads/Sap-Logo--e1530285069227.png" height="35" alt="Porto Admin" />
          </a>
          <div className="visible-xs toggle-sidebar-left" data-toggle-class="sidebar-left-opened" data-target="html" data-fire-event="sidebar-left-opened">
            <i className="fa fa-bars" aria-label="Toggle sidebar"></i>
          </div>
        </div>
        <div className="header-right">
          <span className="separator"></span>
          <ul className="notifications">
            <li>
              <a  className="dropdown-toggle notification-icon" data-toggle="dropdown">
                <i className="fa fa-refresh"></i>
              </a>
            </li>
            <li>
              <a  className="dropdown-toggle notification-icon" data-toggle="dropdown">
                <i className="fa fa-bell"></i>
                <span className="badge">{alerts.length}</span>
              </a>
              <div className="dropdown-menu notification-menu">
                <div className="notification-title">
                  <span className="pull-right label label-default">{alerts.length}</span>
                  Alertas
                </div>
                <div className="content">
                  <ul>
                    {alerts}
                  </ul>
                  <hr />
                  <div className="text-right">
                    <a  className="view-more">Ver más</a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <span className="separator"></span>
          <div id="userbox" className="userbox">
            <a  data-toggle="dropdown">
              <figure className="profile-picture">
                <img src="https://pbs.twimg.com/profile_images/786223609341743104/na3WJJlB_400x400.jpg" alt="Joseph Doe" className="img-circle" data-lock-picture="assets/images/!logged-user.jpg" />
              </figure>
              <div className="profile-info" data-lock-name="John Doe" data-lock-email="johndoe@okler.com">
                <span className="name">Nutresa</span>
                <span className="role">Admin</span>
              </div>
              <i className="fa custom-caret"></i>
            </a>
            <div className="dropdown-menu">
              <ul className="list-unstyled">
                <li className="divider"></li>
                <li>
                  <a role="menuitem" tabIndex="-1" ><i className="fa fa-power-off"></i> Cerrar sesion</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="inner-wrapper">
        <aside id="sidebar-left" className="sidebar-left bg-dark">
          <div className="sidebar-header">
            <div className="sidebar-title">
              Menu
            </div>
            <div className="sidebar-toggle hidden-xs" data-toggle-class="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
              <i className="fa fa-bars" aria-label="Toggle sidebar"></i>
            </div>
          </div>
          <div className="nano">
            <div>
              <nav id="menu" className="nav-main" role="navigation">
                <ul className="nav nav-main">
                  <li>
                    <a onClick={this.handleClick.bind(this)} data-id="dashboard">
                      <i className="fa fa-tachometer"></i>
                      <span>Evaluación Técnica SAP</span>
                    </a>
                  </li>
                  <li>
                    <a onClick={this.handleClick.bind(this)} data-id="informeGestion">
                      <i className="fa fa-copy" aria-hidden="true"></i>
                      <span>Informe de Gestión</span>
                    </a>
                  </li>
                  <li className="nav-active">
                    <a onClick={this.handleClick.bind(this)} data-id="reglasNegocio">
                      <i className="fa fa-briefcase" aria-hidden="true"></i>
                      <span>Reglas de Negocio</span>
                    </a>
                  </li>
                  <li>
                    <a onClick={this.handleClick.bind(this)} data-id="matriz">
                      <i className="fa fa-list-alt" aria-hidden="true"></i>
                      <span>Matriz de Evaluacion</span>
                    </a>
                  </li>
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-truck" aria-hidden="true"></i>
                        <span>Ordenes de Transporte</span>
                    </a>
                    <ul className="dropdown-menu">
                        <li>
                            <a onClick={this.handleClick.bind(this)} data-id="dashots">
                                <i className="fa fa-tachometer" aria-hidden="true"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>                      
                        <li role="separator" className="divider"></li>
                        <li>
                            <a onClick={this.handleClick.bind(this)} data-id="allots">
                                <i className="fa fa-th-list" aria-hidden="true"></i>
                                <span>Todas las Ordenes</span>
                            </a>
                        </li>                      
                        <li role="separator" className="divider"></li>
                        <li>
                            <a onClick={this.handleClick.bind(this)} data-id="myots">
                                <i className="fa fa-th-list" aria-hidden="true"></i>
                                <span>Mis ordenes</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a onClick={this.handleClick.bind(this)} data-id="kernel">
                      <i className="fa fa-arrow-circle-o-up" aria-hidden="true"></i>
                      <span>Actualizar Kernel</span>
                    </a>
                  </li>
                <div className="sidebar-header">
                    <div className="sidebar-title">
                        Sistemas
                    </div>
                </div>
                <li>
                    <a onClick={this.handleClick.bind(this)} data-id="erp">
                        <i className="fa fa-tasks"></i>
                        <span>ERP</span>
                    </a>
                </li>
                <li>
                    <a onClick={this.handleClick.bind(this)} data-id="bip">
                        <i className="fa fa-tasks"></i>
                        <span>BIP</span>
                    </a>
                </li>
                <li>
                    <a onClick={this.handleClick.bind(this)} data-id="smp">
                        <i className="fa fa-tasks"></i>
                        <span>SMP</span>
                    </a>
                </li>
                <li>
                    <a onClick={this.handleClick.bind(this)} data-id="scp">
                        <i className="fa fa-tasks"></i>
                        <span>SCP</span>
                    </a>
                </li>
                </ul>
              </nav>
              <hr className="separator" />
            </div>
          </div>
        </aside>
        <section role="main" className="content-body">
          <header className="page-header">
            <h2>Actualizacion Kernel</h2>
            <div className="right-wrapper pull-right">
              <ol className="breadcrumbs">
                <li>
                  <a >
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  </a>
                </li>
                <li><span>Kernel</span></li>
              </ol>
              <a className="sidebar-right-toggle" data-open="sidebar-right"><i className="fa fa-chevron-left"></i></a>
            </div>
          </header>
          <button className="btn btn-primary center-block" onClick={this.updateKernelDate}>Save Changes</button>
          <div className="row">
            <div className="col-lg-12">
            <br/>
            <section className="panel">
            <div className="panel-body">
                {kernel_programados}
            </div>
            </section>
              <section className="panel">
                <header className="panel-heading">
                  <h2 className="panel-title">Actualizacion Kernel - Nutresa</h2>
                </header>
                <div className="panel-body">
                  <form className="form-horizontal form-bordered" method="get">
                  <div className="form-group">
                    <label className="col-md-3" for="inputDefault">Objetivo</label>
                      <div class="col-md-4 text-center">
                        <select data-plugin-selectTwo class="form-control populate" value={this.state.custom} required>
                        <option value="Nutresa">Nutresa</option>
                        </select>
                        <label>Cliente</label>
                      </div>
                      <div class="col-md-4 text-center">
                        <select data-plugin-selectTwo class="form-control populate" value={this.state.description_custom} onChange={this.handleChangeCustomDescription} required>
                        <option value="">Open this select menu</option>
                        {this.state.systems_description.map(x => {
                          return <option value={x}>{x}</option>
                        })}
                        </select>
                        <label>Servidor</label>
                      </div>
                    </div>
                    <div className="form-group">
                    <label className="col-md-3" for="inputDefault">Credencial Usuario SAP</label>
                      <div class="col-md-4 text-center">
                        <input type="text" value={this.state.user_custom} name="user_custom" className="form-control" placeholder="bwqadm" onChange={this.handleChangeUserci.bind(this)} required/>
                        <label>Usuario</label>
                      </div>
                      <div class="col-md-4 text-center">
                        <PasswordMask id="key_ci" value={this.state.pass_custom} name="pass_custom" placeholder="Enter password" onChange={this.handleChangePassword.bind(this)} inputStyles={{padding:'8px',fontSize: '16px'}} inputClassName="form-control" buttonStyles={{width: '55px',height: '30px'}} required/>
                        <label>Clave</label>
                      </div>
                    </div>
                    <div className="form-group">
                    <label className="col-md-3" for="inputDefault">Credencial Usuario Base de Datos</label>
                      <div class="col-md-4 text-center">
                        <input type="text" value={this.state.user_db} name="user_db" className="form-control" placeholder="bwqadm" onChange={this.handleChangeUserDB.bind(this)} required/>
                        <label>Usuario</label>
                      </div>
                      <div class="col-md-4 text-center">
                        <PasswordMask id="key_ci" value={this.state.pass_db} name="pass_db" placeholder="Enter password" onChange={this.handleChangePasswordDB.bind(this)} inputStyles={{padding:'8px',fontSize: '16px'}} inputClassName="form-control" buttonStyles={{width: '55px',height: '30px'}} required/>
                        <label>Clave</label>
                      </div>
                    </div>
                    <div className="form-group">
                    <label className="col-md-3" for="inputDefault">Fecha de Ejecucion</label>
                      <div class="col-md-8 text-center">
                      <DatePicker
                        selected={ this.state.startDate }
                        onChange={ this.handleChange }
                        placeholderText="Click to select a date"
                        name="startDate"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"
                      />
                      </div>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
      </section>
      </div>
      </div>
    )
  }
}

export default KernelAutomata;
