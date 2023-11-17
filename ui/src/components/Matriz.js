import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import imgNutresa from '../assets/img/na3WJJlB_400x400.jpg';
import imgSAP from '../assets/img/Sap-Logo--e1530285069227.png';
import imgIBM from '../assets/img/IBM.jpg';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

class CustomizedTable extends Component {
    constructor(props){
      super(props)
      this.handleClick = this.handleClick.bind(this);
      this.state = {
          alertamiento: this.props.alerts
       }
    }

    componentWillMount() {
        this.setState({
          alertamiento:this.props.alerts,
        })
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
          this.setState({
            alertamiento:nextProps.alerts
          });
        }
    }
    handleClick(e) {
    this.props.onChange(e.currentTarget.dataset.id );
    }
  render(){
  const { classes } = this.props;

  var alerts = []
  if (this.props.alertas.length>0) {
    for (var i = 0; i < this.props.alertas.length; i++) {
      var icon
      if (this.props.alertas[i].type==='danger') {
        icon = <i className="fa fa-thumbs-down bg-danger"></i>
      }
      else if (this.props.alertas[i].type==='warning') {
        icon = <i className="fa fa-warning bg-warning"></i>
      }
      alerts.push(<li>
        <a  className="clearfix">
          <div className="image">
            {icon}
          </div>
          <span className="title">{this.props.alertas[i].title}</span>
          <span className="message">{this.props.alertas[i].message}</span>
        </a>
      </li>)
    }
  }

  return (
<div>
<header className="header">
  <div className="logo-container">
    <a  className="logo">
      <img src={imgIBM} height="35" alt="Porto Admin" />
      <img src={imgSAP}height="35" alt="Porto Admin" />
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
      <h2>Matriz de Evaluacion</h2>
      <div className="right-wrapper pull-right">
        <ol className="breadcrumbs">
          <li>
            <a >
            <i className="fa fa-list-alt" aria-hidden="true"></i>
            </a>
          </li>
          <li><span>Matriz de Evaluacion</span></li>
        </ol>
        <a className="sidebar-right-toggle" data-open="sidebar-right"><i className="fa fa-chevron-left"></i></a>
      </div>
    </header>
    <div className="row">
      <div className="col-lg-12">
        <section className="panel">
        <br/><br/><br/>
          <header className="panel-heading">
            <h2 className="panel-title">Matriz de Evaluacion - Nutresa</h2>
          </header>
          <div className="panel-body">
            <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <CustomTableCell>Transaction</CustomTableCell>
                    <CustomTableCell align="right">ERP</CustomTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.alertamiento.map(row => (
                    <TableRow className={classes.row} key={row.id}>
                    <CustomTableCell component="th" scope="row">
                        {row.transaction}
                    </CustomTableCell>
                    <CustomTableCell align="right">{row.erp}</CustomTableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </Paper>
          </div>
        </section>
      </div>
    </div>
</section>
</div>
</div>
  );
}
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);