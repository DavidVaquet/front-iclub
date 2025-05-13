const API_URL = `${import.meta.env.VITE_URL}/products`;

export const addProduct = async ({nombre, descripcion, precio, imagen_url, category_id, marca, activo, visible}) => {

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/newProduct`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({nombre, descripcion, precio, imagen_url, category_id, marca, activo, visible})
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.msg || 'Error al subir un producto.')
        };

        return await response.json();

    } catch (error) {
        throw new Error(error.message || 'Error al subir un producto.')
    }
};