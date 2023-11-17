import React, { Component } from 'react';
import Dashboard from './components/Dashboard.js'
import ReglasNegocio from './components/ReglasNegocio.js'
import ERP from './components/ERP.js'
import MATRIZ from './components/Matriz.js'
import Login from './components/login.js'
import axios from 'axios'
import "assets/css/material-dashboard-react.css?v=1.6.0";
import imgOK from './assets/img/OK-512.png'
import imgFail from './assets/img/fail.png'

class App extends Component {
  constructor(props){
    super(props)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.getallRules = this.getallRules.bind(this)
    this.runScript = this.runScript.bind(this)
    this.getallData = this.getallData.bind(this)
    this.userChange = this.userChange.bind(this)
    this.rollChange = this.rollChange.bind(this)
    this.esEntero = this.esEntero.bind(this);
    this.checkalerts = this.checkalerts.bind(this);
    this.sendmessage_slack = this.sendmessage_slack.bind(this);
    this.state = {
      view:'login',validateuser:"",
      rules:[],alerts:[],datetime:"",
      date:"",date_to_refresh:"",date_last_refresh:"",
      data_erp: "",usuario:"",user_roll:"",
      erpSmlg:[],erpSm50:"",erpSm51:[],
      erpSm50_all:"",
      erpSmlgRule:"",erpSm50Rule_dialogo:"",erpSm50Rule_update:"",erpSm50Rule_background:"",erpSm50Rule_spool:"",erpSm50Rule_updatetask:"",erpSm51Rule:"",
      erpsmlgflag_alert: <img class="thumb-item__image" src={imgOK} width="30" height="30" alt=""/>, erpsm50flag_alert: <img class="thumb-item__image" src={imgOK} width="30" height="30" alt=""/>,erpsm51flag_alert: <img class="thumb-item__image" src={imgOK} width="30" height="30" alt=""/>,
      erpsmlg_alert: false, erpsm50_alert: false,erpsm51_alert: [],
      array_erpsmlg_alert:[],
      array_erpsm50_alert:[],
      clientes : []
    }
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
  userChange(e) {
    this.setState({usuario: e}, function () {});
  }
  rollChange(e) {
    this.setState({user_roll: e}, function () {});
  }
  componentDidMount(){
    this.setState({alerts:[]})
    this.getallRules()
    this.runScript("all")
    this.getallData()
    try {
      setInterval(async () => {
        this.setState({alerts:[]})
        this.runScript("all")
        this.getallData()
      }, 500000);
    } catch(e) {
      console.log(e);
    }
    
  }

  getallRules(){
    return axios.get(`http://localhost:5000/rules`)
    .then(res => this.setRules(res))
    .catch(err => console.log('err', err));
  }

  checkalerts(){
    let alerta = []
    let formatsmlg_alert = []
    let flag_alert_smlg = 0
    console.log("entre a checkalerts")
    if (this.state.alerts.length>0) {
      for (var i = 0; i < this.state.alerts.length; i++) {
        if (this.state.alerts[i].title == "SMLG") {
          formatsmlg_alert.push({
            "type": "context",
            "elements": [
              {
                "type": "mrkdwn",
                "text": "*Servidor*: "+this.state.alerts[i].datos.instance+"     *Tiempo de Respuesta*: "+this.state.alerts[i].datos.time+"ms"
              }
            ]
          })    
          flag_alert_smlg = 1     
        }
      }
      if (flag_alert_smlg == 1) {
      alerta = {
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": ":alert: *SMLG*"+"   -   *KPI*: "+this.state.erpSmlgRule+"ms"
            }
          },
          {
            "type": "divider"
          }
        ]
      }
      alerta.blocks=alerta.blocks.concat(formatsmlg_alert);
      this.sendmessage_slack(alerta)
    }
  }
  }


  sendmessage_slack(body){
    return axios.post('http://localhost:5000/sendmessage_slack', {
      method: 'POST',
      body:body,
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': true },
      })
      .then(response => console.log("Mensaje de alerta enviado"))
      .catch(err => console.log('err', err));
  }

  setRules(r){
    this.setState({
      rules:[],alerts:[],
      data_erp: "",
      erpSmlg:[],erpSm50:"",erpSm51:[],
      erpSm50_all:"",
      erpSmlgRule:"",erpSm50Rule_dialogo:"",erpSm50Rule_update:"",erpSm50Rule_background:"",erpSm50Rule_spool:"",erpSm50Rule_updatetask:"",erpSm51Rule:"",
      erpsmlgflag_alert: <img class="thumb-item__image" src={imgOK} width="30" height="30" alt=""/>, erpsm50flag_alert: <img class="thumb-item__image" src={imgOK} width="30" height="30" alt=""/>,erpsm51flag_alert: <img class="thumb-item__image" src={imgOK} width="30" height="30" alt=""/>,
      erpsmlg_alert: false, erpsm50_alert: false,erpsm51_alert: [],
      array_erpsmlg_alert:[],
      array_erpsm50_alert:[],
      clientes : []
    })
    let rules_info = r.data.ERP  
    this.setState({erpSmlgRule:rules_info.smlg})
    this.setState({
      erpSm50Rule_dialogo:rules_info.sm50.dialogo,
      erpSm50Rule_update:rules_info.sm50.update,
      erpSm50Rule_background:rules_info.sm50.background,
      erpSm50Rule_spool:rules_info.sm50.spool,
      erpSm50Rule_updatetask:rules_info.sm50.update_task
    })
  }
  
  runScript(tcode){
    if (tcode == "all"){
      this.setState({
        erpSmlg:"",
        erpSm50:"",
        erpSm51:"",
      })
    }
    else if (tcode == "sm50") {
      this.setState({
        erpSm50:""
      })
    }
    else if (tcode == "sm51") {
      this.setState({
        erpSm51:""
      })
    }
    else if (tcode == "smlg") {
      this.setState({
        erpSmlg:""
      })
    }
    return axios.get(`http://localhost:5000/runscript`,{params: {code: tcode}})
    .then(res => console.log(res))
    .catch(err => console.log('err', err));
  }

  getallData(){
    var d1 = new Date()
    var d2 = String(d1)
    var string_time_last_refresh = d2.split(' ')[0]+ " " + d2.split(' ')[1]+ " " + d2.split(' ')[2]+ " " + d2.split(' ')[3] + " " + d2.split(' ')[4].split(':')[0] + ":" + d2.split(' ')[4].split(':')[1]
    this.setState({datetime:string_time_last_refresh})
    console.log("Se va a comenzar a extraer la data");
    return axios.get(`http://localhost:5000/alldata`)
      .then(res => this.setTransactionState(res))
      .catch(err => console.log('err', err));
  }
  setTransactionState(res){
    console.log(res);
    let response_erp =  res.data
    // ERP
    this.setSmlgState(response_erp.smlg,"ERP")
    this.setSm50State(response_erp.sm50,"ERP")
    this.setSm51State(response_erp.sm51,"ERP")
    this.checkalerts()
  }

  setSmlgState(r,s){
    let alertamiento = []
   if (r) {
    if (s === "ERP") {
      let array_alert = []
      this.setState({
        erpsmlg_alert: false
      })
      this.setState({ erpSmlg: r})
      for (var i = 0; i < r.length; i++) {
        if ((parseInt(this.esEntero(r[i].response_time)))>parseInt(this.esEntero(this.state.erpSmlgRule))) {
          let alert ={
            type:'danger',
            title:'SMLG',
            message: 'El tiempo de respuesta del servidor '+r[i].instance+' es de '+r[i].response_time,
            datos: {
              instance : r[i].instance,
              time : r[i].response_time
            }
          }
          alertamiento = this.state.alerts
          alertamiento.push(alert)
          array_alert.push(r[i].instance)
          this.setState({erpsmlg_alert: true})
        }
      }
      if (array_alert.length > 0) {
        this.setState({array_erpsmlg_alert: array_alert})
      }
    }
    if (alertamiento.length > 0) {
      if (s === "ERP") {
        this.setState({ erpsmlgflag_alert: <img class="thumb-item__image" src={imgFail} width="30" height="30" alt=""/>})
      }
      this.setState({alerts: alertamiento})
    }
    else {
      if (s === "ERP") {
        this.setState({ erpsmlgflag_alert: <img class="thumb-item__image" src={imgOK} width="30" height="30" alt=""/>})
      }
    }
   } else {
    if (s === "ERP") {
      this.setState({ erpSmlg: []})
      this.setState({ erpsmlgflag_alert: <img class="thumb-item__image" src={imgOK} width="30" height="30" alt=""/>})
    }
   }
  }
  setSm50State(r,s){
    if (r) {
      let alertamiento = []
      let libres_erp = 0
      let ocupados_erp = 0
      if (s === "ERP") {
        let libres_diag = 0,libres_upd = 0,libres_btc = 0,libres_sp = 0,libres_updt = 0
        let ocupados_diag = 0,ocupados_upd = 0,ocupados_btc = 0,ocupados_sp = 0,ocupados_updt = 0
        let porcentaje_ocupado_diag = 0,porcentaje_ocupado_upd = 0,porcentaje_ocupado_btc = 0,porcentaje_ocupado_sp = 0,porcentaje_ocupado_updt = 0
        let array_alert = []
        this.setState({erpSm50_all : r})
        this.setState({erpsm50_alert : false})
        for (var i = 0; i < Object.keys(r).length; i++) {
            libres_erp += parseInt(r[i].dialog.split('(')[0].split('/')[1])
            libres_erp += parseInt(r[i].update.split('(')[0].split('/')[1])
            libres_erp += parseInt(r[i].background.split('(')[0].split('/')[1])
            libres_erp += parseInt(r[i].spool.split('(')[0].split('/')[1])
            libres_erp += parseInt(r[i].updatetaskII.split('(')[0].split('/')[1])
            ocupados_erp += parseInt(r[i].dialog.split('(')[0].split('/')[0]) - parseInt(r[i].dialog.split('(')[0].split('/')[1])
            ocupados_erp += parseInt(r[i].update.split('(')[0].split('/')[0]) - parseInt(r[i].update.split('(')[0].split('/')[1])
            ocupados_erp += parseInt(r[i].background.split('(')[0].split('/')[0]) - parseInt(r[i].background.split('(')[0].split('/')[1])
            ocupados_erp += parseInt(r[i].spool.split('(')[0].split('/')[0]) - parseInt(r[i].spool.split('(')[0].split('/')[1])
            ocupados_erp += parseInt(r[i].updatetaskII.split('(')[0].split('/')[0]) - parseInt(r[i].updatetaskII.split('(')[0].split('/')[1])

            libres_diag = parseInt(r[i].dialog.split('(')[0].split('/')[1])
            ocupados_diag = parseInt(r[i].dialog.split('(')[0].split('/')[0]) - parseInt(r[i].dialog.split('(')[0].split('/')[1])
            porcentaje_ocupado_diag = parseInt(ocupados_diag * 100 / (libres_diag + ocupados_diag)) 

            libres_upd = parseInt(r[i].update.split('(')[0].split('/')[1])
            ocupados_upd = parseInt(r[i].update.split('(')[0].split('/')[0]) - parseInt(r[i].update.split('(')[0].split('/')[1])
            porcentaje_ocupado_upd = parseInt(ocupados_upd * 100 / (libres_upd + ocupados_upd)) 

            libres_btc = parseInt(r[i].background.split('(')[0].split('/')[1])
            ocupados_btc = parseInt(r[i].background.split('(')[0].split('/')[0]) - parseInt(r[i].background.split('(')[0].split('/')[1])
            porcentaje_ocupado_btc = parseInt(ocupados_btc * 100 / (libres_btc + ocupados_btc)) 

            libres_sp = parseInt(r[i].spool.split('(')[0].split('/')[1])
            ocupados_sp = parseInt(r[i].spool.split('(')[0].split('/')[0]) - parseInt(r[i].spool.split('(')[0].split('/')[1])
            porcentaje_ocupado_sp = parseInt(ocupados_sp * 100 / (libres_sp + ocupados_sp)) 

            libres_updt = parseInt(r[i].updatetaskII.split('(')[0].split('/')[1])
            ocupados_updt = parseInt(r[i].updatetaskII.split('(')[0].split('/')[0]) - parseInt(r[i].updatetaskII.split('(')[0].split('/')[1])
            porcentaje_ocupado_updt = parseInt(ocupados_updt * 100 / (libres_updt + ocupados_updt)) 
            
            
            if (porcentaje_ocupado_diag > parseInt(this.state.erpSm50Rule_dialogo)) {
              array_alert.push(r[i].server)
              let alert ={
                type:'danger',
                title:'SM50',
                message: 'El servidor '+r[i].server+' tiene ocupado mas del '+this.state.erpSm50Rule_dialogo+'% de los procesos de dialogo'
              }
              alertamiento = this.state.alerts
              alertamiento.push(alert)
            }
            if (porcentaje_ocupado_upd > parseInt(this.state.erpSm50Rule_update)) {
              array_alert.push(r[i].server)
              let alert ={
                type:'danger',
                title:'SM50',
                message: 'El servidor '+r[i].server+' tiene ocupado mas del '+this.state.erpSm50Rule_update+'% de los procesos de update'
              }
              alertamiento = this.state.alerts
              alertamiento.push(alert)
            }
            if (porcentaje_ocupado_btc > parseInt(this.state.erpSm50Rule_background)) {
              array_alert.push(r[i].server)
              let alert ={
                type:'danger',
                title:'SM50',
                message: 'El servidor '+r[i].server+' tiene ocupado mas del '+this.state.erpSm50Rule_background+'% de los procesos de background'
              }
              alertamiento = this.state.alerts
              alertamiento.push(alert)
            }
            if (porcentaje_ocupado_sp > parseInt(this.state.erpSm50Rule_spool)) {
              array_alert.push(r[i].server)
              let alert ={
                type:'danger',
                title:'SM50',
                message: 'El servidor '+r[i].server+' tiene ocupado mas del '+this.state.erpSm50Rule_spool+'% de los procesos de spool'
              }
              alertamiento = this.state.alerts
              alertamiento.push(alert)
            }
            if (porcentaje_ocupado_updt > parseInt(this.state.erpSm50Rule_updatetask)) {
              array_alert.push(r[i].server)
              let alert ={
                type:'danger',
                title:'SM50',
                message: 'El servidor '+r[i].server+' tiene ocupado mas del '+this.state.erpSm50Rule_updatetask+'% de los procesos de update task'
              }
              alertamiento = this.state.alerts
              alertamiento.push(alert)
            }
          }
          this.setState(
            { 
              erpSm50: {
                ocupados:ocupados_erp,
                libres:libres_erp
              },
              array_erpsm50_alert: array_alert
            }
          )
          if (array_alert.length > 0) {
            this.setState({erpsm50_alert : true})
            this.setState({ erpsm50flag_alert: <img class="thumb-item__image" src={imgFail} width="30" height="30" alt=""/>})
            this.setState({alerts: alertamiento})
          } else {
            this.setState({erpsm50_alert : false})
            this.setState({ erpsm50flag_alert: <img class="thumb-item__image" src={imgOK} width="30" height="30" alt=""/>})
          }
        }
    }
     else {
      if (s === "ERP") {
        this.setState({ erpSm50: []})
      }
    }
  }
  setSm51State(r,s){
    let alertamiento = []
    if (r) {
      if (s === "ERP") {
        this.setState({ erpSm51: r})
        this.setState({ erpsm51_alert: false})
      var array_erpsm51_alert = []
      for (let index = 0; index < (r.length - 1); index++) {
        const element = r[index];
        array_erpsm51_alert.push(element.status)
      }
      this.setState({ erpsm51_alert: array_erpsm51_alert})
    } else {
      if (s === "ERP") {
        this.setState({ erpSm51: []})
      }
    }
 }
}
  handleSelectionChange(e) {
    this.setState({view: e}, function () {
      console.log('view: ',this.state.view);
    });
  }
  render() {
    var view
    var erpData = {
      erpSmlg:this.state.erpSmlg,
      erpSm50:this.state.erpSm50,
      erpSm50_all:this.state.erpSm50_all,
      erpSm51:this.state.erpSm51,
      datetime:this.state.datetime
    }
    var reglas = {
      erpSmlgRule: this.state.erpSmlgRule,
      erpSm50Rule_dialogo:this.state.erpSm50Rule_dialogo,
      erpSm50Rule_update:this.state.erpSm50Rule_update,
      erpSm50Rule_background:this.state.erpSm50Rule_background,
      erpSm50Rule_spool:this.state.erpSm50Rule_spool,
      erpSm50Rule_updatetask:this.state.erpSm50Rule_updatetask
    }
    var alert_data = [
      {
      id:1,
      transaction:"SMLG",
      erp:this.state.erpsmlgflag_alert
    },
    {
      id:2,
      transaction:"SM50",
      erp:this.state.erpsm50flag_alert
    },
    {
      id:3,
      transaction:"SM51",
      erp:this.state.erpsm51flag_alert
    }
  ]
    if (this.state.view === 'dashboard') {
      view = <Dashboard states={this.state} data_erp={{erpData:erpData}} rules={this.state.rules} alerts={this.state.alerts} onChange={this.handleSelectionChange} onTcode={this.runScript} alldata={this.getallData}/>
    }
    else if (this.state.view === 'reglasNegocio') {
      view = <ReglasNegocio alerts={this.state.alerts} rules={reglas} getDataAll={this.getallData} onPush={this.getallRules} onChange={this.handleSelectionChange}/>
    }
    else if (this.state.view === 'erp') {
      view = <ERP states={this.state} data={erpData} alerts={this.state.alerts} rules={this.state.rules} onChange={this.handleSelectionChange} onTcode={this.runScript} alldata={this.getallData}/>
    }
    else if (this.state.view === 'matriz') {
      view = <MATRIZ alerts={alert_data} alertas={this.state.alerts} onChange={this.handleSelectionChange}/>
    }
    else if (this.state.view === 'login') {
      view = <Login rollChange={this.rollChange} userChange={this.userChange} onChange={this.handleSelectionChange}/>
    }
    return (
      <div>
      {view}
      </div>
    );
  }
}

export default App;
