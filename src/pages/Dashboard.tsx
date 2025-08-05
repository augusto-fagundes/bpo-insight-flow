import { DollarSign, TrendingUp, TrendingDown, Users } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do desempenho do BPO Financeiro
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Faturamento Total"
          value="R$ 195.000"
          subtitle="Este mês"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        
        <StatCard
          title="Contas a Receber"
          value="R$ 87.500"
          subtitle="Pendentes"
          icon={TrendingUp}
          trend={{ value: 8.2, isPositive: true }}
        />
        
        <StatCard
          title="Contas a Pagar"
          value="R$ 52.300"
          subtitle="Vencimento próximo"
          icon={TrendingDown}
          trend={{ value: -3.1, isPositive: false }}
        />
        
        <StatCard
          title="Colaboradores Ativos"
          value="24"
          subtitle="Trabalhando"
          icon={Users}
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Quick Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Contas a Receber</h3>
          <div className="space-y-3">
            {[
              { client: "Tech Solutions Ltd.", value: 25000, date: "15/06/2024" },
              { client: "Marketing Pro", value: 18500, date: "20/06/2024" },
              { client: "StartUp Innovation", value: 32000, date: "25/06/2024" },
              { client: "Digital Agency", value: 12000, date: "30/06/2024" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-sm">{item.client}</p>
                  <p className="text-xs text-muted-foreground">Venc: {item.date}</p>
                </div>
                <span className="font-semibold text-success">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Contas a Pagar</h3>
          <div className="space-y-3">
            {[
              { supplier: "Fornecedor A", value: 15000, date: "10/06/2024" },
              { supplier: "Prestador de Serviços B", value: 8500, date: "12/06/2024" },
              { supplier: "Software License", value: 22000, date: "18/06/2024" },
              { supplier: "Office Supplies", value: 6800, date: "22/06/2024" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-sm">{item.supplier}</p>
                  <p className="text-xs text-muted-foreground">Venc: {item.date}</p>
                </div>
                <span className="font-semibold text-foreground">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};