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

async function toggleSignForm(){
    if(fSign.hidden){ 
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


bLogin.addEventListener('click', (e)=>{
    e.preventDefault();
    validateForm();
})

function validateForm(){
    iError.hidden = true;
    
    if(iPass.value.length < 6){
        //Поставить текст об ошибке в iError
        iError.hidden = false;
        iError.innerText = 'Пароль должен быть не менее 6 символов';
        return;
    } 

    //Проверить переменную iPass на наличие русских букв
    if(iPass.value.match(/[а-я]/)){
        iError.hidden = false;
        iError.innerText = 'Пароль должен не должен содержать русские буквы';
        return;
    }
    
    //Проверить переменную iEmail на наличие адреса
    if(!iEmail.value.match(/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        iError.hidden = false;
        iError.innerText = 'Почта должен содержать адрес электронной почты';
        return;
    }

    //Собрать данные с формы и в консоль
    const data = {
        email: iEmail.value,
        password: iPass.value
    }
    console.log(data);
}

iPass.addEventListener('blur', validateForm())
iEmail.addEventListener('blur', validateForm())