// 哔哩哔哩 JS老毕

/**
 * 给定一个随机数组，里面全是整数
 * 要去排序之后，[最小，最大，第二小，第二大，第三小，第三大， ...]
 */
function meanderingArray(arr) {
    arr.sort((a, b) => a - b);
    let start = 0;
    let end = arr.length - 1;
    let result = [];
    while (start <= end) {
        if (start === end) {
            result.push(arr[start]);
        } else {
            result.push(arr[start], arr[end]);
        }
        start++;
        end--;
    }
    return result;
}

// console.log(meanderingArray([5, 8, 1, 4, 2, 9, 3, 7, 6, 10]))


/**
 * 
 * 现在有一个数组，里面有正数，有负数
 * 要求把负数放到最左边，把正数放到右边
 * 不能创建新数组
 */

let newArray = [-12, 11, -13, 45, 23, 45, -12, 45];

// 等到的结果是负数原有顺序保存不变
function switchNumber1(newArray) {
    let j = 0;
    for (let i = 0; i < newArray.length; i++) {
        if (newArray[i] < 0) {
            if (i !== j) {
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }

            j++;
        }
    }

    return newArray;
}

// 等到的结果是正数原有顺序保存不变
function switchNumber2(newArray) {
    let j = newArray.length - 1;
    for (let i = newArray.length - 1; i >= 0; i--) {
        if (newArray[i] > 0) {
            if (i !== j) {
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            j--;
        }
    }

    return newArray;
}

// console.log(switchNumber2(newArray));


/**
 * 704
 * 二分搜索树，
 * 数组给定排好顺序，找到数字 N
 */
let btreeArray = [-2, -1, 1, 3, 4, 6, 7, 9, 43, 56, 120];
function btreeNumber(newArray, num) {
    if (num === undefined || num === null) {
        throw new Error("please enter the number");
    }
    let l_index = 0;
    let r_index = newArray.length - 1;

    while (l_index <= r_index) {
        let j = Math.floor((l_index + r_index) / 2);

        if (newArray[j] < num) {
            l_index = j + 1;
        } else if (newArray[j] > num) {
            r_index = j - 1;
        } else {
            return j;
        }
    }

    return -1;
}

// console.log(btreeNumber(btreeArray, 43));


/**
 * 
 * 给定一个整数数组，判断是否存在重复元素
 */
function containersDuplicate(newArray) {
    let set = new Set();
    for (let i = 0; i < newArray.length; i++) {
        if (set.has(newArray[i])) {
            return true;
        }
        set.add(newArray[i]);
    }
    return false;

    // return [...new Set(newArray)].length !== newArray.length
}



/**
 *  5
 *  返回最大回文字符串，如果有，则返回
 * 
 *  1. 如果字符串长度小于2，则直接返回
 *  2. 定义两个变量，一个start存储找到的最大回文字符串的起始位置，
 *      maxLength 记录最大长度
 *  
 */
function longestPalinedrome(str) {
    if (str.length < 2) {
        return str;
    }

    let start = 0;
    let maxLength = 1;

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < str.length && str[left] === str[right]) {
            if (right - left + 1 > maxLength) {
                maxLength = right - left + 1;
                start = left;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < str.length; i++) {
        // aba
        // aa
        expandAroundCenter(i - 1, i + 1);
        expandAroundCenter(i, i + 1);
    }

    return str.substring(start, start + maxLength);
}

// console.log(longestPalinedrome('dbca2acbd'));


/**
 *  15
 *  数组中3个数的之和为零，如果有，返回所有数组，数组内不能有重复
 * 
 *  思路
 *  1. 给数组排序
 *  2. 如果当前的数字等于前一个数字，则跳过, 从0开始遍历，小于 length - 2
 *  3. start，end指针往后移动
 */
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    let result = [];
    for (let i = 0; i < nums.length - 2; i++) {
        // 减-， 对比计算过的值，  不能加+1
        if (i === 0 || nums[i] !== nums[i - 1]) {
            let start = i + 1;
            let end = nums.length - 1;
            while (start < end) {
                if (nums[i] + nums[start] + nums[end] === 0) {
                    result.push([nums[i], nums[start], nums[end]]);
                    start++;
                    end--;
                    while (start < end && nums[start] === nums[start - 1]) {
                        start++;
                    }

                    while (start < end && nums[end] === nums[end + 1]) {
                        start--;
                    }
                } else if (nums[i] + nums[start] + nums[end] < 0) {
                    start++;
                } else {
                    end--;
                }
            }
        }
    }

    return result;
}

let threeSumArray = [-1, 0, 1, 2, -1, -4];
// console.log(threeSum(threeSumArray));


/**
 * 200
 * 岛屿数量
 * 
 * 遇到1沉默岛屿
 * [
 *      [1,1,0,0,0,1]
 *      [0,1,1,0,1,1]
 *      [0,1,1,0,1,1]
 * ]
 */
function numIsLands(grid) {
    let count = 0;

    function dfs(row, col) {
        if (row < 0 || row > grid.length - 1 || col < 0 || col > grid[row].length - 1 || grid[row][col] == 0) {
            return;
        }
        // 找到就对应沉默岛屿，数量加1
        grid[row][col] = 0;
        count++;
        dfs(row - 1, col);
        dfs(row + 1, col);
        dfs(row, col - 1);
        dfs(row, col + 1);
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 1) {
                dfs(i, j);
            }
        }
    }

    return count;
}

let numIsLandsArray = [
    [1, 1, 0, 0, 1, 1, 1],
    [0, 1, 1, 0, 1, 1],
    [0, 1, 1, 0, 1, 1]
]

// console.log(numIsLands(numIsLandsArray))



/**
 * 283
 * 给定一个数组，编写一个函数，将所有0移动到数组末尾，并且保持原数组顺序不变
 * 不能创建新数组
 */
function moveZeros(nums) {
    let j = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            nums[j] = nums[i];
            j++;
        }
    }

    for (let i = j; i < nums.length; i++) {
        nums[i] = 0;
    }

    return nums;
}

// console.log(moveZeros([-2, 1, 0, 5, 7, 0, 9]));


/**
 * 349
 * 两个数组的交集,
 * 返回的数组不能有重复
 * 
 * 数组搜索值，时间复杂度 O(n)
 * Set， Map中 has 时间复杂度是 O(1)
 */
function intersection(arr1, arr2) {
    /*
    常规写法
    let result = new Set();
    for (const num of arr1) {
        if (arr2.includes(num)) {
            result.add(num);
        }
    }

    return [...result];     // Array.from(result)
    */

    let result = new Set();
    let set = new Set(arr2);

    for (const num of arr1) {
        if (set.has(num)) {
            result.add(num);
        }
    }
    return [...result];
}

// console.log(intersection([1,2,3,4,5], [2,3,7,8,9]));



/**
 * 66
 * 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一
 * 最高位数存放在数组首部，数组中每个元素只存储单个数字
 * [1,2,3] => [1,2,4]
 * 
 * [9,9] => [1,0,0]
 * 
 * [3,9] => [4,0]
 */
function plusOne(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] !== 9) {
            digits[i]++;
            return digits;
        } else {
            digits[i] = 0;
        }
    }

    return [1, ...digits];
}

// console.log(plusOne([2, 9, 9, 2]))

/**
 * 242，
 * 给定两个个字符串str1, str2，
 * str1 字母随机排序是否可以组成 str2
 */
function isAnagram(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    let map = new Map();
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            map.set(s[i], map.get(s[i]) + 1);
        } else {
            map.set(s[i], 1);
        }

        if (map.has(t[i])) {
            map.set(t[i], map.get(t[i]) - 1);
        } else {
            map.set(t[i], -1);
        }
    }

    for (const letter of map) {
        if (letter[1] !== 0) return false;
    }

    return true;
}

// console.log(isAnagram('str', 'tts'));


/**
 * 70
 * 爬楼梯，需要n阶才可以爬到顶
 * 一次可以爬一阶或两阶，共有多少种方式
 */
function climbStairs(n) {
    let memo = [];
    memo[1] = 1;
    memo[2] = 2;
    for (let i = 3; i <= n; i++) {
        memo[i] = memo[i - 2] + memo[i - 1];
    }

    return memo[n];
}

// console.log(climbStairs(16));


/**
 * 733
 * 图像渲染, 替换相同的颜色值
 * 输入的坐标相邻或者相邻的都变颜色
 * 
    [
        [1,1,1],
        [1,1,0],
        [1,0,1]
    ]

    输入 [1,1]

    [
        [2,2,2],
        [2,2,0],
        [2,0,1]
    ]
 */

function floodFill(image, sr, sc, newColor) {
    if (image[sr][sc] === newColor) {
        return image;
    }

    let oldColor = image[sr][sc];
    function dfs(row, col) {
        if (row < 0 || row >= image.length
            || col < 0 || col >= image[row].length
            || image[row][col] !== oldColor) {
            return;
        }
        image[row][col] = newColor;
        dfs(row - 1, col);
        dfs(row + 1, col);
        dfs(row, col - 1);
        dfs(row, col + 1);
    }

    dfs(sr, sc);

    return image;
}

let color1 = [
    [1, 4, 1],
    [1, 1, 0],
    [1, 0, 1]
];
// console.log(floodFill(color1, 1, 1, 2));


/**
 * 125
 * 不考虑大小写, 不考虑 ‘_’ 下划线
 * 给定一个 英语句子，不考虑空格，字符，
 * 反转是否还和原句子一样
 */

function isPalindrome(s) {
    var str = s.toLocaleLowerCase().replace(/[\W_]/g, "");
    if (str.length < 2) {
        return true;
    }

    let start = 0;
    let end = str.length - 1;
    while (start < end) {
        if (str[start] !== str[end]) {
            return false;
        }
        start++;
        end--;
    }

    return true;
}

// console.log(isPalindrome('abcdcba'));



/**
 * 121
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），
 * 设计一个算法来计算你所能获取的最大利润
 */
function maxProfit(prices) {
    if (prices.length === 0) {
        return 0;
    }

    let minPirce = prices[0];
    let maxProfit = 0;

    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPirce) {
            minPirce = prices[i];
        } else if (prices[i] - minPirce > maxProfit) {
            maxProfit = prices[i] - minPirce;
        }
    }
    return maxProfit;
}

// console.log(maxProfit([7,1,5,3,6,4]))


/**
 * 53 最大子序和
 * 求数组中最大序和的子数组, 任意切割数组
 */
function maxSubArray(nums) {
    const memo = [];
    memo[0] = nums[0];
    let max = memo[0];

    for (let i = 1; i < nums.length; i++) {
        memo[i] = Math.max(nums[i] + memo[i - 1], nums[i]);
        max = Math.max(max, memo[i]);
    }

    return max;
}

// console.log(maxSubArray([-3, 1, 2, 4, -1, -7]));


/**
 * 419 甲板上的战舰
 */
function countBattleships(board) {
    let result = 0;
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === 'X') {
                console.log(row, col);
                result++;
                dfs(row, col)
            }
        }
    }

    function dfs(row, col) {
        if (row < 0 || row >= board.length
            || col < 0 || col >= board[row].length
            || board[row][col] === ".") {
            return;
        }
        board[row][col] = ".";
        dfs(row - 1, col);
        dfs(row + 1, col);
        dfs(row, col - 1);
        dfs(row, col + 1);
    }
    return result;
}

let boardsArray = [
    ['X', '.', '.', 'X'],
    ['.', '.', '.', '.'],
    ['.', '.', '.', 'X'],
]

// console.log(countBattleships(boardsArray))

function fibNumber1(num) {
    if (num <= 1) {
        return num;
    }

    let cache = [];
    cache[0] = 0;
    cache[1] = 1;

    function memoize(innerNumber) {
        if (cache[innerNumber] !== undefined) {
            return cache[innerNumber];
        }

        cache[innerNumber] = memoize(innerNumber - 1) + memoize(innerNumber - 2);
        return cache[innerNumber];
    }

    let result = memoize(num);
    return result;
}

/**
 * 斐波那契数通项公式
 * @param {*} n 
 */
function fibNumber2(n) {
    const SQRT_FIVE = Math.sqrt(5);
    return Math.round(1 / SQRT_FIVE * (Math.pow(0.5 + SQRT_FIVE / 2, n) - Math.pow(0.5 - SQRT_FIVE / 2, n)))
}


/**
 * 常规方式
 * @param {*} n 
 */
function fibNumber3(n) {
    if (n <= 1) {
        return n;
    }

    return fibNumber3(n - 1) + fibNumber3(n - 2);
}

function fibNumber4(n) {
    if (n <= 1) {
        return n;
    }

    let cache = [];
    cache[0] = 0;
    cache[1] = 1;
    for (let i = 2; i <= n; i++) {
        cache[i] = cache[i - 1] + cache[i - 2];

    }
    return cache[n];
}

/**
 * 降低空间复杂度
 * @param {*} n 
 */
function fibNumber5(n) {
    if (n <= 1) {
        return n;
    }

    let result = 0;
    let prev1 = 1; // 倒数读第一个数 0 1 1 2 3 5 8
    let prev2 = 0; // 倒数第二个数
    for (let i = 2; i <= n; i++) {
        result = prev1 + prev2;
        prev2 = prev1;
        prev1 = result;
    }

    return result;
}

// console.log(fibNumber1(16))
// console.log(fibNumber2(16))
// console.log(fibNumber3(16))
// console.log(fibNumber4(16))
// console.log(fibNumber5(16))


/**
 * 73
 * 矩阵置零，只要有一个为零，整行或整列都置为零
 */

function setZeros(matrix) {
    let firstRowHasZero = false;
    let fitstColhasZero = false;

    // 检查第一列时候包含零
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][0] === 0) {
            fitstColhasZero = true;
            break;
        }
    }

    // 检查第一行时候包含零
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[0][i] === 0) {
            firstRowHasZero = true;
            break;
        }
    }

    // 使用第一行和第一列，来标记其余行列是否含零
    for (let row = 1; row < matrix.length; row++) {
        for (let col = 1; col < matrix[row].length; col++) {
            if (matrix[row][col] === 0) {
                matrix[0][col] = 0;
                matrix[row][0] = 0;
            }
        }
    }

    // 利用第一行和第一列标0的情况，来标记其余情况为0
    for (let row = 1; row < matrix.length; row++) {
        for (let col = 1; col < matrix[row].length; col++) {
            if (matrix[row][0] === 0 || matrix[0][col] === 0) {
                matrix[row][col] = 0;
            }
        }
    }

    // 把第一行第一列标0
    if (firstRowHasZero) {
        for (let i = 0; i < matrix[0].length; i++) {
            matrix[0][i] = 0;
        }
    }
    if (fitstColhasZero) {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i][0] = 0;
        }
    }

    return matrix;
}

let matrixArray = [
    [1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
];

// console.log(setZeros(matrixArray))

/**
 * 螺旋爬楼梯
 */
function spiralOrder(matrix) {
    let result = [];
    let direction = "right";
    let top = 0;
    let right = matrix[0].length - 1;
    let left = 0;
    let bottom = matrix.length - 1;
    while (left <= right && top <= bottom) {
        if (direction === "right") {
            for (let i = left; i <= right; i++) {
                result.push(matrix[top][i]);
            }
            top++;
            direction = "down";
        } else if (direction === "down") {
            for (let i = top; i <= bottom; i++) {
                result.push(matrix[i][right]);
            }
            right--;
            direction = "left";
        } else if (direction === "left") {
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i]);
            }
            left++;
            direction = "top";
        } else if (direction === "top") {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            bottom--;
            direction = "right";
        }
    }

    return result;
}

let spiralOrderArray = [
    [1, 2, 3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9, 8, 7]
]

// console.log(spiralOrder(spiralOrderArray));


/**
 * 21
 * 合并两个有序链表,两个链表都是有顺序的
 * l1 1->2->4
 * l1 1->3->6
 * 
 * 结果 1->1->2->3->4->6
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
function mergeTwoList(l1, l2) {
    let curr = new ListNode();
    let dummy = curr;

    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;

        if (l1 != null) {
            curr.next = l1;
        }

        if (l2 != null) {
            curr.next = l2;
        }
    }

    return dummy.next;
}

/**
 * 134 加油站
 * @param {*} gas 
 * @param {*} cost 
 * 
 * [1,2,3,4,5]
 * [3,4,5,1,2]
 * => 3
 */
function canCompleteCiruit(gas, cost) {
    let totalGas = 0;
    let totalCost = 0;

    for (let i = 0; i < gas.length; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
    }

    // 如果总油量小于总耗油量，这段路跑不完，则直接返回
    if (totalGas < totalCost) {
        return -1;
    }

    let currentGas = 0;
    let start = 0; // 默认从第0个加油站开始
    for (let i = 0; i < gas.length; i++) {
        currentGas = currentGas - cost[i] + gas[i];
        if (currentGas < 0) {
            currentGas = 0;
            start = i + 1;
        }
    }

    return start;
}

let gasArr = [1, 2, 3, 4, 5];
let costArr = [3, 4, 5, 1, 2];
// console.log(canCompleteCiruit(gasArr, costArr));


/**
 * 904 水果成篮
 */
function totalFruits(tree) {
    let map = new Map();
    let max = 1;
    let j = 0;
    for (let i = 0; i < tree.length; i++) {
        map.set(tree[i], i);
        if (map.size > 2) {
            let minIndex = tree.length - 1;
            for (const [fruit, index] of map) {
                if (index < minIndex) {
                    minIndex = index;
                }
            }

            map.delete(tree[minIndex]);
            j = minIndex + 1;
        }

        max = Math.max(max, i - j + 1);
    }

    return max;
}

// let totalFruitsArrs = [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4];
// console.log(totalFruits(totalFruitsArrs));


/**
 * 238
 * 除自身以外数组的乘积
 * [1,2,3,4] => [24, 12, 8, 6]
 * O(n) 复杂度
 */
function productExceptSelf(nums) {
    let result = Array(nums.length).fill(1); // [1,1,1,1]
    let product = 1;
    for (let i = 0; i < nums.length; i++) {
        result[i] = result[i] * product;
        product = product * nums[i];
    }

    product = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] = result[i] * product;
        product = product * nums[i];
    }

    return result;
}

// console.log(productExceptSelf([1, 2, 3, 4]));



/**
 * 152 乘积最大子序列
 * 给定一个整数组 nums，找出一个序列中乘积最大的连续子序列
 * -2 21 3 -1 0 
 */
function maxProduct(nums) {
    let maxProductMemo = [];
    let minProductMemo = [];
    maxProductMemo[0] = nums[0];
    minProductMemo[0] = nums[0];

    let max = nums[0];



}
// console.log(maxProduct([1, -2, 3, 4]));


/**
 * 219 存在重复元素
 * 一个整数数组和一个整数K, 判断数组中是否存在两个不同索引i，j
 * 是的nums[i] === nums[j], 并且 j-i 最大值为 k
 */
function containNearByOnline(nums, k) {
    let map = new Map();

    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
            return true;
        } else {
            map.set(nums[i], i);
        }
    }

    return false;
}


/**
 * 62不同路径
 * 只能右，下
 * 以竖为列，以横为行。
 * @param {*} m 列
 * @param {*} n 行
 */
function uniquePaths(m, n) {
    const memo = [];
    for (let i = 0; i < n; i++) {
        memo.push([]);
    }

    // 第一行初始化为1
    for (let row = 0; row < n; row++) {
        memo[row][0] = 1;
    }

    // 第一列初始化为1
    for (let col = 0; col < m; col++) {
        memo[0][col] = 1;
    }

    for (let row = 1; row < n; row++) {
        for (let col = 1; col < m; col++) {
            memo[row][col] = memo[row][col - 1] + memo[row - 1][col];
        }
    }

    return memo[n - 1][m - 1];
}

// console.log(uniquePaths(7, 3));

/**
 * 193 偷东西,
 * 不能偷相邻的
 */
function rob(nums) {
    if (nums.length === 0) {
        return nums;
    }
    if (nums.length === 1) {
        return nums[0];
    }
    const memo = [];
    memo[0] = nums[0];
    memo[1] = Math.max(nums[0], nums[1]);
    for (let i = 2; i < nums.length; i++) {
        memo[i] = Math.max(nums[i] + memo[i - 2], memo[i - 1]);
    }

    return memo[nums.length - 1];
}

// console.log(rob([12,1,3,4,5]));


/**
 * 55 跳跃游戏
 */
