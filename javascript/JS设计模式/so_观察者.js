/**
 * https://www.cnblogs.com/viaiu/p/9939301.html
 * 
 * https://www.jianshu.com/p/9f2c8ae57cac
 * 在观察者模式中，有两个角色: 
 *      一个是Subject，用来维护一个observer列表，
 *      另一个角色就是Observer（观察者），在Observer中定义了一个具体的update方法，用来执行相关操作。
 *      整个过程就是当某个值发生变化后，Subject调用 notify(setState) 方法
 *      （实际就是循环调用observerList中每个observer的update方法，并把新的值作为update的参数传递进去）。
 *      从中我们可以看出在Subject中直接调用了Observer中的方法，也就是说Subject和Observer的联系实际上是非常紧密的。
 * 
 * 观察者模式 基于发布订阅模式
 * 
 * 发布，订阅 两者无关
 * 观察者模式 =>  观察者 和 被观察者
 * 被观察者 应该存放着观察者
 * 被观察者状态变化，要更新自己身上的所有观察者
 * 
 * 观察者模式定义了对象之间的一对多依赖，
 * 当一个对象改变状态时，它的所有依赖者都会收到通知并自动更新。
 * 而观察者模式属于行为型模式，行为型模式关注的是对象之间的通讯，
 * 观察者模式就是观察者和被观察者之间的通讯
 */

// 被观察者
class Subject {
    constructor() {
        this.state = "开心";
        this.observer = []; // 装载观察者
    }

    subscribe(observer) {
        this.observer.push(observer);
    }

    // 被观察者自己更改状态
    setState(newState) {
        this.state = newState;
        this.observer.forEach(observer => observer.update(newState));
    }
}

// 观察者
class Observer {
    constructor(name) {
        this.name = name;
    }

    update(state) {
        console.log(`${this.name} ==> 你的孩子在${state}`);
    }
}

let bao1 = new Subject();

let father = new Observer("父亲");
let mother = new Observer("母亲");



bao1.subscribe(father);
bao1.subscribe(mother);

bao1.setState("哭")