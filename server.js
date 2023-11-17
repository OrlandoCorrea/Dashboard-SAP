let express = require('express')
let path = require('path')
var cors = require('cors')
var bodyParser = require('body-parser')
var execa = require('execa');
var fs = require('fs');
require('es6-promise').polyfill();
const axios = require("axios");
let httpsProxyAgent = require("https-proxy-agent");
const agent = new httpsProxyAgent(`http://10.24.8.13:9443`);
let server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({limit: '100mb', extended: true}))
server.use(express.static(path.join(__dirname, "ui/build")));
server.listen(port, () => console.log(`Listening on port ${port}`));

server.get('/alldata', function (req, res){
  var obj = JSON.parse(fs.readFileSync('C:\\Users\\exssafsolano\\Desktop\\Dashboard-TE-SAP-Nutresa-master\\sap-scripting-te-master\\SAP\\scripts_current\\files_erp' + '\\SAP_all_Nutresa_ERP.json', 'utf8'));
  console.log("Enviado Json AllData")
  res.json(obj)
})

server.get('/runscript', function (req, res){
  var codet = req.query.code
  console.log("Transaccion: "+codet)
  execa.shellSync('cd C:\\Users\\exssafsolano\\Desktop\\Dashboard-TE-SAP-Nutresa-master\\app_backend\\ && node server_erp.js '+codet);
  var obj = { status: "Ok"}
  console.log("Enviado Json RunScript")
  res.json(obj)
})

server.get('/rules', function (req, res){
  var obj = JSON.parse(fs.readFileSync('C:\\Users\\exssafsolano\\Desktop\\Dashboard-TE-SAP-Nutresa-master\\Dashboard' + '\\rules.json', 'utf8'));
  console.log("Enviado Json Reglas")
  res.json(obj)
})

server.post('/push_rule_changes',cors(), function (req, res){
  var data = req.body.body
  console.log(data)
  try {
    fs.unlinkSync('./rules.json')
    //file removed
  } catch(err) {
    console.error(err)
  }
  fs.writeFile ("./rules.json", JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log('complete');
    }
  );
  console.log('saved');
  res.send("Saved")
})

server.post('/sendmessage_slack',cors(), function (req, res){
  var data_message = req.body.body
  console.log(data_message)
  const config = {
    method: "POST",
    url: "https://hooks.slack.com/services/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",
    httpsAgent: agent,
    data: data_message
  };
  return axios.request(config)
    .then(response => res.send("Alerta Enviada Slack"))
    .catch(err => console.log('err', err));
})