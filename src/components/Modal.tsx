import { useState } from 'react';
import axios from 'axios';

export default function Modal({ type, closeModal }: { type: 'registro' | 'login'; closeModal: () => void }) {
  const [ruc, setRuc] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (type === 'registro') {
        const response = await axios.post('http://127.0.0.1:5000/api/register', {
          ruc_empresa: ruc,
          nombre_empresa: empresa,
        });
        setMessage(response.data.message || 'Registro exitoso. Recolección iniciada.');
      } else if (type === 'login') {
        // Aquí implementarías la lógica de inicio de sesión
        setMessage('Sesión iniciada correctamente.');
      }
    } catch (error) {
      setMessage('Ocurrió un error. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{type === 'registro' ? 'Registro de Empresa' : 'Iniciar Sesión'}</h2>
        <form onSubmit={handleSubmit}>
          {type === 'registro' && (
            <>
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
              <label className="block mb-4">
                <input type="checkbox" required /> Autorizo la recolección de datos de las fuentes gubernamentales.
              </label>
            </>
          )}
          {type === 'login' && (
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
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            {type === 'registro' ? 'Registrar y Autorizar' : 'Iniciar Sesión'}
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
        <button
          onClick={closeModal}
          className="mt-4 text-gray-600 hover:text-gray-800"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
