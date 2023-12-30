
// UTILIDADES
    const $ =  (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // DEFINICION DE ID
    const idAleatorio = () => self.crypto.randomUUID()

    //LOCAL STORAGE
    const getData = (key) => JSON.parse(localStorage.getItem(key))
    const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data))

    const allCategories = getData("categories") || []
    const allOperations = getData("operations") || []

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
        const tabChangeEditarOperacion = (operationsId) =>{
            hideTab([".categorias-view",".editar-categoria-view",".reportes-view",".balance-view",
            ".tituloNuevaOperacion",".nuevaOperationButton"])
            showTab([".nueva-operacion-view",".editarOperationButton",".tituloEditarOperacion"])
            $("#editarOperationButton").setAttribute("data-id", operationsId)
            const operationSelect = getData("operations").find(operations => operations.id === operationsId)
            $("#descripcion-nueva-operacion").value = operationSelect.descripcion
            $("#categoria-nueva-operacion").value = operationSelect.categoria
            $("#date-nueva-operacion").value = operationSelect.fecha
            $("#monto-nueva-operacion").value = operationSelect.monto

        }
        const tabChangeNuevaOperacion = () =>{
            hideTab([".categorias-view",".balance-view",".editar-categoria-view",".reportes-view",
            ".editarOperationButton",".tituloEditarOperacion"])
            showTab([".nueva-operacion-view",".tituloNuevaOperacion",".nuevaOperationButton"])
        }
        const tabChangeNuevaOperacionCancel = () =>{
            hideTab([".categorias-view",".nueva-operacion-view",".editar-categoria-view",".reportes-view"])
            showTab([".balance-view"])
        }
        const tabChangeBalance = () =>{
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
        const saveNewCategory = () => {
            return{
                id: idAleatorio(),
                nombre: $("#nombre-categoria").value
            }
        }

        const renderCategories = (categories) => {
            const clearCategoryTable = $("#categoryTable");
            clearCategoryTable.innerHTML = '';
            for (const category of categories) {
                $("#categoryTable").innerHTML += `
                <tr>
                    <td>${category.nombre}</td>
                    <td class="flex flex-row-reverse">  
                        <button class="px-2" id="eliminar">Eliminar</button>                       
                        <button class="px-2" id="editar" onclick="tabChangeEditarCategorias()">Editar</button>
                    </td>
                </tr>`
            }
        }

    //RENDER OPERACIONES
        const saveNewOperation = () => {
            return{
                id: idAleatorio(),
                descripcion: $("#descripcion-nueva-operacion").value,
                categoria: $("#categoria-nueva-operacion").value,
                fecha: $("#date-nueva-operacion").value,
                monto: $("#monto-nueva-operacion").value

            }
        }   

        const renderOperations = (operations) => {
            for (const operation of operations){
                $("#operationTable").innerHTML += 
                `
                <tr>
                    <td>${operation.descripcion}</td>
                    <td>${operation.categoria}</td>
                    <td>${operation.fecha}</td>
                    <td>${operation.monto}</td>
                    <div>
                        <td class="flex flex-col">
                            <button onclick="tabChangeEditarOperacion('${operation.id}')">Editar</button>
                            <button>Eliminar</button>
                        </td>
                    </div>
                </tr>
                `
            }
        }

// EVENTOS
    const initializeApp = () => {
            setData("operations", allOperations)
            renderOperations(allOperations)
            setData("categories", allCategories)
            renderCategories(allCategories)
                     
        // CAMBIO DE PESTAÑA
            $("#pestaña-categorias").addEventListener ("click", tabChangeCategories)
            $("#pestaña-reportes").addEventListener ("click", tabChangeReports)
            $("#pestaña-balance").addEventListener ("click", tabChangeBalance)
            $("#nuevaOperacionButton").addEventListener ("click", tabChangeNuevaOperacion)
            $("#cancelar").addEventListener ("click", tabChangeCancelarEdicionDeCategoria)
            $("#nuevaOperacionCancel").addEventListener ("click", tabChangeNuevaOperacionCancel)    

        //MOSTRAR/OCULTAR FILTROS
            $(".ocultar-filtros-button").addEventListener ("click", ocultarFiltros)
            $(".mostrar-filtros-button").addEventListener ("click", mostrarFiltros)
        
        //AGREGAR CATEGORIA
            $("#nombre-categoria-button").addEventListener ("click", (e) => {
                // e.preventDefault()
                const currentDataCategories = getData("categories")
                currentDataCategories.push(saveNewCategory())
                setData("categories", currentDataCategories)
                renderCategories(currentDataCategories)
                // renderCategories(currentDataCategories)
            })

        //AGREGAR OPERACION
            $("#nuevaOperationButton").addEventListener ("click", (e) => {
                const currentDataOperations = getData("operations")
                currentDataOperations.push(saveNewOperation())
                setData("operations", currentDataOperations)
            })

        //EDITAR OPERACION
            $("#editarOperationButton").addEventListener ("click", (e) => {
                e.preventDefault()
                const operationsId = $("#editarOperationButton").getAttribute("data-id")
                const currentDataOperations = getData("operations").map(operations => {
                    if ( operations.id === operationsId){
                        return saveNewOperation()
                    }
                    return operations
                })
                setData("operations", currentDataOperations)
            })
            
    }
    window.addEventListener("load", initializeApp)