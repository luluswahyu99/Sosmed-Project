const {Post, Tag, User, PostTag, Profile} = require('../models')
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
        const {id} = req.session.user
        try {
            const {title, description, tag} = req.body
            let img = ''
            if(req.file !== undefined) {
                const image = req.file.path
                let imgs = image.split('\\')
                img = imgs[1]
            }
            let idPost = await Post.create({title, description, imgUrl: img, UserId: id});
            await Tag.cekTag(tag)
            const findTag = await Tag.findAll({where:{name: tag}})
            await PostTag.create({PostId: +idPost.id,  TagId: +findTag[0].id})
            res.redirect('/home')
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const err = error.errors.map(el => {
                    return el.message
                }) 
                res.redirect(`/${id}/post?error=${err}`)
            } else {
                res.send(error.message)
            }
        }
    }

    static async home(req, res) {
        const {id, username, role} = req.session.user
        // console.log(res.session)
        console.log(req.session.user)
        try {
            const data = await Post.findAll({include: Tag})
            res.render('home', {data, id, username, role})
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
            const {username} = req.params
            const data = await User.findAll({include: [{model: Post}, {model: Profile}] ,where:{username: username}})
            res.send(data)
        } catch (error) {
            res.send(error.message)
        }
    }

    static async addProfile(req, res) {
        const {id} = req.session.user
        try {
            const {error} = req.query
            res.render('add-profile', {error, id})
        } catch (error) {
            res.send(error.message)
        }
    }

    static async addProfileData(req, res) {
        const {id} = req.session.user
        try {
            const {firstName, lastName, bornDate, address, image} = req.body;
            console.log(req.body,'<<<ini body')
            let img = ''
            console.log(req.file, "<<<ini file")
            if(req.file !== undefined) {
                const image = req.file.path
                let imgs = image.split('\\')
                img = imgs[1]
            }
            // console.log(img)
            await Profile.create({firstName, lastName, bornDate, address, imgProfile: img, UserId: id});
            res.redirect('/home')
            
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const err = error.errors.map(el => {
                    return el.message
                }) 
                res.redirect(`/profileAdd?error=${err}`)
            } else {
                res.send(error.message)
            }
        }
    }
}

module.exports = Controller