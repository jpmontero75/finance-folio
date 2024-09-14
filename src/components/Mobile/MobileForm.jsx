import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from "react";

const MobileForm = ({
  handleClose,
  setExpenses,
  editingExpense,
  setEditingExpense,
  expenses,
}) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [monto, setMonto] = useState("");

  const [formData, setFormData] = useState(
    editingExpense || {
      nombre: nombre,
      categoria: categoria,
      frecuencia: frecuencia,
      monto: monto,
    }
  );

  const handleChange = (setter) => (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setter(value);
  };
  const closeModal = () => {
    handleClose();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let newExpenses;
    if (editingExpense) {
      newExpenses = expenses.map((expense) =>
        expense === editingExpense ? formData : expense
      );
    } else {
      newExpenses = [...expenses, formData];
    }
    setExpenses(newExpenses);
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
    setEditingExpense(null);
    handleClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
        maxWidth: "300px",
        margin: "auto", 
      }}
    >
      <Typography variant="h4" align="left" gutterBottom>
        Nuevo Gasto
      </Typography>
      <TextField
        name="nombre"
        value={formData.nombre}
        onChange={handleChange(setNombre)}
        label="Nombre"
        variant="outlined"
        required
      />
      <FormControl variant="outlined" sx={{ m: 1, minWidth: "100%" }} required>
        <InputLabel id="categoria">Categoría</InputLabel>
        <Select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange(setCategoria)}
          label="Categoría"
        >
          <MenuItem value="Fijo">Gasto Fijo</MenuItem>
          <MenuItem value="Ocio">Ocio</MenuItem>
          <MenuItem value="Ahorro">Ahorro</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: "100%" }} required>
        <InputLabel id="frecuencia">Frecuencia</InputLabel>
        <Select
          name="frecuencia"
          label="Frecuencia"
          value={formData.frecuencia}
          onChange={handleChange(setFrecuencia)}
        >
          <MenuItem value="Mensual">Mensual</MenuItem>
          <MenuItem value="Bimestral">Bimestral</MenuItem>
          <MenuItem value="Trimestral">Trimestral</MenuItem>
          <MenuItem value="Semestral">Semestral</MenuItem>
          <MenuItem value="Anual">Anual</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="monto"
        label="Monto"
        type="number"
        variant="outlined"
        required
        value={formData.monto}
        onChange={handleChange(setMonto)}
        inputProps={{
          pattern: "\\d*", // Solo permite dígitos
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>
        <Button sx={{ mr: 1.5 }} onClick={closeModal}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" sx={{ backgroundColor: "var(--secondary)"}}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default MobileForm;
