const {User} = require("../models");
const { use } = require("../routes");

class Controller{
    static async createPost(req, res) {
        try {
            res.render('post')
        } catch (error) {
            res.send(error.message)
        }
    }

    static registerForm(req, res){
        res.render("register")
    }

    static async registerAuth(req, res){
        const {username, email, password} = req.body;
        try {
            const dataUser = await User.create({username, email, password})
            res.send("Login berhasil")
            // res.redirect(`/userProfile/add?id=${dataUser.id}`)
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static loginForm(req, res){
        res.render("login")
    }

    static async loginVerification(req, res){
        const {email, password} = req.body;
        try {
            const dataUser = await User.findOne({
                where: {
                    email: email,
                    password: password
                }
            })
            res.send("login berhasil")
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }
}

module.exports = Controller