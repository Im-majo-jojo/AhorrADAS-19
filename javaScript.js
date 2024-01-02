// UTILITIES
const $ =  (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

// ID DEFINITION FUNCTION
const randomID = () => self.crypto.randomUUID()

// LOCAL STORAGE
const getData = (key) => JSON.parse(localStorage.getItem(key))

const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data))

const clearTable = (selector) => $(selector).innerHTML = '';

const defaultCategories = [
    {
        id: randomID(),
        name: "comida",
    },
    {
        id: randomID(),
        name: "servicios"
    },
    {
        id: randomID(),
        name: "salidas"
    },
    {
        id: randomID(),
        name: "educacion"
    },
    {
        id: randomID(),
        name: "transporte"
    }
]

// FUNCTIONS

    // ALL ARRAYS FUNCTION
        const allCategories = getData("categories") || defaultCategories

        const allOperations = getData("operations") || []

    // TAB CHANGE FUNCTION
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
            const currentData = getData("operations")
            const currentDataCategories = getData("categories")
            categoryHighestEarnings(currentData, currentDataCategories)
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

    // SHOW/HIDE FILTERS FUNCTION
        const hideFilters = () => {
            hideTab([".formulary-visibility",".ocultar-filtros-button",".mostrar-filtros-button"])
            showTab([".mostrar-filtros-button"])
            $(".formulary-visibility").classList.remove("block")
            $(".ocultar-filtros-button").classList.remove("block")
            $(".mostrar-filtros-button").classList.add("block")
            $(".filtros-box").classList.remove("row-span-2")
            $(".filtros-box").classList.add("row-span-1")
        }

        const showFilters = () => {
            $(".formulary-visibility").classList.add("block")
            $(".formulary-visibility").classList.remove("hidden")
            $(".ocultar-filtros-button").classList.remove("hidden")
            $(".ocultar-filtros-button").classList.add("block")
            $(".mostrar-filtros-button").classList.remove("block")
            $(".mostrar-filtros-button").classList.add("hidden")
            $(".filtros-box").classList.add("row-span-2")
            $(".filtros-box").classList.remove("row-span-1")
        }

    // RENDER CATEGORIES FUNCTION
        const saveNewCategory = () => {
            return{
                id: randomID(),
                name: $("#nameCategory").value
            }
        }

        const saveEditedCategory = () => {
            return{
                id: randomID(),
                name: $("#editCategoryTittle").value
            }
        }

        const renderCategories = (categories) => {
            clearTable("#categoryTable")
            for (const category of categories) {
                $("#categoryTable").innerHTML += 
                `<tr>
                    <td>${category.name}</td>
                    <td class="flex flex-row-reverse">  
                        <button class="bg-slate-500 text-neutral-50 rounded-md px-2 mx-1" id="category-modal-eliminar" onclick="my_modal_5.showModal(),buttonDeleteCategory('${category.name}')">Eliminar</button>                       
                        <button class="bg-slate-400 rounded-md px-2 text-neutral-50 mx-1" id="editarCategoryTab" onclick="tabChangeEditarCategorias('${category.id}')">Editar</button>
                    </td>
                </tr>`
            }
        }

    // EDIT CATEGORIES FUNCTION
        const tabChangeEditarCategorias = (categoryId) =>{
            hideTab([".categorias-view",".nueva-operacion-view",".balance-view",".reportes-view"])
            showTab([".editar-categoria-view"])
            $("#categoryEdition").setAttribute("data-id-categories", categoryId)
            const categorySelect = getData("categories").find(categories => categories.id === categoryId)
            $("#editCategoryTittle").value = categorySelect.name
        }

    // MODAL/DELETE CATEGORIES FUNCTION
        const buttonDeleteCategory = (categoryId) => {
            $(".modal-eliminar").setAttribute("data-id-modal", categoryId)
            $(".modal-eliminar").addEventListener("click", (e) => {
                const categoriesId = $(".modal-eliminar").getAttribute("data-id-modal")
                modalDeleteCategory(categoriesId)  
            })
        }
        
        const modalDeleteCategory = (categoryId) => {
            const currentDataModalOperations = getData("operations").filter(operation => operation.category !== categoryId)
            setData("operations", currentDataModalOperations)
            renderOperations(currentDataModalOperations)
            const currentDataModalCategories = getData("categories").filter(category => category.name !== categoryId)
            addCategory(currentDataModalCategories)
        }

    // RENDER SELECT OPTIONS FUNCTION
        const renderOperationsCategories = (categories) => {
            for (const category of categories) {
                $("#categoria-nueva-operacion").innerHTML += 
                `<option value="${category.name}">${category.name}</option>`
                $("#categoria-select").innerHTML += 
                `<option value="${category.name}">${category.name}</option>`
            }
        }

    // RENDER BALANCE FUNCTION
        const renderBalance = (operations) => {
            let balanceEarnings = 0
            let balanceExpenses = 0
            clearTable("#balanceTable")
            for (const operation of operations) {
                if (operation.type === 'ganancia') {
                    balanceEarnings += operation.amount;
                } else {
                    balanceExpenses += operation.amount;
                }
            }
            const balanceTotal = balanceEarnings - balanceExpenses
            $("#balanceTable").innerHTML = `
                <tr >
                    <td>Ganancias</td>
                    <td class="text-green-600">+$${balanceEarnings}</td>
                </tr>
                <tr>
                    <td>Gastos</td>
                    <td class="text-red-600">-$${balanceExpenses}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td class="">$${balanceTotal}</td>
                </tr>`
        }

    // RENDER OPERATIONS FUNCTION
        const saveNewOperation = (userId) => {
            return{
                id: userId ? userId : randomID(),
                description: $("#descripcion-nueva-operacion").value,
                type: $("#tipo-nueva-operacion").value,
                category: $("#categoria-nueva-operacion").value,
                date: $("#date-nueva-operacion").value,
                amount: $("#monto-nueva-operacion").valueAsNumber
            }
        }   

        const renderOperations = (operations) => {
            clearTable("#operationTable")
            if(operations.length){
                hideTab([".sinOperaciones"])
                showTab([".tableOperation"])
                for (const operation of operations){                  
                    $("#operationTable").innerHTML += 
                    `<tr>
                        <td>${operation.description}</td>
                        <td>${operation.category}</td>
                        <td>${operation.date}</td>
                        <td class="${operation.type==="ganancia"
                            ? "text-green-600"
                            : "text-red-600"}"
                            >${operation.type==="ganancia"
                            ? "+$"+operation.amount
                            : "-$"+operation.amount}</td>
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
    // EDIT OPERATION FUNCTION
        const tabChangeEditarOperacion = (operationsId) =>{
            hideTab([".categorias-view",".editar-categoria-view",".reportes-view",".balance-view",
            ".tituloNuevaOperacion",".nuevaOperationButton"])
            showTab([".nueva-operacion-view",".editarOperationButton",".tituloEditarOperacion"])
            $("#editarOperationButton").setAttribute("data-id-operations", operationsId)
            const operationSelect = getData("operations").find(operations => operations.id === operationsId)
            $("#descripcion-nueva-operacion").value = operationSelect.description
            $("#categoria-nueva-operacion").value = operationSelect.category
            $("#date-nueva-operacion").value = operationSelect.date
            $("#monto-nueva-operacion").value = operationSelect.amount
        }
    // MODAL/DELETE OPERATION FUNCTION
        const botonOperacionEliminar = (operationId) => {
            $(".modal-eliminar").setAttribute("data-id-modal", operationId)
            $(".modal-eliminar").addEventListener("click", () => {
                const operacionesId = $(".modal-eliminar").getAttribute("data-id-modal")
                modalDeleteOperation(operacionesId)
                location.reload()
            })
        }

        const modalDeleteOperation = (operationId) => {
            const currentData = getData("operations").filter(operation => operation.id != operationId)
            setData("operations", currentData)
        }

        const addCategory = (category) => {
            setData("categories", category)
            renderCategories(category)
        }

    // FILTERS FUNCTION
        const biggestAmount = (operations) => {
            return operations.sort((a, b) => b.amount - a.amount)  
        }

        const smallestAmount = (operations) => {
            return operations.sort((a, b) => a.amount - b.amount)
        }

        const alphabeticAZ = (operations) => {
            return operations.sort((a, b) => a.description.localeCompare(b.description))
        }

        const alphabeticZA = (operations) => {
            return operations.sort((a, b) => b.description.localeCompare(a.description))
        }
        
        const byDate = (operations, fromDate) => {
            return operations.filter((operation) => new Date(operation.date) >= new Date(fromDate));
        }

        const lessRecentDate = (operations) => {
            return operations.sort((a, b) => new Date(a.date) - new Date(b.date))
        }

        const recentDate = (operations) => {
            return operations.sort((a, b) => new Date(b.date) - new Date(a.date))
        }

    // VALIDAION FUNCTION
        const validateFormOperation = (field) => {
            const nameOperation = $("#descripcion-nueva-operacion").value.trim()
            const amountOperation = $("#monto-nueva-operacion").valueAsNumber
            const validationPassed = nameOperation!== "" && amountOperation 
            switch (field){
                case "nameOperation":
                    if (nameOperation=== ""){
                    $("#descripcion-nueva-operacion").classList.add("border-red-500", "border", "border-2")
                    } else {
                    $("#descripcion-nueva-operacion").classList.remove("border-red-500")
                    }
                    break
                case "amountOperation":
                    if (!amountOperation){
                    $("#monto-nueva-operacion").classList.add("border-red-500", "border", "border-2")
                    } else {
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
    // UPDATE DATE FUNCTION
        const updateDate = () => {
            const date = new Date()
            $("#date-nueva-operacion").value = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString().padStart(2,0)+"-"+date.getDate().toString().padStart(2,0)
            $("#desde-select").value = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString().padStart(2,0)+"-"+date.getDate().toString().padStart(2,0)
        }

    // RENDER REPORTS FUNCTION
            const categoryHighestEarnings = (operations, categories) => {
                const earningsCategory = {}
                const expensesCategory = {}
                const balancedCategory = {}
                const monthEarningCategory = {}
                const monthExpensesCategory = {}

                //highest earnes 
                for (const operation of operations) {
                    if (operation.type === 'ganancia') {
                        if (earningsCategory[operation.category]) {
                            earningsCategory[operation.category] += operation.amount
                        } 
                        else {
                            earningsCategory[operation.category] = operation.amount
                        }
                    }
                }
                let highestEarnings = 0
                let highestEarningCategory=null
                for (const category in earningsCategory) {
                    if (earningsCategory[category] > highestEarnings) {
                        highestEarnings = earningsCategory[category];
                        highestEarningCategory = category
                    } 
                }

                //highest expenses
                for (const operation of operations) {
                    if (operation.type === 'gasto') {
                        if (expensesCategory[operation.category]) {
                            expensesCategory[operation.category] += operation.amount
                        } else {
                            expensesCategory[operation.category] = operation.amount
                        }
                    }
                }
                let highestExpenses = 0
                let highestExpensesCategory = null
                for(const category in expensesCategory) {
                    if (expensesCategory[category] > highestExpenses) {
                        highestExpenses = expensesCategory[category];
                        highestExpensesCategory = category
                    }
                }

                //balanced
                for (const operation of operations) {
                    if (balancedCategory[operation.category]) {
                        if (operation.type === 'ganancia') {
                            balancedCategory[operation.category] += operation.amount
                        } else {
                            balancedCategory[operation.category] -= operation.amount
                        }
                    } else {
                        balancedCategory[operation.category] = (operation.type === 'ganancia') ? operation.amount : -operation.amount
                    }
                }
                let highestBalance = 0
                let highestBalancedCategory = null
                for (const category in balancedCategory) {
                    if (balancedCategory[category] > highestBalance) {
                        highestBalance = balancedCategory[category]
                        highestBalancedCategory = category
                    }
                }

                //month highest earnes 
                const earningsByMonth  = {};
                for (const operation of operations) {
                    const monthYear = operation.date.substring(0, 7)
                    if (operation.type === 'ganancia') {
                        if (earningsByMonth[monthYear]) {
                            earningsByMonth[monthYear] += operation.amount
                        } else {
                            earningsByMonth[monthYear] = operation.amount
                        }
                    }
                }
                let highestEarningMonth = null;
                let highestEarning2 = 0;
                for (const month in earningsByMonth) {
                    if (earningsByMonth[month] > highestEarning2) {
                        highestEarning2 += earningsByMonth[month]
                        highestEarningMonth = month
                    }
                }

                //month highest expenses 
                const expensesByMonth  = {};
                for (const operation of operations) {
                    const monthYear = operation.date.substring(0, 7)
                    if (operation.type === 'gasto') {
                        if (expensesByMonth[monthYear]) {
                            expensesByMonth[monthYear] += operation.amount
                        } else {
                            expensesByMonth[monthYear] = operation.amount
                        }
                    }
                }
                let highestExpensesMonth = null;
                let highestExpenses2 = 0;
                for (const month in expensesByMonth) {
                    if (expensesByMonth[month] > highestExpenses2) {
                        highestExpenses2 += expensesByMonth[month]
                        highestExpensesMonth = month
                    }
                }

                //by category 
                for (const category of categories){
                    let categoryEarnings = 0
                    let categoryExpenses = 0
                    let categoryBalance = 0
                    // console.log(category.name)
                    const name = category.name;
                    console.log(name)
                    const variabledefiltro = Object.values(operations).includes(name)
                    console.log(variabledefiltro)
                    for(const operation of operations){
                        if (operation.category.includes(name)){
                            console.log("entre al if")
                            const filterOperation = operations.filter(operation => operation.category === name)
                            console.log(filterOperation)
                            
                            for(const filter of filterOperation){
                                if(filter.type==="ganancia"){
                                    categoryEarnings+=filter.amount
                                }else{
                                    categoryExpenses+=filter.amount
                                }
                            }
                            break
                        }
                    }
                    categoryBalance=categoryEarnings-categoryExpenses

                    console.log(name,categoryBalance)

                    $(".byCategoryTable").innerHTML += 
                    `
                    <tr class="w-full justify-between">
                        <td>${category.name}</td>
                        <td>${categoryEarnings}</td>
                        <td>${categoryExpenses}</td>
                        <td>${categoryBalance}?</td>
                    </tr>
                    `
                }
                for (const operation of operations){
                    let operationEarnings = 0
                    let operationExpenses = 0
                    let operationBalance = 0
                    // console.log(category.name)
                    const date = operation.date.substring(0, 7)
                    console.log(date)
                    const variabledefiltro = Object.values(operations).includes(date)
                    console.log(variabledefiltro)
                    if (operation.category.includes(operation.date.substring(0, 7))){
                        console.log("entre al if")
                        let expresion = new RegExp(`${date}.*`, "i");
                        let filteredOperation = operations.filter(oper => expresion.test(operation.date))
                        
                        console.log(filteredOperation)
                        for(const filter of filteredOperation){
                            if(filter.type==="ganancia"){
                                operationEarnings+=filter.amount
                            }else{
                                operationExpenses+=filter.amount
                            }
                        }
                        break
                    }
                    operationBalance=operationEarnings-operationExpenses

                    console.log(date,operationBalance)
                }





                    



                clearTable("#reportesTable")
                $("#reportesTable").innerHTML = `

                        <h2 class="text-xl font-bold mt-2">Resumen</h2>
                        <table class="w-full mt-2">
                            <tr>
                                <td>Categoría con mayor ganancia</td>
                                <div>
                                    <td>${highestEarningCategory}</td>
                                    <td class="text-green-600">+$${highestEarnings}</td>
                                </div>
                            </tr> 
                            <tr>
                                 <td>Categoría con mayor gasto</td>
                                 <div>
                                     <td>${highestExpensesCategory}</td>
                                     <td class="text-red-600">-$${highestExpenses}</td>
                                 </div>
                            </tr>
                            <tr>
                                <td>Categoría con mayor balance </td>
                                <div>
                                    <td>${highestBalancedCategory}</td>
                                    <td>$${highestBalance}</td>
                                </div>
                            </tr>
                            <tr>
                                <td>Mes con mayor ganancia </td>
                                <div>
                                    <td>${highestEarningMonth}</td>
                                    <td class="text-green-600">$${highestEarnings}</td>
                                </div>
                            </tr>
                            <tr>
                                <td>Mes con mayor gasto</td>
                                <div>
                                    <td>${highestExpensesMonth}</td>
                                    <td class="text-red-600">$${highestExpenses2}</td>
                                </div>
                            </tr>
                        </table>
                    </div>
                    <div>
                       

                          `
            //         <div class="pb-30">
            //             <h2 class="text-xl font-bold mt-6">Totales por mes</h2>
            //             <table class="w-full mt-6">
            //                 <thead>
            //                     <tr>
            //                         <th>Mes</th>
            //                         <th>Ganancias</th>
            //                         <th>Gastos</th>
            //                         <th>Balance</th>
            //                     </tr>
            //                 </thead>
            //                 <tbody>
            //                     <tr class="w-full justify-between">
            //                         <td>fecha?</td>
            //                         <td>monto?</td>
            //                         <td>monto?</td>
            //                         <td>monto?</td>
            //                     </tr>
            //                 </tbody>
            //             </table>
            //         </div>
            //     </div>  
            //`
            }
    

// EVENTS
const initializeApp = () => {
        setData("operations", allOperations)
        renderOperations(allOperations)
        addCategory(allCategories)
        renderOperationsCategories(allCategories)
        renderBalance(allOperations)
        updateDate()

    // TAB CHANGE EVENT
        $("#pestaña-categorias").addEventListener ("click", tabChangeCategories)
        $("#pestaña-reportes").addEventListener ("click", tabChangeReports)
        $("#pestaña-balance").addEventListener ("click", tabChangeBalance)
        $("#nuevaOperacionButton").addEventListener ("click", tabChangeNuevaOperacion)
        $("#categoryCancelar").addEventListener ("click", (e) => {
            tabChangeCancelarEdicionDeCategoria()
            e.preventDefault()})
        $("#nuevaOperacionCancel").addEventListener ("click", tabChangeNuevaOperacionCancel)    

    //SHOW/HIDE FILTERS
        $(".ocultar-filtros-button").addEventListener ("click", hideFilters)
        $(".mostrar-filtros-button").addEventListener ("click", showFilters)
    
    //AGREGAR CATEGORIA EVENT
        $("#nameCategoryButton").addEventListener ("click", (e) => {
            e.preventDefault()
            const currentData = getData("categories")
            const functionSaveCategory = saveNewCategory()
            if(functionSaveCategory.name===""){
                $("#nameCategory").classList.add("border-red-500", "border", "border-2")
            }else{
                $("#nameCategory").classList.add("border-red-500", "border", "border-2")
                currentData.push(saveNewCategory())
                addCategory(currentData)
            }
            $(".nuevaCategoriaForm").reset()
        })

    //EDIT CATEGORY EVENT
        $("#categoryEdition").addEventListener ("click", (e) => {
            e.preventDefault()
            const categoriesId = $("#categoryEdition").getAttribute("data-id-categories")
            const currentData = getData("categories").map(category => {
                if (category.id === categoriesId){
                return saveEditedCategory(categoriesId)
                }
                return category
            })
            addCategory(currentData)
            tabChangeCancelarEdicionDeCategoria()
        }) 

    //ADD OPERATION EVENT
        $("#nuevaOperationButton").addEventListener ("click", (e) => {
            const currentData = getData("operations")
            currentData.push(saveNewOperation())
            setData("operations", currentData)
            renderBalance(currentData)
        })

    //EDIT OPERATION EVENT
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
        
    //FILTERS EVENT
        $("#categoria-select").addEventListener("input", (e) => {
            const filterSelected = e.target.value
            const currentData = getData("operations")
            if(filterSelected==="Todas"){
                setData("operations", currentData)
                renderOperations(currentData)
            }else{
                const filterOperation = currentData.filter(operation => operation.category === filterSelected)
                renderOperations(filterOperation)
            }
        })

        $("#tipo-select").addEventListener("input", (e) => {
            const filterSelected = e.target.value
            const currentData = getData("operations")
            if(filterSelected==="todos"){
                setData("operations", currentData)
                renderOperations(currentData)
            }else{
                const currentData = getData("operations")
                const filterOperation = currentData.filter(operation => operation.type === filterSelected)
                renderOperations(filterOperation)
            }
        })

        $("#ordenar-por-select").addEventListener("input", (e) => {
            const filterSelected = e.target.value
            const currentData = getData("operations")
            if(filterSelected==="Menos reciente"){
                renderOperations(lessRecentDate(currentData))
            }else if(filterSelected==="Más reciente"){
                renderOperations(recentDate(currentData))
            }else if (filterSelected==="Mayor monto"){
                renderOperations(biggestAmount(currentData))
            }else if(filterSelected==="Menor monto"){
                renderOperations(smallestAmount(currentData))
            }else if(filterSelected==="A/Z"){
                renderOperations(alphabeticAZ(currentData))
            }else if(filterSelected==="Z/A"){
                renderOperations(alphabeticZA(currentData))
            }else if(filterSelected==="Z/A"){
                renderOperations(alphabeticZA(currentData))
            }
        })

        $("#desde-select").addEventListener("input", (e) => {
            const filterSelected = e.target.value
            const currentData = getData("operations")
            renderOperations(byDate(currentData,filterSelected))
        })

    // VALITADION EVENT    
        $("#descripcion-nueva-operacion").addEventListener("blur", () => validateFormOperation("nameOperation"))
        $("#monto-nueva-operacion").addEventListener("blur", () => validateFormOperation("amountOperation"))    

}
window.addEventListener("load", initializeApp)