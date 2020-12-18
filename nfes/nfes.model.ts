import * as mongoose from 'mongoose'

export interface NfeItem extends mongoose.Document{
    description: string,
    quantity: number,
    price: number,
    idProduto: string
}

export interface NfeModel extends mongoose.Model<Nfe> {
    findByEmail(email: string): Promise<Nfe>
  }

export interface Nfe extends mongoose.Document{
    userEmail: string,
    items: NfeItem[],
    date: Date,
    status: string,
    prefeitura: string,
    cnpjEmissor: string,
    cpfCnpjDestino: string,
    total: number,
}

const nfeItemSchema = new mongoose.Schema(
    {
        description:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        idProduto: {
            type: String,
            required: true
        }
    }
)

const nfeSchema = new mongoose.Schema(
    {
        userEmail:{
            type: String,
            required: true
        },
        items: {
            type: [nfeItemSchema],
            required: false,
            select: true,
            default: []
        },
        date:{
            type: Date,
            required: true
        },
        status:{
            type: String,
            enum: ['Done','Waiting','Send'],
            require:true,
            default:'Waiting'
        },
        cnpjEmissor:{
            type: String,
            required: true,
            default: '55.555.555/0001-55'
        },
        cpfCnpjDestino:{
            type: String,
            required: true,
            default: '888.888.888-99'
        },
        total:{
            type: Number,
            required:true,
            default: 0
        }
    }
)

nfeSchema.statics.findByEmail = function(userEmail: string){
    return this.findOne({userEmail}) //{email: email}
  }

export const Nfe = mongoose.model<Nfe, NfeModel>('Nfe', nfeSchema)