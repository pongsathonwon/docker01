import { Request, Response } from "express"
import db from "../db/db"
import { AppError } from "../lib/AppError"
import { BaseContact } from "../types"

export const getAllContact = (req: Request, res: Response) => {
    try {
        const data = db.getAll()
        res.status(200).json({ data })
    } catch (err) {
        if (err instanceof AppError) {
            res.status(err.statusCode).json({ message: err.message })
            return
        }
        res.send(500).json({ message: String(err) })
    }
}
export const getContactById = (req: Request<{ id: string }>, res: Response) => {
    try {
        const validId = db.validateParams(req.params.id)
        const [_, data] = db.getById(validId)
        res.status(200).json({ data })
    } catch (err) {
        if (err instanceof AppError) {
            res.status(err.statusCode).json({ message: err.message })
            return
        }
        res.send(500).json({ message: String(err) })
    }
}

export const createContact = (req: Request<{}, {}, BaseContact>, res: Response) => {
    try {
        const body = req.body
        db.add(body)
        res.sendStatus(201)
    } catch (err) {
        if (err instanceof AppError) {
            res.status(err.statusCode).json({ message: err.message })
            return
        }
        res.send(500).json({ message: String(err) })
    }
}

export const updateContact = (req: Request<{ id: string }, {}, Partial<BaseContact>>, res: Response) => {
    try {
        const { id } = req.params
        const validId = db.validateParams(id)
        const newData = db.update(validId, req.body)
        res.status(200).json(newData)
    } catch (err) {
        if (err instanceof AppError) {
            res.status(err.statusCode).json({ message: err.message })
            return
        }
        res.send(500).json({ message: String(err) })
    }
}

export const deleteContact = (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params
        const validId = db.validateParams(id)
        db.delete(validId)
        res.sendStatus(204)
    } catch (err) {
        if (err instanceof AppError) {
            res.status(err.statusCode).json({ message: err.message })
            return
        }
        res.send(500).json({ message: String(err) })
    }
}

