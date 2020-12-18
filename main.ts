import {Server} from './server/server.js'
import {nfesRouter} from './nfes/nfes.router'

const server = new Server()
server.bootstrap([nfesRouter]).then(()=>{
    console.log('Server is listening on:', server.application.address())
}).catch((error)=>{
    console.log('Server failed to start')
    console.log(error)
    process.exit(1)
})