"use client";

import React from "react";
import { EmployeeCard, EmployeeData } from "./EmployeeCard";

interface EmployeeGridProps {
  employees: EmployeeData[];
  onOpenProfile: (employee: EmployeeData) => void;
}

export const EmployeeGrid: React.FC<EmployeeGridProps> = ({ employees, onOpenProfile }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {employees.map((emp) => (
        <EmployeeCard key={emp.name} employee={emp} onOpenProfile={onOpenProfile} />
      ))}
    </div>
  );
};
