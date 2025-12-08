import { pool } from "../config/db.js";

// Obtener todos los empleados
export const getAllEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employees');

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron empleados para mostrar' });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener un empleado por ID
export const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM employees WHERE id=?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `El empleado con el id: ${id} no existe`
            });
        }

        res.status(200).json({
            message: 'Empleado encontrado',
            employee: rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar empleado',
            error: error.message
        });
    }
};

// Crear un nuevo empleado
export const createEmployee = async (req, res) => {
    const { name, salary } = req.body;

    // Validar campos (opcional o requeridos según tu lógica)
    if (!name && !salary) {
        return res.status(400).json({
            message: 'Debes enviar al menos un campo: name o salary'
        });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO employees (name, salary) VALUES (?, ?)',
            [name ?? null, salary ?? null] // usar null si no se envía
        );

        const newId = result.insertId;

        const [rows] = await pool.query('SELECT * FROM employees WHERE id=?', [newId]);

        res.status(201).json({
            message: 'Empleado creado con éxito',
            newEmployee: rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al insertar un empleado',
            error: error.message
        });
    }
};

// Actualizar un empleado existente
export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM employees WHERE id=?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No existe el empleado con id: ${id}`
            });
        }

        const currentEmployee = rows[0];

        // Si algún campo no se envía, conservar el valor actual
        const newName = name ?? currentEmployee.name;
        const newSalary = salary ?? currentEmployee.salary;

        await pool.query(
            'UPDATE employees SET name=?, salary=? WHERE id=?',
            [newName, newSalary, id]
        );

        const [updatedRows] = await pool.query('SELECT * FROM employees WHERE id=?', [id]);

        res.status(200).json({
            message: 'Empleado actualizado correctamente',
            employee: updatedRows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar empleado',
            error: error.message
        });
    }
};

// Eliminar un empleado
export const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM employees WHERE id=?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No existe el empleado con id ${id}`
            });
        }

        const deletedEmployee = rows[0];

        await pool.query('DELETE FROM employees WHERE id=?', [id]);

        res.status(200).json({
            message: 'Empleado eliminado con éxito',
            deletedEmployee
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar empleado',
            error: error.message
        });
    }
};
