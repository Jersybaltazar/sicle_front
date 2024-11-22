'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Validacion from '../validacion/page'
import Scoring from '../scoring/page'
import Prediccion from '../prediccion/page'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AnalysisDashboard() {
  // Mock data for different sections
  const validationData = [
    { empresa: 'Empresa A', validados: 85, inconsistentes: 15 }
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <Tabs defaultValue="predictivo" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="validacion">Validación</TabsTrigger>
          <TabsTrigger value="scoring">Scoring</TabsTrigger>
          <TabsTrigger value="predictivo">Análisis Predictivo</TabsTrigger>
        </TabsList>

        {/* Validación de Datos */}
        <TabsContent value="validacion">
          <Validacion/>
        </TabsContent>

        {/* Sistema de Scoring */}
        <TabsContent value="scoring">
          <Scoring/>
        </TabsContent>
          
        {/* Análisis Predictivo */}
        <TabsContent value="predictivo">
        <Prediccion/>
        </TabsContent>
      </Tabs>
    </div>
  );
}