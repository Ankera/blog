let A1 = { type: "div", key: "A1" };

let B1 = { type: "div", key: "B1" };

let B2 = { type: "div", key: "B2" };

let C1 = { type: "div", key: "C1" };

let C2 = { type: "div", key: "C2" };

A1.child = B1;
B1.sibling = B2;
B1.return = A1;
B2.return = A1;
B1.child = C1;
C1.sibling = C2;
C1.return = B1;
C2.return = B1;

function sleep(delay) {
    for (let start = Date.now(); Date.now() - start <= delay;) { }
}

let rootFiber = A1;
let nextUnitOfWork = null;

function workLoop(deadline) {
    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && nextUnitOfWork) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    if (!nextUnitOfWork) {
        console.log("render 阶段结束");
        console.log("时间差值", Date.now() - startTime);
    } else {
        requestIdleCallback(workLoop, {
            timeout: 1000
        })
    }
}

function nextUnitOfWork(fiber) {
    begin(fiber); // 处理 fiber
    if (fiber.child) {
        return fiber.child;
    }

    while (fiber) {
        completeUnitOfWork(fiber);
        if (fiber.sibling) {
            return fiber.sibling; // 遍历弟弟
        }
        fiber = fiber.return;
    }
}

function begin(fiber) {
    sleep(20); // 占用20s
    console.log("开始 ", fiber.key);
}

function completeUnitOfWork(fiber) {
    console.log("结束 ", fiber.key);
}

nextUnitOfWork = rootFiber;

requestIdleCallback(workLoop, {
    timeout: 1000
})