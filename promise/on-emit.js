/**
 * on 发布，注册
 *
 * emit 订阅
 */


// 观察者模式

// 被观察者
class Subject {
  constructor(name) {
    this.name = name;
    this.observers = [];
    this.state = '观察';
  }

  attch (o) {
    this.observers.push(o);
  }

  setState (newState) {
    this.state = newState;
    const _this = this;
    this.observers.forEach(o => {
      o.update(_this);
    })
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }

  update (subject) {
    console.log(subject.name + '跟' + this.name + '说:' + subject.state);
  }
}

const babey = new Subject('小宝宝');
const o1 = new Observer('父亲');
const o2 = new Observer('母亲');

babey.attch(o1);
babey.attch(o2);

babey.setState('有人打我');

babey.setState('我饿了，要吃饭');