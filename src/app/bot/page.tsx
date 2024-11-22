"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import BotonModal from "@/components/botmodal";
export default function AssistanceBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const handleQuery = async () => {
    // Simulate RAG + NLP backend call
    try {
      const response = await fetch("http://127.0.0.1:5000/api/rag_nlp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userInput }),
      });
      const data = await response.json();
      setBotResponse(data.response || "Lo siento, no encontré una respuesta.");
    } catch (error) {
      setBotResponse("Error al conectar con el asistente.");
    }
  };

  return (
    <div>
      <BotonModal />
    </div>
  );
}
