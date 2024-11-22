'use client'
// src/app/registro/page.tsx
import { useState } from 'react';
import axios from 'axios';

export default function RegistroPage() {
  const [ruc, setRuc] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/register', {
        ruc_empresa: ruc,
        nombre_empresa: empresa,
      });
      setMessage(response.data.message || 'Registro exitoso. Recolección iniciada.');
    } catch (error) {
      setMessage('Error al registrar la empresa.');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registro de Empresa</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
        <label className="block mb-2">
          RUC:
          <input
            type="text"
            value={ruc}
            onChange={(e) => setRuc(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </label>
        <label className="block mb-2">
          Nombre de la Empresa:
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600 mt-4"
        >
          Registrar y Activar Recolección
        </button>
      </form>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
