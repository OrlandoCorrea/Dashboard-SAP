import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'


function LinkTab(props) {
  return <Tab style={{fontSize: '14px'}} component="a" onClick={event => event.preventDefault()} {...props} />;
}
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class TypographyPage extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.logout = this.logout.bind(this);
    this.state = { user_roll:"",table_view:0,value: 0,value2: 0,data_erp_user:'',data_erd_user:'',data_erq_user:'',user:'',date:''};
  }
  handleClickSlideBar(e) {
    this.setState({table_view:e.currentTarget.dataset.id})
  }
componentWillMount() {
  this.setState({
    data_erp_user:this.props.states.data_erp,
    data_erd_user:this.props.states.data_erd,
    data_erq_user:this.props.states.data_erq,
    user:this.props.states.usuario,
    user_roll:this.props.states.user_roll
  })
}

componentWillReceiveProps(nextProps) {
  if(this.props != nextProps) {
    this.setState({
      data_erp_user:nextProps.states.data_erp,
      data_erd_user:nextProps.states.data_erd,
      data_erq_user:nextProps.states.data_erq,
      user:nextProps.states.usuario,
      user_roll:nextProps.states.user_roll
    });
  }
}
  handleChange_tabs_2 = (event, value) => {
    this.setState({ value2 : value });
  };
  handleClick(e) {
    this.props.onChange(e.currentTarget.dataset.id );
  }
  logout(){
    window.location.reload()
  }
  
  render() {
    const { value2 } = this.state;
    const { data_erp_user } = this.state;
    const { data_erd_user } = this.state;
    const { data_erq_user } = this.state;
    const { user_roll } = this.state;
    var array_erp_user = []
    var array_erd_user = []
    var array_erq_user = []
    for (var i = 0; i < data_erp_user.length; i++) {
      if (user_roll == "admin") {
        if (data_erp_user[i].ADMIN == this.state.user) {
          array_erp_user.push(data_erp_user[i])
        }
      }
      else {
        if (data_erp_user[i].TRUSER == this.state.user) {
          array_erp_user.push(data_erp_user[i])
        }
      }
    }
    for (var i = 0; i < data_erd_user.length; i++) {
      if (user_roll == "admin") {
        if (data_erd_user[i].ADMIN == this.state.user) {
          array_erd_user.push(data_erd_user[i])
        }
      }
      else {
        if (data_erd_user[i].TRUSER == this.state.user) {
          array_erd_user.push(data_erd_user[i])
        }
      }
    }
    for (var i = 0; i < data_erq_user.length; i++) {
      if (user_roll == "admin") {
        if (data_erq_user[i].ADMIN == this.state.user) {
          array_erq_user.push(data_erq_user[i])
        }
      }
      else {
        if (data_erq_user[i].TRUSER == this.state.user) {
          array_erq_user.push(data_erq_user[i])
        }
      }
    }
    if (array_erp_user.length == 0) {
      array_erp_user.push({"ADMIN":"","RETCODE":"","TRKOR":"","TRTIME":"","TRUSER":"","TRCLI":""})
    }
    if (array_erd_user.length == 0) {
      array_erd_user.push({"ADMIN":"","RETCODE":"","TRKOR":"","TRTIME":"","TRUSER":"","TRCLI":""})
    }
    if (array_erq_user.length == 0) {
      array_erq_user.push({"ADMIN":"","RETCODE":"","TRKOR":"","TRTIME":"","TRUSER":"","TRCLI":""})
    }
    function comp(a, b) {
        return new Date(b.TRTIME).getTime() - new Date(a.TRTIME).getTime();
    }
    array_erp_user.sort(comp);
    array_erd_user.sort(comp);
    array_erq_user.sort(comp);
    let json_erp_user = array_erp_user
    let json_erd_user = array_erd_user
    let json_erq_user = array_erq_user
    const data_erp_user_fin=json_erp_user
    const data_erd_user_fin= json_erd_user
    const data_erq_user_fin= json_erq_user

    let data_final_user
    if (value2 === 0) {
      data_final_user = data_erp_user_fin
    }
    else if (value2 === 1) {
      data_final_user = data_erq_user_fin
    }
    else if (value2 === 2) {
      data_final_user = data_erd_user_fin
    }

    let page_options
    if (data_final_user.length === 0) {
      page_options = [10]
    }
    else if (data_final_user.length > 0 && data_final_user.length <= 10) {
      page_options = [parseInt(data_final_user.length)]
    }
    else if (data_final_user.length > 10 && data_final_user.length <= 20) {
      page_options = [10,parseInt(data_final_user.length)]
    }
    else if (data_final_user.length > 20 && data_final_user.length <= 30) {
      page_options = [10,20,parseInt(data_final_user.length)]
    }
    else if (data_final_user.length > 30 && data_final_user.length <= 40) {
      page_options = [10,20,30,parseInt(data_final_user.length)]
    }
    else if (data_final_user.length > 40) {
      page_options = [10,20,30,parseInt(data_final_user.length)]
    }
    else {
      page_options = [parseInt(data_final_user.length)]
    }

    let table_react =
    <div className="container-fluid">
    <AppBar position="static">
    <Tabs variant="fullWidth" value={value2} onChange={this.handleChange_tabs_2}>
      <LinkTab label="ERP Productivo"/>
      <LinkTab label="ERP Calidad"/>
      <LinkTab label="ERP Desarrollo"/>
    </Tabs>
    </AppBar>
   { <MaterialTable
      columns={[
        { title: 'Numero Solman',field: 'NS',cellStyle: {fontSize: 12},headerStyle: {fontSize:12}},
          { title: 'Orden', field: 'TRKORR' ,cellStyle: {fontSize: 12},headerStyle: {fontSize:12}},
          {
            title: 'Codigo Retorno',
            field: 'RETCODE',
            cellStyle: {fontSize: 12},
            headerStyle: {fontSize:12},
            render: rowData => {
              if (rowData.RETCODE == "0000") {
                return (
                  <div className="thumb-item">
                    <img className="thumb-item__image" src={"https://cdn1.iconfinder.com/data/icons/toolbar-std/512/OK-512.png"} width="30" height="30" alt=""/>
                    <div className="thumb-item__info">
                      <p>Code 00</p>
                    </div>
                  </div>
                )
              }
              else if (rowData.RETCODE == "0008"){
                return (
                  <div className="thumb-item">
                    <img className="thumb-item__image" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrSq6OtlG5WJSoZmVX9xxhWXRJiyCVbMIE_2LZGRyrEGYuZ0UZ1w"} width="30" height="30" alt=""/>
                    <div className="thumb-item__info">
                      <p>Code 08</p>
                    </div>
                  </div>
                )
              }
              else if (rowData.RETCODE == "0004"){
                return (
                  <div className="thumb-item">
                    <img className="thumb-item__image" src={"https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_48-512.png"} width="35" height="35" alt=""/>
                    <div className="thumb-item__info">
                      <p>Code 04</p>
                    </div>
                  </div>
                )
              }
            }
          },
          { title: 'Fecha', field: 'TRTIME' ,type: "datetime",cellStyle: {fontSize: 12},headerStyle: {fontSize:12}},
          { title: 'Mandante', field: 'TRCLI',cellStyle: {fontSize: 12},headerStyle: {fontSize:12} },
          { title: 'Usuario', field: 'TRUSER',cellStyle: {fontSize: 12},headerStyle: {fontSize:12}},
          { title: 'Administrador', field: 'ADMIN',cellStyle: {fontSize: 12},headerStyle: {fontSize:12}}
        ]}
        data={data_final_user}
        options={{
          pageSizeOptions:page_options,
          pageSize: 10,
          exportButton: true,
          exportFileName: "reports_OT",
          paging: true,
          columnsButton: true
        }}
        title="Dynamic Reports"
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />}
    </div>

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
                    <h2>My Transport Orders</h2>
                    <div className="right-wrapper pull-right">
                        <ol className="breadcrumbs">
                            <li>
                                <a >
                                    <i className="fa fa-tachometer"></i>
                                </a>
                            </li>
                            <li><span>My Transport Orders</span></li>
                        </ol>
                        <a className="sidebar-right-toggle" data-open="sidebar-right"><i className="fa fa-chevron-left"></i></a>
                    </div>
                </header>
                <div className="container-fluid">
                {table_react}
                </div>
            </section>
        </div>
</div>
    );
  }
}

TypographyPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TypographyPage);