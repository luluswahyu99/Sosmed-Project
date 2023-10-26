const Helper = require('../helper');
const {Post, Tag, User, PostTag, Profile} = require('../models')
const { Op } = require("sequelize");

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
        // console.log(req.session.user)
        try {
            const {tag} = req.query
            let data
            if (tag) {
                data = await Post.findAll({include: {
                    model: Tag,
                    where: {
                        name : {
                            [Op.iLike]: `%${tag}%`
                        }
                    }
                }})
            } else {
                data = await Post.findAll({include: Tag})
            }
            res.render('home', {data, id, username, role})
            // res.send(data)
            // console.log(data)
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
            const dataProfile = await User.findAll({include: [{model: Profile},{model: Post, include: Tag}], where: {username: username}})
            // const dataPost = await User.findAll({include:Post, where: {username: username}})
            const data = dataProfile[0]
            const fullName = Helper.fullName(data.Profile.firstName, data.Profile.lastName)
            const posts = data.Posts
            res.render('profile', {data, posts, fullName})
            // console.log(data)
            // res.send(data)
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
        const { id } = req.session.user;
        try {


            const {firstName, lastName, bornDate, address} = req.body;
            let img = ''
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
              return el.message;
            });
            res.redirect(`/profileAdd?error=${err}`);
          } else {
            res.send(error.message);
          }
        }
    }

    static async deletePost(req, res) {
        try {
            const {postId} = req.params
            await Post.destroy({
                where: {
                    id: postId
                }
            })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async editProfile(req, res) {
        try {
            const {error} = req.query
            const {username} = req.params
            const data = await User.findAll({include: Profile, where: {username: username}})
            res.render('edit-profile', {data, error})
        } catch (error) {
            res.send(error.message)
        }
    }

    static async updateProfile(req, res) {
        const {username} = req.params
        try {
            const {firstName, lastName, bornDate, address} = req.body;
            
            let img = ''
            if(req.file !== undefined) {
                const image = req.file.path
                let imgs = image.split('\\')
                img = imgs[1]
                await Profile.update({firstName, lastName, bornDate, address, imgProfile: img}, {where: {username: +username}});
            }
            await Profile.update({firstName, lastName, bornDate, address}, {where: {username: +username}})
            // console.log(img)
            res.redirect('/home')
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const err = error.errors.map(el => {
                  return el.message;
                });
                res.redirect(`/profile/${username}/edit?error=${err}`);
              } else {
                res.send(error.message);
              }
        }
    }
}

module.exports = Controller