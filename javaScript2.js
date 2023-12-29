const $ =  (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const categoriesPlaceHolder = [

]

const renderCategories = (categories) => {
    for (const category of categories) {
        $("#categoryTable").innerHTML += `
        <tr>
            <td>${category.fullname}</td>
            <td class="flex flex-row-reverse">  
                <button class="px-2" id="eliminar">Eliminar</button>                       
                <button class="px-2" id="editar">Editar</button>
            </td>
        </tr>`
    }
}
renderCategories(categoriesPlaceHolder)
const tabChangeCategories = () =>{
    $(".balance-view").classList.add("hidden")
    $(".editar-categoria-view").classList.add("hidden")
    $(".reportes-view").classList.add("hidden")
    $(".nueva-operacion-view").classList.add("hidden")
    $(".categorias-view").classList.remove("hidden")
}
const tabChangeReports = () =>{
    $(".categorias-view").classList.add("hidden")
    $(".nueva-operacion-view").classList.add("hidden")
    $(".balance-view").classList.add("hidden")
    $(".editar-categoria-view").classList.add("hidden")
    $(".reportes-view").classList.remove("hidden")
}
const tabChangeEditarCategorias = () =>{
    $(".categorias-view").classList.add("hidden")
    $(".nueva-operacion-view").classList.add("hidden")
    $(".balance-view").classList.add("hidden")
    $(".reportes-view").classList.add("hidden")
    $(".editar-categoria-view").classList.remove("hidden")
}
const tabChangeNuevaOperacion = () =>{
    $(".categorias-view").classList.add("hidden")
    $(".editar-categoria-view").classList.add("hidden")
    $(".balance-view").classList.add("hidden")
    $(".reportes-view").classList.add("hidden")
    $(".nueva-operacion-view").classList.remove("hidden")
}
const tabChangeNuevaOperacionCancel = () =>{
    $(".categorias-view").classList.add("hidden")
    $(".nueva-operacion-view").classList.add("hidden")
    $(".editar-categoria-view").classList.add("hidden")
    $(".reportes-view").classList.add("hidden")
    $(".balance-view").classList.remove("hidden")
}
const tabChangeEditarBalance = () =>{
    $(".categorias-view").classList.add("hidden")
    $(".nueva-operacion-view").classList.add("hidden")
    $(".editar-categoria-view").classList.add("hidden")
    $(".reportes-view").classList.add("hidden")
    $(".balance-view").classList.remove("hidden")
}
const tabChangeCancelarEdicionDeCategoria = () =>{
    $(".balance-view").classList.add("hidden")
    $(".editar-categoria-view").classList.add("hidden")
    $(".reportes-view").classList.add("hidden")
    $(".nueva-operacion-view").classList.add("hidden")
    $(".categorias-view").classList.remove("hidden")
}

//MOSTRAR/OCULTAR FILTROS
const ocultarFiltros = () => {
    $(".formulary-visibility").classList.add("hidden")
    $(".formulary-visibility").classList.remove("block")
    $(".ocultar-filtros-button").classList.add("hidden")
    $(".ocultar-filtros-button").classList.remove("block")
    $(".mostrar-filtros-button").classList.add("block")
    $(".mostrar-filtros-button").classList.remove("hidden")
    $(".filtros-box").classList.remove("row-span-2")
    $(".filtros-box").classList.add("row-span-1")

}
const mostrarFiltros = () => {
    $(".formulary-visibility").classList.add("block")
    $(".formulary-visibility").classList.remove("hidden")
    $(".ocultar-filtros-button").classList.remove("hidden")
    $(".ocultar-filtros-button").classList.add("block")
    $(".mostrar-filtros-button").classList.remove("block")
    $(".mostrar-filtros-button").classList.add("hidden")
    $(".filtros-box").classList.add("row-span-2")
    $(".filtros-box").classList.remove("row-span-1")
}
//eventos

const initializeProject = () => {
    // CAMBIO DE PESTAÑA
    $("#pestaña-categorias").addEventListener ("click", tabChangeCategories)
    $("#pestaña-reportes").addEventListener ("click", tabChangeReports)
    $("#editar").addEventListener ("click", tabChangeEditarCategorias)
    $("#pestaña-balance").addEventListener ("click", tabChangeEditarBalance)
    $("#nuevaOperacionButton").addEventListener ("click", tabChangeNuevaOperacion)
    $("#cancelar").addEventListener ("click", tabChangeCancelarEdicionDeCategoria)
    $("#nuevaOperacionCancel").addEventListener ("click", tabChangeNuevaOperacionCancel)    

    //MOSTRAR/OCULTAR FILTROS
    $(".ocultar-filtros-button").addEventListener ("click", ocultarFiltros)
    $(".mostrar-filtros-button").addEventListener ("click", mostrarFiltros)





    
}
window.addEventListener("load", initializeProject)