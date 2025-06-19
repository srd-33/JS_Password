
const input_slider = document.querySelector("[inputslider]")
const pass_length_disp = document.querySelector("[password-length]")
const allcheckbox = document.querySelectorAll("input[type=checkbox]")
const generate_pass = document.querySelector(".btn")
const uppercase = document.querySelector("#uppercase")
const lowercase = document.querySelector("#lowercase")
const number = document.querySelector("#number")
const symbol = document.querySelector("#symbols")
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const passworddisplay = document.querySelector("[passworddisplay]")
const copybtn = document.querySelector(".copybtn")

const copymsg = document.querySelector("[data-copymsg]")

// initially password empty ,pass_len 10, checkcount 0 

let password = "";
let pass_length = 10;
let checkcount = 0;
handleSlider();

function handleSlider(){

    input_slider.value = pass_length;
    pass_length_disp.innerText = pass_length;

}

input_slider.addEventListener('input',(e)=>{
    pass_length= e.target.value;
    handleSlider();
})


allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckbox);
})

function handlecheckbox(){

    checkcount=0;

    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked){
            checkcount++;
        }
    });

    if(pass_length<checkcount){
        pass_length=checkcount;
        handleSlider();
    }


}

generate_pass.addEventListener('click',()=>{

    if(checkcount == 0){
        return;
    }

    if(pass_length <checkcount){
        pass_length=checkcount;
        handleSlider();
    }

    password = "";

    let arr=[];

    if(uppercase.checked){
        arr.push(generateUC);
    }
    if(lowercase.checked){
        arr.push(generateLC);
    }
    if(number.checked){
        arr.push(generateNO);
    }
    if(symbol.checked){
        arr.push(generateSY);
    }

    for(let i=0; i<arr.length;i++){
        password += arr[i]() ;
    }

    for(let i=0;i<pass_length-arr.length;i++){
      let ranidx = genrandint(0,arr.length);
      password+= arr[ranidx]();
    }

    password = shufflePassword(Array.from(password));

    passworddisplay.value = password;

})

function genrandint(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateUC(){
    return String.fromCharCode(genrandint(65,91));
}

function generateLC(){
    return String.fromCharCode(genrandint(97,123));
}

function generateNO(){
    return genrandint(0,9);
}

function generateSY(){
    const randidx = genrandint(0,symbols.length);
    return symbols.charAt(randidx);
}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

copybtn.addEventListener("click",()=>{
    if(passworddisplay.value){
        copycontent();
    }
})

async function copycontent(){
    try {
        await navigator.clipboard.writeText(passworddisplay.value);
        copymsg.innerText = "copied";
    } catch (e) {
        copymsg.innerText = "failed";
    }

}
