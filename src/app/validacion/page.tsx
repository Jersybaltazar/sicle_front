"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ValidacionPage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const isValidationComplete = progress === 100;
  const inconsistencias = [
    {
      tipo: "Falta de datos",
      registros: 20,
      descripcion: "Faltan datos en accidentes.",
    },
    {
      tipo: "Valores fuera de rango",
      registros: 15,
      descripcion: "Edades no válidas detectadas.",
    },
    {
      tipo: "Incoherencias entre fuentes",
      registros: 15,
      descripcion: "Mismas empresas con multas duplicadas.",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl space-y-6">
        <Card className="shadow-lg">
          <CardContent>
            <CardTitle className="text-2xl font-bold text-center text-blue-800">
              Validación de Datos
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Resultados de la validación de los datos recolectados.
            </CardDescription>
            <div className="my-6">
              <Progress value={progress} className="h-4" />
              <p className="text-center text-sm mt-2 text-gray-500">
                {isValidationComplete
                  ? "Validación completa. Datos preparados para el análisis."
                  : "Procesando datos..."}
              </p>
            </div>
          </CardContent>
        </Card>

        {isValidationComplete && (
          <>
            {/* Resúmenes de Validación */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-green-100">
                <CardTitle className="text-center text-green-800">
                  Validado
                </CardTitle>
                <p className="text-center text-3xl font-bold text-green-800">
                  85%
                </p>
              </Card>
              <Card className="p-4 bg-red-100">
                <CardTitle className="text-center text-red-800">
                  Inconsistencias
                </CardTitle>
                <p className="text-center text-3xl font-bold text-red-800">
                  15%
                </p>
              </Card>
              <Card className="p-4 bg-gray-100">
                <CardTitle className="text-center text-gray-800">
                  Total Registros
                </CardTitle>
                <p className="text-center text-3xl font-bold text-gray-800">
                  300
                </p>
              </Card>
            </div>

            {/* Detalles de las Inconsistencias */}
            <Card className="shadow-lg">
              <CardContent>
                <CardTitle className="text-xl font-bold text-gray-800 mb-4">
                  Detalles de Inconsistencias
                </CardTitle>
                <Table className="w-full border">
                  <TableHeader>
                    <TableRow>
                      <TableCell>Tipo de Inconsistencia</TableCell>
                      <TableCell>Registros Afectados</TableCell>
                      <TableCell>Descripción</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inconsistencias.map((inconsistencia, index) => (
                      <TableRow key={index}>
                        <TableCell>{inconsistencia.tipo}</TableCell>
                        <TableCell>{inconsistencia.registros}</TableCell>
                        <TableCell>{inconsistencia.descripcion}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Botón para Continuar */}
            <div className="mt-6 text-center">
              <Button
                className=" text-white px-6 py-3 rounded-md shadow-md transition"
                onClick={() => router.push("/scoring")}
              >
                Continuar al Scoring
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
