import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

//Función para leer Todos los libros
const LeerData = () => {
    try{
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    }
    catch (error){
        console.log(error);
        return null;
    }
    
};
//Funcion para escribir libros
const EscribirData = (data) => {
    try{
       fs.writeFileSync("./db.json", JSON.stringify(data));
    }
    catch (error) {
        console.error("Error al ESCRIBIR los datos", error);
        return null;
    }

};
//Obtener datos de db.Json
app.get("/books", (req, res) => {
    const data = LeerData();
    res.json(data.books);
});

//Endpoint para Buscar libros por el id
app.get("/books/:id", (req, res) => {
    const data = LeerData();
    const id = parseInt (req.params.id);
    const Libro = data.books.find((Libro) => Libro.id === id);
    res.json(Libro);
});
 
//Endpoint Agregar un nuevo Libro 
app.post("/books", (req, res) => {
    const data = LeerData();
    const body = req.body;
    const NuevoLibro = {
        id: data.books.length + 1,
        ...body,
    };
    data.books.push(NuevoLibro);
    EscribirData(data);
    res.json(NuevoLibro);
});

//Endpoint para Actualizar Informacion
app.put("/books/:id", (req, res) => {
    const data = LeerData();
    const body = req.body;
    const id = parseInt (req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    }
    EscribirData(data);
    res.json({message: "El libro fue actualizado correctamente"});
});

//Endpoint de para ELiminar
app.delete("/books/:id", (req , res) => {
    const data = LeerData();
    const id = parseInt (req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books.splice(bookIndex, 1);
    EscribirData(data);
    res.json({message: "El libro fue eliminado correctamente"});

});

app.listen(3000, () => {
    console.log('El Servidor esta escuchando en el puerto 3000');
}); 

