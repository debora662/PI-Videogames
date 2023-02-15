const { Router } = require('express');
const express = require("express");
const { getGenders } = require("../controllers/getGenders")

const router = express.Router()

router.get('/', async (req, res) => {
    // llamamos al controlador, y segun nos responda respondemos el request
    try {
        const response = await getGenders() 
        res.send(response)
    } catch (error) {
        res.status(400).send({ error: error })
    }
})

module.exports = router

