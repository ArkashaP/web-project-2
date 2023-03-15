const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const group = document.getElementById('group');

function resetInputs(){
    firstName.value = '';
    lastName.value = '';
    group.value = '';
}

function onSubmit() {
    let student = {
        firstName: firstName.value,
        lastName: lastName.value,
        group: group.value
    };
    
    document.body.insertAdjacentHTML('beforeEnd', 
        `<p>Список свойств:${Object.keys(student)}</p>
        <p>Студент ${student.firstName} ${student.lastName} учится в ${student.group} группе</p>`
    );
    resetInputs();
};