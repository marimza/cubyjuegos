const productosCarrito = JSON.parse(localStorage.getItem("productos-carrito"));

const contenedorCarritoVacio = document.getElementById("carrito-vacio");
const contenedorCarritoProductos = document.getElementById("productos-carrito");
const contenedorCarritoAcciones = document.getElementById("acciones-carrito");
const contenedorCarritoComprado = document.getElementById("carrito-comprado");
let botonesEliminar = document.querySelectorAll(".producto-carrito-eliminar");
const botonVaciar = document.getElementById("acciones-carrito-vaciar");
const contenedorTotal = document.getElementById("total");
const botonComprar = document.getElementById("acciones-carrito-comprar");




function cargarProductosCarrito() {
    if (productosCarrito) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        //Ahora, por cada producto voy a crear:
        productosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto-carrito");
            div.innerHTML = `<img class="imagen-producto-carrito"  src="${producto.img}"  alt="${producto.nombre}"> 
            <div class="producto-carrito-titulo">
                <small>Título</small>
                <h3>${producto.nombre}</h3>
            </div>
            <div class="producto-carrito-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="producto-carrito-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="producto-carrito-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="producto-carrito-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>`;
    
            contenedorCarritoProductos.appendChild(div);
    
        })
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    
    actualizarBotonesEliminar();
    actualizarTotal();

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".producto-carrito-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idBoton);

    productosCarrito.splice(index,1);
    cargarProductosCarrito();

    localStorage.setItem("productos-carrito",JSON.stringify (productosCarrito));


}

botonVaciar.addEventListener("click",vaciarCarrito)

function vaciarCarrito(){
    productosCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
    cargarProductosCarrito();
}

function actualizarTotal(){
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`

}

botonComprar.addEventListener("click",comprarCarrito)

function comprarCarrito(){
    productosCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
    
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.remove("disabled");
}


