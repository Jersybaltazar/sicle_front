"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [modalType, setModalType] = useState<"registro" | "login">("registro");
  const [isCollecting, setIsCollecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();


  const startSimulation = () => {
    setIsCollecting(true);
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 10; // Incrementar el progreso en 10%
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsCollecting(false); // Ocultar la barra al finalizar
          alert("Recolección de datos completada exitosamente.");
          router.push("/validacion")
        }, 500);
      }
    }, 300); // Actualización cada 300ms
  };
  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      ruc: formData.get("ruc"),
      razon_social: formData.get("razon_social"),
      email: formData.get("email"),
      telefono: formData.get("telefono"),
      ubicacion: formData.get("ubicacion"),
      autorizacion: formData.get("autorizacion") === "on", // Checkbox
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        startSimulation(); // Iniciar la simulación de recolección
      } else {
        alert(data.error || "Error al registrar la empresa.");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("Error al conectar con el backend.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-2xl hover:shadow-3xl transition-shadow duration-300">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-blue-800 mb-2">
            SICLE
            <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800">
              Enterprise
            </Badge>
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            Validación Laboral y Empresarial
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-center text-sm text-gray-500 mb-4">
            Registra tu empresa o identifícate para acceder a análisis y
            certificaciones
          </p>

          <div className="flex flex-col space-y-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setModalType("registro")}>
                  Registrar Empresa
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Registro de Empresa</DialogTitle>
                  <DialogDescription>
                    Complete el formulario para registrar su empresa y autorizar
                    la recolección automática de datos.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleRegistration}
                  className="grid gap-4 py-4"
                >
                  {/* RUC */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ruc" className="text-right">
                      RUC
                    </Label>
                    <Input
                      id="ruc"
                      name="ruc"
                      className="col-span-3"
                      required
                    />
                  </div>
                  {/* Razón Social */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="razon-social" className="text-right">
                      Razón Social
                    </Label>
                    <Input
                      id="razon-social"
                      name="razon_social"
                      className="col-span-3"
                      required
                    />
                  </div>
                  {/* Correo Electrónico */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Correo Electrónico
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="col-span-3"
                      required
                    />
                  </div>
                  {/* Teléfono */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="telefono" className="text-right">
                      Teléfono
                    </Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      className="col-span-3"
                      required
                    />
                  </div>
                  {/* Ubicación */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ubicacion" className="text-right">
                      Ubicación
                    </Label>
                    <Input
                      id="ubicacion"
                      name="ubicacion"
                      placeholder="Departamento/Distrito"
                      className="col-span-3"
                      required
                    />
                  </div>
                  {/* Checkbox de Autorización */}
                  <div className="grid items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="autorizacion"
                        required
                        className="mr-2"
                      />
                      Autorizo la recolección de datos de las fuentes
                      gubernamentales (MTPE, SUNAT, ESSALUD) para validar mi
                      cumplimiento.
                    </label>
                  </div>
                  {/* Botón de Envío */}
                  <div className="grid items-center gap-4">
                    <Button type="submit" className="text-right">
                      Registrar y Autorizar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  onClick={() => setModalType("login")}
                >
                  Iniciar Sesión
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Iniciar Sesión</DialogTitle>
                  <DialogDescription>
                    Ingrese sus credenciales para acceder
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="login-email" className="text-right">
                      RUC
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid items-center gap-4">
                    <Button className="text-right">Iniciar</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
