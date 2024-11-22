'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Download, CheckCircle, XCircle, History } from 'lucide-react';

const CertificacionEmpresarial = () => {
  const [showHistory, setShowHistory] = useState(false);
  
  const empresaData = {
    razonSocial: "Empresa XYZ S.A.C",
    ruc: "12345678901",
    fecha: "21 de noviembre de 2024",
    estado: "Aprobado",
    hashBlockchain: "0x1234abcd5678efgh91011ijklmnopqrs",
    cumplimiento: {
      seguridadSocial: 85,
      formalidadLaboral: 70,
      prevencionAccidentes: 60,
      cumplimientoFiscal: 75,
      beneficiosEmpleados: 65
    },
    aprobado: true
  };
  const getBadgeColor = (value: number) => {
    if (value >= 80) return "bg-green-500 text-white";
    if (value >= 60) return "bg-yellow-500 text-black";
    return "bg-red-500 text-white";
  };  
  const historialCertificaciones = [
    { fecha: "21/10/2024", estado: "Aprobado", id: "CERT-001" },
    { fecha: "21/09/2024", estado: "Rechazado", id: "CERT-002" },
    { fecha: "21/08/2024", estado: "Aprobado", id: "CERT-003" },
  ];

  const renderIndicadorEstado = () => (
    <div className="flex items-center gap-2 mb-4">
      {empresaData.aprobado ? (
        <Badge className="bg-green-500">
          <CheckCircle className="w-4 h-4 mr-1" />
          Certificación Aprobada
        </Badge>
      ) : (
        <Badge variant="destructive">
          <XCircle className="w-4 h-4 mr-1" />
          Certificación Rechazada
        </Badge>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Certificación Empresarial</CardTitle>
          <CardDescription>
            Obtenga su certificado de cumplimiento laboral y empresarial
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderIndicadorEstado()}
          
          <div className="space-y-6">
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-medium">Información de la Empresa</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Razón Social</p>
                    <p className="font-medium">{empresaData.razonSocial}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">RUC</p>
                    <p className="font-medium">{empresaData.ruc}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Niveles de Cumplimiento</h3>
                <div className="space-y-4">
                  {Object.entries(empresaData.cumplimiento).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                        <span className="text-sm font-medium">{value}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>                
              </div>
              <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-700">Blockchain</h3>
            <p className="text-gray-600">
              Certificado registrado en blockchain para garantizar su
              autenticidad.
            </p>
            <p className="text-gray-800 font-mono break-all">
              Hash: {empresaData.hashBlockchain}
            </p>

          </div>
              
            </div>

            <div className="flex gap-4">
              <Button  className=" hover:bg-blue-600/50 text-white">
                <Download className="w-4 h-4 mr-2" />
                Generar Certificado PDF
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowHistory(!showHistory)}
              >
                <History className="w-4 h-4 mr-2" />
                {showHistory ? 'Ocultar Historial' : 'Ver Historial'}
              </Button>
            </div>

            {showHistory && (
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Certificaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    {/* Header */}
                    <div className="grid grid-cols-3 bg-gray-50 px-4 py-2 text-sm font-medium">
                      <div>Fecha</div>
                      <div>Estado</div>
                      <div>Acciones</div>
                    </div>
                    
                    {/* Body */}
                    {historialCertificaciones.map((cert) => (
                      <div 
                        key={cert.id} 
                        className="grid grid-cols-3 px-4 py-3 border-t items-center text-sm"
                      >
                        <div>{cert.fecha}</div>
                        <div>
                          <Badge 
                            variant={cert.estado === "Aprobado" ? "default" : "destructive"}
                          >
                            {cert.estado}
                          </Badge>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificacionEmpresarial;