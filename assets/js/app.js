'use strict'
const TO_DO = "TO_DO";
const DONE = "DONE";
const DELETED = 'DELETED';

let tareas = [];

let nodoMood = document.querySelector('.main__mood');
let nodoMoodDone = document.querySelector('.main__mood.done');
nodoMood.style.display = 'none';
nodoMoodDone.style.display = 'none';

// Crear tarea al hacer clic en el botón '+' o presionar Enter
function añadirTarea() {
    let nombreTarea = document.querySelector('.main__input').value;
    if (nombreTarea !== '') {
        let tarea = {
            nombre: nombreTarea,
            estado: TO_DO
        }
        tareas.push(tarea);
        pintaMe(tarea, nodoMood);
        checkTitles();
    } else {
        nodoMood.style.display = 'none';
        nodoMoodDone.style.display = 'none';
    }
}

// Evento clic en el botón '+'
document.querySelector('.main__svg.plus').addEventListener('click', añadirTarea);

// Evento tecla Enter en el input
document.querySelector('.main__input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        añadirTarea();
    }
});

function checkTitles() {
    setTimeout(function() {
        let tareasToDo = tareas.filter(cadaTarea => cadaTarea.estado === TO_DO);
        nodoMood.style.display = tareasToDo.length > 0 ? 'block' : 'none';
        
        let tareasDone = tareas.filter(cadaTarea => cadaTarea.estado === DONE);
        nodoMoodDone.style.display = tareasDone.length > 0 ? 'block' : 'none';
    }, 50);
}
function pintaMe( tarea , nodoLugar){
    let nodoActivitie = document.createElement( 'div' );
    nodoActivitie.classList.add( 'main__activitie' );
    let nodoNameActivitie= document.createElement( 'div' );
    nodoNameActivitie.classList.add( 'main__name' );
    nodoActivitie.appendChild( nodoNameActivitie );
    nodoNameActivitie.innerHTML = tarea.nombre;
    console.log(nodoNameActivitie );
    let nodoSymbol = document.createElement( 'div' );
    nodoSymbol.classList.add( 'main__symbols' );
    nodoActivitie.appendChild( nodoSymbol );
    // elemento de papalera
    let nodoDelete = document.createElement( 'span' );
    nodoSymbol.appendChild( nodoDelete );
    let TrashClass = 'main__svg symbol trash';
    if( tarea.estado ==! TO_DO ){
        TrashClass += 'main__svg symbol trash-active';
    }    nodoDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class='${TrashClass}' viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>`;
    nodoDelete.addEventListener( 'click', function(){
        console.log('Has eliminnado la tarea');
        // Eliminar la tarea visualmente
        nodoActivitie.remove();
        tarea.estado === DELETED;
        console.log( tareas );
        // Eliminar la tarea del array
        let elementFound_index = tareas.findIndex( function(){ // Cada Elemento es pasar por todos los valoresd del array (como un for)
            if( tarea.estado === 'DELETED' ){
                return true // Has encontrado tu elemento -> elementFound toma el valor de ese elemento.
            }else{
                return false
            }
        } );
        // Borrar elementos desde el nº del indice de un array 
        tareas.splice( elementFound_index , 1 ); // elemento desde el que quiero borrar hasta el que quiera borrar
        console.log(tareas);

        checkTitles();

        // Find, findindex o filter de los arrrays


        // Guardar en LStorage

    } );
    let nodoCompleted = document.createElement( 'span' );
    nodoSymbol.appendChild( nodoCompleted );
    // evento en btn check paracompletar tareas:
    let CompletedClass = 'main__svg symbol done';
    if( tarea.estado ==! TO_DO ){
        CompletedClass += 'main__svg symbol done-active';
    }
    nodoCompleted.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class='${CompletedClass}' viewBox="0 0 16 16"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/></svg>`;
    // dos eventos distintos para lugar todos if; else para done
    // Como al pintar mi nodoLugar ya adqueire la clase done o no, puedo hacer una condición en la que el botón completado haga una cosa u otra segun donde este.
    if( nodoLugar.classList.contains( 'done' ) ){ // Descompletar
        nodoCompleted.addEventListener( 'click', function(){

        } );
    }else{ // Completar
        nodoCompleted.addEventListener( 'click', function(){
            console.log( 'Has completado la tarea' );
            // elimino de tareas y por hacer y pinto en tareas completadas 
            tarea.estado = DONE;
            console.log( tarea );
            nodoActivitie.remove();
            pintaMe(tarea, nodoMoodDone );
            // btn-check en verde:
            CompletedClass += 'main__svg symbol done-active';
            nodoCompleted.innerHTML = `<span id="btn-check"><svg xmlns="http://www.w3.org/2000/svg" class='${CompletedClass}' viewBox="0 0 16 16"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/></svg>`;
                // btn-check en verde:
            CompletedClass += 'main__svg symbol done-active';
            nodoCompleted.innerHTML = `<span id="btn-check"><svg xmlns="http://www.w3.org/2000/svg" class='${CompletedClass}' viewBox="0 0 16 16"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/></svg>`;
            checkTitles();
        } );
    }
    console.log( 'Estas son todas las tareas', tareas );
    nodoLugar.appendChild( nodoActivitie );
}
// console.log( 'Estas son todas las tareas', tareas );

let listaNav = document.querySelectorAll( '.main__nav' );
console.log( listaNav );
let nodoHome = document.querySelector( '.main__nav.home' );
let nodoBgMenu = document.querySelector( '.main__menu' );
nodoHome.addEventListener( 'click', function(){
        nodoBgMenu.style.backgroundColor = '$secondary ';
})

for( let i = 0; i < listaNav.length; i++){
    console.log(listaNav[i]);
    listaNav[i].addEventListener( 'click', function(){
        if( i === 0){
            nodoBgMenu.style.backgroundColor = '$secondary ';
            this.classList.add( 'active' );
            listaNav[i].classList.add( 'active' );
        }else{
            console.log( 'Has pulsado', this);
            nodoBgMenu.style.backgroundColor = 'white';
        }

        console.log( listaNav );
        console.log( [...listaNav] ); // SPREAD -> Desenvolver el elemento orignal
    
        let elementFound = [...listaNav].find( function( cadaElemento ){ 
            console.log( cadaElemento );
            if( cadaElemento.classList.contains('home') ){
                return true // Has encontrado tu elemento -> elementFound toma el valor de ese elemento.
            }else{
                return false
            }
        } );
        elementFound.style.backgroundColor = '$secondary ;';
    })

}

