/**
 * 从顶点开始遍历，
 * 如果有儿子，先遍历第一个儿子，
 */

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

function sleep (delay) {
  for (let start = Date.now(); Date.now() - start <= delay;) { }
}

let rootFiber = A1;
// @ts-ignore
let nextUnitOfWork = null; // 下个执行单元

let startTime = Date.now();

function workLoop (deadline) {
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && nextUnitOfWork) {
    // @ts-ignore
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork) {
    console.log("render 阶段结束");
    // @ts-ignore
    console.log("时间差值", Date.now() - startTime);
  } else {
    // @ts-ignore
    requestIdleCallback(workLoop, {
      timeout: 1000
    })
  }
}

// @ts-ignore
function performUnitOfWork (fiber) {
  beginWork(fiber); // 处理 fiber
  if (fiber.child) {
    return fiber.child;
  }

  // 如果没有儿子，则找兄弟结点
  while (fiber) {
    completeUnitOfWork(fiber);
    if (fiber.sibling) {
      return fiber.sibling; // 遍历弟弟
    }
    fiber = fiber.return;
  }
}

function beginWork (fiber) {
  sleep(20); // 占用20s
  console.log("开始 ", fiber.key); // A1  B1 C1  C2
}

function completeUnitOfWork (fiber) {
  console.log("结束 ", fiber.key); // A1  B1 C1  C2
}

// @ts-ignore
nextUnitOfWork = rootFiber;

// @ts-ignore
requestIdleCallback(workLoop, {
  timeout: 1000
})
