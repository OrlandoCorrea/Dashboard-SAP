import React, { Component } from 'react';
import {Bar,Doughnut,HorizontalBar} from 'react-chartjs-2';
import ReactTable from "react-table";
import 'react-table/react-table.css'

class BIP extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      bipData:props.data,
      alerts:props.alerts,
      rules:props.rules,
      state:props.states
    }
  }

  componentWillMount() {
    this.setState({ state:this.props.states,rules:this.props.rules,alerts: this.props.alerts,bipData: this.props.data});
  }

  componentWillReceiveProps(nextProps) {
      if(this.props != nextProps) {
        this.setState({ state:nextProps.states,rules:nextProps.rules,alerts: nextProps.alerts,bipData: nextProps.data});
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
    /// BIP
    var d_sm51_bip = []
    if (this.state.bipData.bipSm51.length>0) {
      let icon = ''
        if (this.state.state.bipsm51_alert) {
          icon = <div className="summary-icon bg-warning">
                <i className="fa fa-thumbs-down"></i>
              </div>
        }
        else {
          icon = <div className="summary-icon bg-success">
                <i className="fa fa-check"></i>
              </div>
        }
        d_sm51_bip.push(
        <div className="widget-summary widget-summary-sm">
          <div className="widget-summary-col widget-summary-col-icon">
            {icon}
          </div>
          <div className="widget-summary-col">
            <div className="summary">
              <h5 className="title">Versión {this.state.bipData.bipSm51[0].kernel}</h5>
              <h5 className="title">Parche {this.state.bipData.bipSm51[0].patch}</h5>
              <div className="info">
                <strong className="amount">{this.state.bipData.bipSm51[0].sid}</strong>
                <p>{this.state.bipData.bipSm51[0].system} {this.state.bipData.bipSm51[0].environment}</p>
              </div>
            </div>
          </div>
        </div>
        )
      }
    //SICK
    var d_sick = []
    if (this.state.bipData.bipSick.length>0) {
      var icon = ''
      if (this.state.bipData.bipSick[0].status==='OK') {
        icon = <div className="summary-icon bg-success">
              <i className="fa fa-check"></i>
            </div>
      }
      else {
        icon = <div className="summary-icon bg-warning">
              <i className="fa fa-warning"></i>
            </div>
      }
      var response = this.state.bipData.bipSick[0].response
      if (response==='noerrorsreported') {
        response = 'No se han repostado errores'
      }
      d_sick.push(<div className="widget-summary widget-summary-sm">
        <div className="widget-summary-col widget-summary-col-icon">
          {icon}
        </div>
        <div className="widget-summary-col">
          <div className="summary">
            <h5 className="title">{response}</h5>
            <div className="info">
              <strong className="amount">{this.state.bipData.bipSick[0].sid}</strong>
              <p>{this.state.bipData.bipSick[0].system+' '+this.state.bipData.bipSick[0].environment}</p>
            </div>
          </div>
        </div>
      </div>)
    }
    //SMLG
    var d_smlg = []
    var l_smlg = []
    var backColorSmlg = []
    var borderColorSmlg = []
    let flag_smlg = false
    if (this.state.bipData.bipSmlg.length>0) {
      for (var i = 0; i < this.state.bipData.bipSmlg.length; i++) {
        d_smlg.push(parseInt(this.state.bipData.bipSmlg[i].response_time))
        l_smlg.push(this.state.bipData.bipSmlg[i].instance)
        if (this.state.state.array_bipsmlg_alert.length > 0) {
           for (let index = 0; index < this.state.state.array_bipsmlg_alert.length; index++) {
             const element = this.state.state.array_bipsmlg_alert[index];
             if (element === this.state.bipData.bipSmlg[i].instance) {
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
    var dataSmlg = {
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
    var ncbip013_dialog_data = [], ncbip013_update_data = [],  ncbip013_background_data = [], ncbip013_spool_data = [], ncbip013_updatetaskII_data = []
    var ncbip033_dialog_data = [], ncbip033_update_data = [],  ncbip033_background_data = [], ncbip033_spool_data = [], ncbip033_updatetaskII_data = []

    if (this.state.bipData.bipSm50_all.length>0) {
        console.log(this.state.bipData.bipSm50_all);
      for (var i = 0; i < this.state.bipData.bipSm50_all.length; i++) {
        if (this.state.bipData.bipSm50_all[i].server === 'ncbi013_BIP_01') {
          ncbip013_dialog_data.push(parseInt(this.state.bipData.bipSm50_all[i].dialog.split('(')[0].split('/')[0]) - parseInt(this.state.bipData.bipSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncbip013_dialog_data.push(parseInt(this.state.bipData.bipSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncbip013_update_data.push(parseInt(this.state.bipData.bipSm50_all[i].update.split('(')[0].split('/')[0]) - parseInt(this.state.bipData.bipSm50_all[i].update.split('(')[0].split('/')[1]))
          ncbip013_update_data.push(parseInt(this.state.bipData.bipSm50_all[i].update.split('(')[0].split('/')[1]))
          ncbip013_background_data.push(parseInt(this.state.bipData.bipSm50_all[i].background.split('(')[0].split('/')[0]) - parseInt(this.state.bipData.bipSm50_all[i].background.split('(')[0].split('/')[1]))
          ncbip013_background_data.push(parseInt(this.state.bipData.bipSm50_all[i].background.split('(')[0].split('/')[1]))
          ncbip013_spool_data.push(parseInt(this.state.bipData.bipSm50_all[i].spool.split('(')[0].split('/')[0]) - parseInt(this.state.bipData.bipSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncbip013_spool_data.push(parseInt(this.state.bipData.bipSm50_all[i].spool.split('(')[0].split('/')[1]))
        }
        else if (this.state.bipData.bipSm50_all[i].server === 'ncbi033_BIP_01') {
          ncbip033_dialog_data.push(parseInt(this.state.bipData.bipSm50_all[i].dialog.split('(')[0].split('/')[0]) - parseInt(this.state.bipData.bipSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncbip033_dialog_data.push(parseInt(this.state.bipData.bipSm50_all[i].dialog.split('(')[0].split('/')[1]))
          ncbip033_update_data.push(parseInt(this.state.bipData.bipSm50_all[i].update.split('(')[0].split('/')[0]) - parseInt(this.state.bipData.bipSm50_all[i].update.split('(')[0].split('/')[1]))
          ncbip033_update_data.push(parseInt(this.state.bipData.bipSm50_all[i].update.split('(')[0].split('/')[1]))
          ncbip033_background_data.push(parseInt(this.state.bipData.bipSm50_all[i].background.split('(')[0].split('/')[0]) - parseInt(this.state.bipData.bipSm50_all[i].background.split('(')[0].split('/')[1]))
          ncbip033_background_data.push(parseInt(this.state.bipData.bipSm50_all[i].background.split('(')[0].split('/')[1]))
          ncbip033_spool_data.push(parseInt(this.state.bipData.bipSm50_all[i].spool.split('(')[0].split('/')[0]) - parseInt(this.state.bipData.bipSm50_all[i].spool.split('(')[0].split('/')[1]))
          ncbip033_spool_data.push(parseInt(this.state.bipData.bipSm50_all[i].spool.split('(')[0].split('/')[1]))
        }
      }
    }

    var ncbip013_dialog = {
        datasets: [{
            data: ncbip013_dialog_data,
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
    var ncbip013_update = {
        datasets: [{
            data: ncbip013_update_data,
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
    var ncbip013_background = {
        datasets: [{
            data: ncbip013_background_data,
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
    var ncbip013_spool = {
        datasets: [{
            data: ncbip013_spool_data,
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
    var ncbip033_dialog = {
        datasets: [{
            data: ncbip033_dialog_data,
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
    var ncbip033_update = {
        datasets: [{
            data: ncbip033_update_data,
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
    var ncbip033_background = {
        datasets: [{
            data: ncbip033_background_data,
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
    var ncbip033_spool = {
        datasets: [{
            data: ncbip033_spool_data,
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
    //SM66
    var columnsTableSm66 = [
      {
        Header: 'Servidor',
        accessor: 'server'
      },{
        Header: 'Cliente',
        accessor: 'client'
      },{
        Header: 'Tiempo',
        accessor: 'time',
        Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
        sortable: true
      },{
        Header: 'Estado',
        accessor: 'state'
      }
    ]

    function comp(a, b) {
      return parseInt(b.time) - parseInt(a.time);
    }

    var array_sm66_dia = [],array_sm66_btc = [],array_sm66_upd = []

    if (this.state.bipData.bipSm66.length>0) {
      for (var i = 0; i < this.state.bipData.bipSm66.length; i++) {
        const element = this.state.bipData.bipSm66[i];
        if (element.type == "DIA") {
          array_sm66_dia.push({
            server: this.state.bipData.bipSm66[i].server,
            client: this.state.bipData.bipSm66[i].user_name,
            time: this.state.bipData.bipSm66[i].time,
            state: this.state.bipData.bipSm66[i].status
          })
        }
        else if (element.type == "BTC") {
          array_sm66_btc.push({
            server: this.state.bipData.bipSm66[i].server,
            client: this.state.bipData.bipSm66[i].user_name,
            time: this.state.bipData.bipSm66[i].time,
            state: this.state.bipData.bipSm66[i].status
          })
        }
        else if (element.type == "UPD") {
          array_sm66_upd.push({
            server: this.state.bipData.bipSm66[i].server,
            client: this.state.bipData.bipSm66[i].user_name,
            time: this.state.bipData.bipSm66[i].time,
            state: this.state.bipData.bipSm66[i].status
          })
        }
      }
      array_sm66_dia.sort(comp);
      array_sm66_btc.sort(comp);
      array_sm66_upd.sort(comp);
    }

    var bipSm66_dia_info
    if (Object.keys(array_sm66_dia).length>0) {
      bipSm66_dia_info =
    <div id="sm66dia" className="tab-pane active">
      <div className="row">
        <div className="col-md-12">
          <ReactTable 
          data={array_sm66_dia}
          columns={columnsTableSm66}
          defaultPageSize={10}
          showPageSizeOptions={false}filterable={true}
          getTrProps={(state, rowInfo, column) => {
            if (rowInfo) {
              return {
                style: {
                  background: rowInfo.row.time > this.state.state.bipSm66Rule_dia ? '#ff8080' : null
                }
              }
            } else {
              return {
                style: {
                  background: null
                }
              }
            }
          }}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm66_dia_info =
      <div id="sm66dia" className="tab-pane active">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    var bipSm66_btc_info
    if (Object.keys(array_sm66_btc).length>0) {
      bipSm66_btc_info =
    <div id="sm66btc" className="tab-pane">
      <div className="row">
        <div className="col-md-12">
          <ReactTable
          data={array_sm66_btc}
          columns={columnsTableSm66}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          getTrProps={(state, rowInfo, column) => {
            if (rowInfo) {
              return {
                style: {
                  background: rowInfo.row.time > this.state.state.bipSm66Rule_btc ? '#ff8080' : null
                }
              }
            } else {
              return {
                style: {
                  background: null
                }
              }
            }
          }}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm66_btc_info =
      <div id="sm66btc" className="tab-pane">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    var bipSm66_upd_info
    if (Object.keys(array_sm66_upd).length>0) {
      bipSm66_upd_info =
    <div id="sm66upd" className="tab-pane">
      <div className="row">
        <div className="col-md-12">
          <ReactTable
          data={array_sm66_upd}
          columns={columnsTableSm66}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          getTrProps={(state, rowInfo, column) => {
            if (rowInfo) {
              return {
                style: {
                  background: rowInfo.row.time > this.state.state.bipSm66Rule_upd ? '#ff8080' : null
                }
              }
            } else {
              return {
                style: {
                  background: null
                }
              }
            }
          }}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm66_upd_info =
      <div id="sm66upd" className="tab-pane">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    //ST22
    var st22_labels = []
    var st22_data = []
    for (var i = 0; i < this.state.bipData.bipSt22Top.length; i++) {
      if (this.state.bipData.bipSt22Top[i]) {
        st22_labels.push(this.state.bipData.bipSt22Top[i].dump)
        st22_data.push(this.state.bipData.bipSt22Top[i].number)
      }
    }
    var dataSt22 = {
        labels: st22_labels,
        datasets: [{
            data: st22_data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    //SM12
    var columnsTableSm12 = [
      {
        Header: 'Cliente',
        accessor: 'client'
      },{
        Header: 'Usuario',
        accessor: 'username'
      },{
        Header: 'Fecha',
        accessor: 'time',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      },{
        Header: 'Tabla',
        accessor: 'table_name'
      },
      {
        Header: 'Argumento',
        accessor: 'lock_argument'
      }
    ]
    var array_sm12E = [],array_sm12S = [],array_sm12X = [],array_sm12O = []
    if (this.state.bipData.bipSm12.length>0) {
      for (var i = 0; i < this.state.bipData.bipSm12.length; i++) {
        if (this.state.bipData.bipSm12[i].lock_model == "E") {
          array_sm12E.push({
            client: this.state.bipData.bipSm12[i].client,
            username: this.state.bipData.bipSm12[i].username,
            time: this.state.bipData.bipSm12[i].time,
            table_name: this.state.bipData.bipSm12[i].table_name,
            lock_argument: this.state.bipData.bipSm12[i].lock_argument
          })
        }
        else if (this.state.bipData.bipSm12[i].lock_model == "S") {
          array_sm12S.push({
            client: this.state.bipData.bipSm12[i].client,
            username: this.state.bipData.bipSm12[i].username,
            time: this.state.bipData.bipSm12[i].time,
            table_name: this.state.bipData.bipSm12[i].table_name,
            lock_argument: this.state.bipData.bipSm12[i].lock_argument
          })
        }
        else if (this.state.bipData.bipSm12[i].lock_model == "X") {
          array_sm12X.push({
            client: this.state.bipData.bipSm12[i].client,
            username: this.state.bipData.bipSm12[i].username,
            time: this.state.bipData.bipSm12[i].time,
            table_name: this.state.bipData.bipSm12[i].table_name,
            lock_argument: this.state.bipData.bipSm12[i].lock_argument
          })
        }
        else if (this.state.bipData.bipSm12[i].lock_model == "O") {
          array_sm12O.push({
            client: this.state.bipData.bipSm12[i].client,
            username: this.state.bipData.bipSm12[i].username,
            time: this.state.bipData.bipSm12[i].time,
            table_name: this.state.bipData.bipSm12[i].table_name,
            lock_argument: this.state.bipData.bipSm12[i].lock_argument
          })
        }
      }
    }

    var bipSm12E_info
    if (Object.keys(array_sm12E).length>0) {
      bipSm12E_info =
    <div id="sm12E" className="tab-pane active">
      <div className="row">
        <div className="col-md-12">
          <ReactTable 
          data={array_sm12E}
          columns={columnsTableSm12}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm12E_info =
      <div id="sm12E" className="tab-pane active">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    var bipSm12S_info
    if (Object.keys(array_sm12S).length>0) {
      bipSm12S_info =
    <div id="sm12S" className="tab-pane">
      <div className="row">
        <div className="col-md-12">
          <ReactTable 
          data={array_sm12S}
          columns={columnsTableSm12}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm12S_info =
      <div id="sm12S" className="tab-pane">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    var bipSm12X_info
    if (Object.keys(array_sm12X).length>0) {
      bipSm12X_info =
    <div id="sm12X" className="tab-pane">
      <div className="row">
        <div className="col-md-12">
          <ReactTable 
          data={array_sm12X}
          columns={columnsTableSm12}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm12X_info =
      <div id="sm12X" className="tab-pane">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    var bipSm12O_info
    if (Object.keys(array_sm12O).length>0) {
      bipSm12O_info =
    <div id="sm12O" className="tab-pane">
      <div className="row">
        <div className="col-md-12">
          <ReactTable 
          data={array_sm12O}
          columns={columnsTableSm12}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm12O_info =
      <div id="sm12O" className="tab-pane">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    //SM13
    var columnsTableSm13 = [
      {
        Header: 'Cliente',
        accessor: 'client'
      },{
        Header: 'Usuario',
        accessor: 'username'
      },{
        Header: 'Hora',
        accessor: 'time',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      },{
        Header: 'T code',
        accessor: 'tcode'
      },{
        Header: 'Estado',
        accessor: 'status'
      }
    ]
    var array_sm13_cancel = [],array_sm13_update = [],array_sm13_v1run = [],array_sm13_v2run = []
    if (this.state.bipData.bipSm13.length>0) {
      for (var i = 0; i < this.state.bipData.bipSm13.length; i++) {
        if (this.state.bipData.bipSm13[i].status == "Initial") {
          array_sm13_update.push({
            client: this.state.bipData.bipSm13[i].client,
            username: this.state.bipData.bipSm13[i].username,
            time: this.state.bipData.bipSm13[i].time,
            tcode: this.state.bipData.bipSm13[i].tcode,
            status: this.state.bipData.bipSm13[i].status
          })
        }
        else if (this.state.bipData.bipSm13[i].status == "Error(noretry)" || this.state.bipData.bipSm13[i].status == "Error") {
          array_sm13_cancel.push({
            client: this.state.bipData.bipSm13[i].client,
            username: this.state.bipData.bipSm13[i].username,
            time: this.state.bipData.bipSm13[i].time,
            tcode: this.state.bipData.bipSm13[i].tcode,
            status: this.state.bipData.bipSm13[i].status
          })
        }
        else if (this.state.bipData.bipSm13[i].status == "V1processed") {
          array_sm13_v1run.push({
            client: this.state.bipData.bipSm13[i].client,
            username: this.state.bipData.bipSm13[i].username,
            time: this.state.bipData.bipSm13[i].time,
            tcode: this.state.bipData.bipSm13[i].tcode,
            status: this.state.bipData.bipSm13[i].status
          })
        }
        else if (this.state.bipData.bipSm13[i].status == "V2processed") {
          array_sm13_v2run.push({
            client: this.state.bipData.bipSm13[i].client,
            username: this.state.bipData.bipSm13[i].username,
            time: this.state.bipData.bipSm13[i].time,
            tcode: this.state.bipData.bipSm13[i].tcode,
            status: this.state.bipData.bipSm13[i].status
          })
        }
      }
      array_sm13_update.sort(function(a, b){
        if(a.status < b.status) { return -1; }
        if(a.status > b.status) { return 1; }
        return 0;
      })
      array_sm13_cancel.sort(function(a, b){
        if(a.status < b.status) { return -1; }
        if(a.status > b.status) { return 1; }
        return 0;
      })
      array_sm13_v1run.sort(function(a, b){
        if(a.status < b.status) { return -1; }
        if(a.status > b.status) { return 1; }
        return 0;
      })
      array_sm13_v2run.sort(function(a, b){
        if(a.status < b.status) { return -1; }
        if(a.status > b.status) { return 1; }
        return 0;
      })
    }

    var bipSm13_cancel_info
    if (Object.keys(array_sm13_cancel).length>0) {
      bipSm13_cancel_info =
    <div id="sm13cancel" className="tab-pane active">
      <div className="row">
        <div className="col-md-12">
          <ReactTable 
          data={array_sm13_cancel}
          columns={columnsTableSm13}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm13_cancel_info =
      <div id="sm13cancel" className="tab-pane active">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    var bipSm13_update_info
    if (Object.keys(array_sm13_update).length>0) {
      bipSm13_update_info =
    <div id="sm13update" className="tab-pane">
      <div className="row">
        <div className="col-md-12">
          <ReactTable 
          data={array_sm13_update}
          columns={columnsTableSm13}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm13_update_info =
      <div id="sm13update" className="tab-pane">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    var bipSm13_v1run_info
    if (Object.keys(array_sm13_v1run).length>0) {
      bipSm13_v1run_info =
    <div id="sm13v1run" className="tab-pane">
      <div className="row">
        <div className="col-md-12">
          <ReactTable 
          data={array_sm13_v1run}
          columns={columnsTableSm13}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm13_v1run_info =
      <div id="sm13v1run" className="tab-pane">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    var bipSm13_v2run_info
    if (Object.keys(array_sm13_v2run).length>0) {
      bipSm13_v2run_info =
    <div id="sm13v2run" className="tab-pane">
      <div className="row">
        <div className="col-md-12">
          <ReactTable 
          data={array_sm13_v2run}
          columns={columnsTableSm13}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm13_v2run_info =
      <div id="sm13v2run" className="tab-pane">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    //SM37
    var array_sm37_cancel = [],array_sm37_active = [],array_sm37_ready = []
    var columnsTableSm37 = [
      {
        Header: 'Job',
        accessor: 'job'
      },{
        Header: 'Creado',
        accessor: 'jobcreated'
      },{
        Header: 'Fecha',
        accessor: 'start_date'
      },{
        Header: 'Hora',
        accessor: 'start_time'
      },{
        Header: 'Duración',
        accessor: 'Duration_sec'
      },{
        Header: 'Delay',
        accessor: 'Delay_sec'
      }
    ]

    if (this.state.bipData.bipSm37.length>0) {
      for (var i = 0; i < this.state.bipData.bipSm37.length; i++) {
        if (this.state.bipData.bipSm37[i].status === 'Ready') {
          array_sm37_ready.push({
            job: this.state.bipData.bipSm37[i].job,
            jobcreated: this.state.bipData.bipSm37[i].jobcreated,
            start_date: this.state.bipData.bipSm37[i].start_date,
            start_time: this.state.bipData.bipSm37[i].start_time,
            Duration_sec: this.state.bipData.bipSm37[i].Duration_sec,
            Delay_sec: this.state.bipData.bipSm37[i].Delay_sec
          })
        }
        else if (this.state.bipData.bipSm37[i].status == "Active") {
          array_sm37_active.push({
            job: this.state.bipData.bipSm37[i].job,
            jobcreated: this.state.bipData.bipSm37[i].jobcreated,
            start_date: this.state.bipData.bipSm37[i].start_date,
            start_time: this.state.bipData.bipSm37[i].start_time,
            Duration_sec: this.state.bipData.bipSm37[i].Duration_sec,
            Delay_sec: this.state.bipData.bipSm37[i].Delay_sec
          })
        }
        if (this.state.bipData.bipSm37[i].status === 'Canceled') {
          array_sm37_cancel.push({
            job: this.state.bipData.bipSm37[i].job,
            jobcreated: this.state.bipData.bipSm37[i].jobcreated,
            start_date: this.state.bipData.bipSm37[i].start_date,
            start_time: this.state.bipData.bipSm37[i].start_time,
            Duration_sec: this.state.bipData.bipSm37[i].Duration_sec,
            Delay_sec: this.state.bipData.bipSm37[i].Delay_sec
          })
        }
      }
    }
    var bipSm37_cancel_info
    if (Object.keys(array_sm37_cancel).length>0) {
      bipSm37_cancel_info =
    <div id="sm37cancel" className="tab-pane active">
      <div className="row">
        <div className="col-md-12">
          <ReactTable 
          data={array_sm37_cancel}
          columns={columnsTableSm37}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm37_cancel_info =
      <div id="sm37cancel" className="tab-pane active">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    var bipSm37_active_info
    if (Object.keys(array_sm37_active).length>0) {
      bipSm37_active_info =
    <div id="sm37active" className="tab-pane">
      <div className="row">
        <div className="col-md-12">
          <ReactTable 
          data={array_sm37_active}
          columns={columnsTableSm37}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm37_active_info =
      <div id="sm37active" className="tab-pane">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }
    
    var bipSm37_ready_info
    if (Object.keys(array_sm37_ready).length>0) {
      bipSm37_ready_info =
    <div id="sm37ready" className="tab-pane">
      <div className="row">
        <div className="col-md-12">
          <ReactTable 
          data={array_sm37_ready}
          columns={columnsTableSm37}
          defaultPageSize={10}
          showPageSizeOptions={false}
          filterable={true}
          />
        </div>
      </div>
    </div>
    } else {
      bipSm37_ready_info =
      <div id="sm37ready" className="tab-pane">
      <div><br/><br/><h5 className="text-center">No hay información de esta transacción</h5><br/><br/></div></div>
    }

    //SMQ2
    var smq2_data = []
    if (this.state.bipData.bipSmq2.length>0) {
      smq2_data.push(parseInt(this.state.bipData.bipSmq2[0].Entries))
    }
    var dataSmq2 = {
				labels: ["BIP"],
				datasets: [{
						label: 'Entradas en cola',
						data: smq2_data,
            backgroundColor: [
                'rgba(135, 189, 53, 0.2)'
            ],
            borderColor: [
                'rgba(135, 189, 53,1)'
            ],
						borderWidth: 1
				}]
		}
    return(
      <div>
			<header className="header">
				<div className="logo-container">
					<a  className="logo">
						<img src="https://cdn3.iconfinder.com/data/icons/brands-applications/512/IBM-128.png" height="35" alt="Porto Admin" />
						<img src="https://corra.com/wp-content/uploads/Sap-Logo--e1530285069227.png" height="35" alt="Porto Admin" />
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
                    <li className="nav-active">
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
						<h2>Evaluación Técnica SAP - BIP</h2>
						<div className="right-wrapper pull-right">
							<ol className="breadcrumbs">
								<li>
									<a >
										<i className="fa fa-tasks"></i>
									</a>
								</li>
								<li><span>Evaluación Técnica SAP - BIP</span></li>
							</ol>
							<a className="sidebar-right-toggle" data-open="sidebar-right"><i className="fa fa-chevron-left"></i></a>
						</div>
					</header>
					<div className="row">
						<div className="col-md-6">
							<section className="panel">
								<header className="panel-heading">
									<div className="panel-actions">
										<a className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">SICK</h2>
									<p className="panel-subtitle">Salud del sistema.
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
                  </p>
								</header>
								<div className="panel-body">
                  {d_sick[0]}
								</div>
							</section>
              <section className="panel">
								<header className="panel-heading">
									<div className="panel-actions">
										<a className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">SM51</h2>
									<p className="panel-subtitle">Kernel.
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
                  </p>
								</header>
								<div className="panel-body">
                  {d_sm51_bip}
								</div>
							</section>
						</div>
						<div className="col-md-6">
							<section className="panel">
								<header className="panel-heading">
									<div className="panel-actions">
										<a className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">SMLG</h2>
									<p className="panel-subtitle">Tiempo de respuesta del sistema.
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
                  </p>
								</header>
								<div className="panel-body">
									<HorizontalBar data={dataSmlg} width={400} height={284} options={{maintainAspectRatio: false}}/>
								</div>
							</section>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<section className="panel" >
								<header className="panel-heading">
									<div className="panel-actions">
										<a className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">SM50</h2>
									<p className="panel-subtitle">Disponibilidad de procesos.
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
                  </p>
								</header>
								<div className="panel-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="tabs">
                      <ul className="nav nav-tabs nav-justified">
                        <li className="active">
                          <a href="#ncbip013" data-toggle="tab" className="text-center">ncbi013</a>
                        </li>
                        <li>
                          <a href="#ncbip033" data-toggle="tab" className="text-center">ncbi033</a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div id="ncbip013" className="tab-pane active">
                          <div className="row">
                            <div className="col-md-3">
                              <Doughnut ref='chart' width={200} height={140} data={ncbip013_dialog} />
                              <h6 className="text-center">Dialog</h6>
                              <p className="text-center">Total: {ncbip013_dialog_data[0]+ncbip013_dialog_data[1]}</p>
                            </div>
                            <div className="col-md-3">
                              <Doughnut ref='chart' width={200} height={140} data={ncbip013_update} />
                              <h6 className="text-center">Update</h6>
                              <p className="text-center">Total: {ncbip013_update_data[0]+ncbip013_update_data[1]}</p>
                            </div>
                            <div className="col-md-3">
                              <Doughnut ref='chart' width={200} height={140} data={ncbip013_background} />
                              <h6 className="text-center">Background</h6>
                              <p className="text-center">Total: {ncbip013_background_data[0]+ncbip013_background_data[1]}</p>
                            </div>
                            <div className="col-md-3">
                              <Doughnut ref='chart' width={200} height={140} data={ncbip013_spool} />
                              <h6 className="text-center">Spool</h6>
                              <p className="text-center">Total: {ncbip013_spool_data[0]+ncbip013_spool_data[1]}</p>
                            </div>
                          </div>
                        </div>
                        <div id="ncbip033" className="tab-pane">
                          <div className="row">
                            <div className="col-md-3">
                              <Doughnut ref='chart' width={200} height={140} data={ncbip033_dialog} />
                              <h6 className="text-center">Dialog</h6>
                              <p className="text-center">Total: {ncbip033_dialog_data[0]+ncbip033_dialog_data[1]}</p>
                            </div>
                            <div className="col-md-3">
                              <Doughnut ref='chart' width={200} height={140} data={ncbip033_update} />
                              <h6 className="text-center">Update</h6>
                              <p className="text-center">Total: {ncbip033_update_data[0]+ncbip033_update_data[1]}</p>
                            </div>
                            <div className="col-md-3">
                              <Doughnut ref='chart' width={200} height={140} data={ncbip033_background} />
                              <h6 className="text-center">Background</h6>
                              <p className="text-center">Total: {ncbip033_background_data[0]+ncbip033_background_data[1]}</p>
                            </div>
                            <div className="col-md-3">
                              <Doughnut ref='chart' width={200} height={140} data={ncbip033_spool} />
                              <h6 className="text-center">Spool</h6>
                              <p className="text-center">Total: {ncbip033_spool_data[0]+ncbip033_spool_data[1]}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
								</div>
							</section>
						</div>
					</div>
					<div className="row">
          <div className="col-md-6">
							<section className="panel">
								<header className="panel-heading">
									<div className="panel-actions">
										<a className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">SM66</h2>
									<p className="panel-subtitle">Tiempo de ejecución de procesos.
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
                  </p>
								</header>
                <div className="panel-body">
                <div className="row">
									<div className="row">
                    <div className="col-md-12">
                      <div className="tabs">
                        <ul className="nav nav-tabs nav-justified">
                          <li className="active">
                            <a href="#sm66dia" data-toggle="tab" className="text-center">DIA</a>
                          </li>
                          <li>
                            <a href="#sm66btc" data-toggle="tab" className="text-center">BTC</a>
                          </li>
                          <li>
                            <a href="#sm66upd" data-toggle="tab" className="text-center">UPD</a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          {bipSm66_dia_info}
                          {bipSm66_btc_info}
                          {bipSm66_upd_info}
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
								</div>
							</section>
						</div>
						<div className="col-md-6">
							<section className="panel">
								<header className="panel-heading">
									<div className="panel-actions">
										<a className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">ST22</h2>
									<p className="panel-subtitle">Dumps del sistema.
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
                  </p>
								</header>
								<div className="panel-body">
									<div className="row">
                    <div className="col-md-1"></div>
										<div className="col-md-10">
											<Doughnut ref='chart' width={200} height={175} data={dataSt22} />
											<h6 className="text-center">BIP</h6>
										</div>

									</div>
								</div>
							</section>
						</div>
					</div>
					<div className="row">
          <div className="col-md-6">
							<section className="panel">
								<header className="panel-heading">
									<div className="panel-actions">
										<a className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">SM12</h2>
									<p className="panel-subtitle">Bloqueos de tablas.
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
                  </p>
								</header>
                <div className="panel-body">
                <div className="row">
									<div className="row">
                    <div className="col-md-12">
                      <div className="tabs">
                        <ul className="nav nav-tabs nav-justified">
                          <li className="active">
                            <a href="#sm12E" data-toggle="tab" className="text-center">Lock Mode E</a>
                          </li>
                          <li>
                            <a href="#sm12S" data-toggle="tab" className="text-center">Lock Mode S</a>
                          </li>
                          <li>
                            <a href="#sm12X" data-toggle="tab" className="text-center">Lock Mode X</a>
                          </li>
                          <li>
                            <a href="#sm12O" data-toggle="tab" className="text-center">Lock Mode O</a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          {bipSm12E_info}
                          {bipSm12S_info}
                          {bipSm12X_info}
                          {bipSm12O_info}
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
								</div>
							</section>
						</div>
						<div className="col-md-6">
							<section className="panel">
								<header className="panel-heading">
									<div className="panel-actions">
										<a className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">SM13</h2>
									<p className="panel-subtitle">Estado de los update.
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
                  </p>
								</header>
                <div className="panel-body">
                <div className="row">
									<div className="row">
                    <div className="col-md-12">
                      <div className="tabs">
                        <ul className="nav nav-tabs nav-justified">
                          <li className="active">
                            <a href="#sm13cancel" data-toggle="tab" className="text-center">Cancelado</a>
                          </li>
                          <li>
                            <a href="#sm13update" data-toggle="tab" className="text-center">A actualizar</a>
                          </li>
                          <li>
                            <a href="#sm13v1run" data-toggle="tab" className="text-center">V1 ejecutado</a>
                          </li>
                          <li>
                            <a href="#sm13v2run" data-toggle="tab" className="text-center">V2 ejecutado</a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          {bipSm13_cancel_info}
                          {bipSm13_update_info}
                          {bipSm13_v1run_info}
                          {bipSm13_v2run_info}
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
								</div>
							</section>
						</div>
					</div>
					<div className="row">
          <div className="col-md-6">
							<section className="panel">
								<header className="panel-heading">
									<div className="panel-actions">
										<a className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">SM37</h2>
									<p className="panel-subtitle">Jobs del Sistema.
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
                  </p>
								</header>
                <div className="panel-body">
                <div className="row">
									<div className="row">
                    <div className="col-md-12">
                      <div className="tabs">
                        <ul className="nav nav-tabs nav-justified">
                          <li className="active">
                            <a href="#sm37cancel" data-toggle="tab" className="text-center">Canceled</a>
                          </li>
                          <li>
                            <a href="#sm37active" data-toggle="tab" className="text-center">Active</a>
                          </li>
                          <li>
                            <a href="#sm37ready" data-toggle="tab" className="text-center">Ready</a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          {bipSm37_cancel_info}
                          {bipSm37_active_info}
                          {bipSm37_ready_info}
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
								</div>
							</section>
						</div>
						<div className="col-md-6">
							<section className="panel">
								<header className="panel-heading">
									<div className="panel-actions">
										<a className="fa fa-refresh"></a>
									</div>
									<h2 className="panel-title">SMQ2</h2>
									<p className="panel-subtitle">Monitor qRFC para la cola de entrada.
                  <span className="pull-right">Last Update : {this.props.data.datetime}</span>
                  </p>
								</header>
								<div className="panel-body">
									<Bar data={dataSmq2} width={400} height={370} options={{maintainAspectRatio: false}}/>
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

export default BIP;
