import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get('/products', async (req, res) => {
    const products = await prisma.product.findMany({
        include: {
            category: true
        }
    });
    res.json(products);
});

//obtener un producto
router.get('/products/:id', async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            category: true
        }
    });
    if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
});

router.post('/products', async (req, res) => {
    const newProduct = await prisma.product.create({
        data: req.body
    });
    res.json(newProduct);
});

//actualizar un producto
router.put('/products/:id', async (req, res) => {
    const updatedProduct = await prisma.product.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    });
    if (!updatedProduct) {
        return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(updatedProduct);
});

//eliminar un producto
router.delete('/products/:id', async (req, res) => {
    const deletedProduct = await prisma.product.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    if (!deletedProduct) {
        return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(deletedProduct);
});


export default router;