// function picker(array) {
//     let combination = [0]
//     for (let i = 1; i < array.length; i++) {
//         for (let j = 0; j < array[i].length; j++) {
//             const clothes = array[i][j];
//             let sama = false;
//             for (let k = 0; k < combination.length; k++) {
//                 const element = array[k][combination[k]];
//                 if (element === clothes) {
//                     sama = true;
//                     k = combination.length;
//                 }
//             }
//             if (!sama) {
//                 combination.push(j);
//                 j = array[i].length;
//             }
//         }
//         if (combination.length  === i) {
//             if (array[i - 1][combination[i - 1] + 1]) {
//                 combination[i - 1]++;
//                 i--;
//             } 
//             else if ( i > 1 ) {
//                 combination.pop();
//                 combination[i - 2]++;
//                 i = i - 2;
//             }
//             else {
//                 return false;
//             }
//         }
//     }
//     return true;
// }


function picker(array) {
    let combination = [0]

    while(combination.length < array.length) {
        console.log(combination, 1);
        if (!array[0][combination[0]]) return false;
        if (array[combination.length-1][combination[combination.length-1]] && !cekSama(combination, array)) {
            combination.push(0);
        }

        while(cekSama(combination, array)) {
            console.log(combination, 2);
            combination[combination.length-1]++;
        }

        if (!array[combination.length - 1][combination[combination.length - 1]] ) {
            combination.pop();
            combination[combination.length-1]++;
        }
        console.log(combination, 3);        
    }
    return true;
}

function cekSama(com, arr) {
    for (let i = 0; i < com.length - 1; i++) {
        const element = com[i];
        if(arr[i][element] === arr[com.length - 1][com[com.length - 1]]) return true;
    }
    return false;
}

let clothes = [];
clothes[0] = ["JakartaJS"];
clothes[1] = ["AWSome Day", "Elixir"];
clothes[2] = ["GoJakarta", "Elixir"];


// clothes[0] = ["JakartaJS","Elixir"];
// clothes[1] = ["Elixir"];
// clothes[2] = ["JakartaJS","Elixir"];

console.log(picker(clothes));


