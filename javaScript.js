
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
            $(".nuevaCategoriaForm").reset()
        }
        const tabChangeReports = () =>{
            hideTab([".categorias-view",".nueva-operacion-view",".balance-view",".editar-categoria-view"])
            showTab([".reportes-view"])
        }
        const tabChangeNuevaOperacion = () =>{
            $(".nuevaOperacionForm").reset()
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
            location.reload()
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
        const saveEditedCategory = () => {
            return{
                id: idAleatorio(),
                nombre: $("#editar-titulo-categoria").value
            }
        }

        const renderCategories = (categories) => {
            const clearCategoryTable = $("#categoryTable");
            clearCategoryTable.innerHTML = '';
            for (const category of categories) {
                $("#categoryTable").innerHTML += 
                `<tr>
                    <td>${category.nombre}</td>
                    <td class="flex flex-row-reverse">  
                        <button class="bg-slate-500 text-neutral-50 rounded-md px-2 mx-1" id="category-modal-eliminar" onclick="my_modal_5.showModal(),botonCategoriaEliminar('${category.id}')">Eliminar</button>                       
                        <button class="bg-slate-400 rounded-md px-2 text-neutral-50 mx-1" id="editarCategoryTab" onclick="tabChangeEditarCategorias('${category.id}')">Editar</button>
                    </td>
                </tr>`
            }
        }

    //EDITAR CATEGORIA
        const tabChangeEditarCategorias = (categoryId) =>{
            hideTab([".categorias-view",".nueva-operacion-view",".balance-view",".reportes-view"])
            showTab([".editar-categoria-view"])
            $("#categoryEdition").setAttribute("data-id-categories", categoryId)
            const categorySelect = getData("categories").find(categories => categories.id === categoryId)
            $("#editar-titulo-categoria").value = categorySelect.nombre
        }

    //MODAL/ELIMINAR CATEGORIA
        const botonCategoriaEliminar = (categoryId) => {
            $(".modal-eliminar").setAttribute("data-id-modal", categoryId)
            $(".modal-eliminar").addEventListener("click", (e) => {
                const categoriesId = $(".modal-eliminar").getAttribute("data-id-modal")
                modalEliminarCategoria(categoriesId)  
            })
        }
        
         const modalEliminarCategoria = (categoryId) => {
            const currentDataModal = getData("categories").filter(category => category.id != categoryId)
            addCategory(currentDataModal)
         }

    //RENDER OPCIONES DE CATEGORIA
        const renderOperationsCategories = (categories) => {
            for (const category of categories) {
                $("#categoria-nueva-operacion").innerHTML += 
                `<option value="${category.id}">${category.nombre}</option>`
                $("#categoria-select").innerHTML += 
                `<option value="${category.id}">${category.nombre}</option>`
            }
        }

    //RENDER OPERACIONES
        const saveNewOperation = (userId) => {
            return{
                id: userId ? userId : idAleatorio(),
                descripcion: $("#descripcion-nueva-operacion").value,
                categoria: $("#categoria-nueva-operacion").value,
                fecha: $("#date-nueva-operacion").value,
                monto: $("#monto-nueva-operacion").value
            }
        }   

        const renderOperations = (operations) => {
            if(operations.length){
                hideTab([".sinOperaciones"])
                showTab([".tableOperation"])
                for (const operation of operations){
                    const categorySelected = getData("categories").find(category => category.id === operation.categoria)
                    console.log(categorySelected) 
                    $("#operationTable").innerHTML += 
                    `<tr>
                        <td>${operation.descripcion}</td>
                        <td>${categorySelected.nombre}</td>
                        <td>${operation.fecha}</td>
                        <td>${operation.monto}</td>
                        <div>
                            <td class="flex flex-col">
                                <button class="bg-slate-500 text-neutral-50 rounded-md px-2 mx-1" onclick="tabChangeEditarOperacion('${operation.id}')">Editar</button>
                                <button class="bg-slate-400 rounded-md px-2 text-neutral-50 mx-1" onclick="my_modal_5.showModal(),botonOperacionEliminar('${operation.id}')">Eliminar</button>
                            </td>
                        </div>
                    </tr>`
                }
            } else{
                hideTab([".tableOperation"])
                showTab([".sinOperaciones"])
            }
        }

    //EDITAR OPERACION
        const tabChangeEditarOperacion = (operationsId) =>{
            hideTab([".categorias-view",".editar-categoria-view",".reportes-view",".balance-view",
            ".tituloNuevaOperacion",".nuevaOperationButton"])
            showTab([".nueva-operacion-view",".editarOperationButton",".tituloEditarOperacion"])
            $("#editarOperationButton").setAttribute("data-id-operations", operationsId)
            const operationSelect = getData("operations").find(operations => operations.id === operationsId)
            $("#descripcion-nueva-operacion").value = operationSelect.descripcion
            $("#categoria-nueva-operacion").value = operationSelect.categoria
            $("#date-nueva-operacion").value = operationSelect.fecha
            $("#monto-nueva-operacion").value = operationSelect.monto
        }


    //MODAL/ELIMINAR OPERACION
        const botonOperacionEliminar = (operationId) => {
            $(".modal-eliminar").setAttribute("data-id-modal", operationId)
            $(".modal-eliminar").addEventListener("click", () => {
                const operacionesId = $(".modal-eliminar").getAttribute("data-id-modal")
                modalEliminarOperacion(operacionesId)
                location.reload()
            })
        }
        const modalEliminarOperacion = (operationId) => {
            const currentData = getData("operations").filter(operation => operation.id != operationId)
            setData("operations", currentData)
        }

        const addCategory = (category) => {
            setData("categories", category)
            renderCategories(category)
        }


// EVENTOS
    const initializeApp = () => {
            setData("operations", allOperations)
            renderOperations(allOperations)
            addCategory(allCategories)
            renderOperationsCategories(allCategories)
                     
        // CAMBIO DE PESTAÑA
            $("#pestaña-categorias").addEventListener ("click", tabChangeCategories)
            $("#pestaña-reportes").addEventListener ("click", tabChangeReports)
            $("#pestaña-balance").addEventListener ("click", tabChangeBalance)
            $("#nuevaOperacionButton").addEventListener ("click", tabChangeNuevaOperacion)
            $("#categoryCancelar").addEventListener ("click", (e) => {
                tabChangeCancelarEdicionDeCategoria()
                e.preventDefault()})
            $("#nuevaOperacionCancel").addEventListener ("click", tabChangeNuevaOperacionCancel)    

        //MOSTRAR/OCULTAR FILTROS
            $(".ocultar-filtros-button").addEventListener ("click", ocultarFiltros)
            $(".mostrar-filtros-button").addEventListener ("click", mostrarFiltros)
        
        //AGREGAR CATEGORIA
            $("#nombre-categoria-button").addEventListener ("click", (e) => {
                const currentData = getData("categories")
                currentData.push(saveNewCategory())
                addCategory(currentData)
                $(".nuevaCategoriaForm").reset()
            })

        //EDITAR CATEGORIA
            $("#categoryEdition").addEventListener ("click", (e) => {
                e.preventDefault()
                const categoriesId = $("#categoryEdition").getAttribute("data-id-categories")
                console.log(categoriesId)
                const currentData = getData("categories").map(category => {
                    if (category.id === categoriesId){
                    return saveEditedCategory(userId)
                    }
                    return category
                })
                addCategory(currentData)
                tabChangeCancelarEdicionDeCategoria()
            }) 

        //AGREGAR OPERACION
            $("#nuevaOperationButton").addEventListener ("click", (e) => {
                const currentData = getData("operations")
                currentData.push(saveNewOperation())
                setData("operations", currentData)
            })

        //EDITAR OPERACION
            $("#editarOperationButton").addEventListener ("click", (e) => {
                const operationsId = $("#editarOperationButton").getAttribute("data-id-operations")
                const currentData = getData("operations").map(operations => {
                    if ( operations.id === operationsId){
                        return saveNewOperation()
                    }
                    return operations
                })
                setData("operations", currentData)
                
            })     



    }
    window.addEventListener("load", initializeApp)