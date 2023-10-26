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
        const {errors} = req.query;
        let error;
        if(errors){
            error = errors.split(',')
        }
        res.render("register", {error})
    }

    static async registerAuth(req, res){
        const {username, email, password} = req.body;
        
        try {
            const dataUser = await User.create({username, email, password})
            res.send("Login berhasil")
            // res.redirect(`/login`)
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                const errors = error.errors.map(item => {
                    return item.message
                })
                res.redirect(`/register?errors=${errors}`)
            }
            
        }
    }

    static loginForm(req, res){
        const {msg} = req.query;
        res.render("login", {msg})
    }

    static async loginVerification(req, res){
        const {username, password} = req.body;

        try {
            const account = await User.findOne({
                where: {
                    username: username,
                }
            })
            const msg = "Username atau password salah"
            if(!account) return res.redirect(`/login?msg=${msg}`);

            const verifPassword = bcrypt.compareSync(password, account.password)

            if(verifPassword) {
                req.session.user = {id: account.id, role: account.role}
                res.redirect("/test")
            }else {
                return res.redirect(`/login?msg=${msg}`);
            }
            
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }
}

module.exports = Controller