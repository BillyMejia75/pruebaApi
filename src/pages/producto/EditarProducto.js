import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FormularioProductos from "./FormularioProductos";

///     Esta es Pagina     //////

let url = "http://localhost:5171/api/Producto/Obtener/";
let urlEditar = "http://localhost:5171/api/Producto/Editar";
let urlEliminar = "http://localhost:5171/api/Producto/Eliminar/";

export function EditarProducto() {
  let { id } = useParams();
  const [state, setState] = useState();

  const getElements = async (url) => {
    let res = await fetch(url);
    return await res.json();
  };

  function getProducto() {
    let res = getElements(url + id);
    res.then((element) => {
      setState(element.response);
    });
  }

  //Crear onSubmit de Editar

  function onSubmit(state) {
    fetch(urlEliminar + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idProducto: id
      }),
    });
    console.log("ID", id);
  }

  useEffect(() => {
    getProducto();
  }, []);
  return (
    <>
      <h2>Editar un producto</h2>
      <FormularioProductos data={state} mensaje={"Actualizar"} onSubmit={onSubmit}/>
    </>
  );
}