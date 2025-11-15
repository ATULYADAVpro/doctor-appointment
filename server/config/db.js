import { connect } from "mongoose"

export default async function connectDb() {
    try {

        await connect(process.env.DB_URL)
        console.log(`database started.`)
    } catch (error) {
        console.log(error.message)
    }
}