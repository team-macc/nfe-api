import {Router} from './router'
import * as mongoose from 'mongoose'
import {NotFoundError} from 'restify-errors'

export abstract class ModelRouter<D extends mongoose.Document> extends Router{
    constructor(protected  model: mongoose.Model<D>){
        super()
    }

    validateId = (req, resp, next)=>{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            next(new NotFoundError('Document not found.'))
        }else{
            next()
        }
    }

    findAll = (req, resp, next)=>{       
        this.model.find().then(this.renderAll(resp,next))
            .catch(next)        
    }

    findById = (req, resp, next)=>{
        this.model.findById(req.params.id).then(this.render(resp,next))
        .catch(next)
    }    

    save = (req, resp, next)=>{
        let document = new this.model(req.body)
        document.save().then(this.render(resp,next))
        .catch(next)
    }

    replace = (req,resp, next)=>{
        const options ={overwrite: true, runValidatord: true}
        this.model.update({_id:req.params.id}, req.body, options)
        .exec().then(result=>{
            if(result.n){
                return this.model.findById(req.params.id)
            }else{
                throw new NotFoundError('Documento não encontrado')
            }

        }).then(this.render(resp,next))
        .catch(next)
        
    }

    update = (req,resp, next)=>{
        const options = {new: true, runValidatord: true}
        this.model.findByIdAndUpdate(req.params.id, req.body,options)
          .then(this.render(resp,next))
          .catch(next)
    }

    delete = (req,resp, next)=>{            
        this.model.deleteOne({_id:req.params.id}).exec()
        .then((cmdResult)=>{
            if(cmdResult.n){
                resp.send(204)                   

            }else{
                resp.send(404)
            }

            return next()
        }).catch(next)
    }

} 