var previousFrameTime = 33;
var frameDeadline = 0;
var activeFrameTime = 33;
var _index = 0;
var animationTick = function (rafTime) {
    console.log('rafTime', rafTime);
    if (_index <= 10) {
        requestAnimationFrame(animationTick);
    }
    _index++;
    var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
    console.log('nextFrameTime', nextFrameTime);

    if (
        nextFrameTime < activeFrameTime &&
        previousFrameTime < activeFrameTime
    ) {
        activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
    } else {
        previousFrameTime = nextFrameTime;
    }

    frameDeadline = rafTime + activeFrameTime;
    console.log('frameDeadline', frameDeadline)

}

requestAnimationFrame(animationTick);