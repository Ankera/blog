function perf() {
  const data = {
    FP: 0,
    FCP: 0,
    LCP: 0,
  }

  // 如果观察者观察到了指定类型的性能条目，就执行回调
  new PerformanceObserver((entryList) => {
    const entris = entryList.getEntries()
    entris.forEach((entry) => {
      if (entry.name === 'first-paint') {
        data.FP = entry.startTime
        console.log('记录FP', data.FP)
      } else if (entry.name === 'first-contentful-paint') {
        data.FCP = entry.startTime
        console.log('记录FCP', data.FCP)
      }
    })
  }).observe({ type: 'paint', buffer: true })

  new PerformanceObserver((entryList) => {
    const entris = entryList.getEntries()
    entris.forEach((entry) => {
      if (entry.startTime > data.LCP) {
        console.log('LCP', (data.LCP = entry.startTime))
      }
    })
  }).observe({ type: 'largest-contentful-paint', buffer: true })
}

;(() => {
  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    perf()
  } else {
    document.addEventListener('readystatechange', function () {
      if (document.readyState === 'complete') {
        console.log('1111', document.readyState)
        perf()
      }
    })
  }
})()
