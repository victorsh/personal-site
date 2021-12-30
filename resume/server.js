const puppeteer = require('puppeteer')
const {promisify} = require('util')
const fs = require('fs')
const express = require('express')
const app = express()
const port = 3007

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`)
  // await promisify(fs.writeFile)('myfile.html', html)

  let browser = await puppeteer.launch({args: ['--no-sandbox']})
  let page = await browser.newPage()
  // await page.setContent(html)
  await page.goto(`file://${process.cwd()}/public/index.html`)
  await page.emulateMediaFeatures('print')
  await page.pdf({path: 'output.pdf', printBackground: true })
  await browser.close()
})

async function test(pdf) {
  await fs.writeFileSync('VictorShahbazianResume.pdf', pdf, 'binary')
}