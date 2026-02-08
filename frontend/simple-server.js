#!/usr/bin/env node
const { createServer } = require('http')
const { readFileSync } = require('fs')
const path = require('path')

const server = createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const html = readFileSync(path.join(__dirname, 'index.html'))
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
  } else if (req.url.startsWith('/src/')) {
    const filePath = path.join(__dirname, req.url)
    try {
      const content = readFileSync(filePath)
      res.writeHead(200, { 'Content-Type': 'application/javascript' })
      res.end(content)
    } catch (err) {
      res.writeHead(404)
      res.end('File not found')
    }
  } else {
    res.writeHead(404)
    res.end('Not found')
  }
})

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})