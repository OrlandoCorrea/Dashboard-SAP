const axios = require('axios')

axios
  .post('https://postman-echo.com/get?foo1=bar1&foo2=bar2', {
    "text": 'This is a line of text.\nAnd this is another one.'
  })
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })