import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";


import {
  dailySalesChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      value: 0,
      date:"",date_to_refresh:"",date_last_refresh:"",
      day_mon_erp:0,day_mon_erd:0,day_mon_erq:0,
      day_tues_erp:0,day_tues_erd:0,day_tues_erq:0,
      day_wed_erp:0,day_wed_erd:0,day_wed_erq:0,
      day_thurs_erp:0,day_thurs_erd:0,day_thurs_erq:0,
      day_fri_erp:0,day_fri_erd:0,day_fri_erq:0,
      day_sat_erp:0,day_sat_erd:0,day_sat_erq:0,
      day_sun_erp:0,day_sun_erd:0,day_sun_erq:0,
      array_erp_lastfive:[],array_erd_lastfive:[],array_erq_lastfive:[],
      max_length_erp:0,max_length_erd:0,max_length_erq:0
    };
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  handleClick(e) {
    this.props.onChange(e.currentTarget.dataset.id );
  }
  logout(){
    window.location.reload()
  }
  componentWillMount() {
    this.setState({
      day_mon_erp:this.props.states.day_mon_erp,day_mon_erd:this.props.states.day_mon_erd,day_mon_erq:this.props.states.day_mon_erq,
      day_tues_erp:this.props.states.day_tues_erp,day_tues_erd:this.props.states.day_tues_erd,day_tues_erq:this.props.states.day_tues_erq,
      day_wed_erp:this.props.states.day_wed_erp,day_wed_erd:this.props.states.day_wed_erd,day_wed_erq:this.props.states.day_wed_erq,
      day_thurs_erp:this.props.states.day_thurs_erp,day_thurs_erd:this.props.states.day_thurs_erd,day_thurs_erq:this.props.states.day_thurs_erq,
      day_fri_erp:this.props.states.day_fri_erp,day_fri_erd:this.props.states.day_fri_erd,day_fri_erq:this.props.states.day_fri_erq,
      day_sat_erp:this.props.states.day_sat_erp,day_sat_erd:this.props.states.day_sat_erd,day_sat_erq:this.props.states.day_sat_erq,
      day_sun_erp:this.props.states.day_sun_erp,day_sun_erd:this.props.states.day_sun_erd,day_sun_erq:this.props.states.day_sun_erq,
      array_erp_lastfive:this.props.states.array_erp_lastfive,array_erd_lastfive:this.props.states.array_erd_lastfive,array_erq_lastfive:this.props.states.array_erq_lastfive,
      date: this.props.states.tiempo,
      max_length_erp: this.props.states.max_length_erp,
      max_length_erd: this.props.states.max_length_erd,
      max_length_erq: this.props.states.max_length_erq,
      date_last_refresh:this.props.states.date_last_refresh,
      date_to_refresh:this.props.states.date_to_refresh
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        day_mon_erp:nextProps.states.day_mon_erp.length,day_mon_erd:nextProps.states.day_mon_erd.length,day_mon_erq:nextProps.states.day_mon_erq.length,
        day_tues_erp:nextProps.states.day_tues_erp.length,day_tues_erd:nextProps.states.day_tues_erd.length,day_tues_erq:nextProps.states.day_tues_erq.length,
        day_wed_erp:nextProps.states.day_wed_erp.length,day_wed_erd:nextProps.states.day_wed_erd.length,day_wed_erq:nextProps.states.day_wed_erq.length,
        day_thurs_erp:nextProps.states.day_thurs_erp.length,day_thurs_erd:nextProps.states.day_thurs_erd.length,day_thurs_erq:nextProps.states.day_thurs_erq.length,
        day_fri_erp:nextProps.states.day_fri_erp.length,day_fri_erd:nextProps.states.day_fri_erd.length,day_fri_erq:nextProps.states.day_fri_erq.length,
        day_sat_erp:nextProps.states.day_sat_erp.length,day_sat_erd:nextProps.states.day_sat_erd.length,day_sat_erq:nextProps.states.day_sat_erq.length,
        day_sun_erp:nextProps.states.day_sun_erp.length,day_sun_erd:nextProps.states.day_sun_erd.length,day_sun_erq:nextProps.states.day_sun_erq.length,
        array_erp_lastfive:nextProps.states.array_erp_lastfive,array_erd_lastfive:nextProps.states.array_erd_lastfive,array_erq_lastfive:nextProps.states.array_erq_lastfive,
        date: nextProps.states.tiempo,
        max_length_erp: nextProps.states.max_length_erp,
        max_length_erd: nextProps.states.max_length_erd,
        max_length_erq: nextProps.states.max_length_erq,
        date_last_refresh:nextProps.states.date_last_refresh,
        date_to_refresh:nextProps.states.date_to_refresh
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {array_erp_lastfive,array_erd_lastfive,array_erq_lastfive} = this.state
    let options_erp =
    {
      low: 0,
      high: this.state.max_length_erp,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
    options_erp["lineSmooth"] = dailySalesChart.options.lineSmooth
    let options_erd =
    {
      low: 0,
      high: this.state.max_length_erd,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
    options_erd["lineSmooth"] = dailySalesChart.options.lineSmooth
    let options_erq =
    {
      low: 0,
      high: this.state.max_length_erq,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
    options_erq["lineSmooth"] = dailySalesChart.options.lineSmooth

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
    return (
      <div>
			<header className="header">
				<div className="logo-container">
					<a  className="logo">
						<img src="https://cdn3.iconfinder.com/data/icons/brands-applications/512/IBM-128.png" height="30" alt="Porto Admin" />
						<img src="https://corra.com/wp-content/uploads/Sap-Logo--e1530285069227.png" height="30" alt="Porto Admin" />
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
									<a onClick={this.logout} role="menuitem" tabIndex="-1" ><i className="fa fa-power-off" onClick={this.logout}></i> Cerrar sesion</a>
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
									<li className="nav-active">
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
						<h2>Dashboard DynamicOT</h2>
						<div className="right-wrapper pull-right">
							<ol className="breadcrumbs">
								<li>
									<a >
										<i className="fa fa-tachometer"></i>
									</a>
								</li>
								<li><span>Dashboard DynamicOT</span></li>
							</ol>
							<a className="sidebar-right-toggle" data-open="sidebar-right"><i className="fa fa-chevron-left"></i></a>
						</div>
					</header>
					<div className="container-fluid">
                        <GridContainer justify="space-evenly">
                        <GridItem xs={12} sm={6} md={4}>
                            <Card>
                            <CardHeader color="success" stats icon>
                                <CardIcon color="success">
                                <Icon>alarm_on</Icon>
                                </CardIcon>
                                <p className={classes.cardCategory}>Time</p>
                                <h3 className={classes.cardTitle}>{this.props.states.date_last_refresh}</h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                <Icon>update</Icon>
                                Last Update Time
                                </div>
                            </CardFooter>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4}>
                            <Card>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="info">
                                <Icon>alarm</Icon>
                                </CardIcon>
                                <p className={classes.cardCategory}>Time</p>
                                <h3 className={classes.cardTitle}>
                                {this.props.states.date_to_refresh}
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                <Icon>update</Icon>
                                Time To Refresh
                                </div>
                            </CardFooter>
                            </Card>
                        </GridItem>
                        </GridContainer>
                        <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card chart>
                            <CardHeader color="success">
                                <ChartistGraph
                                className="ct-chart"
                                data={{
                                    labels: ["M", "T", "W", "T", "F", "S", "S"],
                                    series: [[this.props.states.day_mon_erp, this.props.states.day_tues_erp, this.props.states.day_wed_erp, this.props.states.day_thurs_erp,this.props.states.day_fri_erp,this.props.states.day_sat_erp,this.props.states.day_sun_erp]]
                                }}
                                type="Line"
                                options={options_erp}
                                listener={dailySalesChart.animation}
                                />
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardTitle}>ERP Productivo</h4>
                                <p className={classes.cardCategory}>
                                Usage Trend The Last Seven Days
                                </p>
                            </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card chart>
                            <CardHeader color="danger">
                                <ChartistGraph
                                className="ct-chart"
                                data={{
                                    labels: ["M", "T", "W", "T", "F", "S", "S"],
                                    series: [[this.props.states.day_mon_erq, this.props.states.day_tues_erq, this.props.states.day_wed_erq, this.props.states.day_thurs_erq,this.props.states.day_fri_erq,this.props.states.day_sat_erq,this.props.states.day_sun_erq]]
                                }}
                                type="Line"
                                options={options_erq}
                                listener={dailySalesChart.animation}
                                />
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardTitle}>ERP Calidad</h4>
                                <p className={classes.cardCategory}>
                                Usage Trend The Last Seven Days
                                </p>
                            </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card chart>
                            <CardHeader color="warning">
                                <ChartistGraph
                                className="ct-chart"
                                data={{
                                    labels: ["M", "T", "W", "T", "F", "S", "S"],
                                    series: [[this.props.states.day_mon_erd, this.props.states.day_tues_erd, this.props.states.day_wed_erd, this.props.states.day_thurs_erd,this.props.states.day_fri_erd,this.props.states.day_sat_erd,this.props.states.day_sun_erd]]
                                }}
                                type="Line"
                                options={options_erd}
                                listener={dailySalesChart.animation}
                                />
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardTitle}>ERP Desarrollo</h4>
                                <p className={classes.cardCategory}>
                                Usage Trend The Last Seven Days
                                </p>
                            </CardBody>
                            </Card>
                        </GridItem>
                        </GridContainer>
                        <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card>
                            <CardHeader color="success">
                                <h4 className={classes.cardTitleWhite}>Orders Transport ERP</h4>
                                <p className={classes.cardCategoryWhite}>
                                Last Five Orders
                                </p>
                            </CardHeader>
                            <CardBody>
                                <Table
                                tableHeaderColor="success"
                                tableHead={["Fecha", "Orden", "Mandante", "Codigo de Retorno","Solman"]}
                                tableData={array_erp_lastfive}
                                />
                            </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card>
                            <CardHeader color="danger">
                                <h4 className={classes.cardTitleWhite}>Orders Transport ERQ</h4>
                                <p className={classes.cardCategoryWhite}>
                                Last Five Orders
                                </p>
                            </CardHeader>
                            <CardBody>
                                <Table
                                tableHeaderColor="danger"
                                tableHead={["Fecha", "Orden", "Mandante", "Codigo de Retorno","Solman"]}
                                tableData={array_erq_lastfive}
                                />
                            </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card>
                            <CardHeader color="warning">
                                <h4 className={classes.cardTitleWhite}>Orders Transport ERD</h4>
                                <p className={classes.cardCategoryWhite}>
                                Last Five Orders
                                </p>
                            </CardHeader>
                            <CardBody>
                                <Table
                                tableHeaderColor="warning"
                                tableHead={["Fecha", "Orden", "Mandante", "Codigo de Retorno","Solman"]}
                                tableData={array_erd_lastfive}
                                />
                            </CardBody>
                            </Card>
                        </GridItem>
                        </GridContainer>
					</div>
				</section>
			</div>
    </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);