/* eslint-disable prettier/prettier */
import axios from './axios';

// Accesos
/**
 * @url POST /auth
 * @since 1.0
 */

export const sigin = (payload) => axios.post('/auth/login', payload);
export const me = () => axios.post('/auth/me');
export const logout = (payload) => axios.post('/auth/logout', payload);

/**
 * @url POST /access:username
 * @since 1.0
 */
export const createAccessUser = (username, payload) => axios.post(`/access/${username}`, payload);
//export const addUser = (payload) => axios.post('/access/adduser', payload);

/**
 * @url GET /access
 * @since 1.0
 */
export const fetchAccess = () => axios.get('/access');

/**
 * @url GET /access:username
 * @since 1.0
 */
export const getAccessUser = (username, payload) => axios.get(`/access/${username}`, payload);

/**
 * @url PUT /access:username
 * @since 1.0
 */
export const updateAccessUser = (username, payload) => axios.put(`/access/${username}`, payload);

// Usuarios
/**
 * @url GET /users
 * @since 1.0
 */
export const fetchUsers = () => axios.get('/users');

export const getAcess = () => axios.get('/access');
export const getPosition = () => axios.get('/role');
/**
 * @url PUT /users/:dni
 * @since 1.0
 */
export const updateUser = (id, payload) => axios.put(`/users/${id}`, payload);
/*

/**
 * @url POST /users
 * @since 1.0
 */
export const createUser = (payload) => axios.post('/users', payload);

/**
 * @url POST /users/patients
 * @since 1.0
 */
export const createPatients = (payload) => axios.post('/users/patients', payload);

/**
 * @url GET /users/:id
 * @since 1.0
 */
export const getUser = (dni) => axios.get(`/users/${dni}`);

/**
 * @url DELETE /users/:id
 * @since 1.0
 */
export const deleteUser = (dni) => axios.delete(`/users/${dni}`);

/**
 * @url GET /category
 * @since 1.0
 */
export const getCategory = () => axios.get('/category');

/**
 * @url GET /category/billing
 * @since 1.0
 */
export const getCategoryBilling = () => axios.get('/category/billing');

/**
 * @url GET /priority
 * @since 1.0
 */
export const getPriority = () => axios.get('/priority');
/**
 * @url POST /tickets
 * @since 1.0
 */
export const countStatusTicket = () => axios.get(`/tickets/countStatus`);

/**
 * @url POST /tickets
 * @since 1.0
 */
export const createTicket = (payload) => axios.post('/tickets', payload);

/**
 * @url POST /tickets
 * @since 1.0
 */
export const getTicket = (ticketId) => axios.get(`/tickets/${ticketId}`);

/**
 * @url PUT tickets/:ticketId/photo
 * @since 1.0
 */
export const createTicketPhoto = (ticketId) => axios.post(`/tickets/${ticketId}/photo`);

/**
 * @url PUT tickets/:ticketId/photo
 * @since 1.0
 */
export const getUserTicket = (userId) => axios.get(`/tickets/user/${userId}`);

/**
 * @url PUT tickets/:ticketId/photo
 * @since 1.0
 */
export const getTickets = () => axios.get(`/tickets/`);

/**
 * @url PUT /users/:dni
 * @since 1.0
 */
export const updateTicket = (ticketId, payload) => axios.put(`/tickets/${ticketId}`, payload);
/*

/**
 * @url DELETE /users/:id
 * @since 1.0
 */
export const deleteTicket = (ticketId) => axios.delete(`/tickets/${ticketId}`);
/** */

export const countStatusTicketBilling = () => axios.get(`/ticketsBilling/countStatus`);

/**
 * @url POST /tickets
 * @since 1.0
 */
export const createTicketBilling = (payload) => axios.post('/ticketsBilling', payload);

/**
 * @url POST /tickets
 * @since 1.0
 */
export const getTicketBilling = (ticketId) => axios.get(`/ticketsBilling/${ticketId}`);

/**
 * @url PUT tickets/:ticketId/photo
 * @since 1.0
 */
export const createTicketBillingPhoto = (ticketId) => axios.post(`/ticketsBilling/${ticketId}/photo`);

/**
 * @url PUT tickets/:ticketId/photo
 * @since 1.0
 */
export const getUserTicketBilling = (userId) => axios.get(`/ticketsBilling/user/${userId}`);

/**
 * @url PUT tickets/:ticketId/photo
 * @since 1.0
 */
export const getTicketsBilling = () => axios.get(`/ticketsBilling/`);

/**
 * @url PUT /users/:dni
 * @since 1.0
 */
export const updateTicketBilling = (ticketId, payload) => axios.put(`/ticketsBilling/${ticketId}`, payload);
/*

/**
 * @url DELETE /users/:id
 * @since 1.0
 */
export const deleteTicketBilling = (ticketId) => axios.delete(`/ticketsBilling/${ticketId}`);
/** */

/**
 * @url PUT tickets/:ticketId/photo
 * @since 1.0
 */
export const getPhoto = (filename) => axios.get(`/photos/${filename}`);
/** */
