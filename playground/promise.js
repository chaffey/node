var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500);
    });
};

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('Oh no! It didn\'t work!');
//     }, 2500);
//     resolve('YAY!');
//
//     console.log('Still moving on');
// });
//
// somePromise.then((message) => {
//     console.log('Success:', message);
// }, (errorMessage) => {
//     console.log('Failure:', errorMessage);
// })

asyncAdd(3, '9').then((result) => {
    console.log('Result:', result);
    return asyncAdd(result, 33);
}).then((result) => {
    console.log('Final result:', result);
}).catch((errorMessage) => {
    console.log(errorMessage);
});
