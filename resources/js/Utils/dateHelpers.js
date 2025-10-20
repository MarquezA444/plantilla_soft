/**
 * Formatea una fecha para usarla en un input type="date"
 * Convierte cualquier formato de fecha a YYYY-MM-DD
 * 
 * @param {string|Date|null|object} dateString - La fecha a formatear
 * @returns {string} Fecha en formato YYYY-MM-DD o string vacío
 */
export const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    
    // Si es un objeto con propiedades date/formatted, extraer el valor
    if (typeof dateString === 'object' && dateString !== null) {
        if (dateString.date) dateString = dateString.date;
        else if (dateString.formatted) dateString = dateString.formatted;
        else if (dateString.toString) dateString = dateString.toString();
    }
    
    // Si ya está en formato correcto (YYYY-MM-DD), devolverlo directamente
    if (typeof dateString === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
    }
    
    // Si es un objeto Date o string de fecha, convertirlo
    try {
        let date;
        
        // Si es string en formato YYYY-MM-DD, parsearlo manualmente
        if (typeof dateString === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateString)) {
            const [year, month, day] = dateString.split('-').map(Number);
            date = new Date(year, month - 1, day);
        } else {
            date = new Date(dateString);
        }
        
        if (!isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    } catch (e) {
        console.error('Error formateando fecha:', dateString, e);
    }
    
    return '';
};

/**
 * Formatea una fecha para mostrarla en la UI
 * 
 * @param {string|Date|null|object} dateString - La fecha a formatear
 * @param {object} options - Opciones de formato
 * @returns {string} Fecha formateada para mostrar
 */
export const formatDateForDisplay = (dateString, options = {}) => {
    if (!dateString) return 'Sin fecha';
    
    // Si es un objeto con propiedades date/formatted, extraer el valor
    if (typeof dateString === 'object' && dateString !== null) {
        if (dateString.date) dateString = dateString.date;
        else if (dateString.formatted) dateString = dateString.formatted;
        else if (dateString.toString) dateString = dateString.toString();
    }
    
    const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
    };
    
    try {
        // Si es string en formato YYYY-MM-DD, parsearlo manualmente para evitar problemas de zona horaria
        if (typeof dateString === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            const [year, month, day] = dateString.split('-').map(Number);
            const date = new Date(year, month - 1, day); // mes es 0-indexed
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString('es-ES', defaultOptions);
            }
        }
        
        // Para otros formatos, usar constructor normal
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            return date.toLocaleDateString('es-ES', defaultOptions);
        }
    } catch (e) {
        console.error('Error formateando fecha para display:', dateString, e);
    }
    
    return 'Fecha inválida';
};

/**
 * Verifica si una fecha está vencida
 * 
 * @param {string|Date|null|object} dateString - La fecha a verificar
 * @returns {boolean} true si la fecha está vencida
 */
export const isDateOverdue = (dateString) => {
    if (!dateString) return false;
    
    // Si es un objeto con propiedades date/formatted, extraer el valor
    if (typeof dateString === 'object' && dateString !== null) {
        if (dateString.date) dateString = dateString.date;
        else if (dateString.formatted) dateString = dateString.formatted;
        else if (dateString.toString) dateString = dateString.toString();
    }
    
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let targetDate;
        
        // Si es string en formato YYYY-MM-DD, parsearlo manualmente para evitar problemas de zona horaria
        if (typeof dateString === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            const [year, month, day] = dateString.split('-').map(Number);
            targetDate = new Date(year, month - 1, day); // mes es 0-indexed
        } else {
            targetDate = new Date(dateString);
        }
        
        targetDate.setHours(0, 0, 0, 0);
        
        return !isNaN(targetDate.getTime()) && targetDate < today;
    } catch (e) {
        console.error('Error verificando fecha vencida:', dateString, e);
        return false;
    }
};
