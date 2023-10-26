const {Post, Tag, User, PostTag} = require('../models')
const Sequelize = require('sequelize')

class Controller{
    static async post(req, res) {
        try {
            res.render('post')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async createPost(req, res) {
        try {
            const {title, description, tag} = req.body
            const {userId} = req.params
            const image = req.file.path
            const img = image.split('\\')
            await Tag.cekTag(tag)
            const findTag = await Tag.findAll({where:{name: tag}})
            let idPost = await Post.create({title, description, imgUrl: img[1], UserId: +userId});
            await PostTag.create({PostId: +idPost.id,  TagId: +findTag[0].id})
            res.redirect('/home')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async home(req, res) {
        const {id} = req.session.user
        // console.log(res.session)
        console.log(req.session.user)
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