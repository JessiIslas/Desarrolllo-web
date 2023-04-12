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

const form = document.querySelector('#auto-form');
const output = document.querySelector('#descuento-output');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const marca = form.elements.marca.value.toLowerCase();
  const modelo = form.elements.modelo.value.toLowerCase();
  let descuento;

  if (marca === 'ford') {
    if (modelo === 'fiesta') {
      descuento = 0.05;
    } else if (modelo === 'focus') {
      descuento = 0.1;
    } else {
      descuento = 0.03;
    }
  } else {
    descuento = 0.03;
  }

  output.textContent = `El descuento para un ${marca} ${modelo} es del ${descuento * 100}%`;
});