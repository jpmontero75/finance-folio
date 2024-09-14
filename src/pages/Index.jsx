import React, { useState, useEffect } from "react";
import "./Index.css";
import { Header } from "../components/Header";
import Expenses from "../components/Expenses";
import Situation from "../components/Situation";
import Button from "@mui/material/Button";
import MobileExpenses from "../components/Mobile/MobileExpenses";
import MobileGoal from "../components/Mobile/MobileGoal";
import MobileActual from "../components/Mobile/MobileActual";
import MobileHeader from "../components/Mobile/MobileHeader";

export const Index = () => {
  const [activeComponent, setActiveComponent] = useState("MobileExpenses");
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1024px)").matches
  );
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      return JSON.parse(savedExpenses);
    } else {
      return [];
    }
  });

  const renderComponent = () => {
    switch (activeComponent) {
      case "MobileExpenses":
        return <MobileExpenses expenses={expenses} setExpenses={setExpenses} />;
      case "MobileGoal":
        return <MobileGoal expenses={expenses} setExpenses={setExpenses} />;
      case "MobileActual":
        return <MobileActual expenses={expenses} setExpenses={setExpenses} />;
      default:
        return <MobileExpenses expenses={expenses} setExpenses={setExpenses} />;
    }
  };

  const handleResize = () => {
    setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    mediaQuery.addListener(handleResize);
    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

  return (
    <div className="mainContainer">
      <div className="headerContainer">
        {isMobile ? <MobileHeader /> : <Header /> }
      </div>
      {isMobile ? (
        <div className="mobileContainer">
          <div className="buttonsContainer">
            <Button
              onClick={() => setActiveComponent("MobileExpenses")}
              style={{
                width: "100%",
                borderRadius: "5px",
                backgroundColor:
                  activeComponent === "MobileExpenses"
                    ? "var(--primary)"
                    : "var(--secondary)",
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Gastos
            </Button>
            <Button
              onClick={() => setActiveComponent("MobileActual")}
              style={{
                width: "100%",
                borderRadius: "5px",
                backgroundColor:
                  activeComponent === "MobileActual"
                    ? "var(--primary)"
                    : "var(--secondary)",
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Actual
            </Button>
            <Button
              onClick={() => setActiveComponent("MobileGoal")}
              style={{
                width: "100%",
                borderRadius: "5px",
                backgroundColor:
                  activeComponent === "MobileGoal"
                    ? "var(--primary)"
                    : "var(--secondary)",
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Meta
            </Button>
          </div>
          {renderComponent()}
        </div>
      ) : (
        <div className="sectionsContainer">
          <div className="leftSection">
            <Expenses expenses={expenses} setExpenses={setExpenses} />
          </div>
          <div className="rightSection">
            <Situation expenses={expenses} setExpenses={setExpenses} />
          </div>
        </div>
      )}
    </div>
  );
};
