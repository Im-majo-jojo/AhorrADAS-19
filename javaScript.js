
// UTILIDADES
const $ =  (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

//CURRENT DATE



// DEFINICION DE ID
const idAleatorio = () => self.crypto.randomUUID()

//LOCAL STORAGE
const getData = (key) => JSON.parse(localStorage.getItem(key))
const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data))

const clearCategoryTable = (selector) => $(selector).innerHTML = '';

const defaultCategories = [
    {
        id: idAleatorio(),
        nombre: "comida",
    },
    {
        id: idAleatorio(),
        nombre: "servicios"
    },
    {
        id: idAleatorio(),
        nombre: "salidas"
    },
    {
        id: idAleatorio(),
        nombre: "educacion"
    },
    {
        id: idAleatorio(),
        nombre: "transporte"
    }
]

const allCategories = getData("categories") || defaultCategories
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
            updateDate()
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

    //SHOW/HIDE FILTERS 
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

    //RENDER CATEGORIES

        const saveNewCategory = () => {
            return{
                id: idAleatorio(),
                nombre: $("#nameCategory").value
            }
        }
        const saveEditedCategory = () => {
            return{
                id: idAleatorio(),
                nombre: $("#editCategoryTittle").value
            }
        }

        const renderCategories = (categories) => {
            clearCategoryTable("#categoryTable")
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
            $("#editCategoryTittle").value = categorySelect.nombre
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

    //RENDER SELECTS OPTIONS
        const renderOperationsCategories = (categories) => {
            for (const category of categories) {
                $("#categoria-nueva-operacion").innerHTML += 
                `<option value="${category.nombre}">${category.nombre}</option>`
                $("#categoria-select").innerHTML += 
                `<option value="${category.nombre}">${category.nombre}</option>`
            }
        }
    




    // RENDER OPERATIONS MATH
        // const saveBalance = () => {
        //     return{
        //         id: idAleatorio(),
        //         ganancias:0,
        //         gastos:0,
        //         total:0
        //     }
        // }

    const renderBalance = (operations) => {
        let balanceGanancias = 0
        let balanceGastos = 0


        for (const operation of operations) {
            if (operation.tipo === 'ganancia') {
                balanceGanancias += operation.monto;
                console.log("holi")
            } else {
                balanceGastos.gastos += operation.monto;
            }
        }

        const balanceTotal = balanceGanancias - balanceGastos
        $("#balanceTable").innerHTML = `
            <tr >
                <td>Ganancias</td>
                <td id="amountGanancia" class="text-green-600">+$${balanceGanancias}</td>
            </tr>
            <tr>
                <td>Gastos</td>
                <td id="amountGasto" class="text-red-600">-$${balanceGastos}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td id="amountTotal" class="">$${balanceTotal}</td>
            </tr>`
    }






    //RENDER OPERACIONES
        const saveNewOperation = (userId) => {
            return{
                id: userId ? userId : idAleatorio(),
                descripcion: $("#descripcion-nueva-operacion").value,
                tipo: $("#tipo-nueva-operacion").value,
                categoria: $("#categoria-nueva-operacion").value,
                fecha: $("#date-nueva-operacion").value,
                monto: $("#monto-nueva-operacion").valueAsNumber
            }
        }   

        const renderOperations = (operations) => {
            clearCategoryTable("#operationTable")
            if(operations.length){
                hideTab([".sinOperaciones"])
                showTab([".tableOperation"])
                for (const operation of operations){
                    
                    $("#operationTable").innerHTML += 
                    `<tr>
                        <td>${operation.descripcion}</td>
                        <td>${operation.categoria}</td>
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

    // FILTROS
        const biggestAmount = (operations) => {
            return operations.sort((a, b) => b.monto - a.monto)  
        }
        const smallestAmount = (operations) => {
            return operations.sort((a, b) => a.monto - b.monto)
        }
        const alphabeticAZ = (operations) => {
            return operations.sort((a, b) => a.descripcion.localeCompare(b.descripcion))
        }
        const alphabeticZA = (operations) => {
            return operations.sort((a, b) => b.descripcion.localeCompare(a.descripcion))
        }
        const byDate = (operations, fromDate) => {
            // Filtrar las operaciones a partir de la fecha especificada
            return operations.filter((operation) => new Date(operation.fecha) >= new Date(fromDate));
        }
        const lessRecentDate = (operations) => {
            return operations.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        }
        const recentDate = (operations) => {
            return operations.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        }


        


//VALIDAION
    const validateFormOperation = (field) => {
        const nameOperation = $("#descripcion-nueva-operacion").value.trim()
        const amountOperation = $("#monto-nueva-operacion").valueAsNumber
        const validationPassed = nameOperation!== "" && amountOperation 
        switch (field){
            case "nameOperation":
                if (nameOperation=== ""){
                  showTab([".bannerName-error"])
                  $("#descripcion-nueva-operacion").classList.add("border-red-500", "border", "border-2")
                } else {
                  hideTab([".bannerName-error"])
                  $("#descripcion-nueva-operacion").classList.remove("border-red-500")
                }
                break
            case "amountOperation":
                if (!amountOperation){
                  showTab([".bannerAmount-error"])
                  $("#monto-nueva-operacion").classList.add("border-red-500", "border", "border-2")
                } else {
                  hideTab([".bannerAmount-error"])
                  $("#monto-nueva-operacion").classList.remove("border-red-500", "border", "border-2")
                }
                break 
        }

        if(validationPassed){
            $("#nuevaOperationButton").removeAttribute("disabled")
        } else {
            $("#nuevaOperationButton").setAttribute("disabled", true)
        }

    }

    // const validateFormCategory = () => {
    //     const nameCategory = $("#nameCategory").value
    //     const validationPassed = nameCategory!== ""

    //     if (nameCategory === ""){
    //         console.log("holi")
    //         $("#descripcion-nueva-operacion").classList.add("border-red-500", "border", "border-2")
    //       } else {
    //         console.log("holi2")
    //         $("#descripcion-nueva-operacion").classList.remove("border-red-500", "border", "border-2")
    //       }

    //     if(validationPassed){
    //         $("#nameCategoryButton").removeAttribute("disabled")
    //     } else {
    //         $("#nameCategoryButton").setAttribute("disabled", true) 
    //     }


    // }

    const updateDate = () => {
        const date = new Date()
        $("#date-nueva-operacion").value = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString().padStart(2,0)+"-"+date.getDate().toString().padStart(2,0)
    }

// EVENTOS
const initializeApp = () => {
        setData("operations", allOperations)
        renderOperations(allOperations)
        addCategory(allCategories)
        renderOperationsCategories(allCategories)
        renderBalance(allOperations)

        // validateFormCategory()


        

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
        $("#nameCategoryButton").addEventListener ("click", (e) => {
            e.preventDefault()
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
                return saveEditedCategory(categoriesId)
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
            renderBalance(currentData)
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
        
    //FILTROS
        $("#categoria-select").addEventListener("input", (e) => {
            const FilterSelected = e.target.value
            const currentData = getData("operations")
            if(FilterSelected==="Todas"){
                setData("operations", currentData)
                renderOperations(currentData)
            }else{
                const filterOperation = currentData.filter(operation => operation.categoria === FilterSelected)
                renderOperations(filterOperation)
            }
        })

        $("#tipo-select").addEventListener("input", (e) => {
            const FilterSelected = e.target.value
            const currentData = getData("operations")
            if(FilterSelected==="todos"){
                setData("operations", currentData)
                renderOperations(currentData)
            }else{
                const currentData = getData("operations")
                const filterOperation = currentData.filter(operation => operation.tipo === FilterSelected)
                console.log(FilterSelected)
                console.log(filterOperation)
                renderOperations(filterOperation)
            }
        })

        $("#ordenar-por-select").addEventListener("input", (e) => {
            const FilterSelected = e.target.value
            const currentData = getData("operations")
            if(FilterSelected==="Menos reciente"){
                renderOperations(lessRecentDate(currentData))
            }else if(FilterSelected==="Más reciente"){
                renderOperations(recentDate(currentData))
            }else if (FilterSelected==="Mayor monto"){
                renderOperations(biggestAmount(currentData))
            }else if(FilterSelected==="Menor monto"){
                renderOperations(smallestAmount(currentData))
            }else if(FilterSelected==="A/Z"){
                renderOperations(alphabeticAZ(currentData))
            }else if(FilterSelected==="Z/A"){
                renderOperations(alphabeticZA(currentData))
            }else if(FilterSelected==="Z/A"){
                renderOperations(alphabeticZA(currentData))
            }
        })

        $("#desde-select").addEventListener("input", (e) => {
            const FilterSelected = e.target.value
            const currentData = getData("operations")
            renderOperations(byDate(currentData,FilterSelected))
        })

        $("#descripcion-nueva-operacion").addEventListener("blur", () => validateFormOperation("nameOperation"))
        $("#monto-nueva-operacion").addEventListener("blur", () => validateFormOperation("amountOperation"))
        // $("#nameCategory").addEventListener("input", () =>)


        
        
}
window.addEventListener("load", initializeApp)