import generateRandomProds from '../utils/faker'
import {Request , Response } from 'express'

class ViewsController{
    static listProd:Array<any> = []
    constructor(){
        ViewsController.listProd = generateRandomProds()
    }
    
    productsView(req:Request, res:Response) {
        //@ts-ignore
        const nombre = req.session.passport.user.email
        res.render('index', {
            nombre: nombre ,
            listproducts: ViewsController.listProd
        })
    }

    login(req:Request, res:Response) {
        res.render('login/login') 
    }

    loginError(req:Request, res:Response){
        //@ts-ignore
        res.render('login/loginError', { msg: req.session.messages[req.session.messages.length - 1] })
    }

    signupOk(req:Request, res:Response){
        //@ts-ignore
        res.render('login/signupOk')
    }

    signupError(req:Request, res:Response){
        //@ts-ignore
        res.render('login/signupError', { msg: req.session.messages[req.session.messages.length - 1] })
    }

    logout (req:Request, res:Response)  {
        //@ts-ignore
        const nombre = req.session.passport.user.email
        req.session.destroy(function (err:any) {
            res.render('login/logout', {nombre: nombre })
        });
    }
}


export default new ViewsController()