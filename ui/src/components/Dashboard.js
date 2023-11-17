import React, { Component } from 'react';
import {Bar,Doughnut} from 'react-chartjs-2';
import imgIBM from '../assets/img/IBM.jpg';
import imgNutresa from '../assets/img/na3WJJlB_400x400.jpg'
import imgSAP from '../assets/img/Sap-Logo--e1530285069227.png'

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.logout = this.logout.bind(this);
    this.runtcode = this.runtcode.bind(this);
    console.log("ESTADOS");
    console.log(props);
    
    this.state = {
      erpData:props.data_erp.erpData,
      alerts:props.alerts,
      rules:props.rules,
      state:props.states
    }
  }

  componentWillMount() {
    this.setState({ state:this.props.states,rules:this.props.rules,alerts: this.props.alerts,erpData: this.props.data_erp.erpData});
  }

  componentWillReceiveProps(nextProps) {
      if(this.props != nextProps) {
        this.setState({ state:nextProps.states,rules:nextProps.rules,alerts: nextProps.alerts,erpData: nextProps.data_erp.erpData});
      }
  }
  handleClick(e) {
    this.props.onChange(e.currentTarget.dataset.id );
  }
  logout(){
    window.location.reload()
  }
  runtcode(e){
    this.props.onTcode(e.currentTarget.dataset.id);
    this.props.alldata();
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
        alerts.push(<li key={i}>
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
    //SM51
    var d_sm51_erp = []
    // ERP
    if (this.state.erpData.erpSm51.length>0) {
      let index_erpsm51 = 0
      let icon =  <div className="summary-icon bg-success">
                    <i className="fa fa-check"></i>
                  </div>
      for (let index = 0; index < this.state.state.erpsm51_alert.length; index++) {
        const element = this.state.state.erpsm51_alert[index];
        if (element != "Active") {
          icon = <div className="summary-icon bg-warning">
                <i className="fa fa-thumbs-down"></i>
              </div>
          index_erpsm51 = index
        }
      }
          d_sm51_erp.push(
            <div className="row">
            <div className="col-md-6">
            <div className="widget-summary widget-summary-sm">
              <div className="widget-summary-col widget-summary-col-icon">
                {icon}
              </div>
              <div className="widget-summary-col">
                <div className="summary">
                  <h5 className="title">Server: SAP ERP Productivo</h5>
                  <h5 className="title">Estado: {this.state.erpData.erpSm51[index_erpsm51].status}</h5>
                  <div className="info">
                    <strong className="amount">{this.state.erpData.erpSm51[index_erpsm51].sid}</strong>
                    <p>{this.state.erpData.erpSm51[index_erpsm51].system} {this.state.erpData.erpSm51[index_erpsm51].environment}</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
            )
    }
    //SMLG
    var d_smlg = []
    var backColorSmlg = []
    var borderColorSmlg = []
    /// ERP
    if (this.state.erpData.erpSmlg.length>0) {
      var c = 0
      for (var i = 0; i < this.state.erpData.erpSmlg.length; i++) {
        c += parseInt(this.state.erpData.erpSmlg[i].response_time)
      }
      var time_erp = c/this.state.erpData.erpSmlg.length
      d_smlg.push(parseInt(time_erp))
      if (this.state.state.erpsmlg_alert) {
        backColorSmlg.push('rgba(255, 0, 0, 0.2)')
        borderColorSmlg.push('rgba(255, 0, 0, 0.2)')  
      } else {
        backColorSmlg.push('rgba(135, 189, 53, 0.2)')
        borderColorSmlg.push('rgba(135, 189, 53, 1)')
      }
    }
    else {
      backColorSmlg.push('rgba(135, 189, 53, 0.2)')
      borderColorSmlg.push('rgba(135, 189, 53, 1)')
    }
    var dataSmlg = {
        labels: ["ERP"],
        datasets: [{
            label: 'Tiempo (seg)',
            data: d_smlg,
            backgroundColor: backColorSmlg,
            borderColor: borderColorSmlg,
            borderWidth: 1
        }]
    }

    //SM50
    /// ERP
    var d_sm50_erp = []
    let backColorSm50_erp = []
    let borderColorSm50_erp = []
    d_sm50_erp.push(this.state.erpData.erpSm50.ocupados)
    d_sm50_erp.push(this.state.erpData.erpSm50.libres)
    var dataSm50ERPTotal = this.state.erpData.erpSm50.libres + this.state.erpData.erpSm50.ocupados
    if (this.state.state.erpsm50_alert) {
      backColorSm50_erp.push('rgba(255, 0, 0, 0.2)')
      backColorSm50_erp.push('rgba(135, 189, 53, 0.2)')
      borderColorSm50_erp.push('rgba(255, 0, 0, 1)')
      borderColorSm50_erp.push('rgba(135, 189, 53, 1)')
    } else {
      backColorSm50_erp.push('rgba(54, 162, 235, 0.2)')
      backColorSm50_erp.push('rgba(135, 189, 53, 0.2)')
      borderColorSm50_erp.push('rgba(54, 162, 235, 1)')  
      borderColorSm50_erp.push('rgba(135, 189, 53, 1)')  
    }
    var dataSm50ERP = {
        datasets: [{
            data: d_sm50_erp,
            backgroundColor: backColorSm50_erp,
            borderColor: borderColorSm50_erp,
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var erpSm50_info
    if (Object.keys(this.state.erpData.erpSm50).length>0) {
      erpSm50_info =
    <div id="erpsm50" className="tab-pane active">
      <div className="row">
      <div className="col-md-3"></div>
        <div className="col-md-6">
          <Doughnut ref='chart' width={80} height={50} data={dataSm50ERP} />
          <p className="text-center">Total: {dataSm50ERPTotal}</p>
        </div>
      </div>
    </div>
    } else {
      erpSm50_info =
      <div id="erpsm50" className="tab-pane active">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }
    let sm51_html
    let sm50_html
    let smlg_html

    if (this.state.erpData.erpSmlg.length == 0) {
      smlg_html = <center><div class="loader"></div></center>
    } else {
      smlg_html = <Bar data={dataSmlg} width={400} height={276} options={{maintainAspectRatio: false}}/>
    }
    if (this.state.erpData.erpSm51.length == 0) {
      sm51_html = <center><div class="loader"></div></center>
    } else {
      sm51_html = d_sm51_erp
    }
    if (this.state.erpData.erpSm50.length == 0) {
      sm50_html = <center><div class="loader"></div></center>
    } else {
      sm50_html = 
      <div className="tabs">
      <ul className="nav nav-tabs nav-justified">
        <li className="active">
          <a href="#erpsm50" data-toggle="tab" className="text-center">ERP</a>
        </li>
      </ul>
      <div className="tab-content">
      {erpSm50_info}
      </div>
    </div>
    }

    return(
      <div>
			<header className="header">
				<div className="logo-container">
					<a  className="logo">
						<img src={imgIBM} height="35" alt="Porto Admin" />
						<img src={imgSAP} height="35" alt="Porto Admin" />
					</a>
					<div className="visible-xs toggle-sidebar-left" data-toggle-classname="sidebar-left-opened" data-target="html" data-fire-event="sidebar-left-opened">
						<i className="fa fa-bars" aria-label="Toggle sidebar"></i>
					</div>
				</div>
				<div className="header-right">
					<span className="separator"></span>
					<ul className="notifications">
						<li>
							<a  className="dropdown-toggle notification-icon" data-toggle="dropdown">
								<i onClick={this.runtcode.bind(this)} data-id="all" className="fa fa-refresh"></i>
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
									<a onClick={this.logout} role="menuitem" tabIndex="-1" ><i className="fa fa-power-off"></i> Cerrar sesion</a>
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
						<div className="sidebar-toggle hidden-xs" data-toggle-classname="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
							<i className="fa fa-bars" aria-label="Toggle sidebar"></i>
						</div>
					</div>
					<div className="nano">
						<div>
							<nav id="menu" className="nav-main" role="navigation">
								<ul className="nav nav-main">
									<li className="nav-active">
										<a onClick={this.handleClick.bind(this)} data-id="dashboard">
											<i className="fa fa-tachometer"></i>
											<span>Evaluación Técnica SAP</span>
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
						<h2>Evaluación Técnica SAP</h2>
						<div className="right-wrapper pull-right">
							<ol className="breadcrumbs">
								<li>
									<a >
										<i className="fa fa-tachometer"></i>
									</a>
								</li>
								<li><span>Evaluación Técnica SAP</span></li>
							</ol>
							<a className="sidebar-right-toggle" data-open="sidebar-right"><i className="fa fa-chevron-left"></i></a>
						</div>
					</header>
					<div className="row">
						<div className="col-md-12">
							<section className="panel">
								<header className="panel-heading">
									<div className="panel-actions">
										<a onClick={this.runtcode.bind(this)} data-id="smlg" className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">SMLG</h2>
									<p className="panel-subtitle">Tiempo de respuesta promedio del sistema.
                  <span className="pull-right">Last Update : {this.props.data_erp.erpData.datetime}</span>
                  </p>
								</header>
								<div className="panel-body">
                {smlg_html}
								</div>
							</section>
						</div>
					</div>
          <div className="row">
          <div className="col-md-12">
							<section className="panel">
								<header className="panel-heading">
									<div className="panel-actions">
										<a onClick={this.runtcode.bind(this)} data-id="sm51" className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">SM51</h2>
									<p className="panel-subtitle">Disponibilidad de sistemas.
                  <span className="pull-right">Last Update : {this.props.data_erp.erpData.datetime}</span>
                  </p>
								</header>
								<div className="panel-body">
                  <div className="row">
                    <div className="col-md-12">
                    {sm51_html}
                    </div>
                  </div>
                  <br/>
								</div>
							</section>
						</div>
          </div>
					<div className="row">
						<div className="col-md-12">
							<section className="panel" >
								<header className="panel-heading">
									<div className="panel-actions">
										<a onClick={this.runtcode.bind(this)} data-id="sm50" className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">SM50</h2>
									<p className="panel-subtitle">Disponibilidad de procesos.
                  <span className="pull-right">Last Update : {this.props.data_erp.erpData.datetime}</span>
                  </p>
								</header>
								<div className="panel-body">
									<div className="row">
                    <div className="col-md-12">
                    {sm50_html}
                    </div>
									</div>
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

export default Dashboard;
