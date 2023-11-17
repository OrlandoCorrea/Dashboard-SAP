import React, { Component } from 'react';

class InformeGestion extends Component {
  constructor(props){
    super(props)
    this.state = {
      data:props.data,
      alerts:props.alerts
    }
  }
  handleClick(e) {
    this.props.onChange(e.currentTarget.dataset.id );
  }
  render(){
    //ALERTAS
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
        alerts.push(<li>
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
                  <li className="nav-active">
                    <a onClick={this.handleClick.bind(this)} data-id="informeGestion">
                      <i className="fa fa-copy" aria-hidden="true"></i>
                      <span>Informe de Gestión</span>
                    </a>
                  </li>
                  <li>
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
            <h2>Informe de Gestión</h2>
            <div className="right-wrapper pull-right">
              <ol className="breadcrumbs">
                <li>
                  <a >
                  <i className="fa fa-copy" aria-hidden="true"></i>
                  </a>
                </li>
                <li><span>Informe de Gestión</span></li>
              </ol>
              <a className="sidebar-right-toggle" data-open="sidebar-right"><i className="fa fa-chevron-left"></i></a>
            </div>
          </header>




      </section>
      </div>
      </div>
    )
  }
}

export default InformeGestion;
