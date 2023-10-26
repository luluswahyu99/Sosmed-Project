const {Post, Tag, User, PostTag} = require('../models')
const Sequelize = require('sequelize')

class Controller{
    static async post(req, res) {
        const {id} = req.session.user
        try {
            const {error} = req.query
            res.render('post', {error, id})
        } catch (error) {
            res.send(error.message)
        }
    }

    static async createPost(req, res) {
        const {userId} = req.params
        try {
            const {title, description, tag} = req.body
            let img = ''
            if(req.file !== undefined) {
                const image = req.file.path
                let imgs = image.split('\\')
                img = imgs[1]
            }
            let idPost = await Post.create({title, description, imgUrl: img, UserId: +userId});
            await Tag.cekTag(tag)
            const findTag = await Tag.findAll({where:{name: tag}})
            await PostTag.create({PostId: +idPost.id,  TagId: +findTag[0].id})
            res.redirect('/home')
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const err = error.errors.map(el => {
                    return el.message
                }) 
                res.redirect(`/${+userId}/post?error=${err}`)
            } else {
                res.send(error.message)
            }
        }
    }

    static async home(req, res) {
        const {id} = req.session.user
        try {
            const data = await Post.findAll({include: Tag})
            res.render('home', {data, id})
        } catch (error) {
            res.send(error.message)
        }
    }
    static async like(req, res) {
        try {
            const {postId} = req.params
            await Post.increment({like: 1}, {where: {id: +postId}})
            res.redirect('/home')
        } catch (error) {
            res.send(error)
        }
    }

    static async profile(req, res) {
        try {
            
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = Controller