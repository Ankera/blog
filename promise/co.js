function co (it) {
  return new Promise((resolve, reject) => {
    function step (data) {
      const { value, done } = it.next(data);
      if (!done) {
        Promise.resolve(value).then((d) => {
          step(d);
        }, reject);
      } else {
        resolve(value)
      }
    }

    step(undefined);
  })
}