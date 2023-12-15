const $ =  (selector) => document.querySelector(selector);

//FUNCIONES

// CAMBIO DE PESTAÑA
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


// EVENTOS
const initializeProject = () => {
    // CAMBIO DE PESTAÑA
    $("#pestaña-categorias").addEventListener ("click", tabChangeCategories)
    $("#pestaña-reportes").addEventListener ("click", tabChangeReports)
    $("#editar").addEventListener ("click", tabChangeEditarCategorias)
    $("#pestaña-balance").addEventListener ("click", tabChangeEditarBalance)
    $("#nuevaOperacionButton").addEventListener ("click", tabChangeNuevaOperacion)
    $("#cancelar").addEventListener ("click", tabChangeCancelarEdicionDeCategoria)

}
window.addEventListener("load", initializeProject)