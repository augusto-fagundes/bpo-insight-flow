import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Save, Settings, Bell, Clock, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const GeneralSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    companyName: "BPO Financeiro",
    workingHoursStart: "08:00",
    workingHoursEnd: "18:00",
    currency: "BRL",
    timezone: "America/Sao_Paulo",
    emailNotifications: true,
    taskReminders: true,
    weeklyReports: false,
    autoBackup: true,
    defaultHourlyRate: "50.00",
    overtimeMultiplier: "1.5"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Configurações salvas!",
      description: "As configurações gerais foram atualizadas com sucesso.",
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Configurações da Empresa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações da Empresa
          </CardTitle>
          <CardDescription>
            Informações básicas da organização
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nome da Empresa</Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              placeholder="Nome da sua empresa"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workingHoursStart">Horário de Início</Label>
              <Input
                id="workingHoursStart"
                type="time"
                value={settings.workingHoursStart}
                onChange={(e) => handleInputChange("workingHoursStart", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workingHoursEnd">Horário de Término</Label>
              <Input
                id="workingHoursEnd"
                type="time"
                value={settings.workingHoursEnd}
                onChange={(e) => handleInputChange("workingHoursEnd", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Moeda</Label>
              <Select value={settings.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                  <SelectItem value="USD">Dólar Americano (US$)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Fuso Horário</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                  <SelectItem value="America/New_York">Nova York (GMT-4)</SelectItem>
                  <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações Financeiras */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Configurações Financeiras
          </CardTitle>
          <CardDescription>
            Valores e políticas financeiras padrão
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultHourlyRate">Valor/Hora Padrão (R$)</Label>
              <Input
                id="defaultHourlyRate"
                type="number"
                step="0.01"
                value={settings.defaultHourlyRate}
                onChange={(e) => handleInputChange("defaultHourlyRate", e.target.value)}
                placeholder="50.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overtimeMultiplier">Multiplicador Hora Extra</Label>
              <Input
                id="overtimeMultiplier"
                type="number"
                step="0.1"
                value={settings.overtimeMultiplier}
                onChange={(e) => handleInputChange("overtimeMultiplier", e.target.value)}
                placeholder="1.5"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </CardTitle>
          <CardDescription>
            Configure as notificações do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações por E-mail</Label>
              <p className="text-sm text-muted-foreground">
                Receba atualizações importantes por e-mail
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Lembretes de Tarefas</Label>
              <p className="text-sm text-muted-foreground">
                Receba lembretes sobre tarefas pendentes
              </p>
            </div>
            <Switch
              checked={settings.taskReminders}
              onCheckedChange={(checked) => handleInputChange("taskReminders", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Relatórios Semanais</Label>
              <p className="text-sm text-muted-foreground">
                Receba relatórios automáticos semanalmente
              </p>
            </div>
            <Switch
              checked={settings.weeklyReports}
              onCheckedChange={(checked) => handleInputChange("weeklyReports", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Backup Automático</Label>
              <p className="text-sm text-muted-foreground">
                Fazer backup automático dos dados diariamente
              </p>
            </div>
            <Switch
              checked={settings.autoBackup}
              onCheckedChange={(checked) => handleInputChange("autoBackup", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>
    </form>
  );
};