const API_URL = `${import.meta.env.VITE_URL}/categories`;


export const getAllCategories = async () => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('El token es obligatorio.');
    }

    try {
        const response = await fetch(`${API_URL}/getCategories`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        });

        if (!response) {
            const data = await response.json();
            throw new Error(data.msg || 'Error al obtener las categorias.');
        };

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al obtener las categorias.');
    }

}