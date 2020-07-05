const MAGIC_NUMBER_OFFSET = 1073741822;
const UNIT_SIZE = 10;

function msToExpirationTime(ms) {
    return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0);
}

function expirationTimeToMs(expirationTime) {
    return (MAGIC_NUMBER_OFFSET - expirationTime) * UNIT_SIZE;
}

function ceiling(num, precision) {
    return (((num / precision) | 0) + 1) * precision;
}

function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
    return (
        MAGIC_NUMBER_OFFSET -
        ceiling(
            MAGIC_NUMBER_OFFSET - currentTime + expirationInMs / UNIT_SIZE,
            bucketSizeMs / UNIT_SIZE,
        )
    );
}


/**

5000 250
1073741822 - ceiling(1073741822 - x + 5000/10, 250/10)

1073741822 - ceiling(1073741822 - x + 500, 25)

1073741822 - ((((1073741822 - x + 500)/ 25) | 0) + 1)*25

1073741822 - ((1073741822/25 - x/25 + 20 | 0) + 1)*25

1073741822 - ((1073741822/25 - x/25 + 25*20/25 | 0) + 1)*25

1073741822 -  (1073741822/25 - x/25 + 25*20/25 | 0)*25 - 25

1073741822 - ((1073741822-x+500)/25 | 0) * 25  - 25

1073741797 - ((1073741822-x+500)/25 | 0) * 25


150 100

1073741822 - ceiling(1073741822 - x + 150/10, 100/10)

1073741822 - ceiling(1073741822 - x + 150, 10)

1073741822 - ((((1073741822 - x + 150)/ 10) | 0) + 1)* 10
 */

function x1(x) {
    return 1073741822 - ((1073741822 - x + 500) / 25 | 0) * 25 - 25
}

// 间隔是25
for (let i = 0; i < 50; i++) {
    console.log(`i = ${i + 1}`, x1(i + 1));
}


function x2(x) {
    return 1073741822 - ((((1073741822 - x + 150) / 10) | 0) + 1) * 10
}

// 间隔是10
for (let i = 0; i < 50; i++) {
    console.log(`i = ${i + 1}`, x2(i + 1));
}

function sum(x){
    function f(y){
        return sum(x+y);
    }
    f.valueOf = function(){
        return x;
    };
    return f;
}
