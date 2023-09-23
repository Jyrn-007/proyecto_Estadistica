const ButtonDatos = document.querySelector(".submitDatos")
const datosUser = document.querySelector("#DatosUser")
const buttonsubmit = document.querySelector(".buttonSubmit")
const numerosTotal = document.querySelector("#n")
const numeromax = document.querySelector("#xmax")
const numerominimo = document.querySelector("#xmin")
const rango = document.querySelector("#rango")
ButtonDatos.addEventListener("submit", operar)


function operar (){

    event.preventDefault()
    buttonsubmit.disabled = true
    let datos1 = datosUser.value    
    let muestra = datos1.split(",").map(function(cadena) {
        return parseInt(cadena, 10);
    });
//Operar
let arrOrdenado = muestra.sort()
let n = arrOrdenado.length
numerosTotal.textContent = n
let Xmin = arrOrdenado[0]
numerominimo.textContent=Xmin
let Xmax = arrOrdenado[arrOrdenado.length -1]
numeromax.textContent = Xmax
let Rango = Xmax -Xmin
rango.textContent=Rango
let intervalo = Math.round(1 + 3.322*Math.log10(arrOrdenado.length))
let RangoMedio = (Xmax + Xmin)/2
let amplitudIntervalo = Rango/intervalo
let cont = Xmin
let Clases = []
let frecuencia =[]
let frecuenciaAcumulada = []
let frecuenciaRelativa =[]
let frecuenciaSuavizada = []
while (cont <= Xmax){
    Clases.push(cont)
    let cont1 = cont + (intervalo -1)
    let diferencia = Xmax - cont1
    
    if(diferencia  < intervalo - 1){
        cont1 = cont1 + diferencia
    }
  
    Clases.push(cont1)
    
     // Filtrar los datos que caen dentro del intervalo actual
    const datosEnIntervalo = arrOrdenado.filter((x) => x >= cont && x <= cont1)
    frecuenciaAcumulada.push(arrOrdenado.filter((x) => x == cont || x <= cont1).length)
    // Calcular la frecuencia en el intervalo actual
    const frecuenciaEnIntervalo = datosEnIntervalo.length
    frecuencia.push(frecuenciaEnIntervalo)
    const frecuenciaRealivaIntervalo = (frecuenciaEnIntervalo/n)*100
    frecuenciaRelativa.push(Math.round(frecuenciaRealivaIntervalo * 100) / 100)
 
    cont = cont1 +1
    
}

const datosSuavizadosIntervalo = frecuencia.map((x, i)=>{
    if (i == 0){
        return ((x*2)+frecuencia[i + 1])/4
    }else if(i == frecuencia.length - 1){
       return (frecuencia[i - 1]+ (x*2))/4
    }else{
       return (frecuencia[i -1]+(x*2)+frecuencia[i +1])/4
    }
})
frecuenciaSuavizada = datosSuavizadosIntervalo
 let total = frecuenciaRelativa.reduce((x, y)=> x+y)
 let li = Clases.filter((x, i) => i%2 == 0).map(x => x - 0.5)
 let ls = Clases.filter((x, i) => i%2 != 0).map(x=> x + 0.5)

let ii = Clases.filter((x, i) => i%2 == 0)
let is = Clases.filter((x, i) => i%2 != 0)



const Tablaformada= {
    "ii": ii,
    "is": is,
    "frecuencia": frecuencia,
    "frecuenciaAc": frecuenciaAcumulada,
    "frecuenciaRe": frecuenciaRelativa,
    "frecuenciaSu": frecuenciaSuavizada,
    "LimiteInf": li,
    "LimiteSup": ls
} 
console.log(Tablaformada)
    // Crea una tabla
var tabla = document.createElement("table")

var filaEncabezado = tabla.insertRow();

// Crea celdas de encabezado y establece el texto
var encabezados = ["Clases", "f", "fa", "fr", "fs", "Li", "Ls"];
for (var i = 0; i < encabezados.length; i++) {
    var encabezadoCelda = filaEncabezado.insertCell(i);
    encabezadoCelda.textContent = encabezados[i];
}
// Itera sobre los datos en Tablaformada y crea las filas de datos
for (var i = 0; i < Tablaformada.ii.length; i++) {
    var filaDatos = tabla.insertRow();
    var datos = [
        Tablaformada.ii[i] + " - " + Tablaformada.is[i],
        Tablaformada.frecuencia[i],
        Tablaformada.frecuenciaAc[i],
        Tablaformada.frecuenciaRe[i] + "%",
        Tablaformada.frecuenciaSu[i],
        Tablaformada.LimiteInf[i],
        Tablaformada.LimiteSup[i]
    ];

    // Crea celdas de datos y establece el texto
    for (var j = 0; j < datos.length; j++) {
        var datosCelda = filaDatos.insertCell(j);
        datosCelda.textContent = datos[j];
    }
}

var contenedorTabla = document.getElementById("tabla-container")

// Agrega la tabla al contenedor
contenedorTabla.appendChild(tabla)
var boton = document.createElement("button");

// Establece el texto del botón
boton.textContent = "Nuevos datos";

// Agrega un ID al botón (opcional)
boton.id = "miBoton";
boton.addEventListener("click", function() {
    // Recarga la página
    location.reload();
});
contenedorTabla.appendChild(boton)

}



   

