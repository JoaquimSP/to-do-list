const localStorageKey = 'to-do-list-gn'; 

function newTask() {
    let input = document.getElementById('input-new-task')
    input.style.border = ''

    // Validation
    if(!input.value) {
        input.style.border = '1px solid red'
        alert ('Digite uma tarefa para inserir em sua lista!');
    } 

    else if(validateIfExistsNewTask()){
        alert('Já existe uma tarefa com essa descrição!');
    }
    
    else {
        // Increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

function validateIfExistsNewTask(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value;
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list');
    list.innerHTML = ''

    for(let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeTask("${values[i]['name']}")'><img src="assets/img/check-mark.png"></button></li>`
    }
}

function removeTask(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues();
}

showValues();