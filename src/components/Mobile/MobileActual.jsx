import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import "../../styles/Mobile/MobileStyles.css";
import PieChart from "../Charts/PieChart";
import CountUp from "react-countup";
import InfoIcon from "@mui/icons-material/Info";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export const MobileActual = ({ expenses, setExpenses }) => {
  const [income, setIncome] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleIncomeChange = (event) => {
    setIncome(Number(event.target.value));
    localStorage.setItem("income", JSON.stringify(Number(event.target.value)));
  };

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
      <div className="mobileActualHeader">
        <div className="mobileIncome">
          <TextField
            id="monthlyIncome"
            label="Ingresos mensuales"
            placeholder="0.00"
            type="number"
            size="small"
            value={income || ""}
            onChange={handleIncomeChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="mobileExpenses">
          <h2>Gastos fijos: ${totalGastos.toFixed(2)}</h2>
        </div>
      </div>
      <div className="actualData">
        <div className="chartContainer">
        <h2>Estado Actual</h2>
          <PieChart series={[totalOcio, totalAhorro, totalGastos]} />
        </div>
        <div className="chartContainer">
          <div className="dataItem">
            <div className="label">
              <h2>Gasto actual</h2>
            </div>
            <div className="values">
              <div className="value">
                <h3>Ocio</h3>
                <p>
                  $<CountUp start={0} end={totalOcio} duration={1} />
                </p>
              </div>
              <div className="value">
                <h3>Ahorro</h3>
                <p>
                  $<CountUp start={0} end={totalAhorro} duration={1} />
                </p>
              </div>
              <div className="value">
                <h3>Gastos fijos</h3>
                <p>
                  $<CountUp start={0} end={totalGastos} duration={1} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="chartContainer L1">
            <div className="label">
              <h2>
                <InfoIcon
                  fontSize="small"
                  style={{ color: "#454955", padding: "1px" }}
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                />
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: "none",
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography
                    sx={{ p: 1 }}
                    variant="body2"
                    style={{ maxWidth: "150px" }}
                  >
                    Cuanto dinero te falta o te sobra para llegar a tu meta
                  </Typography>
                </Popover>
                Saldo
              </h2>
            </div>
            <div className="values">
              <div className="value">
                <h3>Ocio</h3>
                <p style={{ color: saldoOcio >= 0 ? "#11772d" : "#ff0000" }}>
                  $<CountUp start={0} end={saldoOcio} duration={2} />
                </p>
              </div>
              <div className="value">
                <h3>Ahorro</h3>
                <p style={{ color: saldoAhorro >= 0 ? "#11772d" : "#ff0000" }}>
                  $<CountUp start={0} end={saldoAhorro} duration={2} />
                </p>
              </div>
              <div className="value">
                <h3>Gastos fijos</h3>
                <p style={{ color: saldoGastos >= 0 ? "#11772d" : "#ff0000" }}>
                  $<CountUp start={0} end={saldoGastos} duration={2} />
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};
export default MobileActual;
