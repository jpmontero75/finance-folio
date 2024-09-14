import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/Situation.css";
import { TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import InputAdornment from "@mui/material/InputAdornment";
import InfoIcon from "@mui/icons-material/Info";
import PieChart from "../components/Charts/PieChart";
import CountUp from "react-countup";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 100,
  },
});

export const Situation = ({ expenses, setExpenses }) => {
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
    <div className="situationMainContainer">
      <div className="situationHeader">
        <div className="income">
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
        <div className="expenses">
          <h2>Gastos fijos: ${totalGastos.toFixed(2)}</h2>
        </div>
      </div>
      <div className="situationData">
        <div className="C1 chartItem">
          <h2>Estrategia Ideal</h2>
          <PieChart series={[idealOcio, idealAhorro, idealGastos]} />
        </div>
        <div className="C2 chartItem">
          <h2>Estado Actual</h2>
          <PieChart series={[totalOcio, totalAhorro, totalGastos]} />
        </div>
        <div className="D1 chartItem">
          <div className="dataItem">
            <div className="label">
              <CustomWidthTooltip title="Cuanto deberias de estar gastando en cada categoria" placement="top" arrow>
              <h2>Presupuesto</h2>
              </CustomWidthTooltip>
            </div>
            <div className="values">
              <div className="value">
                <h3>Ocio</h3>
                <p>
                  $<CountUp start={0} end={idealOcio} duration={2} />
                </p>
              </div>
              <div className="value">
                <h3>Ahorro</h3>
                <p>
                  $<CountUp start={0} end={idealAhorro} duration={2} />
                </p>
              </div>
              <div className="value">
                <h3>Gastos fijos</h3>
                <p>
                  $<CountUp start={0} end={idealGastos} duration={2} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="D2 chartItem">
          <div className="dataItem">
            <div className="label">
            <CustomWidthTooltip title="Cuanto estas gastando en cada categoria." placement="top" arrow>
              <h2>Actuales</h2>
              </CustomWidthTooltip>
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
        <div className="D3 chartItem">
          <div className="dataItem">
            <div className="label">
              <h2>Estatus</h2>
            </div>
            <div className="values">
              <div className="value">
                <h3>Ocio</h3>
                <p style={{ color: saldoOcio >= 0 ? "#11772d" : "#ff0000" }}>{saldoOcio >= 0 ? "Positivo" : "Negativo"}</p>
              </div>
              <div className="value">
                <h3>Ahorro</h3>
                <p style={{ color: saldoAhorro >= 0 ? "#11772d" : "#ff0000" }}>{saldoAhorro >= 0 ? "Positivo" : "Negativo"}</p>
              </div>
              <div className="value">
                <h3>Gastos fijos</h3>
                <p style={{ color: saldoGastos >= 0 ? "#11772d" : "#ff0000" }}>{saldoGastos >= 0 ? "Positivo" : "Negativo"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="D4 chartItem">
          <div className="dataItem">
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
    </div>
  );
};
export default Situation;
