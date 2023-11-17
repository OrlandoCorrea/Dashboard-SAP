import React, { Component } from 'react';
import axios from 'axios'
import imgIBM from '../assets/img/IBM.jpg';
import imgNutresa from '../assets/img/na3WJJlB_400x400.jpg'
import imgSAP from '../assets/img/Sap-Logo--e1530285069227.png'

class ReglasNegocio extends Component {
  constructor(props){
    super(props)
    this.updateInputValueErp = this.updateInputValueErp.bind(this);
    this.updateRulesInDB = this.updateRulesInDB.bind(this);
    this.state = {
      data:"",
      alerts:"",
      erpSmlgRule:"",erpSm50Rule_dialogo:"",erpSm50Rule_update:"",erpSm50Rule_background:"",erpSm50Rule_spool:"",erpSm50Rule_updatetask:"",erpSm51Rule:"",erpSm66Rule_dia:"",erpSm66Rule_btc:"",erpSm66Rule_upd:"",erpSm12Rule:"",erpSm13Rule:"",erpSmq2Rule:"",
      open: false
    }
  }
  componentWillMount() {
    this.setState({
      erpSmlgRule:this.props.rules.erpSmlgRule,
      erpSm50Rule_dialogo:this.props.rules.erpSm50Rule_dialogo,
      erpSm50Rule_update:this.props.rules.erpSm50Rule_update,
      erpSm50Rule_background:this.props.rules.erpSm50Rule_background,
      erpSm50Rule_spool:this.props.rules.erpSm50Rule_spool,
      erpSm50Rule_updatetask:this.props.rules.erpSm50Rule_updatetask,
      erpSm51Rule:this.props.rules.erpSm51Rule
    })
    console.log(this.state)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        erpSmlgRule:nextProps.rules.erpSmlgRule,
        erpSm50Rule_dialogo:nextProps.rules.erpSm50Rule_dialogo,
        erpSm50Rule_update:nextProps.rules.erpSm50Rule_update,
        erpSm50Rule_background:nextProps.rules.erpSm50Rule_background,
        erpSm50Rule_spool:nextProps.rules.erpSm50Rule_spool,
        erpSm50Rule_updatetask:nextProps.rules.erpSm50Rule_updatetask,
        erpSm51Rule:nextProps.rules.erpSm51Rule
      });
    }
  }
  handleClick(e) {
    this.props.onChange(e.currentTarget.dataset.id );
  }
  updateRulesInDB(evt){
    console.log("Actualizando Reglas")
    console.log(this.state)
    var schema_erp = ""
    schema_erp = {
      "ERP": {
              "sid" : "ERP",
              "sm50" : {
                  "dialogo": this.state.erpSm50Rule_dialogo,
                  "update": this.state.erpSm50Rule_update,
                  "background": this.state.erpSm50Rule_background,
                  "spool": this.state.erpSm50Rule_spool,
                  "update_task": this.state.erpSm50Rule_updatetask
              },
              "smlg" : this.state.erpSmlgRule
              }
        }

    return axios.post('http://localhost:5000/push_rule_changes', {
      method: 'POST',
      body:schema_erp,
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': true },
      })
      .then(response => this.pushRuleChanges(response))
      .catch(err => console.log('err', err));
  }
  pushRuleChanges(e){
    console.log("Successfully Saved!");
    this.props.onPush();
    this.props.getDataAll();
    this.props.onChange("dashboard");
  }
  updateInputValueErp(evt) {
    if (evt.target.id === 'smlg') {
      this.setState({
        erpSmlgRule: evt.target.value
      });
    }
    else if (evt.target.id === 'sm50_diag') {
      this.setState({
        erpSm50Rule_dialogo: evt.target.value
      });
    }
    else if (evt.target.id === 'sm50_upd') {
      this.setState({
        erpSm50Rule_update: evt.target.value
      });
    }
    else if (evt.target.id === 'sm50_btc') {
      this.setState({
        erpSm50Rule_background: evt.target.value
      });
    }
    else if (evt.target.id === 'sm50_spool') {
      this.setState({
        erpSm50Rule_spool: evt.target.value
      });
    }
    else if (evt.target.id === 'sm50_updt') {
      this.setState({
        erpSm50Rule_updatetask: evt.target.value
      });
    }
    else if (evt.target.id === 'sm51') {
      this.setState({
        erpSm51Rule: evt.target.value
      });
    }
 }
  render(){
    //ALERTAS
    var alerts = []
    if (this.props.alerts.length>0) {
      for (var i = 0; i < this.props.alerts.length; i++) {
        var icon
        if (this.props.alerts[i].type==='danger') {
          icon = <i className="fa fa-thumbs-down bg-danger"></i>
        }
        else if (this.props.alerts[i].type==='warning') {
          icon = <i className="fa fa-warning bg-warning"></i>
        }
        alerts.push(<li>
          <a  className="clearfix">
            <div className="image">
              {icon}
            </div>
            <span className="title">{this.props.alerts[i].title}</span>
            <span className="message">{this.props.alerts[i].message}</span>
          </a>
        </li>)
      }
    }
    return(
      <div>
      <header className="header">
        <div className="logo-container">
          <a  className="logo">
            <img src={imgIBM} height="35" alt="Porto Admin" />
            <img src={imgSAP} height="35" alt="Porto Admin" />
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
                <img src={imgNutresa} alt="Joseph Doe" className="img-circle" data-lock-picture="assets/images/!logged-user.jpg" />
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
                </ul>
              </nav>
              <hr className="separator" />
            </div>
          </div>
        </aside>
        <section role="main" className="content-body">
          <header className="page-header">
            <h2>Reglas de Negocio</h2>
            <div className="right-wrapper pull-right">
              <ol className="breadcrumbs">
                <li>
                  <a >
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  </a>
                </li>
                <li><span>Reglas de Negocio</span></li>
              </ol>
              <a className="sidebar-right-toggle" data-open="sidebar-right"><i className="fa fa-chevron-left"></i></a>
            </div>
          </header>
          <button className="btn btn-primary center-block" onClick={this.updateRulesInDB}>Save Changes</button>
          <div className="row">
            <div className="col-lg-12">
            <br/>
              <section className="panel">
                <header className="panel-heading">
                  <h2 className="panel-title">Reglas de Negocio - ERP</h2>
                </header>
                <div className="panel-body">
                  <form className="form-horizontal form-bordered" method="get">
                    <div className="form-group">
                    <label className="col-md-2 " htmlFor="inputDefault">SMLG</label>
                      <label className="col-md-3 control-label" htmlFor="inputDefault">Tiempo de respuesta (seg) <strong> >= </strong> </label>
                      <div className="col-md-4">
                        <input type="number" className="form-control" id="smlg" value={this.state.erpSmlgRule} onChange={this.updateInputValueErp}/>
                      </div>
                    </div>
                    <div className="form-group">
                    <label className="col-md-2 " htmlFor="inputDefault">SM50</label>
                    <div className="row">
                      <label className="col-md-3 control-label" htmlFor="inputDefault">Procesos de dialgo (%) <strong> >= </strong> </label>
                      <div className="col-md-4">
                      <input type="number" className="form-control" id="sm50_diag" value={this.state.erpSm50Rule_dialogo} onChange={this.updateInputValueErp}/>
                      </div>                      
                    </div>
                    <label className="col-md-2 " htmlFor="inputDefault"></label>
                    <div className="row">
                      <label className="col-md-3 control-label" htmlFor="inputDefault">Procesos de Update (%) <strong> >= </strong> </label>
                      <div className="col-md-4">
                      <input type="number" className="form-control" id="sm50_upd" value={this.state.erpSm50Rule_update} onChange={this.updateInputValueErp}/>
                      </div>                      
                    </div>
                    <label className="col-md-2 " htmlFor="inputDefault"></label>
                    <div className="row">
                      <label className="col-md-3 control-label" htmlFor="inputDefault">Procesos de Background (%) <strong> >= </strong> </label>
                      <div className="col-md-4">
                      <input type="number" className="form-control" id="sm50_btc" value={this.state.erpSm50Rule_background} onChange={this.updateInputValueErp}/>
                      </div>                      
                    </div>
                    <label className="col-md-2 " htmlFor="inputDefault"></label>
                    <div className="row">
                      <label className="col-md-3 control-label" htmlFor="inputDefault">Procesos de Spool (%) <strong> >= </strong> </label>
                      <div className="col-md-4">
                      <input type="number" className="form-control" id="sm50_spool" value={this.state.erpSm50Rule_spool} onChange={this.updateInputValueErp}/>
                      </div>                      
                    </div>
                    <label className="col-md-2 " htmlFor="inputDefault"></label>
                    <div className="row">
                      <label className="col-md-3 control-label" htmlFor="inputDefault">Procesos de Update Task (%) <strong> >= </strong> </label>
                      <div className="col-md-4">
                      <input type="number" className="form-control" id="sm50_updt" value={this.state.erpSm50Rule_updatetask} onChange={this.updateInputValueErp}/>
                      </div>                      
                    </div>                                       
                    </div>
                    <div className="form-group">
                    <label className="col-md-2 " htmlFor="inputDefault">SM51</label>
                      <label className="col-md-3 control-label" htmlFor="inputDefault">Disponibilidad del Sistema <strong> >= </strong> </label>
                      <div className="col-md-4">
                        <input type="text" className="form-control" id="sm51" value="No Active" readOnly={true} disable="true"/>                
                      </div>
                    </div>
                    <br/><br/>
                  </form>
                </div>
              </section>
            </div>
          </div>
          <button className="btn btn-primary center-block" onClick={this.updateRulesInDB}>Save Changes</button>
      </section>
      </div>
      </div>
    )
  }
}

export default ReglasNegocio;
