import app from './app'

if(!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

try {
    app.listen(PORT, (): void => {
        console.log(`server running on ${PORT}`)
    })
} catch (error: any) {
    console.log(`error occurred: ${error.message}`)
}