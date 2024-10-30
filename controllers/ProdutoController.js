const Produto = require('../models/Produto');

module.exports = class ProdutoController {
    static criarProduto(req, res) {
        res.render('produtos/criar');
    }

    static async criarProdutoPost(req, res) {

        const produto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            quantidade: req.body.quantidade,
            precoUnitario: req.body.precoUnitario,
            categoria: req.body.categoria,
        };

        if (!produto.nome || !produto.descricao || !produto.quantidade || !produto.precoUnitario || !produto.categoria) {
            return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos');
        }

        try {
            await Produto.create(produto);
            res.redirect('/produtos');
        } catch (err) {
            console.log('Erro ao criar produto:', err);
            res.status(500).send('Erro ao criar produto');
        }
    }
    static mostrarProdutos(req, res) {
        Produto.findAll({ raw: true })
            .then((data) => {
                const nenhumProduto = data.length === 0;
                res.render('produtos/todas', { produtos: data, nenhumProduto });
            })
            .catch((err) => console.log('Erro ao buscar produtos:', err));
    }

    static async removeProduto(req, res) {
        const id = req.body.id;

        try {
            await Produto.destroy({ where: { id: id } });
            res.redirect('/produtos');
        } catch (err) {
            console.log('Erro ao remover produto:', err);
            res.status(500).send('Erro ao remover produto');
        }
    }
    static atualizarProduto(req, res) {
        const id = req.params.id;
        console.log("ID recebido para atualização:", id);

        Produto.findOne({ where: { id: id }, raw: true })
            .then((data) => {
                if (!data) {
                    console.log("Produto não encontrado.");
                    return res.status(404).send('Produto não encontrado');
                }
                res.render('produtos/editar', { produto: data });
            })
            .catch((err) => console.log('Erro ao buscar produto para edição:', err));
    }
    static async atualizarProdutoPost(req, res) {
        const id = req.body.id;

        const produtoAtualizado = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            quantidade: req.body.quantidade,
            precoUnitario: req.body.precoUnitario,
            categoria: req.body.categoria,
        };

        try {
            const [updatedRows] = await Produto.update(produtoAtualizado, { where: { id: id } });

            if (updatedRows === 0) {
                console.log("Produto não encontrado ou nenhum dado foi alterado.");
                return res.status(404).send('Produto não encontrado ou nenhum dado foi alterado.');
            }

            res.redirect('/produtos');
        } catch (err) {
            console.log('Erro ao atualizar produto:', err);
            res.status(500).send('Erro ao atualizar produto');
        }
    }

    static async atualizarStatus(req, res) {
        const id = req.body.id;
        const produto = {
            concluida: req.body.concluida === '0' ? true : false,
        };

        try {
            await Produto.update(produto, { where: { id: id } });
            res.redirect('/produtos');
        } catch (err) {
            console.log('Erro ao atualizar status do produto:', err);
            res.status(500).send('Erro ao atualizar status do produto');
        }
    }
};