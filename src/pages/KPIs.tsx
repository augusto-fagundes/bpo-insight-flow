import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Target, Clock, DollarSign, Users } from "lucide-react";

// Import employee photos
import anaPhoto from "@/assets/ana-silva.jpg";
import carlosPhoto from "@/assets/carlos-santos.jpg";
import mariaPhoto from "@/assets/maria-oliveira.jpg";
import pedroPhoto from "@/assets/pedro-ferreira.jpg";

interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "stable";
  category: "productivity" | "quality" | "efficiency" | "revenue";
}

interface EmployeeKPI {
  id: string;
  name: string;
  photo: string;
  position: string;
  kpis: KPI[];
  overallScore: number;
}

const mockEmployeeKPIs: EmployeeKPI[] = [
  {
    id: "1",
    name: "Ana Silva",
    photo: anaPhoto,
    position: "Analista Financeiro Sênior",
    overallScore: 92,
    kpis: [
      { id: "1", name: "Produtividade", value: 94, target: 90, unit: "%", trend: "up", category: "productivity" },
      { id: "2", name: "Horas Faturáveis", value: 168, target: 160, unit: "h", trend: "up", category: "efficiency" },
      { id: "3", name: "Qualidade", value: 96, target: 95, unit: "%", trend: "up", category: "quality" },
      { id: "4", name: "Receita Gerada", value: 25000, target: 22000, unit: "R$", trend: "up", category: "revenue" },
    ],
  },
  {
    id: "2",
    name: "Carlos Santos",
    photo: carlosPhoto,
    position: "Contador",
    overallScore: 87,
    kpis: [
      { id: "1", name: "Produtividade", value: 87, target: 90, unit: "%", trend: "down", category: "productivity" },
      { id: "2", name: "Horas Faturáveis", value: 152, target: 160, unit: "h", trend: "down", category: "efficiency" },
      { id: "3", name: "Qualidade", value: 94, target: 95, unit: "%", trend: "stable", category: "quality" },
      { id: "4", name: "Receita Gerada", value: 19500, target: 22000, unit: "R$", trend: "down", category: "revenue" },
    ],
  },
  {
    id: "3",
    name: "Maria Oliveira",
    photo: mariaPhoto,
    position: "Controladora Financeira",
    overallScore: 96,
    kpis: [
      { id: "1", name: "Produtividade", value: 96, target: 90, unit: "%", trend: "up", category: "productivity" },
      { id: "2", name: "Horas Faturáveis", value: 176, target: 160, unit: "h", trend: "up", category: "efficiency" },
      { id: "3", name: "Qualidade", value: 98, target: 95, unit: "%", trend: "up", category: "quality" },
      { id: "4", name: "Receita Gerada", value: 28000, target: 22000, unit: "R$", trend: "up", category: "revenue" },
    ],
  },
  {
    id: "4",
    name: "Pedro Ferreira",
    photo: pedroPhoto,
    position: "Consultor Financeiro",
    overallScore: 89,
    kpis: [
      { id: "1", name: "Produtividade", value: 89, target: 90, unit: "%", trend: "stable", category: "productivity" },
      { id: "2", name: "Horas Faturáveis", value: 144, target: 160, unit: "h", trend: "down", category: "efficiency" },
      { id: "3", name: "Qualidade", value: 92, target: 95, unit: "%", trend: "up", category: "quality" },
      { id: "4", name: "Receita Gerada", value: 21000, target: 22000, unit: "R$", trend: "up", category: "revenue" },
    ],
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "productivity": return <Target className="h-4 w-4" />;
    case "efficiency": return <Clock className="h-4 w-4" />;
    case "quality": return <TrendingUp className="h-4 w-4" />;
    case "revenue": return <DollarSign className="h-4 w-4" />;
    default: return <Target className="h-4 w-4" />;
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up": return <TrendingUp className="h-4 w-4 text-success" />;
    case "down": return <TrendingDown className="h-4 w-4 text-destructive" />;
    default: return <span className="h-4 w-4 rounded-full bg-muted" />;
  }
};

export const KPIs = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Gerenciador de KPIs por Funcionários
        </h1>
        <p className="text-muted-foreground">
          Acompanhe os indicadores de performance de cada colaborador
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockEmployeeKPIs.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={employee.photo}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <CardDescription>{employee.position}</CardDescription>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Score Geral</span>
                <Badge variant={employee.overallScore >= 90 ? "default" : "secondary"}>
                  {employee.overallScore}%
                </Badge>
              </div>
              <Progress value={employee.overallScore} className="h-2" />
            </CardHeader>
            
            <CardContent className="space-y-4">
              {employee.kpis.map((kpi) => (
                <div key={kpi.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(kpi.category)}
                    <span className="text-sm font-medium">{kpi.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {kpi.value}{kpi.unit} / {kpi.target}{kpi.unit}
                    </span>
                    {getTrendIcon(kpi.trend)}
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setSelectedEmployee(employee.id)}
              >
                <Users className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};