const express = require('express')

const app = express()
port = 3000

app.set('view engine', 'hbs')
app.use('/assets', express.static(__dirname + '/assets'))
app.use(express.urlencoded({extended: false}))



let isLogin = true
let myProject = []

app.get('/', function(request, response){


    response.render('index',{myProject})

    // console.log(myProject);
})

app.get('/form', function(request, response){
    response.render('form')
})

app.get('/detail-project/:index', function (request, response) {
    let index = request.params.index
    let project = {
        name : myProject[index].name,
        message : myProject[index].message,
        startDate : myProject[index].startDate,
        endDate : myProject[index].endDate,
        duration : myProject[index].duration,
        check1 : myProject[index].check1,
        check2 : myProject[index].check2,
        check3 : myProject[index].check3,
        check4 : myProject[index].check4

    }
    response.render('detail-project', { index, project})
})

app.get('/delete-project/:index', function (request, response) {
    let index = request.params.index
    // console.log(index);

    myProject.splice(index, 1)
    // console.log(addProject);

    response.redirect('/')
})


app.get('/add-project', function(request, response){
    response.render('add-project')
})




app.post('/add-project', function(request, response){
    // console.log(request.body);
    let name = request.body.inputName
    let startDate = request.body.inputStartDate
    let endDate = request.body.inputEndDate
    let message = request.body.exampleFormControlTextarea1
    let image = request.body.inputFile
    let check1 = request.body.check1
    let check2 = request.body.check2
    let check3 = request.body.check3
    let check4 = request.body.check4
    
    let project = {
        name,
        startDate : getFullTime(new Date (startDate)),
        endDate: getFullTime(new Date (endDate)),
        duration : getDistanceTime(new Date(startDate), new Date(endDate)),
        message,
        image,
        check1,
        check2,
        check3,
        check4
    }
    
    myProject.push(project)
    response.redirect('/')
})



app.get('/edit-project/:index', function (request, response) {
    let index = request.params.index
    let project = {
        name : myProject[index].name,
        message : myProject[index].message,
        startDate : myProject[index].startDate,
        endDate : myProject[index].endDate,
        duration : myProject[index].duration,
        check1 : myProject[index].check1,
        check2 : myProject[index].check2,
        check3 : myProject[index].check3,
        check4 : myProject[index].check4

    }
    response.render('edit-project', {index, project})
})


app.post('/edit-project/:index', function(request, response){
    let index = request.params.index
    let name = request.body.inputName
    let startDate = request.body.inputStartDate
    let endDate = request.body.inputEndDate
    let message = request.body.exampleFormControlTextarea1
    let image = request.body.inputFile
    let check1 = request.body.check1
    let check2 = request.body.check2
    let check3 = request.body.check3
    let check4 = request.body.check4
    
    let project = {
        name,
        startDate : getFullTime(new Date (startDate)),
        endDate: getFullTime(new Date (endDate)),
        duration : getDistanceTime(new Date(startDate), new Date(endDate)),
        message,
        image,
        check1,
        check2,
        check3,
        check4
    }

    myProject[index]=project



    response.redirect('/')
})



function getFullTime(time){

    let month = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]
  
    let date = time.getDate()
    let monthIndex = time.getMonth()
    let year = time.getFullYear()
  
    let hours = time.getHours()
    let minutes = time.getMinutes()
    
    let fullTime = `${date} ${month[monthIndex]} ${year}`
    return fullTime
  }

  function getDistanceTime(start, end){

    let startDate = new Date(start)
    let endDate = new Date(end)
  
    let distance = endDate - startDate
    // console.log(distance);
  
    let milisecond = 1000 
    let secondInHours = 3600 
    let hoursInDay = 24 
  
    let distanceDay = Math.floor(distance / (milisecond * secondInHours * hoursInDay))
    let distanceHours = Math.floor(distance / (milisecond * 60 * 60))
    let distanceMinutes = Math.floor(distance / (milisecond * 60))
    let distanceSeconds = Math.floor(distance / milisecond)
    
    return `${distanceDay} day`
    
  }





app.listen(port, function(){
    console.log(`server running on port ${port}`);
})
