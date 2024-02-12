import express from 'express'

//Express App
const app = express()

// Port
const port = +process.env.PORT || 4000

//Router
const router = express.Router()

//JSON URL
const dataURL = "https://tlcgeyer.github.io/vue.portfolioData-tlg/data/"
//Application Middleware
app.use(
    router
)

// / => home 
router.get('^/$|/ejd', (req, res) => {
    res.json({
        status: res.statusCode,
        msg: 'For you reader, welcome home.'
    })
})

//Fetch all education data
router.get('/education', async (req, res)=> {
    let {education} = await (await fetch 
        (dataURL)).json()
        res.json({
            status: res.statusCode,
            education
        })
})
app.listen(port , ()=> {
    console.log(`Server is running on port ${port}`);
})