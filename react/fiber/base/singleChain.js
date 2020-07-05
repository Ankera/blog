/**
 * fiber 单链表基础
 */

class Update {
    constructor(payload, nextUpdate) {
        this.payload = payload;
        this.nextUpdate = nextUpdate;
    }
}

class UpdateQueue {
    constructor() {
        this.baseState = null;
        this.firstUpdate = null;
        this.lastUpdate = null;
    }

    enqueueUpdate(updateData) {
        if (!this.firstUpdate) {
            this.firstUpdate = this.lastUpdate = updateData;
        } else {
            this.lastUpdate.nextUpdate = updateData;
            this.lastUpdate = updateData;
        }
    }

    forceUpdate() {
        let currentState = this.baseState || {};
        let currentUpdate = this.firstUpdate;
        while (currentUpdate) {
            let nextState = typeof currentUpdate.payload === "function" ? currentUpdate.payload(currentState) : currentUpdate.payload;
            currentState = { ...currentState, ...nextState };
            currentUpdate = currentUpdate.nextUpdate;
        }

        this.firstUpdate = this.lastUpdate = null;
        this.baseState = currentState;
        return currentState;
    }
}

let queue = new UpdateQueue();

queue.enqueueUpdate(new Update({ name: "Tom" }));
queue.enqueueUpdate(new Update({ age: 12 }));
queue.enqueueUpdate(new Update({ number: 0 }));
queue.enqueueUpdate(new Update(state => ({
    number: state.number + 1
})));
queue.forceUpdate();

console.log(queue.baseState)