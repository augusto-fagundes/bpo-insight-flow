import { useState } from "react";
import { CompanyCard, Company } from "@/components/companies/CompanyCard";
import { CompanyModal } from "@/components/companies/CompanyModal";

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Tech Solutions Ltd.",
    profitability: 24.5,
    revenue: 125000,
    cost: 94375,
    sector: "Tecnologia",
    monthlyRevenue: [
      { month: "Jan", value: 18000 },
      { month: "Fev", value: 19500 },
      { month: "Mar", value: 21000 },
      { month: "Abr", value: 23000 },
      { month: "Mai", value: 22500 },
      { month: "Jun", value: 21000 },
    ],
    monthlyCost: [
      { month: "Jan", value: 14000 },
      { month: "Fev", value: 15200 },
      { month: "Mar", value: 16800 },
      { month: "Abr", value: 17250 },
      { month: "Mai", value: 15625 },
      { month: "Jun", value: 15500 },
    ],
  },
  {
    id: "2",
    name: "Marketing Pro",
    profitability: 18.2,
    revenue: 98000,
    cost: 80164,
    sector: "Marketing",
    monthlyRevenue: [
      { month: "Jan", value: 15000 },
      { month: "Fev", value: 16200 },
      { month: "Mar", value: 17500 },
      { month: "Abr", value: 16800 },
      { month: "Mai", value: 18000 },
      { month: "Jun", value: 14500 },
    ],
    monthlyCost: [
      { month: "Jan", value: 12500 },
      { month: "Fev", value: 13400 },
      { month: "Mar", value: 14200 },
      { month: "Abr", value: 13800 },
      { month: "Mai", value: 14764 },
      { month: "Jun", value: 11500 },
    ],
  },
  {
    id: "3",
    name: "StartUp Innovation",
    profitability: 31.7,
    revenue: 156000,
    cost: 106548,
    sector: "Inovação",
    monthlyRevenue: [
      { month: "Jan", value: 22000 },
      { month: "Fev", value: 24500 },
      { month: "Mar", value: 26000 },
      { month: "Abr", value: 28000 },
      { month: "Mai", value: 27500 },
      { month: "Jun", value: 28000 },
    ],
    monthlyCost: [
      { month: "Jan", value: 16000 },
      { month: "Fev", value: 17500 },
      { month: "Mar", value: 18200 },
      { month: "Abr", value: 18848 },
      { month: "Mai", value: 18000 },
      { month: "Jun", value: 18000 },
    ],
  },
  {
    id: "4",
    name: "Digital Agency",
    profitability: 15.8,
    revenue: 87000,
    cost: 73254,
    sector: "Digital",
    monthlyRevenue: [
      { month: "Jan", value: 13500 },
      { month: "Fev", value: 14200 },
      { month: "Mar", value: 15000 },
      { month: "Abr", value: 14800 },
      { month: "Mai", value: 15000 },
      { month: "Jun", value: 14500 },
    ],
    monthlyCost: [
      { month: "Jan", value: 11500 },
      { month: "Fev", value: 12200 },
      { month: "Mar", value: 12800 },
      { month: "Abr", value: 12454 },
      { month: "Mai", value: 12300 },
      { month: "Jun", value: 12000 },
    ],
  },
  {
    id: "5",
    name: "Healthcare Group",
    profitability: 22.3,
    revenue: 134000,
    cost: 104082,
    sector: "Saúde",
    monthlyRevenue: [
      { month: "Jan", value: 20000 },
      { month: "Fev", value: 21500 },
      { month: "Mar", value: 23000 },
      { month: "Abr", value: 22500 },
      { month: "Mai", value: 24000 },
      { month: "Jun", value: 23000 },
    ],
    monthlyCost: [
      { month: "Jan", value: 16500 },
      { month: "Fev", value: 17200 },
      { month: "Mar", value: 17800 },
      { month: "Abr", value: 17582 },
      { month: "Mai", value: 18000 },
      { month: "Jun", value: 17000 },
    ],
  },
  {
    id: "6",
    name: "Retail Corp",
    profitability: 8.5,
    revenue: 76000,
    cost: 69540,
    sector: "Varejo",
    monthlyRevenue: [
      { month: "Jan", value: 11500 },
      { month: "Fev", value: 12200 },
      { month: "Mar", value: 13000 },
      { month: "Abr", value: 12800 },
      { month: "Mai", value: 13000 },
      { month: "Jun", value: 13500 },
    ],
    monthlyCost: [
      { month: "Jan", value: 10800 },
      { month: "Fev", value: 11400 },
      { month: "Mar", value: 11900 },
      { month: "Abr", value: 11740 },
      { month: "Mai", value: 11700 },
      { month: "Jun", value: 12000 },
    ],
  },
];

export const Companies = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Rentabilidade por Empresa
        </h1>
        <p className="text-muted-foreground">
          Análise de lucratividade e desempenho financeiro dos clientes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCompanies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onClick={handleCompanyClick}
          />
        ))}
      </div>

      <CompanyModal
        company={selectedCompany}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};