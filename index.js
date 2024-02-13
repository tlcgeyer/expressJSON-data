import express from 'express'
import axios from 'axios'

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

//Fetch all education data(this is where we specify what content of the json file we want to retrieve)
router.get('/education', async (req, res)=> {
    // let {education} = await (await fetch 
    //     (dataURL)).json()
    // AN example with AXIOS
    let response = await axios.get(dataURL)
    //to access the data
    let {education} = await response.data
        res.json({
            status: res.statusCode,
            education
        })
})
//calling forth only one specific set of data via the index
router.get('/education/:id', async (req, res) => {
    let response = await fetch(dataURL)
    let {education} = await response.json()
    let params = +req.params.id
    let index = params > 0 ? params - 1 : 0
    res.json({
        status: res.statusCode,
        education: education[index]
    })
})

//making use of POST(which adds in a new set of data)
router.post('/addEducation', async (req, res)=> {
        let response = await axios.post(
        dataURL, {
            id: 3,
            year: new Date().getFullYear(),
            info: "Front-End Development Libraries Certificate.",
            img: ""
        }
    )
    let {education} = response.data;//accessing the data property of the response
    res.json({education}); //sending the education data in the response
    res.status(200).json({ success: true });
    
})
//making use of PATCH(updates the data(eg.spelling error))
router.patch('/updateEducation', (req, res)=>{

})
//making use of DELETE(Deletes data)
router.delete('/deleteEducation', (req, res)=>{

})
app.listen(port , ()=> {
    console.log(`Server is running on port ${port}`);
})