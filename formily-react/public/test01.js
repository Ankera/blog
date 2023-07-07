const middlewares = []

const mw1 = async (ctx, next) => {
  console.log('next前，第一个中间件')
  await next()
  console.log('next后，第一个中间件')
}

const mw2 = async function (ctx, next) {
  console.log('next前，第二个中间件')
  await next()
  console.log('next后，第二个中间件')
}
const mw3 = async function (ctx, next) {
  console.log('第三个中间件，没有next了')
}

const use = (fn) => {
  middlewares.push(fn)
}

const compose = (middleware) => {
  return (ctx, next) => {
    return dispatch(0)

    function dispatch(i) {
      const fn = middleware[i]
      if (!fn) {
        return fn
      }
      return fn(ctx, dispatch.bind(null, i + 1))
    }
  }
}

use(mw1)
use(mw2)
use(mw3)

const func = compose(middlewares)

func({ type: 1, name: 'middleware' })
