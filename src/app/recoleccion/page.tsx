'use client'
import { useState } from 'react';
import axios from 'axios';

export default function RecoleccionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [dataStatus, setDataStatus] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (endpoint: string) => {
    if (!file) {
      setMessage('Por favor, selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(endpoint, formData);
      setMessage(response.data.message || 'Archivo cargado exitosamente.');
      fetchDataStatus();
    } catch (error) {
      setMessage('Error al cargar el archivo.');
    }
  };

  const fetchDataStatus = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/list_datasets');
      setDataStatus(response.data);
    } catch (error) {
      console.error('Error al obtener el estado de los datos:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recolección de Datos</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => handleUpload('http://127.0.0.1:5000/api/upload_accidentes')}
          className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600"
        >
          Subir Accidentes
        </button>
        <button
          onClick={() => handleUpload('http://127.0.0.1:5000/api/upload_empresas')}
          className="bg-green-500 text-white p-2 rounded shadow hover:bg-green-600"
        >
          Subir Empresas
        </button>
        <button
          onClick={() => handleUpload('http://127.0.0.1:5000/api/upload_multas')}
          className="bg-red-500 text-white p-2 rounded shadow hover:bg-red-600"
        >
          Subir Multas
        </button>
      </div>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
      <h2 className="text-xl font-bold mt-6">Estado de los Datos</h2>
      {dataStatus && (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(dataStatus, null, 2)}
        </pre>
      )}
    </div>
  );
}
