import http from 'http'

http.createServer((req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/plain' })
  // res.setHeader('Content-Disposition', 'attachment/filename=list.csv')
  // res.writeHead(200, { 'Content-Type': 'application/csv' })

  res.write('Hello World!')
  res.end()
}).listen(3000)
