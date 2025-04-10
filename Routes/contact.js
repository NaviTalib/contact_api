import express from 'express';
import { deleteContactById, getAllContacts, getSingleContact, newContact, updateContactById } from '../Controllers/contact.js';
import { isAuthenticated } from '../Middlewares/Auth.js';

const router = express.Router();

// new contact
// @api des : - create new contact
// @api method : - POST
// @api url : - /api/contact/new

router.post('/new',isAuthenticated,newContact)

// @api des : - get all contacts
// @api method : - GET
// @api url : - /api/contact/all
router.get('/',isAuthenticated ,getAllContacts);


// @api des : - get single contact
// @api method : - GET
// @api url : - /api/contact/:id
router.get('/:id',isAuthenticated, getSingleContact);

// @api des : - update contact by id
// @api method : - PUT
// @api url : - /api/contact/:id
router.put('/:id',isAuthenticated,updateContactById);

// @api des : - delete contact by id
// @api method : - DELETE       
// @api url : - /api/contact/:id
router.delete('/:id',isAuthenticated,deleteContactById)



export default router;