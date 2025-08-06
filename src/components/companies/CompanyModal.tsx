import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Company } from "./CompanyCard";
import { TrendingUp, TrendingDown, DollarSign, Calendar, BarChart3, Target, Percent } from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface CompanyModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyModal = ({ company, isOpen, onClose }: CompanyModalProps) => {
  if (!company) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const profit = company.revenue - company.cost;
  const isPositive = company.profitability > 0;

  // Combine revenue and cost data for chart
  const chartData = company.monthlyRevenue.map((revenue, index) => ({
    month: revenue.month,
    receita: revenue.value,
    custo: company.monthlyCost[index]?.value || 0,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Análise Detalhada da Empresa</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with company info */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{company.name}</h3>
              <Badge variant="outline" className="mt-2">
                {company.sector}
              </Badge>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                {isPositive ? (
                  <TrendingUp className="h-5 w-5 text-success" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
                <span className={`text-2xl font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  {company.profitability.toFixed(1)}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Lucratividade</p>
            </div>
          </div>

          {/* Financial metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="font-medium text-success">Receita Total</span>
              </div>
              <p className="text-2xl font-bold text-success">{formatCurrency(company.revenue)}</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Custo Total</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(company.cost)}</p>
            </div>

            <div className={`${isPositive ? 'bg-success/10 border-success/20' : 'bg-destructive/10 border-destructive/20'} border rounded-lg p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className={`h-4 w-4 ${isPositive ? 'text-success' : 'text-destructive'}`} />
                <span className={`font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>Lucro</span>
              </div>
              <p className={`text-2xl font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(profit)}
              </p>
            </div>
          </div>

          {/* Additional insights metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">Var. Mensal</span>
              </div>
              <p className={`text-xl font-bold ${
                company.monthlyProfitabilityVariation > 0 ? 'text-success' : 
                company.monthlyProfitabilityVariation < 0 ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                {company.monthlyProfitabilityVariation > 0 ? '+' : ''}{company.monthlyProfitabilityVariation.toFixed(1)}%
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-600">Var. Acumulada</span>
              </div>
              <p className={`text-xl font-bold ${
                company.cumulativeProfitabilityVariation > 0 ? 'text-success' : 
                company.cumulativeProfitabilityVariation < 0 ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                {company.cumulativeProfitabilityVariation > 0 ? '+' : ''}{company.cumulativeProfitabilityVariation.toFixed(1)}%
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-amber-600" />
                <span className="font-medium text-amber-600">Ticket Médio</span>
              </div>
              <p className="text-xl font-bold text-amber-700">{formatCurrency(company.averageTicket)}</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-600">Contribuição</span>
              </div>
              <p className="text-xl font-bold text-purple-700">{company.totalRevenueContribution.toFixed(1)}%</p>
            </div>
          </div>

          {/* Historical chart */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h4 className="text-lg font-semibold">Histórico Financeiro</h4>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      tickFormatter={formatCurrency}
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        formatCurrency(value),
                        name === "receita" ? "Receita" : "Custo"
                      ]}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="receita"
                      stroke="hsl(var(--success))"
                      strokeWidth={3}
                      name="Receita"
                    />
                    <Line
                      type="monotone"
                      dataKey="custo"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={3}
                      name="Custo"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-end pt-4">
            <Button className="bg-primary hover:bg-primary/90">
              Ver Análise Completa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};