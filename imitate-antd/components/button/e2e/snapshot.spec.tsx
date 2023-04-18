import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import { configureToMatchImageSnapshot } from 'jest-image-snapshot'
import Button from '..'

const toMatchScreenshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${process.cwd()}/snapshoots`,
  customDiffDir: `${process.cwd()}/diffSnapshoots`,
})

expect.extend({ toMatchScreenshot })

describe('测试Button快照', () => {
  it('测试快照是否正确', async () => {
    await jestPuppeteer.resetPage()

    await page.goto(`file://${process.cwd()}/tests/index.html`)

    const html = ReactDOMServer.renderToString(<Button>Follow2</Button>)

    await page.evaluate((innerHTML) => {
      document.getElementById('root').innerHTML = innerHTML
    }, html)

    const screenshot = await page.screenshot()

    // 新的快照和老的快照是否相同
    expect(screenshot).toMatchScreenshot()
  })
})
