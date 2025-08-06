import { useState } from "react";
import { EmployeeCard, Employee, Task } from "@/components/employees/EmployeeCard";
import { EmployeeModal } from "@/components/employees/EmployeeModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, AlertCircle, Circle, Calendar, Users, Clock } from "lucide-react";

// Import employee photos
import anaPhoto from "@/assets/ana-silva.jpg";
import carlosPhoto from "@/assets/carlos-santos.jpg";
import mariaPhoto from "@/assets/maria-oliveira.jpg";
import pedroPhoto from "@/assets/pedro-ferreira.jpg";

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Ana Silva",
    photo: anaPhoto,
    position: "Analista Financeiro Sênior",
    totalHours: 168,
    hoursPerClient: [
      { client: "Tech Solutions", hours: 45 },
      { client: "Marketing Pro", hours: 38 },
      { client: "StartUp Innovation", hours: 42 },
      { client: "Digital Agency", hours: 43 },
    ],
    productivity: 94,
    companies: [
      { name: "Tech Solutions Ltd.", hours: 45 },
      { name: "Marketing Pro", hours: 38 },
      { name: "StartUp Innovation", hours: 42 },
      { name: "Digital Agency", hours: 43 },
    ],
    tasks: [
      { id: "t1", name: "Análise de Fluxo de Caixa", hours: 8, company: "Tech Solutions", status: "completed", completedAt: "2024-01-15" },
      { id: "t2", name: "Relatório Financeiro", hours: 12, company: "Marketing Pro", status: "completed", completedAt: "2024-01-14" },
      { id: "t3", name: "Auditoria Interna", hours: 15, company: "StartUp Innovation", status: "in-progress" },
      { id: "t4", name: "Planejamento Orçamentário", hours: 10, company: "Digital Agency", status: "pending" },
    ],
  },
  {
    id: "2",
    name: "Carlos Santos",
    photo: carlosPhoto,
    position: "Contador",
    totalHours: 152,
    hoursPerClient: [
      { client: "Retail Corp", hours: 55 },
      { client: "Manufacturing Ltd", hours: 48 },
      { client: "Service Provider", hours: 49 },
    ],
    productivity: 87,
    companies: [
      { name: "Retail Corp", hours: 55 },
      { name: "Manufacturing Ltd", hours: 48 },
      { name: "Service Provider", hours: 49 },
    ],
    tasks: [
      { id: "t5", name: "Fechamento Contábil", hours: 18, company: "Retail Corp", status: "completed", completedAt: "2024-01-13" },
      { id: "t6", name: "Declaração de Impostos", hours: 14, company: "Manufacturing Ltd", status: "in-progress" },
      { id: "t7", name: "Conciliação Bancária", hours: 12, company: "Service Provider", status: "completed", completedAt: "2024-01-12" },
      { id: "t8", name: "Análise de Custos", hours: 11, company: "Retail Corp", status: "pending" },
    ],
  },
  {
    id: "3",
    name: "Maria Oliveira",
    photo: mariaPhoto,
    position: "Controladora Financeira",
    totalHours: 176,
    hoursPerClient: [
      { client: "Healthcare Group", hours: 52 },
      { client: "Education Institute", hours: 41 },
      { client: "Tech Startup", hours: 46 },
      { client: "Consulting Firm", hours: 37 },
    ],
    productivity: 96,
    companies: [
      { name: "Healthcare Group", hours: 52 },
      { name: "Education Institute", hours: 41 },
      { name: "Tech Startup", hours: 46 },
      { name: "Consulting Firm", hours: 37 },
    ],
    tasks: [
      { id: "t9", name: "Controle de Receitas", hours: 16, company: "Healthcare Group", status: "completed", completedAt: "2024-01-16" },
      { id: "t10", name: "Análise de Investimentos", hours: 13, company: "Education Institute", status: "in-progress" },
      { id: "t11", name: "Budget Planning", hours: 12, company: "Tech Startup", status: "completed", completedAt: "2024-01-15" },
      { id: "t12", name: "Risk Assessment", hours: 11, company: "Consulting Firm", status: "pending" },
    ],
  },
  {
    id: "4",
    name: "Pedro Ferreira",
    photo: pedroPhoto,
    position: "Consultor Financeiro",
    totalHours: 144,
    hoursPerClient: [
      { client: "Investment Fund", hours: 48 },
      { client: "Real Estate Co", hours: 52 },
      { client: "Construction LLC", hours: 44 },
    ],
    productivity: 89,
    companies: [
      { name: "Investment Fund", hours: 48 },
      { name: "Real Estate Co", hours: 52 },
      { name: "Construction LLC", hours: 44 },
    ],
    tasks: [
      { id: "t13", name: "Consultoria de Portfolio", hours: 15, company: "Investment Fund", status: "completed", completedAt: "2024-01-17" },
      { id: "t14", name: "Avaliação Imobiliária", hours: 18, company: "Real Estate Co", status: "in-progress" },
      { id: "t15", name: "Análise de Viabilidade", hours: 14, company: "Construction LLC", status: "completed", completedAt: "2024-01-16" },
      { id: "t16", name: "Due Diligence", hours: 9, company: "Investment Fund", status: "pending" },
    ],
  },
];

export const Employees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'employees' | 'tasks'>('employees');
  const [selectedTask, setSelectedTask] = useState<Task & { employees: { name: string; hours: number }[] } | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleTaskClick = (task: Task) => {
    // Find all employees working on this task
    const taskEmployees = mockEmployees
      .filter(emp => emp.tasks.some(t => t.name === task.name))
      .map(emp => {
        const empTask = emp.tasks.find(t => t.name === task.name);
        return { name: emp.name, hours: empTask?.hours || 0 };
      });

    setSelectedTask({ ...task, employees: taskEmployees });
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  // Get all unique tasks across all employees
  const allTasks = mockEmployees.reduce((tasks: Task[], employee) => {
    employee.tasks.forEach(task => {
      if (!tasks.some(t => t.name === task.name)) {
        tasks.push(task);
      }
    });
    return tasks;
  }, []);

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'in-progress':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {viewMode === 'employees' ? 'Desempenho por Colaborador' : 'Visualização por Tarefas'}
          </h1>
          <p className="text-muted-foreground">
            {viewMode === 'employees' 
              ? 'Acompanhe o desempenho e produtividade da equipe'
              : 'Visualize todas as tarefas e os operadores envolvidos'
            }
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'employees' ? 'default' : 'outline'}
            onClick={() => setViewMode('employees')}
          >
            Colaboradores
          </Button>
          <Button
            variant={viewMode === 'tasks' ? 'default' : 'outline'}
            onClick={() => setViewMode('tasks')}
          >
            Tarefas
          </Button>
        </div>
      </div>

      {viewMode === 'employees' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onClick={handleEmployeeClick}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTasks.map((task) => (
            <Card
              key={task.id}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{task.name}</h3>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <Badge className={getStatusColor(task.status)}>
                          {task.status === 'completed' ? 'Concluída' : 
                           task.status === 'in-progress' ? 'Em andamento' : 'Pendente'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{task.hours}h estimadas</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>
                        {mockEmployees.filter(emp => emp.tasks.some(t => t.name === task.name)).length} operadores
                      </span>
                    </div>

                    {task.completedAt && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Concluída em {task.completedAt}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Empresa:</p>
                    <p className="font-medium">{task.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <EmployeeModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Task Detail Modal */}
      <Dialog open={isTaskModalOpen} onOpenChange={handleCloseTaskModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Tarefa</DialogTitle>
          </DialogHeader>

          {selectedTask && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">{selectedTask.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  {getStatusIcon(selectedTask.status)}
                  <Badge className={getStatusColor(selectedTask.status)}>
                    {selectedTask.status === 'completed' ? 'Concluída' : 
                     selectedTask.status === 'in-progress' ? 'Em andamento' : 'Pendente'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium">Empresa:</p>
                  <p className="text-muted-foreground">{selectedTask.company}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Total de Horas:</p>
                  <p className="text-muted-foreground">{selectedTask.hours}h</p>
                </div>

                {selectedTask.completedAt && (
                  <div className="space-y-2">
                    <p className="font-medium">Data de Conclusão:</p>
                    <p className="text-muted-foreground">{selectedTask.completedAt}</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-3">Operadores Envolvidos:</h4>
                <div className="space-y-2">
                  {selectedTask.employees.map((emp, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded"
                    >
                      <span className="font-medium">{emp.name}</span>
                      <span className="text-muted-foreground">{emp.hours}h</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};