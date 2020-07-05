export default function (store) {
    let prevState = JSON.stringify(store.state);
    store.subscribe((mutation, newState) => {
        console.log(prevState);
        console.log(mutation);
        console.log(JSON.stringify(newState));
        prevState = JSON.stringify(newState);
    })
}