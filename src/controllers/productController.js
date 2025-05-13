import { addProduct } from "../services/productServices";

export const addProductController = async ({ nombre, descripcion, precio, imagen_url, category_id, marca, activo, visible, toast }) => {
  try {
    const data = await addProduct({ nombre, descripcion, precio, imagen_url, category_id, marca, activo, visible });
    toast.success('Producto cargado correctamente.');
    return data;
  } catch (error) {
    toast.error(error.message || 'Ocurrió un error inesperado.');
    throw new Error(error.message);
  }
};
