import React, { useState } from "react";
import "../../styles/Mobile/MobileStyles.css";
import { Box, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import MobileForm from "./MobileForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const MobileExpenses = ({ expenses, setExpenses }) => {
  const [open, setOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setOpen(true);
  };
  const handleDelete = (expenseToDelete) => {
    const confirmation = window.confirm(
      "¿Estás seguro que deseas eliminar este gasto?"
    );
    if (confirmation) {
      const newExpenses = expenses.filter(
        (expense) => expense !== expenseToDelete
      );
      setExpenses(newExpenses);
      localStorage.setItem("expenses", JSON.stringify(newExpenses));
    }
  };
  return (
    <div className="mobileExpensesContainer">
      <div className="mobileExpensesHeader">
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{ backgroundColor: "var(--secondary)", fontWeight: "bold", height: "4em", width: "55%", fontSize: "0.8em", padding: "0.5em"}}
          startIcon={<AddCircleOutlineIcon />}
        >
          Nuevo gasto
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              pt: 2,
              px: 4,
              pb: 3,
              width: 350,
            }}
          >
            <MobileForm
              handleClose={handleClose}
              setExpenses={setExpenses}
              editingExpense={editingExpense}
              setEditingExpense={setEditingExpense}
              expenses={expenses}
            />
          </Box>
        </Modal>
        <h1>Gastos</h1>
      </div>
      <div className="mobileExpensesTable">
        {expenses.length > 0 ? (
          <>
            <div className="mobileTableHeader">
              <h3>Nombre</h3>
              <h3>Categoria</h3>
              <h3>Frecuencia</h3>
              <h3>Monto</h3>
              <h3>Acciones</h3>
            </div>
            <div className="mobileTableContent">
              {expenses.map((expense, index) => (
                <div className="mobileTableRow" key={index}>
                  <p>{expense.nombre}</p>
                  <p>{expense.categoria}</p>
                  <p>{expense.frecuencia}</p>
                  <p>${expense.monto}</p>
                  <div className="mobileActionsContainer">
                    <EditIcon
                      style={{ cursor: "pointer", fontSize: "1.5rem" }}
                      onClick={() => handleEdit(expense)}
                    />
                    <DeleteForeverIcon
                      style={{ cursor: "pointer", fontSize: "1.5rem" }}
                      onClick={() => handleDelete(expense)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="mobileNoExpenses">
            <MoneyOffIcon
              style={{ fontSize: "5rem", color: "#454955", paddingTop: "15px" }}
            />
            <p style={{ textAlign: "center", marginTop: "1em", width: "70%" }}>
              Sin gastos, agrega un nuevo gasto para comenzar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default MobileExpenses;
