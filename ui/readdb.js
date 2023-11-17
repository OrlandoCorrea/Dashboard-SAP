var ibmdb = require('ibm_db');

ibmdb.open("DATABASE=BDMONI;HOSTNAME=127.0.0.1;UID=ttopmon;PWD=Colombia2019;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
  if (err) return console.log(err);
  
  conn.query(' select * from ttopmon.users', function (err, data) {
    if (err) console.log(err);
    else console.log(data);

    conn.close(function () {
      console.log('done');
    });
  });
});