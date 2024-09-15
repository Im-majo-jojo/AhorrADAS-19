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
    },
    {
        id: randomID(),
        name: "trabajo"
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
        const hideTabLg = (selectors) => {
            for (const selector of selectors){
                $(selector).classList.add("lg:hidden")
            }
        }
        const showTabLg = (selectors) => {
            for (const selector of selectors){
                $(selector).classList.remove("lg:hidden")
            }
        } 
        const tabChangeCategories = () =>{
            hideTab([".balance-view",".edit-category-view",".reports-view",".new-operation-view"])
            showTab([".categories-view"])
            hideTabLg([".balance-view",".edit-category-view",".reports-view",".new-operation-view"])
            showTabLg([".categories-view"])
            $(".newCategoryForm").reset()
        }
        const tabChangeReports = () =>{
            hideTab([".categories-view",".new-operation-view",".balance-view",".edit-category-view"])
            showTab([".reports-view"])
            hideTabLg([".categories-view",".new-operation-view",".balance-view",".edit-category-view"])
            showTabLg([".reports-view"])
            categoryHighestEarnings()
            renderByCategory()
            renderByMonth()
        }
        const tabChangeNewOperation = () =>{
            $(".newOperationForm").reset()
            hideTab([".categories-view",".balance-view",".edit-category-view",".reports-view",
            ".editOperationButton",".titleEditOperation"])
            showTab([".new-operation-view",".titleNewOperation",".addNewOperationButton"])
            hideTabLg([".categories-view",".balance-view",".edit-category-view",".reports-view",
            ".editOperationButton",".titleEditOperation"])
            showTabLg([".new-operation-view",".titleNewOperation",".addNewOperationButton"])
            updateDate()
        }
        const tabChangeNewOperationCancel = () =>{
            hideTab([".categories-view",".new-operation-view",".edit-category-view",".reports-view"])
            showTab([".balance-view"])
            hideTabLg([".categories-view",".new-operation-view",".edit-category-view",".reports-view"])
            showTabLg([".balance-view"])
        }
        const tabChangeBalance = () =>{
            hideTab([".categories-view",".new-operation-view",".edit-category-view",".reports-view"])
            showTab([".balance-view"])
            hideTabLg([".categories-view",".new-operation-view",".edit-category-view",".reports-view"])
            showTabLg([".balance-view"])
            location.reload()
        }
        const tabChangeCancelEditionOfCategory = () =>{
            hideTab([".balance-view",".edit-category-view",".reports-view",".new-operation-view"])
            showTab([".categories-view"])
            hideTabLg([".balance-view",".edit-category-view",".reports-view",".new-operation-view"])
            showTabLg([".categories-view"])
        }
    // SHOW/HIDE FILTERS FUNCTION
        const hideFilters = () => {
            hideTab([".formulary-visibility",".hide-filters-button",".show-filters-button"])
            showTab([".show-filters-button"])
            $(".formulary-visibility").classList.remove("block")
            $(".hide-filters-button").classList.remove("block")
            $(".show-filters-button").classList.add("block")
            $(".filters-box").classList.remove("row-span-2")
            $(".filters-box").classList.add("row-span-1")
        }

        const showFilters = () => {
            $(".formulary-visibility").classList.add("block")
            $(".formulary-visibility").classList.remove("hidden")
            $(".hide-filters-button").classList.remove("hidden")
            $(".hide-filters-button").classList.add("block")
            $(".show-filters-button").classList.remove("block")
            $(".show-filters-button").classList.add("hidden")
            $(".filters-box").classList.add("row-span-2")
            $(".filters-box").classList.remove("row-span-1")
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
                        <button class="bg-slate-500 text-neutral-50 rounded-md px-2 mx-1" id="category-modal-remove" onclick="my_modal_5.showModal(),buttonDeleteCategory('${category.name}')">remove</button>                       
                        <button class="bg-slate-400 rounded-md px-2 text-neutral-50 mx-1" id="editCategoryTab" onclick="tabChangeEditCategories('${category.id}')">Editar</button>
                    </td>
                </tr>`
            }
        }
    // EDIT CATEGORIES FUNCTION
        const tabChangeEditCategories = (categoryId) =>{
            hideTab([".categories-view",".new-operation-view",".balance-view",".reports-view"])
            showTab([".edit-category-view"])
            hideTabLg([".categories-view",".new-operation-view",".balance-view",".reports-view"])
            showTabLg([".edit-category-view"])
            $("#categoryEdition").setAttribute("data-id-categories", categoryId)
            const categorySelect = getData("categories").find(categories => categories.id === categoryId)
            $("#editCategoryTittle").value = categorySelect.name
        }
    // MODAL/DELETE CATEGORIES FUNCTION
        const buttonDeleteCategory = (categoryId) => {
            $(".modal-remove").setAttribute("data-id-modal", categoryId)
            $(".modal-remove").addEventListener("click", (e) => {
                const categoriesId = $(".modal-remove").getAttribute("data-id-modal")
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
                $("#category-new-operation").innerHTML += 
                `<option value="${category.name}">${category.name}</option>`
                $("#category-select").innerHTML += 
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
                <tr class="text-green-600">
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
                description: $("#description-new-operation").value,
                type: $("#type-new-operation").value,
                category: $("#category-new-operation").value,
                date: $("#date-new-operation").value,
                amount: $("#amount-new-operation").valueAsNumber
            }
        }   
        const renderOperations = (operations) => {
            clearTable("#operationTable")
            if(operations.length){
                hideTab([".noOperations"])
                showTab([".tableOperation"])
                for (const operation of operations){                  
                    $("#operationTable").innerHTML += 
                    `<tr class="text-xs">
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
                                <button class="bg-slate-500 text-neutral-50 rounded-md px-2 mx-1" onclick="tabChangeEditOperation('${operation.id}')">Editar</button>
                                <button class="bg-slate-400 rounded-md px-2 text-neutral-50 mx-1" onclick="my_modal_5.showModal(),buttonOperationRemove('${operation.id}')">remove</button>
                            </td>
                        </div>
                    </tr>`
                }
            } else{
                hideTab([".tableOperation"])
                showTab([".noOperations"])
            }
        }
    // EDIT OPERATION FUNCTION
        const tabChangeEditOperation = (operationsId) =>{
            hideTab([".categories-view",".edit-category-view",".reports-view",".balance-view",
            ".titleNewOperation",".addNewOperationButton"])
            showTab([".new-operation-view",".editOperationButton",".titleEditOperation"])

            $("#editOperationButton").setAttribute("data-id-operations", operationsId)
            const operationSelect = getData("operations").find(operations => operations.id === operationsId)
            $("#description-new-operation").value = operationSelect.description
            $("#category-new-operation").value = operationSelect.category
            $("#type-new-operation").value = operationSelect.type
            $("#date-new-operation").value = operationSelect.date
            $("#amount-new-operation").value = operationSelect.amount
        }
    // MODAL/DELETE OPERATION FUNCTION
        const buttonOperationRemove = (operationId) => {
            $(".modal-remove").setAttribute("data-id-modal", operationId)
            $(".modal-remove").addEventListener("click", () => {
                const operationsId = $(".modal-remove").getAttribute("data-id-modal")
                modalDeleteOperation(operationsId)
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
            const nameOperation = $("#description-new-operation").value.trim()
            const amountOperation = $("#amount-new-operation").valueAsNumber
            const validationPassed = nameOperation!== "" && amountOperation 
            switch (field){
                case "nameOperation":
                    if (nameOperation=== ""){
                    $("#description-new-operation").classList.add("border-red-500", "border", "border-2")
                    } else {
                    $("#description-new-operation").classList.remove("border-red-500")
                    }
                    break
                case "amountOperation":
                    if (!amountOperation){
                    $("#amount-new-operation").classList.add("border-red-500", "border", "border-2")
                    } else {
                    $("#amount-new-operation").classList.remove("border-red-500", "border", "border-2")
                    }
                    break 
            }
            if(validationPassed){
                $("#addNewOperationButton").removeAttribute("disabled")
            } else {
                $("#addNewOperationButton").setAttribute("disabled", true)
            }
        }
    // UPDATE DATE FUNCTION
        const updateDate = () => {
            const date = new Date()
            $("#date-new-operation").value = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString().padStart(2,0)+"-"+date.getDate().toString().padStart(2,0)
            $("#from-select").value = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString().padStart(2,0)+"-"+date.getDate().toString().padStart(2,0)
        }
    // RENDER SUMMARY REPORTS FUNCTION
        const categoryHighestEarnings = () => {
            const operations = getData("operations")
            const categories = getData("categories")
            const earningsCategory = {}
            const expensesCategory = {}
            const balancedCategory = {}
            const monthEarningCategory = {}
            const monthExpensesCategory = {}
            // HIGHEST EARNINGS 
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
            // HIGHEST EXPENSES
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
            // BALANCED OPERATION
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
            // MONTH HIGHEST EARNINGS 
            const earningsMonth  = {}
            for (const operation of operations) {
                const monthYear = operation.date.substring(0, 7)
                if (operation.type === 'ganancia') {
                    if (earningsMonth[monthYear]) {
                        earningsMonth[monthYear] += operation.amount
                    } else {
                        earningsMonth[monthYear] = operation.amount
                    }
                }
            }
            let highestEarningMonth = null;
            let highestEarning = 0;
            for (const month in earningsMonth) {
                if (earningsMonth[month] > highestEarning) {
                    highestEarning += earningsMonth[month]
                    highestEarningMonth = month
                }
            }
            // MONTH HIGHEST EXPENSES 
            const expensesMonth  = {};
            for (const operation of operations) {
                const monthYear = operation.date.substring(0, 7)
                if (operation.type === 'gasto') {
                    if (expensesMonth[monthYear]) {
                        expensesMonth[monthYear] += operation.amount
                    } else {
                        expensesMonth[monthYear] = operation.amount
                    }
                }
            }
            let highestExpensesMonth = null;
            let highestExpenses2 = 0;
            for (const month in expensesMonth) {
                if (expensesMonth[month] > highestExpenses2) {
                    highestExpenses2 = expensesMonth[month]
                    highestExpensesMonth = month
                }
            }
            // RENDER SUMMARY
            $("#summary").innerHTML = 
                `
                <table class="w-full mt-2 text-xs">
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
                        <td class="flex space-x-4 ">Mes con mayor ganancia</td>
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
            <div>`
        }
    // RENDER BY CATEGORY
        const byCategorySummary = (category) => {
        const currentDataOperations = getData("operations")
        const valuesLocation = {
            earnings: 0,
            expenses: 0
        } 
        const filterOperation = currentDataOperations.filter(operation => operation.category === category)
        for (const operation of filterOperation) {
            if (operation.type === "ganancia") {
                valuesLocation.earnings += operation.amount
            } else {
                valuesLocation.expenses -= operation.amount 
            } 
        }
        return valuesLocation
        }
        const renderByCategory = () => {
            clearTable("#totalsByCategory")
            const currentDataCategories = getData("categories")
            for (const category of currentDataCategories) {
                const summary = byCategorySummary(category.name)
                const balance= summary.earnings - summary.expenses 
             if(balance!="0"){
                $("#totalsByCategory").innerHTML += 
                ` 
                <tr class="">              
                <td class="justify-center">${category.name}</th>
                <td class="justify-center text-green-600">+$${summary.earnings}</th>
                <td class="justify-center text-red-600">${summary.expenses}</th>
                <td class="justify-center ">${balance}</th>
                </tr>
                `
             }
            }
        }
    // RENDER BY MONTH
        const byCategoryMonth = (operations) => {
            const currentDataOperations = getData("operations")
            const valuesLocation = {
                earnings: 0,
                expenses: 0
            }  
            for (const operation of operations){
                
                if (operation.type==="ganancia") {
                    valuesLocation.earnings += operation.amount  
                } else {
                    valuesLocation.expenses += operation.amount
                }         
            }
            return valuesLocation
        }
        const renderByMonth = () => {
            const currentData = getData("operations")
            const months = {}

            for (const operation of currentData) {
                const monthYear = operation.date.substring(0, 7);
                if (!months[monthYear]) {
                    months[monthYear] = [];
                }
                months[monthYear].push(operation);
            }
            for (const [month, operations] of Object.entries(months)) {
                const byMonth = byCategoryMonth(operations);
                const balance= byMonth.earnings - byMonth.expenses 
                clearTable("#totalsByMonth")  
                if(balance!="0"){
                    $("#totalsByMonth").innerHTML += 
                    ` 
                    <tr class="">              
                    <td class="justify-center">${month}</th>
                    <td class="justify-center text-green-600">+$${byMonth.earnings}</th>
                    <td class="justify-center text-red-600">${byMonth.expenses}</th>
                    <td class="justify-center ">${balance}</th>
                    </tr>
                    `
                }
            }
        }
    //BURGUER MENU
        const clickBurguerButton = () => {
            $("#listContainerBurgerMenu").classList.toggle("hidden")
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
        $("#tab-categories").addEventListener ("click", () => {
            tabChangeCategories()}
         )
        $("#tab-reports").addEventListener ("click",() => {
         tabChangeReports()})
        $("#tab-balance").addEventListener ("click", tabChangeBalance)
        $("#tab-categories-dropDowMenu").addEventListener ("click", tabChangeCategories)
        $("#tab-reports-dropDowMenu").addEventListener ("click", tabChangeReports)
        $("#tab-balance-dropDowMenu").addEventListener ("click", tabChangeBalance)
        $("#newOperationButton").addEventListener ("click", tabChangeNewOperation)
        $("#categoryCancel").addEventListener ("click", (e) => {
            tabChangeCancelEditionOfCategory()
            e.preventDefault()})
        $("#newOperationCancel").addEventListener ("click", tabChangeNewOperationCancel)
        $("#dropDowHeaderMenu").addEventListener ("click", clickBurguerButton)    
    //SHOW/HIDE FILTERS
        $(".hide-filters-button").addEventListener ("click", hideFilters)
        $(".show-filters-button").addEventListener ("click", showFilters)
    //ADD CATEGORY EVENT
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
            $(".newCategoryForm").reset()
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
            tabChangeCancelEditionOfCategory()
        }) 
    //ADD OPERATION EVENT
        $("#addNewOperationButton").addEventListener ("click", (e) => {
            const currentData = getData("operations")
            currentData.push(saveNewOperation())
            setData("operations", currentData)
            renderBalance(currentData)
        })
    //EDIT OPERATION EVENT
        $("#editOperationButton").addEventListener ("click", (e) => {
            const operationsId = $("#editOperationButton").getAttribute("data-id-operations")
            const currentData = getData("operations").map(operations => {
                if ( operations.id === operationsId){
                    return saveNewOperation()
                }
                return operations
            })
            setData("operations", currentData)  
        })   
    //FILTERS EVENT
        $("#category-select").addEventListener("input", (e) => {
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
        $("#type-select").addEventListener("input", (e) => {
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
        $("#order-by-select").addEventListener("input", (e) => {
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
        $("#from-select").addEventListener("input", (e) => {
            const filterSelected = e.target.value
            const currentData = getData("operations")
            renderOperations(byDate(currentData,filterSelected))
        })
    // VALITADION EVENT    
        $("#description-new-operation").addEventListener("blur", () => validateFormOperation("nameOperation"))
        $("#amount-new-operation").addEventListener("blur", () => validateFormOperation("amountOperation"))    
}
window.addEventListener("load", initializeApp)