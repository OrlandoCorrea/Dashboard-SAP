import React, { Component } from 'react';
import {Doughnut,HorizontalBar} from 'react-chartjs-2';
import 'react-table/react-table.css'
import imgIBM from '../assets/img/IBM.jpg';
import imgNutresa from '../assets/img/na3WJJlB_400x400.jpg'
import imgSAP from '../assets/img/Sap-Logo--e1530285069227.png'

class ERP extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.esEntero = this.esEntero.bind(this);
    this.runtcode = this.runtcode.bind(this);
    this.state = {
      erpData:props.data,
      alerts:props.alerts,
      rules:props.rules,
      state:props.states
    }
  }
  componentWillMount() {
    this.setState({ state:this.props.states,rules:this.props.rules,alerts: this.props.alerts,erpData: this.props.data});
  }

  componentWillReceiveProps(nextProps) {
      if(this.props != nextProps) {
        this.setState({ state:nextProps.states,rules:nextProps.rules,alerts: nextProps.alerts,erpData: nextProps.data});
      }
  }
  handleClick(e) {
    this.props.onChange(e.currentTarget.dataset.id );
  }
  esEntero(numero){
    if (numero % 1 == 0) {
      console.log("No decimal");
    } else {
      console.log("Decimal");
      numero = numero * 1000
    }
    return numero
  }
  runtcode(e){
    this.props.onTcode(e.currentTarget.dataset.id);
    this.props.alldata();
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

    //SM51
       var d_sm51_erp = []
    // ERP
    if (this.state.erpData.erpSm51.length>0) {
      let icon = []
      for (let index = 0; index < this.state.state.erpsm51_alert.length; index++) {
        const element = this.state.state.erpsm51_alert[index];
        if (element != "Active") {
          icon.push(<div className="summary-icon bg-danger">
                <i className="fa fa-thumbs-down"></i>
              </div>)
        }
        else {
          icon.push(<div className="summary-icon bg-success">
                <i className="fa fa-check"></i>
              </div>)
        }
      }
        d_sm51_erp.push(
          <div>
          <div className="row">
          <div className="col-md-4">
          <div className="widget-summary widget-summary-sm">
            <div className="widget-summary-col widget-summary-col-icon">
              {icon[0]}
            </div>
            <div className="widget-summary widget-summary-col">
              <div className="summary">
                <h5 className="title">Server {this.state.erpData.erpSm51[0].server}</h5>
                <h5 className="title">Estado {this.state.erpData.erpSm51[0].status}</h5>
                <div className="info">
                  <strong className="amount">{this.state.erpData.erpSm51[0].sid}</strong>
                  <p>{this.state.erpData.erpSm51[0].system} {this.state.erpData.erpSm51[0].environment}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="col-md-4">
          <div className="widget-summary widget-summary-sm">
            <div className="widget-summary-col widget-summary-col-icon">
              {icon[1]}
            </div>
            <div className="widget-summary widget-summary-col">
              <div className="summary">
                <h5 className="title">Server {this.state.erpData.erpSm51[1].server}</h5>
                <h5 className="title">Estado {this.state.erpData.erpSm51[1].status}</h5>
                <div className="info">
                  <strong className="amount">{this.state.erpData.erpSm51[1].sid}</strong>
                  <p>{this.state.erpData.erpSm51[1].system} {this.state.erpData.erpSm51[1].environment}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="col-md-4">
          <div className="widget-summary widget-summary-sm">
            <div className="widget-summary-col widget-summary-col-icon">
              {icon[2]}
            </div>
            <div className="widget-summary widget-summary-col">
              <div className="summary">
                <h5 className="title">Server {this.state.erpData.erpSm51[2].server}</h5>
                <h5 className="title">Estado {this.state.erpData.erpSm51[2].status}</h5>
                <div className="info">
                  <strong className="amount">{this.state.erpData.erpSm51[2].sid}</strong>
                  <p>{this.state.erpData.erpSm51[2].system} {this.state.erpData.erpSm51[2].environment}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
          <div className="row">
          <div className="col-md-4">
          <div className="widget-summary widget-summary-sm">
            <div className="widget-summary-col widget-summary-col-icon">
              {icon[3]}
            </div>
            <div className="widget-summary widget-summary-col">
              <div className="summary">
                <h5 className="title">Server {this.state.erpData.erpSm51[3].server}</h5>
                <h5 className="title">Estado {this.state.erpData.erpSm51[3].status}</h5>
                <div className="info">
                  <strong className="amount">{this.state.erpData.erpSm51[3].sid}</strong>
                  <p>{this.state.erpData.erpSm51[3].system} {this.state.erpData.erpSm51[3].environment}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="col-md-4">
          <div className="widget-summary widget-summary-sm">
            <div className="widget-summary-col widget-summary-col-icon">
              {icon[4]}
            </div>
            <div className="widget-summary widget-summary-col">
              <div className="summary">
                <h5 className="title">Server {this.state.erpData.erpSm51[4].server}</h5>
                <h5 className="title">Estado {this.state.erpData.erpSm51[4].status}</h5>
                <div className="info">
                  <strong className="amount">{this.state.erpData.erpSm51[4].sid}</strong>
                  <p>{this.state.erpData.erpSm51[4].system} {this.state.erpData.erpSm51[4].environment}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="col-md-4">
          <div className="widget-summary widget-summary-sm">
            <div className="widget-summary-col widget-summary-col-icon">
              {icon[5]}
            </div>
            <div className="widget-summary widget-summary-col">
              <div className="summary">
                <h5 className="title">Server {this.state.erpData.erpSm51[5].server}</h5>
                <h5 className="title">Estado {this.state.erpData.erpSm51[5].status}</h5>
                <div className="info">
                  <strong className="amount">{this.state.erpData.erpSm51[5].sid}</strong>
                  <p>{this.state.erpData.erpSm51[5].system} {this.state.erpData.erpSm51[5].environment}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
          <div className="row">
          <div className="col-md-4">
          <div className="widget-summary widget-summary-sm">
            <div className="widget-summary-col widget-summary-col-icon">
              {icon[6]}
            </div>
            <div className="widget-summary widget-summary-col">
              <div className="summary">
                <h5 className="title">Server {this.state.erpData.erpSm51[6].server}</h5>
                <h5 className="title">Estado {this.state.erpData.erpSm51[6].status}</h5>
                <div className="info">
                  <strong className="amount">{this.state.erpData.erpSm51[6].sid}</strong>
                  <p>{this.state.erpData.erpSm51[6].system} {this.state.erpData.erpSm51[6].environment}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="col-md-4">
          <div className="widget-summary widget-summary-sm">
            <div className="widget-summary-col widget-summary-col-icon">
              {icon[7]}
            </div>
            <div className="widget-summary widget-summary-col">
              <div className="summary">
                <h5 className="title">Server {this.state.erpData.erpSm51[7].server}</h5>
                <h5 className="title">Estado {this.state.erpData.erpSm51[7].status}</h5>
                <div className="info">
                  <strong className="amount">{this.state.erpData.erpSm51[7].sid}</strong>
                  <p>{this.state.erpData.erpSm51[7].system} {this.state.erpData.erpSm51[7].environment}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
          </div>
          )
    }
    //SMLG
    let d_smlg = []
    let dataSmlg = []
    let l_smlg = []
    let backColorSmlg = []
    let borderColorSmlg = []
    let flag_smlg = false
    if (this.state.erpData.erpSmlg.length>0) {
      for (var i = 0; i < this.state.erpData.erpSmlg.length; i++) {
         d_smlg.push(parseInt(this.esEntero(this.state.erpData.erpSmlg[i].response_time)))
         l_smlg.push(this.state.erpData.erpSmlg[i].instance)
         if (this.state.state.array_erpsmlg_alert.length > 0) {
          flag_smlg = false
            for (let index = 0; index < this.state.state.array_erpsmlg_alert.length; index++) {
              const element = this.state.state.array_erpsmlg_alert[index];
              if (element === this.state.erpData.erpSmlg[i].instance) {
                flag_smlg = true
              }
            }
            if (flag_smlg) {
              backColorSmlg.push('rgba(255, 0, 0, 0.2)')
              borderColorSmlg.push('rgba(255, 0, 0, 0.2)')  
            } else {
              backColorSmlg.push('rgba(135, 189, 53, 0.2)')
              borderColorSmlg.push('rgba(135, 189, 53, 1)')
            }
            flag_smlg = false
         } else {
          backColorSmlg.push('rgba(135, 189, 53, 0.2)')
          borderColorSmlg.push('rgba(135, 189, 53, 1)')
         }
      }
    }
    console.log("Array colores SMLG")
    console.group(backColorSmlg)
    dataSmlg = {
        labels: l_smlg,
        datasets: [{
            label: 'Tiempo (seg)',
            data: d_smlg,
            backgroundColor: backColorSmlg,
            borderColor: borderColorSmlg,
            borderWidth: 1
        }]
    }
    //SM50
    var ncerp013_dialog_data = [], ncerp013_update_data = [],  ncerp013_background_data = [], ncerp013_spool_data = [], ncerp013_updatetaskII_data = []
    var ncerp033_dialog_data = [], ncerp033_update_data = [],  ncerp033_background_data = [], ncerp033_spool_data = [], ncerp033_updatetaskII_data = []
    var ncerp043_dialog_data = [], ncerp043_update_data = [],  ncerp043_background_data = [], ncerp043_spool_data = [], ncerp043_updatetaskII_data = []
    var ncerp063_dialog_data = [], ncerp063_update_data = [],  ncerp063_background_data = [], ncerp063_spool_data = [], ncerp063_updatetaskII_data = []
    var ncerp073_dialog_data = [], ncerp073_update_data = [],  ncerp073_background_data = [], ncerp073_spool_data = [], ncerp073_updatetaskII_data = []
    var ncerp083_dialog_data = [], ncerp083_update_data = [],  ncerp083_background_data = [], ncerp083_spool_data = [], ncerp083_updatetaskII_data = []
    var ncerp093_dialog_data = [], ncerp093_update_data = [],  ncerp093_background_data = [], ncerp093_spool_data = [], ncerp093_updatetaskII_data = []
    var ncerp113_dialog_data = [], ncerp113_update_data = [],  ncerp113_background_data = [], ncerp113_spool_data = [], ncerp113_updatetaskII_data = []
    if (this.state.erpData.erpSm50_all.length>0) {
      for (var i = 0; i < this.state.erpData.erpSm50_all.length; i++) {
        if (this.state.erpData.erpSm50_all[i].server === 'ncerp013_ERP_01') {
          ncerp013_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp013_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp013_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp013_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp013_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp013_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp013_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp013_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp013_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
          ncerp013_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
        }
        else if (this.state.erpData.erpSm50_all[i].server === 'ncerp033_ERP_00') {
          ncerp033_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp033_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp033_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp033_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp033_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp033_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp033_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp033_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp033_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
          ncerp033_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
        }
        else if (this.state.erpData.erpSm50_all[i].server === 'ncerp043_ERP_00') {
          ncerp043_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp043_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp043_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp043_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp043_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp043_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp043_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp043_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp043_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
          ncerp043_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
        }
        else if (this.state.erpData.erpSm50_all[i].server === 'ncerp063_ERP_00') {
          ncerp063_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp063_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp063_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp063_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp063_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp063_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp063_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp063_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp063_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
          ncerp063_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
        }
        else if (this.state.erpData.erpSm50_all[i].server === 'ncerp073_ERP_00') {
          ncerp073_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp073_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp073_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp073_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp073_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp073_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp073_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp073_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp073_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
          ncerp073_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
        }
        else if (this.state.erpData.erpSm50_all[i].server === 'ncerp083_ERP_00') {
          ncerp083_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp083_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp083_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp083_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp083_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp083_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp083_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp083_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp083_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
          ncerp083_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
        }
        else if (this.state.erpData.erpSm50_all[i].server === 'ncerp093_ERP_00') {
          ncerp093_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp093_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp093_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp093_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp093_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp093_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp093_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp093_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp093_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
          ncerp093_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
        }
        else if (this.state.erpData.erpSm50_all[i].server === 'ncerp113_ERP_00') {
          ncerp113_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp113_dialog_data.push(parseInt(this.state.erpData.erpSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncerp113_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp113_update_data.push(parseInt(this.state.erpData.erpSm50_all[i].update.split('(')[0].split('/')[1]))
          ncerp113_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp113_background_data.push(parseInt(this.state.erpData.erpSm50_all[i].background.split('(')[0].split('/')[1]))
          ncerp113_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp113_spool_data.push(parseInt(this.state.erpData.erpSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncerp113_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[0]) - parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
          ncerp113_updatetaskII_data.push(parseInt(this.state.erpData.erpSm50_all[i].updatetaskII.split('(')[0].split('/')[1]))
        }
      }
    }

    var ncerp013_dialog
  
    ncerp013_dialog = {
        datasets: [{
            data: ncerp013_dialog_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }

    var ncerp013_update = {
        datasets: [{
            data: ncerp013_update_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp013_background = {
        datasets: [{
            data: ncerp013_background_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp013_spool = {
        datasets: [{
            data: ncerp013_spool_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp013_updatetaskII = {
        datasets: [{
            data: ncerp013_updatetaskII_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp033_dialog = {
        datasets: [{
            data: ncerp033_dialog_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp033_update = {
        datasets: [{
            data: ncerp033_update_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp033_background = {
        datasets: [{
            data: ncerp033_background_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp033_spool = {
        datasets: [{
            data: ncerp033_spool_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp033_updatetaskII = {
        datasets: [{
            data: ncerp033_updatetaskII_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp043_dialog = {}

      ncerp043_dialog = {
        datasets: [{
            data: ncerp043_dialog_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }

    var ncerp043_update = {
        datasets: [{
            data: ncerp043_update_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp043_background = {
        datasets: [{
            data: ncerp043_background_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp043_spool = {
        datasets: [{
            data: ncerp043_spool_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp043_updatetaskII = {
        datasets: [{
            data: ncerp043_updatetaskII_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp063_dialog = {
        datasets: [{
            data: ncerp063_dialog_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp063_update = {
        datasets: [{
            data: ncerp063_update_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp063_background = {
        datasets: [{
            data: ncerp063_background_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp063_spool = {
        datasets: [{
            data: ncerp063_spool_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp063_updatetaskII = {
        datasets: [{
            data: ncerp063_updatetaskII_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp073_dialog = {
        datasets: [{
            data: ncerp073_dialog_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp073_update = {
        datasets: [{
            data: ncerp073_update_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp073_background = {
        datasets: [{
            data: ncerp073_background_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp073_spool = {
        datasets: [{
            data: ncerp073_spool_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp073_updatetaskII = {
        datasets: [{
            data: ncerp073_updatetaskII_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp083_dialog = {
        datasets: [{
            data: ncerp083_dialog_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp083_update = {
        datasets: [{
            data: ncerp083_update_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp083_background = {
        datasets: [{
            data: ncerp083_background_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp083_spool = {
        datasets: [{
            data: ncerp083_spool_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp083_updatetaskII = {
        datasets: [{
            data: ncerp083_updatetaskII_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp093_dialog = {
        datasets: [{
            data: ncerp093_dialog_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp093_update = {
        datasets: [{
            data: ncerp093_update_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp093_background = {
        datasets: [{
            data: ncerp093_background_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp093_spool = {
        datasets: [{
            data: ncerp093_spool_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp093_updatetaskII = {
        datasets: [{
            data: ncerp093_updatetaskII_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp113_dialog
   
    ncerp113_dialog = {
        datasets: [{
            data: ncerp113_dialog_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }

    var ncerp113_update = {
        datasets: [{
            data: ncerp113_update_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp113_background = {
        datasets: [{
            data: ncerp113_background_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp113_spool = {
        datasets: [{
            data: ncerp113_spool_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }
    var ncerp113_updatetaskII = {
        datasets: [{
            data: ncerp113_updatetaskII_data,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(135, 189, 53, 0.2)'

            ],
            borderColor: [
              'rgba(54, 162, 235,1)',
              'rgba(135, 189, 53,1)'

            ],
            borderWidth: 1
        }],
        labels: [
            'Ocupados',
            'Libres'
        ]
    }

    let sm51_html
    let sm50_html
    let smlg_html

    if (this.state.erpData.erpSmlg.length == 0) {
      smlg_html = <center><div class="loader"></div></center>
    } else {
      smlg_html = <HorizontalBar data={dataSmlg} width={400} height={284} options={{maintainAspectRatio: false}}/>
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
          <a href="#ncerp013" data-toggle="tab" className="text-center">ncerp013</a>
        </li>
        <li>
          <a href="#ncerp033" data-toggle="tab" className="text-center">ncerp033</a>
        </li>
        <li>
          <a href="#ncerp043" data-toggle="tab" className="text-center">ncerp043</a>
        </li>
        <li>
          <a href="#ncerp063" data-toggle="tab" className="text-center">ncerp063</a>
        </li>
        <li>
          <a href="#ncerp073" data-toggle="tab" className="text-center">ncerp073</a>
        </li>
        <li>
          <a href="#ncerp083" data-toggle="tab" className="text-center">ncerp083</a>
        </li>
        <li>
          <a href="#ncerp093" data-toggle="tab" className="text-center">ncerp093</a>
        </li>
        <li>
          <a href="#ncerp113" data-toggle="tab" className="text-center">ncerp113</a>
        </li>
      </ul>
      <div className="tab-content">
        <div id="ncerp013" className="tab-pane active">
          <div className="row justify-content-md-center">
          <div className="col col-md-1">
            </div>
            <div className="col col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp013_dialog} />
              <h6 className="text-center">Dialog</h6>
              <p className="text-center">Total: {ncerp013_dialog_data[0]+ncerp013_dialog_data[1]}</p>
            </div>
            <div className="col col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp013_update} />
              <h6 className="text-center">Update</h6>
              <p className="text-center">Total: {ncerp013_update_data[0]+ncerp013_update_data[1]}</p>
            </div>
            <div className="col col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp013_background} />
              <h6 className="text-center">Background</h6>
              <p className="text-center">Total: {ncerp013_background_data[0]+ncerp013_background_data[1]}</p>
            </div>
            <div className="col col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp013_spool} />
              <h6 className="text-center">Spool</h6>
              <p className="text-center">Total: {ncerp013_spool_data[0]+ncerp013_spool_data[1]}</p>
            </div>
            <div className="col col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp013_updatetaskII} />
              <h6 className="text-center">Update Task</h6>
              <p className="text-center">Total: {ncerp013_updatetaskII_data[0]+ncerp013_updatetaskII_data[1]}</p>
            </div>
          </div>
        </div>
        <div id="ncerp033" className="tab-pane">
          <div className="row justify-content-between">
          <div className="col col-md-1">
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp033_dialog} />
              <h6 className="text-center">Dialog</h6>
              <p className="text-center">Total: {ncerp033_dialog_data[0]+ncerp033_dialog_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp033_update} />
              <h6 className="text-center">Update</h6>
              <p className="text-center">Total: {ncerp033_update_data[0]+ncerp033_update_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp033_background} />
              <h6 className="text-center">Background</h6>
              <p className="text-center">Total: {ncerp033_background_data[0]+ncerp033_background_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp033_spool} />
              <h6 className="text-center">Spool</h6>
              <p className="text-center">Total: {ncerp033_spool_data[0]+ncerp033_spool_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp033_updatetaskII} />
              <h6 className="text-center">Update Task</h6>
              <p className="text-center">Total: {ncerp033_updatetaskII_data[0]+ncerp033_updatetaskII_data[1]}</p>
            </div>
          </div>
        </div>
        <div id="ncerp043" className="tab-pane">
          <div className="row">
          <div className="col col-md-1">
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp043_dialog} />
              <h6 className="text-center">Dialog</h6>
              <p className="text-center">Total: {ncerp043_dialog_data[0]+ncerp043_dialog_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp043_update} />
              <h6 className="text-center">Update</h6>
              <p className="text-center">Total: {ncerp043_update_data[0]+ncerp043_update_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp043_background} />
              <h6 className="text-center">Background</h6>
              <p className="text-center">Total: {ncerp043_background_data[0]+ncerp043_background_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp043_spool} />
              <h6 className="text-center">Spool</h6>
              <p className="text-center">Total: {ncerp043_spool_data[0]+ncerp043_spool_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp043_updatetaskII} />
              <h6 className="text-center">Update Task</h6>
              <p className="text-center">Total: {ncerp043_updatetaskII_data[0]+ncerp043_updatetaskII_data[1]}</p>
            </div>
          </div>
        </div>
        <div id="ncerp063" className="tab-pane">
          <div className="row">
          <div className="col col-md-1">
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp063_dialog} />
              <h6 className="text-center">Dialog</h6>
              <p className="text-center">Total: {ncerp063_dialog_data[0]+ncerp063_dialog_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp063_update} />
              <h6 className="text-center">Update</h6>
              <p className="text-center">Total: {ncerp063_update_data[0]+ncerp063_update_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp063_background} />
              <h6 className="text-center">Background</h6>
              <p className="text-center">Total: {ncerp063_background_data[0]+ncerp063_background_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp063_spool} />
              <h6 className="text-center">Spool</h6>
              <p className="text-center">Total: {ncerp063_spool_data[0]+ncerp063_spool_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp063_updatetaskII} />
              <h6 className="text-center">Update Task</h6>
              <p className="text-center">Total: {ncerp063_updatetaskII_data[0]+ncerp063_updatetaskII_data[1]}</p>
            </div>
          </div>
        </div>
        <div id="ncerp073" className="tab-pane">
          <div className="row">
          <div className="col col-md-1">
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp073_dialog} />
              <h6 className="text-center">Dialog</h6>
              <p className="text-center">Total: {ncerp073_dialog_data[0]+ncerp073_dialog_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp073_update} />
              <h6 className="text-center">Update</h6>
              <p className="text-center">Total: {ncerp073_update_data[0]+ncerp073_update_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp073_background} />
              <h6 className="text-center">Background</h6>
              <p className="text-center">Total: {ncerp073_background_data[0]+ncerp073_background_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp073_spool} />
              <h6 className="text-center">Spool</h6>
              <p className="text-center">Total: {ncerp073_spool_data[0]+ncerp073_spool_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp073_updatetaskII} />
              <h6 className="text-center">Update Task</h6>
              <p className="text-center">Total: {ncerp073_updatetaskII_data[0]+ncerp073_updatetaskII_data[1]}</p>
            </div>
          </div>
        </div>
        <div id="ncerp083" className="tab-pane">
          <div className="row">
          <div className="col col-md-1">
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp083_dialog} />
              <h6 className="text-center">Dialog</h6>
              <p className="text-center">Total: {ncerp083_dialog_data[0]+ncerp083_dialog_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp083_update} />
              <h6 className="text-center">Update</h6>
              <p className="text-center">Total: {ncerp083_update_data[0]+ncerp083_update_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp083_background} />
              <h6 className="text-center">Background</h6>
              <p className="text-center">Total: {ncerp083_background_data[0]+ncerp083_background_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp083_spool} />
              <h6 className="text-center">Spool</h6>
              <p className="text-center">Total: {ncerp083_spool_data[0]+ncerp083_spool_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp083_updatetaskII} />
              <h6 className="text-center">Update Task</h6>
              <p className="text-center">Total: {ncerp083_updatetaskII_data[0]+ncerp083_updatetaskII_data[1]}</p>
            </div>
          </div>
        </div>
        <div id="ncerp093" className="tab-pane">
          <div className="row">
          <div className="col col-md-1">
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp093_dialog} />
              <h6 className="text-center">Dialog</h6>
              <p className="text-center">Total: {ncerp093_dialog_data[0]+ncerp093_dialog_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp093_update} />
              <h6 className="text-center">Update</h6>
              <p className="text-center">Total: {ncerp093_update_data[0]+ncerp093_update_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp093_background} />
              <h6 className="text-center">Background</h6>
              <p className="text-center">Total: {ncerp093_background_data[0]+ncerp093_background_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp093_spool} />
              <h6 className="text-center">Spool</h6>
              <p className="text-center">Total: {ncerp093_spool_data[0]+ncerp093_spool_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp093_updatetaskII} />
              <h6 className="text-center">Update Task</h6>
              <p className="text-center">Total: {ncerp093_updatetaskII_data[0]+ncerp093_updatetaskII_data[1]}</p>
            </div>
          </div>
        </div>
        <div id="ncerp113" className="tab-pane">
          <div className="row">
          <div className="col col-md-1">
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp113_dialog} />
              <h6 className="text-center">Dialog</h6>
              <p className="text-center">Total: {ncerp113_dialog_data[0]+ncerp113_dialog_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp113_update} />
              <h6 className="text-center">Update</h6>
              <p className="text-center">Total: {ncerp113_update_data[0]+ncerp113_update_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp113_background} />
              <h6 className="text-center">Background</h6>
              <p className="text-center">Total: {ncerp113_background_data[0]+ncerp113_background_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp113_spool} />
              <h6 className="text-center">Spool</h6>
              <p className="text-center">Total: {ncerp113_spool_data[0]+ncerp113_spool_data[1]}</p>
            </div>
            <div className="col-md-2">
              <Doughnut ref='chart' width={200} height={140} data={ncerp113_updatetaskII} />
              <h6 className="text-center">Update Task</h6>
              <p className="text-center">Total: {ncerp113_updatetaskII_data[0]+ncerp113_updatetaskII_data[1]}</p>
            </div>
          </div>
        </div>
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
						<div className="sidebar-toggle hidden-xs" data-toggle-classname="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
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
                  <li className="nav-active">
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
						<h2>Evaluación Técnica SAP - ERP</h2>
						<div className="right-wrapper pull-right">
							<ol className="breadcrumbs">
								<li>
									<a >
										<i className="fa fa-tasks"></i>
									</a>
								</li>
								<li><span>Evaluación Técnica SAP - ERP</span></li>
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
									<p className="panel-subtitle">Tiempo de respuesta del sistema.
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
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
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
                  </p>
								</header>
								<div className="panel-body">
                {sm51_html}
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
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
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

export default ERP;
