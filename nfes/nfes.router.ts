import * as restify from 'restify';
import {Nfe} from './nfes.model'
import {ModelRouter} from '../common/model-router'
import { NotFoundError } from 'restify-errors';
import {authorize} from '../security/authz.handler'


class NfesRouter extends ModelRouter<Nfe>{
    constructor(){
        super(Nfe)
    }

    findItems = (req, resp, next)=>{
        Nfe.findById(req.params.id, "+items").then(
            order=>{
                if(!order){
                    throw new NotFoundError('Order not Found')
                }else{
                    resp.json(order.items)
                    return next()
                }
            }
        ).catch(next)
    }

    replaceItems = (req, resp, next)=>{
        Nfe.findById(req.params.id).then(
            nfe=>{
                if(!nfe){
                    throw new NotFoundError('Nfe not Found')
                }else{
                    nfe.items = req.body
                    return nfe.save()
                }
            }
        ).then(nfe=>{
            resp.json(nfe.items)
            return next()
        }).catch(next)
    }


      findByEmail = (req, resp, next)=>{        
        if(req.query.email){
            Nfe.findByEmail(req.query.email)
              .then(nfe => nfe ? [nfe] : [])
              .then(this.renderAll(resp,next))
              .catch(next)              
        }else{
          next()
        }
      }

    applyRoutes(application: restify.Server) {
        console.log('****************ORDER ROUTERS****************')        
        application.get('/nfes',[authorize,this.findByEmail, this.findAll])
        application.get('/nfes/:id', [authorize,this.validateId, this.findById])
        application.post('/nfes',[authorize,this.save])
        application.put('/nfes/:id', [authorize,this.validateId,this.replace])
        application.patch('/nfes/:id', [authorize,this.validateId,this.update])
        application.del('/nfes/:id', [authorize,this.validateId,this.delete])
        application.get('/nfes/:id/items', [authorize,this.validateId,this.findItems])
        application.put('/nfes/:id/items', [authorize,this.validateId, this.replaceItems])
    }
}

export const nfesRouter = new NfesRouter()