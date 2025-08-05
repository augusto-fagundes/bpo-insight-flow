import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Target, Edit, Plus, Calendar, TrendingUp } from "lucide-react";

// Import employee photos
import anaPhoto from "@/assets/ana-silva.jpg";
import carlosPhoto from "@/assets/carlos-santos.jpg";
import mariaPhoto from "@/assets/maria-oliveira.jpg";
import pedroPhoto from "@/assets/pedro-ferreira.jpg";

interface Goal {
  id: string;
  title: string;
  targetPercentage: number;
  currentPercentage: number;
  deadline: string;
  category: "revenue" | "productivity" | "clients" | "training";
}

interface EmployeeGoal {
  id: string;
  name: string;
  photo: string;
  position: string;
  goals: Goal[];
  overallProgress: number;
}

const mockEmployeeGoals: EmployeeGoal[] = [
  {
    id: "1",
    name: "Ana Silva",
    photo: anaPhoto,
    position: "Analista Financeiro Sênior",
    overallProgress: 85,
    goals: [
      { id: "1", title: "Aumentar receita mensal", targetPercentage: 15, currentPercentage: 12, deadline: "2024-03-31", category: "revenue" },
      { id: "2", title: "Melhorar produtividade", targetPercentage: 10, currentPercentage: 8, deadline: "2024-02-28", category: "productivity" },
      { id: "3", title: "Conquistar novos clientes", targetPercentage: 20, currentPercentage: 18, deadline: "2024-04-30", category: "clients" },
      { id: "4", title: "Completar treinamento", targetPercentage: 100, currentPercentage: 75, deadline: "2024-01-31", category: "training" },
    ],
  },
  {
    id: "2",
    name: "Carlos Santos",
    photo: carlosPhoto,
    position: "Contador",
    overallProgress: 72,
    goals: [
      { id: "1", title: "Aumentar receita mensal", targetPercentage: 12, currentPercentage: 8, deadline: "2024-03-31", category: "revenue" },
      { id: "2", title: "Melhorar produtividade", targetPercentage: 15, currentPercentage: 10, deadline: "2024-02-28", category: "productivity" },
      { id: "3", title: "Conquistar novos clientes", targetPercentage: 18, currentPercentage: 14, deadline: "2024-04-30", category: "clients" },
      { id: "4", title: "Completar treinamento", targetPercentage: 100, currentPercentage: 60, deadline: "2024-01-31", category: "training" },
    ],
  },
  {
    id: "3",
    name: "Maria Oliveira",
    photo: mariaPhoto,
    position: "Controladora Financeira",
    overallProgress: 92,
    goals: [
      { id: "1", title: "Aumentar receita mensal", targetPercentage: 20, currentPercentage: 18, deadline: "2024-03-31", category: "revenue" },
      { id: "2", title: "Melhorar produtividade", targetPercentage: 12, currentPercentage: 11, deadline: "2024-02-28", category: "productivity" },
      { id: "3", title: "Conquistar novos clientes", targetPercentage: 25, currentPercentage: 23, deadline: "2024-04-30", category: "clients" },
      { id: "4", title: "Completar treinamento", targetPercentage: 100, currentPercentage: 95, deadline: "2024-01-31", category: "training" },
    ],
  },
  {
    id: "4",
    name: "Pedro Ferreira",
    photo: pedroPhoto,
    position: "Consultor Financeiro",
    overallProgress: 78,
    goals: [
      { id: "1", title: "Aumentar receita mensal", targetPercentage: 18, currentPercentage: 14, deadline: "2024-03-31", category: "revenue" },
      { id: "2", title: "Melhorar produtividade", targetPercentage: 8, currentPercentage: 6, deadline: "2024-02-28", category: "productivity" },
      { id: "3", title: "Conquistar novos clientes", targetPercentage: 22, currentPercentage: 17, deadline: "2024-04-30", category: "clients" },
      { id: "4", title: "Completar treinamento", targetPercentage: 100, currentPercentage: 80, deadline: "2024-01-31", category: "training" },
    ],
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "revenue": return "bg-success/20 text-success";
    case "productivity": return "bg-primary/20 text-primary";
    case "clients": return "bg-secondary/20 text-secondary-foreground";
    case "training": return "bg-muted/20 text-muted-foreground";
    default: return "bg-muted/20 text-muted-foreground";
  }
};

const getCategoryName = (category: string) => {
  switch (category) {
    case "revenue": return "Receita";
    case "productivity": return "Produtividade";
    case "clients": return "Clientes";
    case "training": return "Treinamento";
    default: return category;
  }
};

export const Goals = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeGoal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmployeeClick = (employee: EmployeeGoal) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Metas por Funcionário
        </h1>
        <p className="text-muted-foreground">
          Gerencie e acompanhe as metas percentuais de cada colaborador
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockEmployeeGoals.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleEmployeeClick(employee)}>
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
                <span className="text-sm font-medium">Progresso Geral</span>
                <Badge variant={employee.overallProgress >= 80 ? "default" : "secondary"}>
                  {employee.overallProgress}%
                </Badge>
              </div>
              <Progress value={employee.overallProgress} className="h-2" />
            </CardHeader>
            
            <CardContent className="space-y-3">
              {employee.goals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span className="text-sm">{goal.title}</span>
                  </div>
                  <Badge variant="outline" className={getCategoryColor(goal.category)}>
                    {goal.currentPercentage}%/{goal.targetPercentage}%
                  </Badge>
                </div>
              ))}
              
              {employee.goals.length > 3 && (
                <p className="text-xs text-muted-foreground text-center">
                  +{employee.goals.length - 3} metas adicionais
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedEmployee && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <img
                    src={selectedEmployee.photo}
                    alt={selectedEmployee.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <DialogTitle className="text-xl">{selectedEmployee.name}</DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedEmployee.position}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <span className="font-medium">Progresso Geral das Metas</span>
                  <div className="flex items-center gap-2">
                    <Progress value={selectedEmployee.overallProgress} className="w-24 h-2" />
                    <span className="font-bold">{selectedEmployee.overallProgress}%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Metas Detalhadas</h3>
                  {selectedEmployee.goals.map((goal) => (
                    <Card key={goal.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{goal.title}</CardTitle>
                          <Badge className={getCategoryColor(goal.category)}>
                            {getCategoryName(goal.category)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progresso: {goal.currentPercentage}% de {goal.targetPercentage}%</span>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        <Progress 
                          value={(goal.currentPercentage / goal.targetPercentage) * 100} 
                          className="h-2" 
                        />
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar Meta
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Meta
                  </Button>
                  <Button>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Relatório Completo
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};