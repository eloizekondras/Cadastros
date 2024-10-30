const express = require('express')
const router = express.Router()
const ProdutoController = require('../controllers/ProdutoController')

router.get('/adicionar', ProdutoController.criarProduto)
router.post('/adicionar', ProdutoController.criarProdutoPost)
router.post('/remover', ProdutoController.removeProduto)
router.get('/editar/:id', ProdutoController.atualizarProduto);
router.post('/editar', ProdutoController.atualizarProdutoPost);
router.post('/atualizarstatus', ProdutoController.atualizarStatus)
router.get('/', ProdutoController.mostrarProdutos)

module.exports = router