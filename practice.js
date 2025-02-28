


function logThis(){
    // console.log(this);
}

logThis() //will console undefined as this is undefined in this case


logThis.call('hello') //whatever we send in call we get called into this 