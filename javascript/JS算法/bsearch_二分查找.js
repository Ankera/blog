function bSearch(arr, num) {
    let l = 0,  // 左边界
        r = arr.length - 1, // 右边界
        guessIndex = null;

    while (l <= r) {
        guessIndex = Math.floor((l + r) / 2);
        if (arr[guessIndex] === num) {
            return guessIndex;
        } else if(arr[guessIndex] > num){
            r = guessIndex - 1;
        } else {
            l = guessIndex + 1;
        }
    }

    return -1;
}

let arr = [2,3,4,5,6,11,23,56,78];
console.log(bSearch(arr, 156));