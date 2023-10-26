const {User} = require("../models")
const bcrypt = require('bcryptjs')
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
            // res.redirect(`/login`)
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static loginForm(req, res){
        res.render("login")
    }

    static async loginVerification(req, res){
        const {username, password} = req.body;
        try {
            const verifUsername = await User.findOne({
                where: {
                    username: username,
                }
            })
            if(!verifUsername) res.send("Username atau password salah");
            const verifPassword = bcrypt.compareSync(password, verifUsername.password)
            res.send("login berhasil")
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }
}

module.exports = Controller