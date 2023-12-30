
// UTILIDADES
    const $ =  (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // DEFINICION DE ID
    const idAleatorio = () => self.crypto.randomUUID()

    //LOCAL STORAGE
    const getData = (key) => JSON.parse(localStorage.getItem(key))
    const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data))

    // INFORMCION DE CATEGORIAS
    const allCategories = getData("categories") || []

    // INFORMACION DE OPERACIONES

//FUNCIONES NECESARIAS

    // CAMBIO DE PESTAÑA
        const hideTab = (selectors) => {
            for (const selector of selectors){
                $(selector).classList.add("hidden")
            }
        }
        const showTab = (selectors) => {
            for (const selector of selectors){
                $(selector).classList.remove("hidden")
            }
        } 
        const tabChangeCategories = () =>{
            hideTab([".balance-view",".editar-categoria-view",".reportes-view",".nueva-operacion-view"])
            showTab([".categorias-view"])
        }

        const tabChangeReports = () =>{
            hideTab([".categorias-view",".nueva-operacion-view",".balance-view",".editar-categoria-view"])
            showTab([".reportes-view"])
        }
        const tabChangeEditarCategorias = () =>{
            hideTab([".categorias-view",".nueva-operacion-view",".balance-view",".reportes-view"])
            showTab([".editar-categoria-view"])
        }
        const tabChangeNuevaOperacion = () =>{
            hideTab([".categorias-view",".editar-categoria-view",".balance-view",".reportes-view"])
            showTab([".nueva-operacion-view"])
        }
        const tabChangeNuevaOperacionCancel = () =>{
            hideTab([".categorias-view",".nueva-operacion-view",".editar-categoria-view",".reportes-view"])
            showTab([".balance-view"])
        }
        const tabChangeEditarBalance = () =>{
            hideTab([".categorias-view",".nueva-operacion-view",".editar-categoria-view",".reportes-view"])
            showTab([".balance-view"])
        }
        const tabChangeCancelarEdicionDeCategoria = () =>{
            hideTab([".balance-view",".editar-categoria-view",".reportes-view",".nueva-operacion-view"])
            showTab([".categorias-view"])
        }

        //MOSTRAR/OCULTAR FILTROS
        const ocultarFiltros = () => {
            hideTab([".formulary-visibility",".ocultar-filtros-button",".mostrar-filtros-button"])
            showTab([".mostrar-filtros-button"])
            $(".formulary-visibility").classList.remove("block")
            $(".ocultar-filtros-button").classList.remove("block")
            $(".mostrar-filtros-button").classList.add("block")
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

    //RENDER CATEGORIAS
    const renderCategories = (categories) => {
        for (const category of categories) {
            $("#categoryTable").innerHTML += `
            <tr>
                <td>${category.nombre}</td>
                <td class="flex flex-row-reverse">  
                    <button class="px-2" id="eliminar">Eliminar</button>                       
                    <button class="px-2" id="editar">Editar</button>
                </td>
            </tr>`
        }
    }

    const saveNewCategory = () => {
        return{
            id: idAleatorio(),
            nombre: $("#nombre-categoria").value
        }
    }
// EVENTOS
const initializeApp = () => {
        setData("categories", allCategories)
        renderCategories(allCategories)
        
        
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
    
    //agregar categoria
        $("#nombre-categoria-button").addEventListener ("click", (e) => {
            e.preventDefault()
            const currentData = getData("categories")
            currentData.push(saveNewCategory())
            setData("categories", currentData)
            renderCategories(allCategories)
        })
}
window.addEventListener("load", initializeApp)