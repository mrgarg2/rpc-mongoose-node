var obj = {
    0 : "zero",
    1 : "one",
    2 : "two" 
}


function objToArray(obj){
    var arr = [];

    for(key in obj){
        arr[key] = obj[key];
    }
    return arr;
}

var b = objToArray(obj);

console.log(b);