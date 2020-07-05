
console.log(process.argv);

console.log(process.env.NODE_ENV);

process.nextTick(() => {
    console.log(1);

    setTimeout(() => {
        console.log(2);
    }, 4)
});


setTimeout(() => {
    console.log(3);
    process.nextTick(() => {
        console.log(4);
    });
}, 4)