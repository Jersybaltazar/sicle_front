'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PredictiveAnalysisDashboard() {
  const currentRiskData = [
    { year: 2023, riesgo: 40, factorPrincipal: "Accidentes", impacto: "Incremento en sanciones" },
    { year: 2024, riesgo: 55, factorPrincipal: "Cumplimiento Fiscal", impacto: "Aumento en observaciones SUNAT" },
    { year: 2025, riesgo: 70, factorPrincipal: "Seguridad Social", impacto: "Posible reducción en cobertura" },
  ];

  const historicalRiskData = [
    { year: 2020, riesgo: 35 },
    { year: 2021, riesgo: 38 },
    { year: 2022, riesgo: 42 },
  ];

  const detalleRiesgos = [
    { categoria: "Seguridad Social", porcentaje: 15 },
    { categoria: "Accidentes Laborales", porcentaje: 30 },
    { categoria: "Cumplimiento Fiscal", porcentaje: 20 },
  ];

  const recomendaciones = [
    {
      factor: "Prevención de Accidentes",
      recomendacion: "Aumentar capacitaciones en seguridad laboral.",
      impacto: "Reduciría el riesgo en un 10%.",
      nivelRiesgo: "Alto",
    },
    {
      factor: "Cumplimiento Fiscal",
      recomendacion: "Optimizar procesos de declaración fiscal.",
      impacto: "Reduciría el riesgo en un 5%.",
      nivelRiesgo: "Medio",
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-800">
            Análisis Predictivo de Riesgos
          </CardTitle>
          <p className="text-gray-600">
            Proyección de riesgos basada en datos históricos y tendencias actuales.
          </p>
        </CardHeader>
        <CardContent>
          {/* Gráfico de Líneas */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-4 shadow-lg rounded">
                        <p className="font-bold">{data.year}</p>
                        <p>Riesgo: {data.riesgo}%</p>
                        {data.factorPrincipal && <p>Factor Principal: {data.factorPrincipal}</p>}
                        {data.impacto && <p>Impacto: {data.impacto}</p>}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line type="monotone" dataKey="riesgo" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} />
              <Line
                type="monotone"
                dataKey="riesgo"
                data={historicalRiskData}
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Histórico"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detalle de Factores de Riesgo */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Factores que Contribuyen al Riesgo</CardTitle>
        </CardHeader>
        <CardContent>
          {detalleRiesgos.map((riesgo, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-2">
                <span>{riesgo.categoria}</span>
                <span>{riesgo.porcentaje}%</span>
              </div>
              <Progress value={riesgo.porcentaje} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recomendaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones para Mitigación de Riesgos</CardTitle>
        </CardHeader>
        <CardContent>
          {recomendaciones.map((rec, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">{rec.factor}</h4>
                <Badge variant={rec.nivelRiesgo === "Alto" ? "destructive" : "secondary"}>
                  {rec.nivelRiesgo}
                </Badge>
              </div>
              <p className="text-gray-600">{rec.recomendacion}</p>
              <p className="text-gray-500 italic">{rec.impacto}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
