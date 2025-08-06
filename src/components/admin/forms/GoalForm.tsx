import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const GoalForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetValue: "",
    currentValue: "",
    unit: "",
    category: "",
    deadline: "",
    responsible: "",
    priority: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Meta cadastrada!",
      description: `${formData.title} foi adicionada com sucesso.`,
    });

    setFormData({
      title: "",
      description: "",
      targetValue: "",
      currentValue: "",
      unit: "",
      category: "",
      deadline: "",
      responsible: "",
      priority: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Cadastrar Nova Meta
        </CardTitle>
        <CardDescription>
          Defina uma nova meta para acompanhamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Título da Meta *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ex: Aumentar receita mensal"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Descreva os detalhes da meta..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetValue">Valor Alvo *</Label>
              <Input
                id="targetValue"
                type="number"
                step="0.01"
                value={formData.targetValue}
                onChange={(e) => handleInputChange("targetValue", e.target.value)}
                placeholder="Ex: 100000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentValue">Valor Atual</Label>
              <Input
                id="currentValue"
                type="number"
                step="0.01"
                value={formData.currentValue}
                onChange={(e) => handleInputChange("currentValue", e.target.value)}
                placeholder="Ex: 75000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unidade de Medida</Label>
              <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reais">Reais (R$)</SelectItem>
                  <SelectItem value="percentual">Percentual (%)</SelectItem>
                  <SelectItem value="horas">Horas</SelectItem>
                  <SelectItem value="clientes">Clientes</SelectItem>
                  <SelectItem value="projetos">Projetos</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financeira">Financeira</SelectItem>
                  <SelectItem value="produtividade">Produtividade</SelectItem>
                  <SelectItem value="qualidade">Qualidade</SelectItem>
                  <SelectItem value="crescimento">Crescimento</SelectItem>
                  <SelectItem value="eficiencia">Eficiência</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Prazo *</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange("deadline", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsible">Responsável</Label>
              <Select value={formData.responsible} onValueChange={(value) => handleInputChange("responsible", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ana-silva">Ana Silva</SelectItem>
                  <SelectItem value="carlos-santos">Carlos Santos</SelectItem>
                  <SelectItem value="maria-oliveira">Maria Oliveira</SelectItem>
                  <SelectItem value="pedro-ferreira">Pedro Ferreira</SelectItem>
                  <SelectItem value="equipe-geral">Equipe Geral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="critica">Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Cadastrar Meta
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};