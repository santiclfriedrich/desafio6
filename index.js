const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080

class Contenedor {
    constructor(archivo) {
      this.archivo = archivo;
    }

    async getAll() {
        try {
          return JSON.parse(
            await fs.promises.readFile(`./${this.archivo}`, "utf-8")
          );
        } catch (error) {
          console.log("Error no se encontraron los archivos", error);
        }
      }


}



app.listen(port, () => {
    try {
    console.log(`Servidor iniciado en puerto ${port}`)
    }catch(err) {
        console.log('Error no se pudo iniciar el servidor',err)
    }
})


app.get('/', (req, res) => {
    res.send(

       ` <h1 style="color: blue" >Bievenido al server</h1> `

    )
} )

app.get('/productos', async (req, res) => {
    
    let productos = await new Contenedor('productos.txt').getAll()
    
    res.send( `<h1>Productos</h1> <ul  style="list-style: none" > ${productos.map(prod => {
        let card = `<li><img src='${prod.thumbnail}' />${prod.title}, <br> Precio:$ ${prod.price}</li>`
       
       
        return card
    })}</ul>` )
} )

app.get('/productoAzar', async (req, res) => {
    
    let productos = await new Contenedor('productos.txt').getAll()
    let random = Math.floor( Math.random() * productos.length);
    
    res.send(

        `<img src='${productos[random].thumbnail}'/><br>${productos[random].title}, <br> Precio:$ ${productos[random].price}`

    )
} )