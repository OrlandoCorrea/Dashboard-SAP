import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios'
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

function LinkTab(props) {
  return <Tab style={{fontSize: '14px'}} component="a" onClick={event => event.preventDefault()} {...props} />;
}
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  }
});

class TypographyPage extends Component {
  constructor(props){
    super(props)
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.logout = this.logout.bind(this);
    this.state = { open: false,table_view:0,value: 0,value2: 0,data_erp:[],data_erd:[],data_erq:[],user:'',date:'',user_roll:""};
  }
  handleClickSlideBar(e) {
    this.setState({table_view:e.currentTarget.dataset.id})
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };
  componentWillMount() {
    this.setState({
      data_erp:this.props.states.data_erp,
      data_erd:this.props.states.data_erd,
      data_erq:this.props.states.data_erq,
      user:this.props.states.usuario,
      user_roll:this.props.states.user_roll
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        data_erp:nextProps.states.data_erp,
        data_erd:nextProps.states.data_erd,
        data_erq:nextProps.states.data_erq,
        user:nextProps.states.usuario,
        user_roll:nextProps.states.user_roll
      });
    }
  }

  handleChange_tabs = (event, value) => {
    this.setState({ value });
  };

  pushData(e) {
    let data
    if (this.state.value === 0) {
      e = e.map(data => {
        data["TARSYSTEM"] = "ERP"
        return data
      })
      data = {
        datos:e,
        sid:"ERP"
      }
    }
    else if (this.state.value === 1) {
      e = e.map(data => {
        data["TARSYSTEM"] = "ERQ"
        return data
      })
      data = {
        datos:e,
        sid:"ERQ"
      }
    }
    else if (this.state.value === 2) {
      e = e.map(data => {
        data["TARSYSTEM"] = "ERD"
        return data
      })
      data = {
        datos:e,
        sid:"ERD"
      }
    }
    return axios.post('https://backendreportsdynamicot.mybluemix.net/push_data_changes', {
      method: 'POST',
      body:data,
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': true },
      })
      .then(response => this.pushDataChanges(response))
      .catch(err => console.log('err', err));
  }

  pushDataChanges(e){
    this.setState({ open: true });
  }
  handleClick(e) {
    this.props.onChange(e.currentTarget.dataset.id );
  }
  logout(){
    window.location.reload()
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { data_erp } = this.state;
    const { data_erd } = this.state;
    const { data_erq } = this.state;
    const { user_roll } = this.state;
    let snackbar
    let system
    snackbar =
    <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={this.state.open}
        autoHideDuration={4000}
        onClose={this.handleClose}
      >
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant="success"
          message="Successfully Saved!"
        />
    </Snackbar>

    function comp(a, b) {
      return new Date(b.TRTIME).getTime() - new Date(a.TRTIME).getTime();
    }
    data_erp.sort(comp);
    data_erd.sort(comp);
    data_erq.sort(comp);
    let data_final
    if (value === 0) {
      data_final = data_erp;
    }
    else if (value === 1) {
      data_final = data_erq;
    }
    else if (value === 2) {
      data_final = data_erd;
    }
    let page_options
    if (data_final.length === 0) {
      page_options = [10]
    }
    else if (data_final.length > 0 && data_final.length <= 10) {
      page_options = [parseInt(data_final.length)]
    }
    else if (data_final.length > 10 && data_final.length <= 20) {
      page_options = [10,parseInt(data_final.length)]
    }
    else if (data_final.length > 20 && data_final.length <= 30) {
      page_options = [10,20,parseInt(data_final.length)]
    }
    else if (data_final.length > 30 && data_final.length <= 40) {
      page_options = [10,20,30,parseInt(data_final.length)]
    }
    else if (data_final.length > 40) {
      page_options = [10,20,30,parseInt(data_final.length)]
    }
    else {
      page_options = [parseInt(data_final.length)]
    }
    let buttom_save
    let table_final
    if (user_roll === "admin") {
      buttom_save =
      <MuiThemeProvider theme={theme}>
      <Button variant="contained" color="primary" className={classes.margin} onClick={() => { this.pushData(data_final) }}>
        Save Changes
      </Button>
      </MuiThemeProvider>
    table_final =
    <MaterialTable
      columns={[
          { title: 'Numero Solman',field: 'NS',cellStyle: {fontSize: 12},headerStyle: {fontSize:12}},
          { title: 'Orden', field: 'TRKORR',cellStyle: {fontSize: 12} ,headerStyle: {fontSize:12}},
          {
            title: 'Codigo Retorno',
            field: 'RETCODE',
            cellStyle: {fontSize: 12},
            headerStyle: {fontSize:12},
            render: rowData => {
              if (rowData.RETCODE == "0000") {
                return (
                  <div class="thumb-item">
                    <img class="thumb-item__image" src={"https://cdn1.iconfinder.com/data/icons/toolbar-std/512/OK-512.png"} width="30" height="30" alt=""/>
                    <div class="thumb-item__info">
                      <p>Code 00</p>
                    </div>
                  </div>
                )
              }
              else if (rowData.RETCODE == "0008"){
                return (
                  <div class="thumb-item">
                    <img class="thumb-item__image" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrSq6OtlG5WJSoZmVX9xxhWXRJiyCVbMIE_2LZGRyrEGYuZ0UZ1w"} width="30" height="30" alt=""/>
                    <div class="thumb-item__info">
                      <p>Code 08</p>
                    </div>
                  </div>
                )
              }
              else if (rowData.RETCODE == "0004"){
                return (
                  <div class="thumb-item">
                    <img class="thumb-item__image" src={"https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_48-512.png"} width="35" height="35" alt=""/>
                    <div class="thumb-item__info">
                      <p>Code 04</p>
                    </div>
                  </div>
                )
              }
            }
          },
          { title: 'Fecha', field: 'TRTIME' ,type: "datetime",cellStyle: {fontSize: 12},headerStyle: {fontSize:12}},
          { title: 'Mandante', field: 'TRCLI',cellStyle: {fontSize: 12},headerStyle: {fontSize:12} },
          { title: 'Usuario', field: 'TRUSER',cellStyle: {fontSize: 12},headerStyle: {fontSize:12} },
          { title: 'Administrador', field: 'ADMIN' ,cellStyle: {fontSize: 12},headerStyle: {fontSize:12}}
        ]}
        data={data_final}
        options={{
          pageSizeOptions:page_options,
          pageSize: 10,
          exportButton: true,
          exportFileName: "reports_OT",
          paging: true,
          columnsButton: true,
          rowStyle:  data => {
            if (this.state.user_roll == "admin") {
              if (data.ADMIN == this.state.user) {
                return {
                  textAlign: 'center',
                  backgroundColor: '#4286f4'                }
              }
            }
            else if (data.TRUSER == this.state.user){
                return {
                  textAlign: 'center',
                  backgroundColor: '#4286f4'
                }
            }
            else {
                return {
                    textAlign: 'center'
                  }
            }
          }
        }}
        title="Dynamic Reports"
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = data_final;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  if (value === 0) {
                    this.setState({ data_erp: data }, () => resolve());
                  }
                  else if (value === 1) {
                    this.setState({ data_erd: data }, () => resolve());
                  }
                  else if (value === 2) {
                    this.setState({ data_erq: data }, () => resolve());
                  }
                }
                resolve()
              }, 200)
            })
        }}
      />
    } else {
      buttom_save = ""
      table_final =
      <MaterialTable
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
                  <div class="thumb-item">
                    <img class="thumb-item__image" src={"https://cdn1.iconfinder.com/data/icons/toolbar-std/512/OK-512.png"} width="30" height="30" alt=""/>
                    <div class="thumb-item__info">
                      <p>Code 00</p>
                    </div>
                  </div>
                )
              }
              else if (rowData.RETCODE == "0008"){
                return (
                  <div class="thumb-item">
                    <img class="thumb-item__image" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrSq6OtlG5WJSoZmVX9xxhWXRJiyCVbMIE_2LZGRyrEGYuZ0UZ1w"} width="30" height="30" alt=""/>
                    <div class="thumb-item__info">
                      <p>Code 08</p>
                    </div>
                  </div>
                )
              }
              else if (rowData.RETCODE == "0004"){
                return (
                  <div class="thumb-item">
                  <img class="thumb-item__image" src={"https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_48-512.png"} width="35" height="35" alt=""/>
                    <div class="thumb-item__info">
                      <p>Code 04</p>
                    </div>
                  </div>
                )
              }
            }
          },
          { title: 'Fecha', field: 'TRTIME' ,type: "datetime",cellStyle: {fontSize: 12},headerStyle: {fontSize:12}},
          { title: 'Mandante', field: 'TRCLI' ,cellStyle: {fontSize: 12},headerStyle: {fontSize:12}},
          { title: 'Usuario', field: 'TRUSER' ,cellStyle: {fontSize: 12},headerStyle: {fontSize:12}},
          { title: 'Administrador', field: 'ADMIN',cellStyle: {fontSize: 12},headerStyle: {fontSize:12}}
        ]}
        data={data_final}
        options={{
          pageSizeOptions:page_options,
          pageSize: 10,
          exportButton: true,
          exportFileName: "reports_OT",
          paging: true,
          columnsButton: true,
          rowStyle:  data => {
            if (data.TRUSER == this.state.user) {
              return {
                textAlign: 'center',
                backgroundColor: '#4286f4'
              }
            }
            else {
                return {
                    textAlign: 'center'
                  }
            }
          }
        }}
        title="Dynamic Reports"
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    }

    let table_react =
    <div className="container-fluid">
    {snackbar}
    {buttom_save}
    <AppBar position="static">
    <Tabs variant="fullWidth" value={value} onChange={this.handleChange_tabs}>
      <LinkTab label="ERP Productivo"/>
      <LinkTab label="ERP Calidad"/>
      <LinkTab label="ERP Desarrollo"/>
    </Tabs>
    </AppBar>
    {table_final}
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
              <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-truck" aria-hidden="true"></i>
                  <span>Ordenes de Transporte</span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a onClick={this.handleClick.bind(this)} data-id="dashots">
                      <i className="fa fa-tachometer" aria-hidden="true"></i>
                      <span>Dashboard</span>
                    </a>
                  </li>                  
                  <li role="separator" class="divider"></li>
                  <li>
                    <a onClick={this.handleClick.bind(this)} data-id="allots">
                      <i className="fa fa-th-list" aria-hidden="true"></i>
                      <span>Todas las Ordenes</span>
                    </a>
                  </li>                  
                  <li role="separator" class="divider"></li>
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
                    <h2>All Transport Orders</h2>
                    <div className="right-wrapper pull-right">
                        <ol className="breadcrumbs">
                            <li>
                                <a >
                                    <i className="fa fa-tachometer"></i>
                                </a>
                            </li>
                            <li><span>All Transport Orders</span></li>
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