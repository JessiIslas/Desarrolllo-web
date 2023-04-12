let toggle=document.getElementById('toggle');
let label_toggle=document.getElementById('label_toggle');
toggle.addEventListener('change',(event)=>{
  let checked=event.target.checked;
  document.body.classList.toggle('dark');

  if (checked==true){
    label_toggle.innerHTML='<i class="fa-solid fa-sun"></i>';
    label_toggle.style.color="yellow";
  }else{
    label_toggle.innerHTML='<i class="fa-solid fa-moon"></i>';
    label_toggle.style.color="black";
  }


})

const formulario = document.querySelector("#formulario");
const tareas = document.querySelector("#tareas");
let task = [];
(() => {
    formulario.addEventListener('submit', validarFormulario);
    tareas.addEventListener("click", eliminarTarea);
    tareas.addEventListener("click", completarTarea);
    document.addEventListener("DOMContentLoaded", () => {
        let datosLS = JSON.parse(localStorage.getItem("tareas")) || [];
        task = datosLS;
        agregarHTML();
    })
})()
function validarFormulario(e) {
    e.preventDefault();

    const tarea = document.querySelector("#tarea").value;
    if (tarea.trim().length === 0) {
        console.log('vacio');
        return
    }
    const objTarea = { id: Date.now(), tarea: tarea, estado: false };
    task = [...task, objTarea];
    formulario.reset();
    agregarHTML();

}
function agregarHTML() {
    while (tareas.firstChild) {
        tareas.removeChild(tareas.firstChild)
    }

    if (task.length > 0) {
        task.forEach(item => {
            const elemento = document.createElement('div');
            elemento.classList.add('item-tarea');
            elemento.innerHTML = `
                <p>${item.estado ? (
                    `<span class='completa'>${item.tarea}</span>`
                ) : (
                    `<span>${item.tarea}</span>`
                )}</p>
                <div class="botones">
                    <button class="eliminar" data-id="${item.id}">x</button>
                    <button class="completada" data-id="${item.id}">?</button>
                </div>
            `
            tareas.appendChild(elemento)
        });

    } else {
        const mensaje = document.createElement("h5");
        mensaje.textContent = "sin tareas pendientes"
        tareas.appendChild(mensaje)
    }
    localStorage.setItem("tareas", JSON.stringify(task))
}
function eliminarTarea(e) {
    if (e.target.classList.contains("eliminar")) {
        const tareaID = Number(e.target.getAttribute("data-id"));
        const nuevasTareas = task.filter((item) => item.id !== tareaID);
        task = nuevasTareas;
        agregarHTML();
    }
}
function completarTarea(e) {
    if (e.target.classList.contains("completada")) {
        const tareaID = Number(e.target.getAttribute("data-id"));
        const nuevasTareas = task.map(item => {
            if (item.id === tareaID) {
                item.estado = !item.estado;
                return item;
            } else {
                return item
            }
        })
        task = nuevasTareas;
        agregarHTML();
    }
}