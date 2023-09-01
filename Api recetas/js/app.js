const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const btnLimpiar = document.querySelector('#limpiar');

window.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', BuscarPlatillos);

    btnLimpiar.addEventListener('click', reset)
});


function BuscarPlatillos(e){
    e.preventDefault();

    const nombrePlatillo = document.querySelector('#nombre').value;

    if(nombrePlatillo === ''){
        mostrarAlerta('LOS CAMPOS SON OBLIGATORIOS')

        return;
    };

    consultarApi(nombrePlatillo);
};

function consultarApi(nombrePlatillo){

    const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${nombrePlatillo}`;
    spinner();
    setTimeout(() => {
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();
            if(datos.results === 0){
                mostrarAlerta('NO SE ENCONTRO NINGUN RESULTADO');

                return;
            };
            mostrarDatos(datos)});
        }, 2000);
};

function mostrarDatos(datos){

    for(recetas of datos.data.recipes){
        console.log(recetas);
        const card = document.createElement('div');
        card.classList.add('w-1/2', 'md:w-1/3', 'lg:w-1/4', 'mb-4' ,'p-3');

        
        const comidaTitle = document.createElement('p');
        comidaTitle.textContent = `${recetas.title}`
        comidaTitle.classList.add('font-bold', 'bg-white', 'mx-auto', 'text-center', 'titulo')

        const comidaImg = document.createElement('img');
        comidaImg.classList.add('img')
        comidaImg.src = `${recetas.image_url}`;
        

        card.appendChild(comidaTitle);
        card.appendChild(comidaImg);

        resultado.append(card)
    };
};

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
};

function mostrarAlerta(mensaje){

    const alerta = document.querySelector('.bg-red-100');

    if(!alerta) {
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'py-10', 'rounded',
        'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
        <strong class = "font-bold"></strong>
        <span class = "block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 2000);
    };
};

function reset(e){
    e.preventDefault();
    limpiarHTML();
    formulario.reset();
};

function spinner(){
    limpiarHTML();
    const divSpiner = document.createElement('div');
    divSpiner.classList.add("lds-facebook")
    divSpiner.innerHTML = `
    <div></div>
    <div></div>
    <div></div>
    `;

    resultado.appendChild(divSpiner)
}