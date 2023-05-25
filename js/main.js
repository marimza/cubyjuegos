class Producto {
    constructor(nombre, marca, precio, img, id, categoria) {
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.img = img;
        this.id = id;
        this.categoria = categoria;

    }
}

//creo los objetos:
const piraminx = new Producto("Piraminx", "Qiyi", 3500, "img/piraminx.png", "piraminx", "cubos");
const megaminx = new Producto("Megaminx", "QiYi", 7000, "img/megaminx.png", "megaminx", "cubos");
const ivycube = new Producto("Ivycube", "QiYi", 5500, "img/ivycube.png", "ivycube", "cubos");
const mirror = new Producto("Mirror", "Moyu", 3500, "img/mirror.png", "mirror", "cubos", );
const tresxtres = new Producto("3x3", "Gan", 7000, "img/tresxtres.png", "tresxtres", "cubos");
const dosxdos = new Producto("2x2", "QiYi", 5500, "img/dosxdos.png", "dosxdos", "cubos");
const mastermorphix = new Producto("Mastermorphix", "Qiyi", 3500, "img/mastermorphix.jpeg", "mastermorphix", "cubos");
const manzana = new Producto("Manzana 3x3", "YJ", 7000, "img/manzana.jpg", "manzana", "cubos");
const carbono = new Producto("4x4 fibra de carbono", "Z-cube", 5500, "img/carbono.jpeg", "carbono", "cubos");
const aceite = new Producto("Aceite", "Gan", 1500, "img/aceite.jpeg", "aceite", "accesorios");
const base = new Producto("Base para cubo", "Qiyi", 800, "img/basecubo.jpeg", "base", "accesorios");
const llavero = new Producto("Llavero piraminx", "Qiyi", 2500, "img/llavero.jpeg", "llaverouno", "accesorios");
const llaverodos = new Producto("Llavero cubo 3x3", "Qiyi", 2500, "img/llavero-dos.jpeg", "llaverodos", "accesorios");
const taza = new Producto("Taza", "Qiyi", 3500, "img/taza.jpeg", "taza", "accesorios");



//creo un array con los productos
let arrayProductos = [piraminx, megaminx, ivycube, mirror, tresxtres, dosxdos, mastermorphix, manzana, carbono, aceite, base, llavero, llaverodos, taza];

// let arrayProductos = [];      NO ME FUNCIONA EL JSOON!! NO SE POR QUEEEE

// fetch("./js/productos.json")
//     .then(respuesta => respuesta.json())
//     .then(data => {
//         arrayProductos = data;
//         cargarProductos(arrayProductos);
//     })





//Acá voy a ir poniendo todas las cosas que voy a llamar del DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.getElementById("titulo-principal");
let botonesAgregar = document.querySelectorAll(".agregar-producto");
const numerito = document.getElementById("numerito");




function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
    <img class="producto-imagen" src="${producto.img}" alt="${producto.nombre}">
    <div class="detalles-productos">
        <h3 class="producto-titulo">${producto.nombre}</h3>
        <p class="precio-producto">${producto.precio}</p>
        <button class="agregar-producto" id="${producto.id}">Agregar</button>
    </div>`;

        contenedorProductos.appendChild(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(arrayProductos);


//cuando hagamos click en un boton categoria:

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = arrayProductos.find(producto => producto.categoria === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria;

            const productosBoton = arrayProductos.filter(producto => producto.categoria === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(arrayProductos)
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".agregar-producto");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosCarrito;

const productosCarritoLS = JSON.parse(localStorage.getItem("productos-carrito"));

//Ahora quiero que, si no hay nada en el localStorage, el carrito empiece vacío y que tambien se actualice el numerito del carrito:
if (productosCarritoLS) {
    productosCarrito = productosCarritoLS
    actualizarNumerito();
} else {
    productosCarrito = [];

};



function agregarAlCarrito(e) {
    Toastify({
        text: "Agregaste un producto al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: false,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, rgb(17, 17, 17), #96c93d)",
        },
        onClick: function () {} 
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = arrayProductos.find(producto => producto.id === idBoton);

    if (productosCarrito.some(producto => producto.id === idBoton)) {
        const index = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado)
    }

    actualizarNumerito();

    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));

}

function actualizarNumerito() {
    let nuevoNumerito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}