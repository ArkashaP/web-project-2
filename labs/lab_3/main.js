const bSign = document.getElementById('sign_butt')
const fSign = document.getElementById('sign_form')
const bCancel = document.getElementById('cancel_butt')
const bLogin = document.getElementById('login_butt')
const bShowPass = document.getElementById('show_pass_butt')
const iPass = document.getElementById('pass_input')
const iEmail = document.getElementById('email_input')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function toggleSignForm(e, isOff){
    if(fSign.hidden && !isOff){ 
        // Показываем
        fSign.hidden=false
        // Добавляем и удаляем класс чтобы проигралась анимация 
        //(sleep тоже нужен)
        fSign.classList.add('sign_form_hidden')
        await sleep(10);
        fSign.classList.remove('sign_form_hidden')
    }
    else{ 
        // Прячем
        fSign.classList.add('sign_form_hidden')
        await sleep(500); // Ждем 500 мс так как transition 0,5s
        fSign.hidden=true
    }
}

bCancel.addEventListener('click', toggleSignForm);
bSign.addEventListener('click', toggleSignForm);

bShowPass.addEventListener('pointerdown', ()=>{
    iPass.setAttribute('type', 'text')
    bShowPass.innerText = 'Скрыть пароль'
});
bShowPass.addEventListener('pointerup', ()=>{
    iPass.setAttribute('type', 'password')
    bShowPass.innerText = 'Показать пароль'
});
bShowPass.addEventListener('pointerleave', ()=>{
    iPass.setAttribute('type', 'password')
    bShowPass.innerTexture = 'Показать пароль'
});


fSign.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    if(validateForm()){
        
        let formData = new FormData(fSign);
        for(let [name, value] of formData) {
            console.log(`${name} = ${value}`); 
        }
        toggleSignForm();
        iEmail.value=''
        iPass.value=''
    }
})

function validateForm(){
    let result = true;
    iError.classList.add('form_error_hidden');
    iPass.setCustomValidity('');
    iEmail.setCustomValidity('');
    iEmail.style.border = '1px solid #ccc';
    iPass.style.border = '1px solid #ccc';

    iError.innerText = "Ошибки:"

    if(!iEmail.value.match(/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        iError.innerText += '\nПочта должна содержать адрес электронной почты';
        iError.classList.remove('form_error_hidden');
        iEmail.setCustomValidity('Почта должна содержать адрес электронной почты');
        iEmail.style.border = '1px solid red';
        result = false;
    }

    if(iPass.value.length < 6){
        iError.innerText += '\nПароль должен быть не менее 6 символов';
        iError.classList.remove('form_error_hidden');
        iPass.setCustomValidity('Пароль должен быть не менее 6 символов');
        iPass.style.border = '1px solid red';
        result = false;
    } 

    if(iPass.value.match(/[а-я]/)){
        iError.innerText += '\nПароль не должен содержать русские буквы';
        iError.classList.remove('form_error_hidden');
        iPass.setCustomValidity('Пароль не должен содержать русские буквы');
        iPass.style.border = '1px solid red';
        result = false;
    }
    
    return result;
}

iPass.addEventListener('blur', validateForm)
iEmail.addEventListener('blur', validateForm)

document.body.addEventListener('click', (e)=>{
    if (!fSign.contains(e.target) && !bSign.contains(e.target)) {
        // Ниже код, который нужно выполнить при срабатывании события.
        toggleSignForm(0, true);
    }
})