import { Box, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import "../styles/Expenses.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import Form from "./Form";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const Expenses = ({ expenses, setExpenses }) => {
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
    <div className="expensesMainContainer">
      <div className="expensesContent">
        <div className="expensesHead">
          <h1>Gastos</h1>
          <Button
            variant="contained"
            onClick={handleOpen}
            style={{ backgroundColor: "var(--secondary)" }}
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
                width: 550,
              }}
            >
              <Form
                handleClose={handleClose}
                setExpenses={setExpenses}
                editingExpense={editingExpense}
                setEditingExpense={setEditingExpense}
                expenses={expenses}
              />
            </Box>
          </Modal>
        </div>
        <div className="expensesTable">
          {expenses.length > 0 ? (
            <>
              <div className="tableHeader">
                <h3>Nombre</h3>
                <h3>Categoria</h3>
                <h3>Frecuencia</h3>
                <h3>Monto</h3>
                <h3>Acciones</h3>
              </div>
              <div className="tableContent">
                {expenses.map((expense, index) => (
                  <div className="tableRow" key={index}>
                    <p>{expense.nombre}</p>
                    <p>{expense.categoria}</p>
                    <p>{expense.frecuencia}</p>
                    <p>${expense.monto}</p>
                    <div className="actionsContainer">
                      <EditIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(expense)}
                      />
                      <DeleteForeverIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(expense)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="noExpenses">
              <MoneyOffIcon
                style={{
                  fontSize: "5rem",
                  color: "#454955",
                  paddingTop: "15px",
                }}
              />
              <p style={{ textAlign: "center", marginTop: "1em" }}>
                Sin datos, agrega un nuevo gasto para comenzar.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Expenses;
