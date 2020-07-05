/**
 * 给定一个不重复的正整数集合 ，从中取出 N 个数字，使得他们的和为 M， 
 */

function sumN(A, n, m, i, desisions = []) {
    if (m === 0) {
        return desisions;
    }

    if (i === A.length || n === 0) {
        return null;
    }
}