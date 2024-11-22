"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function ScoringPage() {
  // Datos simulados para las métricas de scoring
  const scoringMetrics = [
    {
      subject: "Seguridad Social",
      valor: 80,
      detalle: "80% de trabajadores afiliados a ESSALUD.",
    },
    {
      subject: "Formalidad Laboral",
      valor: 70,
      detalle: "70% de contratos formales registrados.",
    },
    {
      subject: "Prevención de Accidentes",
      valor: 60,
      detalle: "60% de cumplimiento en políticas de seguridad.",
    },
    {
      subject: "Cumplimiento Fiscal",
      valor: 75,
      detalle: "75% de cumplimiento de obligaciones fiscales.",
    },
    {
      subject: "Beneficios Empleados",
      valor: 65,
      detalle: "65% de empleados reciben beneficios completos.",
    },
  ];
  const router = useRouter();
  const getBadgeColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getIcon = (value: number) => {
    if (value >= 70) return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
    return <ExclamationCircleIcon className="h-6 w-6 text-red-500" />;
  };

  const recommendations = [
    {
      factor: "Beneficios Sociales",
      recomendacion: "Mejorar cobertura de beneficios a empleados.",
    },
    {
      factor: "Seguridad Laboral",
      recomendacion: "Implementar protocolos de seguridad más estrictos.",
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-700">
            Sistema de Scoring Laboral
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Métricas con colores dinámicos y tooltips */}
          <div className="space-y-6">
            {scoringMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-600">
                          {metric.subject}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-lg font-bold ${getBadgeColor(
                              metric.valor
                            )}`}
                          >
                            {metric.valor}%
                          </span>
                          {getIcon(metric.valor)}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{metric.detalle}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Progress value={metric.valor} className="w-full" />
              </div>
            ))}
          </div>

          {/* Puntaje Final con desglose */}
          <div className="mt-10 text-center">
            <h3 className="text-2xl font-bold text-gray-700">Puntaje Final</h3>
            <Progress value={72} className="w-[300px] mx-auto mt-4" />
            <Badge className={`mt-2 ${getBadgeColor(72)} text-white`}>
              Nivel: Medio
            </Badge>
            <p className="mt-4 text-sm text-gray-600">
              El puntaje final se calcula como el promedio ponderado de todas las métricas.
            </p>
          </div>

          {/* Recomendaciones */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              Recomendaciones
            </h3>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="border rounded p-4 space-y-2 bg-gray-100"
                >
                  <h4 className="font-bold text-gray-700">{rec.factor}</h4>
                  <p className="text-gray-600">{rec.recomendacion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de Navegación */}
          <div className="mt-10">
            <div className="flex justify-center space-x-4">
              {72 >= 70 ? (
                <Button
                  onClick={() => router.push("/certificacion")}
                  className="px-6 py-2 rounded shadow bg-green-500 hover:bg-green-600 text-white"
                >
                  Ir a la Certificación
                </Button>
              ) : (
                <p className="text-red-500 text-center">
                  Tu puntaje no es suficiente para obtener el certificado.
                </p>
              )}
              <Button
                onClick={() => router.push("/analisis")}
                className="px-6 py-2 rounded shadow text-white"
              >
                Ver Análisis Predictivo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
