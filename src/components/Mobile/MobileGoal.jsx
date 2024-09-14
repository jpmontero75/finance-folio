import React, { useEffect, useState } from "react";
import PieChart from "../Charts/PieChart";
import CountUp from "react-countup";

export const MobileExpenses = ({ expenses, setExpenses }) => {
  const [income, setIncome] = useState(0);

  const totalGastos = expenses.reduce((total, expense) => {
    if (expense.categoria === "Fijo") {
      switch (expense.frecuencia) {
        case "Mensual":
          total += Number(expense.monto);
          break;
        case "Bimestral":
          total += Number(expense.monto) / 2;
          break;
        case "Trimestral":
          total += Number(expense.monto) / 3;
          break;
        case "Semestral":
          total += Number(expense.monto) / 6;
          break;
        case "Anual":
          total += Number(expense.monto) / 12;
          break;
        default:
          break;
      }
      return total;
    } else {
      return total;
    }
  }, 0);
  const totalOcio = expenses.reduce((total, expense) => {
    if (expense.categoria === "Ocio") {
      switch (expense.frecuencia) {
        case "Mensual":
          total += Number(expense.monto);
          break;
        case "Bimestral":
          total += Number(expense.monto) / 2;
          break;
        case "Trimestral":
          total += Number(expense.monto) / 3;
          break;
        case "Semestral":
          total += Number(expense.monto) / 6;
          break;
        case "Anual":
          total += Number(expense.monto) / 12;
          break;
        default:
          break;
      }
      return total;
    } else {
      return total;
    }
  }, 0);
  const totalAhorro = expenses.reduce((total, expense) => {
    if (expense.categoria === "Ahorro") {
      switch (expense.frecuencia) {
        case "Mensual":
          total += Number(expense.monto);
          break;
        case "Bimestral":
          total += Number(expense.monto) / 2;
          break;
        case "Trimestral":
          total += Number(expense.monto) / 3;
          break;
        case "Semestral":
          total += Number(expense.monto) / 6;
          break;
        case "Anual":
          total += Number(expense.monto) / 12;
          break;
        default:
          break;
      }
      return total;
    } else {
      return total;
    }
  }, 0);

  const idealOcio = income * 0.3;
  const idealAhorro = income * 0.2;
  const idealGastos = income * 0.5;

  const saldoOcio = idealOcio - totalOcio;
  const saldoAhorro = idealAhorro - totalAhorro;
  const saldoGastos = idealGastos - totalGastos;

  useEffect(() => {
    const localIncome = JSON.parse(localStorage.getItem("income"));
    if (localIncome) {
      setIncome(localIncome);
    }
  }, []);
  return (
    <div className="mobileMainContainer">
      <div className="actualData">
        <div className="chartContainer">
          <h2>Estrategia ideal</h2>
          <PieChart series={[idealOcio, idealAhorro, idealGastos]} />
        </div>
        <div className="chartContainer P1">
          <div className="dataItem">
            <div className="label">
              <h2>Ideales</h2>
            </div>
            <div className="values">
              <div className="value">
                <h3>Ocio</h3>
                <p>
                  $<CountUp start={0} end={idealOcio} duration={1} />
                </p>
              </div>
              <div className="value">
                <h3>Ahorro</h3>
                <p>
                  $<CountUp start={0} end={idealAhorro} duration={1} />
                </p>
              </div>
              <div className="value">
                <h3>Gastos fijos</h3>
                <p>
                  $<CountUp start={0} end={idealGastos} duration={1} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="chartContainer P1">
          <div className="dataItem">
            <div className="label">
              <h2>Estatus</h2>
            </div>
            <div>
              <div className="value">
                <h3>Ocio</h3>
                <p style={{ color: saldoOcio >= 0 ? "#11772d" : "#ff0000" }}>
                  {saldoOcio >= 0 ? "Positivo" : "Negativo"}
                </p>
              </div>
              <div className="value">
                <h3>Ahorro</h3>
                <p style={{ color: saldoAhorro >= 0 ? "#11772d" : "#ff0000" }}>
                  {saldoAhorro >= 0 ? "Positivo" : "Negativo"}
                </p>
              </div>
              <div className="value">
                <h3>Gastos fijos</h3>
                <p style={{ color: saldoGastos >= 0 ? "#11772d" : "#ff0000" }}>
                  {saldoGastos >= 0 ? "Positivo" : "Negativo"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <a href="https://www.buymeacoffee.com/jpmontero">
          <img
            src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=jpmontero&button_colour=5F7FFF&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"
            alt="Buy me a pizza"
          />
        </a>
      </div>
    </div>
  );
};
export default MobileExpenses;
