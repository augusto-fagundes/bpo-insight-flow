import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Target, Building2, CheckSquare, Settings } from "lucide-react";
import { EmployeeForm } from "./forms/EmployeeForm";
import { TaskForm } from "./forms/TaskForm";
import { GoalForm } from "./forms/GoalForm";
import { CompanyForm } from "./forms/CompanyForm";
import { GeneralSettings } from "./forms/GeneralSettings";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Painel de Administração
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:block">Colaboradores</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              <span className="hidden sm:block">Tarefas</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:block">Metas</span>
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:block">Empresas</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:block">Geral</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="mt-6">
            <EmployeeForm />
          </TabsContent>

          <TabsContent value="tasks" className="mt-6">
            <TaskForm />
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <GoalForm />
          </TabsContent>

          <TabsContent value="companies" className="mt-6">
            <CompanyForm />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <GeneralSettings />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};