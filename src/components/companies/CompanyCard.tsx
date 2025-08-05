import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
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