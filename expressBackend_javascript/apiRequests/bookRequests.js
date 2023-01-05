import axios from "axios";
const baseUrl = "http://localhost:3001/books/";

export const getAllBooks = async (authHeader) => {
    const response = await axios.get(`${baseUrl}`, authHeader);
    return response.data;
};

export const deleteBookFromDb = async (id, authHeader) => {
    const response = await axios.delete(`${baseUrl}`, { data: {id}, ...authHeader });
    console.log(response.data);
    return response.data;
};

export const updateBookInDb = async (book, authHeader) => {
    const response = await axios.put(`${baseUrl}`, book, authHeader);
    console.log(response.data);
    return response.data;
};

export const addBookInDb = async (newBook, authHeader) => {
    const response = await axios.post(`${baseUrl}`, newBook, authHeader);
    return response.data;
};
