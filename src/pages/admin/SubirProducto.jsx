import { useState, useEffect } from "react";
import { getAllCategories } from "../../services/categorieService";
import { addProductController } from "../../controllers/productController";
import {
  Button,
  Input,
  Select,
  Option,
  Textarea,
  Card,
  CardHeader,
  CardFooter,
  Typography,
  Chip,
  Switch,
} from "@material-tailwind/react"

export const SubirProducto = () => {
const [nombre, setNombre] = useState('');
const [descripcion, setDescripcion] = useState('');
const [precio, setPrecio] = useState('');
const [images, setImages] = useState([]);
const [marca, setMarca] = useState('');
const [categorias, setCategorias] = useState([]);
const [cantidad, setCantidad] = useState(0);
const [estado, setEstado] = useState(true);
const [visible, setVisible] = useState(true);

const handleFileChange = (e) => {

  const files = e.target.file;
  if (!files || files.length === 0) return;

  const newImages = Array.from(files).map((file) => ({
    id: Date.now + Math.random().toString(36).substr(2,9),
    file,
    url: URL.createObjectURL(file)
  }));

  setImages((prev) => [...prev, ...newImages]);

  }

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const newImages = Array.from(files).map((file) => ({
      id: Date.now() + Math.random().toString(36).substr(2,9),
      file,
      url: URL.createObjectURL(file)
    }));

    setImages((prev) => [...prev, ...newImages]);
  }

useEffect(() => {
  const fetchCategories = async () => {
    try {
    const data = await getAllCategories();
    setCategorias(data);
    } catch (error) {
    console.error('Error al obtener categorias.', error.message);  
    }
  }

  fetchCategories();
}, []);


  

  return (
    <div className="text-black flex flex-col w-full h-screen py-3 px-8 font-worksans overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-semibold uppercase">Agregar Producto</h1>
          <p className="text-gray-600 mt-1">Sube, gestiona y comparte tu producto sin esfuerzo y de forma fluida.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outlined" className="flex items-center gap-2 uppercase">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Crear Categoría
          </Button>
          <Button color="deep-orange" className="flex items-center gap-2 uppercase shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            SUBIR PRODUCTO
          </Button>
        </div>
      </div>

      {/* Main Card */}
      <Card className="w-full flex-1 shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <CardHeader color="white" floated={false} shadow={false} className="m-0 p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-deep-orange-50">
              <span className="text-xl">📦</span>
            </div>
            <div>
              <Typography variant="h5" color="blue-gray">
                Información del producto
              </Typography>
              <Typography color="gray" className="mt-1 font-normal text-sm">
                Completá los siguientes datos para añadir un nuevo producto al sistema.
              </Typography>
            </div>
          </div>
        </CardHeader>

        {/* Contenido principal */}
        <div className="p-6 flex-1 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {/* Columna izquierda */}
            <div className="space-y-5 overflow-y-auto pr-2 max-h-full">
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Datos principales
                </Typography>
                <div className="space-y-4">
                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                      Nombre del Producto*
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Ej: Iphone 13 Pro"
                      className="!border-gray-300 focus:!border-deep-orange-500"
                      onChange={(e) => setNombre(e.target.value)}
                      value={nombre}
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>

                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                      Categoría*
                    </Typography>
                    <Select
                      label="Seleccionar categoría"
                      className="!border-gray-300"
                      menuProps={{
                        className: "p-1",
                      }}
                    >
                      { categorias.map((cat) => (
                        <Option key={cat.id} value={cat.id.toString()}>{cat.nombre}</Option>
                      )) }
                    </Select>
                  </div>

                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                      Marca
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Ej: Apple, JBL, etc."
                      className="!border-gray-300 focus:!border-deep-orange-500"
                      onChange={(e) => setMarca(e.target.value)}
                      value={marca}
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Precios
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                      Precio regular*
                    </Typography>
                    <Input
                      type="number"
                      size="lg"
                      placeholder="0.00"
                      onChange={(e) => setPrecio(e.target.value)}
                      value={precio}
                      className="!border-gray-300 focus:!border-deep-orange-500"
                      icon="$"
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                  {/* <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                      Precio de oferta
                    </Typography>
                    <Input
                      type="number"
                      size="lg"
                      placeholder="0.00"
                      className="!border-gray-300 focus:!border-deep-orange-500"
                      icon="$"
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div> */}
                </div>
              </div>

              <div>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Cantidad
                </Typography>
                <Input
                  type="number"
                  size="lg"
                  placeholder="0"
                  className="!border-gray-300 focus:!border-deep-orange-500"
                  onChange={(e) => setCantidad(e.target.value)}
                  value={cantidad}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col h-full overflow-hidden">
              <div className="space-y-5 overflow-y-auto pr-2 max-h-full">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-4">
                    Imágenes del producto
                  </Typography>
                  <div
                    onClick={() => document.getElementById("fileInput").click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="relative h-[150px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 transition-all cursor-pointer border-gray-300 hover:bg-gray-50 hover:border-deep-orange-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-deep-orange-500 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                    <Typography className="text-sm font-medium text-center">
                      Click para subir o arrastra y suelta
                    </Typography>
                    <Typography className="text-xs text-gray-500 mt-1 text-center">
                      Máximo 10mb, solo archivos PNG y JPEG.
                    </Typography>
                    <input
                      id="fileInput"
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>

                  {/* Galería de imágenes */}
                  {images.length > 0 && (
                    <div className="mt-4">
                      <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                        Imágenes subidas ({images.length})
                      </Typography>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                        {images.map((image) => (
                          <div key={image.id} className="relative group">
                            <div className="h-24 w-full rounded-lg border border-gray-300 overflow-hidden">
                              <img
                                src={image.url || "/placeholder.svg"}
                                alt="Imagen del producto"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <button
                              onClick={() => removeImage(image.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-4">
                    Descripción
                  </Typography>
                  <Textarea
                   label="Descripción del producto"
                   size="lg"
                   className="!border-gray-300 min-h-[120px]"
                   onChange={(e) => setDescripcion(e.target.value)}
                   value={descripcion} 
                   />
                </div>

                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-4">
                    Estado y visibilidad
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Estado
                      </Typography>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Chip
                            variant={estado === "true" ? "filled" : "outlined"}
                            value="Activo"
                            onClick={() => setEstado(true)}
                            color="green"
                            className={`rounded-full cursor-pointer ${
                              estado ? "" : "border-gray-300 text-gray-500"
                            }`}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Chip
                            variant={estado === false ? "filled" : "outlined"}
                            value="Inactivo"
                            onClick={() => setEstado(false)}
                            color="red"
                            className={`rounded-full cursor-pointer ${
                              estado ? "" : "border-gray-300 text-gray-500"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Visibilidad
                      </Typography>
                      <div className="flex items-center gap-2">
                        <Switch checked={visible} onChange={() => setVisible(!visible)} color="deep-orange" />
                        <Typography variant="small" color="gray">
                          {visible ? "Visible en tienda" : "Oculto"}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardFooter className="flex items-center justify-between p-6 border-t border-gray-200">
          <Button variant="text" color="blue-gray">
            Cancelar
          </Button>
          <Button color="deep-orange" className="shadow-md">
            Guardar borrador
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
