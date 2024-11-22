import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatBot() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() === "") return;
    setMessages([...messages, inputValue]);
    setInputValue("");
    // Aquí se puede llamar a un API para obtener la respuesta del backend o del modelo NLP
  };

  return (
    <div className="fixed bottom-4 right-4">
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-blue-500 text-white p-5 rounded-full shadow-lg hover:bg-blue-600">
            🤖
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>¿En qué puedo ayudarte?</span>
              <span className="text-green-500 text-sm">Disponible</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded h-64 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-gray-500">No hay mensajes aún. ¡Hazme una pregunta!</p>
              ) : (
                messages.map((msg, index) => (
                  <p key={index} className="bg-white p-2 rounded shadow mb-2">
                    {msg}
                  </p>
                ))
              )}
            </div>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="w-full"
            />
            <Button onClick={handleSend} className="w-full">
              Enviar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
