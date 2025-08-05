import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Employee } from "./EmployeeCard";
import { Clock, TrendingUp, Building } from "lucide-react";

interface EmployeeModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EmployeeModal = ({ employee, isOpen, onClose }: EmployeeModalProps) => {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Colaborador</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with photo and basic info */}
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={employee.photo} alt={employee.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {employee.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{employee.name}</h3>
              <p className="text-muted-foreground">{employee.position}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {employee.productivity}% produtividade
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">Total de Horas</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{employee.totalHours}h</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-4 w-4 text-primary" />
                <span className="font-medium">Empresas Atendidas</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{employee.companies.length}</p>
            </div>
          </div>

          {/* Hours per client */}
          <div>
            <h4 className="font-semibold mb-3">Horas por Cliente</h4>
            <div className="space-y-2">
              {employee.hoursPerClient.map((client, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-md">
                  <span className="text-sm">{client.client}</span>
                  <Badge variant="secondary">{client.hours}h</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Companies details */}
          <div>
            <h4 className="font-semibold mb-3">Empresas com Horas Dedicadas</h4>
            <div className="space-y-2">
              {employee.companies.map((company, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-md">
                  <span className="text-sm">{company.name}</span>
                  <Badge variant="outline">{company.hours}h</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-end pt-4">
            <Button className="bg-primary hover:bg-primary/90">
              Ver Relatório Completo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};