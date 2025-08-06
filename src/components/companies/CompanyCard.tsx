import { TrendingUp, TrendingDown, DollarSign, BarChart3, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export interface Company {
  id: string;
  name: string;
  profitability: number;
  revenue: number;
  cost: number;
  monthlyRevenue: { month: string; value: number }[];
  monthlyCost: { month: string; value: number }[];
  sector: string;
  monthlyProfitabilityVariation: number;
  cumulativeProfitabilityVariation: number;
  averageTicket: number;
  totalRevenueContribution: number;
  trend: 'up' | 'down' | 'stable';
}

interface CompanyCardProps {
  company: Company;
  onClick: (company: Company) => void;
}

export const CompanyCard = ({ company, onClick }: CompanyCardProps) => {
  const profit = company.revenue - company.cost;
  const isPositive = company.profitability > 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getProfitabilityColor = (profitability: number) => {
    if (profitability >= 20) return "text-success";
    if (profitability >= 10) return "text-warning";
    return "text-destructive";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => onClick(company)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{company.name}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {company.sector}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Profitability indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Lucratividade</span>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={`font-bold ${getProfitabilityColor(company.profitability)}`}>
                {company.profitability.toFixed(1)}%
              </span>
            </div>
          </div>
          <Progress 
            value={Math.max(0, company.profitability)} 
            className="h-2"
          />
        </div>

        {/* New insights metrics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Variação Mensal</span>
            <div className="flex items-center gap-1">
              {getTrendIcon(company.trend)}
              <span className={`text-xs font-medium ${
                company.monthlyProfitabilityVariation > 0 ? 'text-success' : 
                company.monthlyProfitabilityVariation < 0 ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                {company.monthlyProfitabilityVariation > 0 ? '+' : ''}{company.monthlyProfitabilityVariation.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Ticket Médio</span>
            <span className="text-xs font-semibold">
              {formatCurrency(company.averageTicket)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Contribuição Total</span>
            <div className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3 text-primary" />
              <span className="text-xs font-semibold text-primary">
                {company.totalRevenueContribution.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Financial summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Receita</span>
            <span className="font-semibold text-success">
              {formatCurrency(company.revenue)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Custo</span>
            <span className="font-semibold text-muted-foreground">
              {formatCurrency(company.cost)}
            </span>
          </div>
          
          <div className="border-t pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Lucro</span>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-success" />
                <span className={`font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  {formatCurrency(profit)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};