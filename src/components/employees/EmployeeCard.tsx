import { useState } from "react";
import { Clock, Building, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface Task {
  id: string;
  name: string;
  hours: number;
  company: string;
  status: 'completed' | 'in-progress' | 'pending';
  completedAt?: string;
}

export interface Employee {
  id: string;
  name: string;
  photo: string;
  position: string;
  totalHours: number;
  hoursPerClient: { client: string; hours: number }[];
  productivity: number;
  companies: { name: string; hours: number }[];
  tasks?: Task[];
}

interface EmployeeCardProps {
  employee: Employee;
  onClick: (employee: Employee) => void;
}

export const EmployeeCard = ({ employee, onClick }: EmployeeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3 text-success" />;
      case 'in-progress':
        return <AlertCircle className="h-3 w-3 text-warning" />;
      default:
        return <Circle className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar
            className="w-16 h-16 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all cursor-pointer"
            onClick={() => onClick(employee)}
          >
            <AvatarImage src={employee.photo} alt={employee.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {employee.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">{employee.name}</h3>
            <p className="text-sm text-muted-foreground">{employee.position}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{employee.totalHours}h trabalhadas</span>
          </div>

          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Clientes atendidos:</span>
              <span className="text-foreground font-medium">
                {employee.hoursPerClient.length}
              </span>
            </div>
            
            <div className="space-y-1">
              {employee.hoursPerClient.slice(0, 3).map((client, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground truncate">
                    {client.client}
                  </span>
                  <span className="text-foreground font-medium">
                    {client.hours}h
                  </span>
                </div>
              ))}
              {employee.hoursPerClient.length > 3 && (
                <div className="text-xs text-muted-foreground text-center">
                  +{employee.hoursPerClient.length - 3} outros clientes
                </div>
              )}
            </div>
          </div>

          {/* Expandable tasks section */}
          <div className="w-full border-t pt-3">
            <button
              onClick={handleExpandClick}
              className="flex items-center justify-between w-full text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <span>Tarefas ({employee.tasks?.length || 0})</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {isExpanded && (
              <div className="mt-3 space-y-2 animate-fade-in">
                {employee.tasks?.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between text-xs p-2 bg-muted/30 rounded"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {getStatusIcon(task.status)}
                      <span className="truncate">{task.name}</span>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <span className="font-medium">{task.hours}h</span>
                      <span className="text-muted-foreground text-xs truncate">
                        {task.company}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};