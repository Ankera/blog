/**
 * react 事件事件合成思想
 * 1. 一个所谓的 Transaction 就是讲需要执行的 method 使用 wrapper 封装起来，再通过 Transaction 提供的 perform 方法执行。
 * 2. 而在 perform 执行之前，先执行所有 wrapper 中的 initlize 方法，perform 完成之后(即 method 方法执行完)， 再执行所有的 close 方法。
 * 3. 一组 initialine 及 close 方法称为一个 wrapper。
 */

function anyMethod() {
    console.log("事务包装中的任一函数");
}

class Transaction {
    constructor(wrappers){
        this.wrappers = wrappers || [];
    }

    perform(anyMethod){
        this.wrappers.forEach(wrapper => {
            wrapper.initialine && wrapper.initialine();
        });

        anyMethod && typeof anyMethod === "function" && anyMethod();

        this.wrappers.forEach(wrapper => {
            wrapper.close && wrapper.close();
        })
    }
}

let transaction = new Transaction([
    {
        initialine() {
            console.log("initialine11");
        },
        close() {
            console.log("close11");
        }
    },
    {
        initialine() {
            console.log("initialine22");
        },
        close() {
            console.log("close22");
        }
    }
])

transaction.perform(setState);