function* genOfficial () {
  yield 1;
  yield 2;
  yield 3;
  return 100;
}

function gen$ (context) {
  while (1) {
    switch (context.prev = context.next) {
      case 0:
        context.next = 1;
        return 1;
      case 1:
        context.next = 2;
        return 2;
      case 2:
        context.next = 3;
        return 3;
      case 3:
        context.stop();
        return 100;
    }
  }
}

function gen () {
  const context = {
    prev: 0,
    next: 0,
    done: false,
    stop () {
      this.done = true;
    }
  };

  return {
    next () {
      return {
        value: gen$(context),
        done: context.done
      }
    }
  }
}

const it = gen();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
