
import { json } from "express";
import { query } from "mssql";
import { restart } from "nodemon";
import { getConnection, sql,queries } from "../database";

export const getProducts = async (req, res) => {
    try {
        const pool = await getConnection()
        let result = await pool.request().query(queries.getAllProducts)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.sent(error.message)
    }
}

export const createNewProduct = async (req, res) => {
    const { name, description } = req.body
    let { quantity } = req.body

    if (name == null || description == null) {
        return res.status(400).json({ msg: 'bad request. please fill all fields' })
    }

    if (quantity == null) quantity = 0

    try {
        const pool = await getConnection()
        await pool.request()
            .input("name", sql.VarChar, name)
            .input("description", sql.Text, description)
            .input("quantity", sql.Int, quantity)
            .query(queries.addNewProduct)

        res.json({ name, description, quantity })
    } catch (error) {
        res.status(500)
        res.sent(error.message)
    }
}

export const getProductById = async (req, res) =>{
    const {id} = req.params

    const pool = await getConnection()
    const result = await pool.request()
    .input("id", id)
    .query(queries.getProduct)

    res.json(result.recordset[0])

}


export const deleteProductById = async (req, res) =>{
    const {id} = req.params

    const pool = await getConnection()
    const result = await pool.request()
    .input("id", id)
    .query(queries.deleteProduct)
    
    res.sendStatus(204)

}

export const getCountProducts = async (req,res) =>{
    const pool = await getConnection()
    const result = await pool.request().query(queries.getTotalProduct)
    res.json(result.recordset[0][""]);
}

export const updateProductById = async (req,res) =>{
    const {id} = req.params
    const {name, description, quantity} = req.body

    if(name == null || description == null || quantity == null){
        return res.status(400).json({message:"bad request. Please fill all fields"})
    }

    try{
        const pool = await getConnection()
        await pool.request()
        .input("name",sql.VarChar,name)
        .input("description",sql.Text,description)
        .input("quantity",sql.Int,quantity)
        .input("id",sql.Int,id)
        .query(queries.updateProduct)

        res.json({name, description, quantity})

    }catch(error){
        res.status(500)
        res.sendStatus(error.message)
    }
}