import { useState } from "react";
import { EmployeeCard, Employee } from "@/components/employees/EmployeeCard";
import { EmployeeModal } from "@/components/employees/EmployeeModal";

// Import employee photos
import anaPhoto from "@/assets/ana-silva.jpg";
import carlosPhoto from "@/assets/carlos-santos.jpg";
import mariaPhoto from "@/assets/maria-oliveira.jpg";
import pedroPhoto from "@/assets/pedro-ferreira.jpg";

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Ana Silva",
    photo: anaPhoto,
    position: "Analista Financeiro Sênior",
    totalHours: 168,
    hoursPerClient: [
      { client: "Tech Solutions", hours: 45 },
      { client: "Marketing Pro", hours: 38 },
      { client: "StartUp Innovation", hours: 42 },
      { client: "Digital Agency", hours: 43 },
    ],
    productivity: 94,
    companies: [
      { name: "Tech Solutions Ltd.", hours: 45 },
      { name: "Marketing Pro", hours: 38 },
      { name: "StartUp Innovation", hours: 42 },
      { name: "Digital Agency", hours: 43 },
    ],
  },
  {
    id: "2",
    name: "Carlos Santos",
    photo: carlosPhoto,
    position: "Contador",
    totalHours: 152,
    hoursPerClient: [
      { client: "Retail Corp", hours: 55 },
      { client: "Manufacturing Ltd", hours: 48 },
      { client: "Service Provider", hours: 49 },
    ],
    productivity: 87,
    companies: [
      { name: "Retail Corp", hours: 55 },
      { name: "Manufacturing Ltd", hours: 48 },
      { name: "Service Provider", hours: 49 },
    ],
  },
  {
    id: "3",
    name: "Maria Oliveira",
    photo: mariaPhoto,
    position: "Controladora Financeira",
    totalHours: 176,
    hoursPerClient: [
      { client: "Healthcare Group", hours: 52 },
      { client: "Education Institute", hours: 41 },
      { client: "Tech Startup", hours: 46 },
      { client: "Consulting Firm", hours: 37 },
    ],
    productivity: 96,
    companies: [
      { name: "Healthcare Group", hours: 52 },
      { name: "Education Institute", hours: 41 },
      { name: "Tech Startup", hours: 46 },
      { name: "Consulting Firm", hours: 37 },
    ],
  },
  {
    id: "4",
    name: "Pedro Ferreira",
    photo: pedroPhoto,
    position: "Consultor Financeiro",
    totalHours: 144,
    hoursPerClient: [
      { client: "Investment Fund", hours: 48 },
      { client: "Real Estate Co", hours: 52 },
      { client: "Construction LLC", hours: 44 },
    ],
    productivity: 89,
    companies: [
      { name: "Investment Fund", hours: 48 },
      { name: "Real Estate Co", hours: 52 },
      { name: "Construction LLC", hours: 44 },
    ],
  },
];

export const Employees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Desempenho por Colaborador
        </h1>
        <p className="text-muted-foreground">
          Acompanhe o desempenho e produtividade da equipe
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onClick={handleEmployeeClick}
          />
        ))}
      </div>

      <EmployeeModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};