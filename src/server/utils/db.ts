import mongoose, { LeanDocument, ObjectId} from 'mongoose'

export type Doc = LeanDocument<mongoose.Document & {
    _id: string| ObjectId
    createdAt?: string | Date
    updatedAt?: string | Date
}>

/*
* redyState {
*     disconnected: 0,
*     connected: 1,
*     connecting: 2,
*     disconnecting: 3,
*     uninitialized: 99,
* }
*/

interface Connection {
    isConnected: number
}

class DB {
    private connection: Connection

    public constructor() {
        this.connection = {
            isConnected: 0
        }
    }

    private readyStateLogger() {
        console.log(`DB current readyState = ${this.connection.isConnected}`)
    }

    public async connect() {
        if (!process.env.MONGODB_URI) {
            console.log('mongo db uri not found')
            return
        }

        if (this.connection.isConnected) {
            console.log('mongodb was already connected')
            return
        }

        if (mongoose.connections.length > 0) {
            this.connection.isConnected = mongoose.connections[0].readyState

            if (this.connection.isConnected === 1) {
                console.log('use previous connection')
                return
            }

            await mongoose.disconnect()
            console.log('mongoose disconnected')
            this.readyStateLogger()
        }

        const db = await mongoose.connect(process.env.MONGODB_URI)
        this.connection.isConnected = db.connections[0].readyState
        this.readyStateLogger()
    }

    public async disconnect() {
        if (
            this.connection.isConnected &&
            process.env.NODE_ENV === 'production'
        ) {
            await mongoose.disconnect()
            this.connection.isConnected = 0
            console.log('mongoose disconnected')
        } else {
            console.log('not disconnected (env = development)')
            this.readyStateLogger()
        }
    }

    public convertDocToObj(doc: Doc) {
        doc._id = String(doc._id)
        doc.createdAt = String(doc.createdAt)
        doc.updatedAt = String(doc.updatedAt)
        return doc
    }
}

export default new DB()