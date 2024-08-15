import { pool } from '../config/database.js';

export const createUser = async (user) => {
    const connection = await pool.getConnection();
    try {
        const { first_name, last_name, middle_name, email, phone, profile_image } = user;

        const query = `
        INSERT INTO users (first_name, last_name, middle_name, email, phone, profile_image)
        VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await connection.execute(query, [
            first_name,
            last_name,
            middle_name,
            email,
            phone,
            profile_image,
        ]);
    } catch (error) {
        console.error('Error in createUser:', error);
        throw error;
    } finally {
        connection.release();
    }
};
