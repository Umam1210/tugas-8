const express = require('express')

const app = express()
port = 5000

app.set('view engine', 'hbs')
app.use('/assets', express.static(__dirname + '/assets'))
app.use(express.urlencoded({ extended: false }))

let isLogin = true
let addProject = []


app.get('/', function (request, response) {
    response.render('index')
})
app.get('/form', function (request, response) {
    response.render('form')
})
app.get('/project', function (request, response) {
    response.render('project', { isLogin, addProject })
})
app.get('/project', function (request, response) {
    response.render('project')
})
app.get('/add-project', function (request, response) {
    response.render('add-project')
})
app.get('/desk-project/:index', function (request, response) {
    let index = request.params.index
    let desk = {
        name : addProject[index].name,
        message : addProject[index].message,
        startCalender : addProject[index].startCalender,
        endCalender : addProject[index].endCalender,
        duration : addProject[index].duration,
        check1 : addProject[index].check1,
        check2 : addProject[index].check2,
        check3 : addProject[index].check3,
        check4 : addProject[index].check4
    }
    response.render('desk-project', {index, desk})
})

app.post('/add-project', function (request, response) {
    let name = request.body.inputName
    let startDate = request.body.inputStartDate
    let endDate = request.body.inputEndDate
    let message = request.body.exampleFormControlTextarea1
    let image = request.body.inputFile
    let check1 = request.body.check1
    let check2 = request.body.check2
    let check3 = request.body.check3
    let check4 = request.body.check4


    // console.log(check1);
    // console.log(check2);
    // console.log(check3);
    // console.log(check4);

    monthIndex = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]

    startDate = new Date(startDate)
    let date = startDate.getDate()
    let month = startDate.getMonth()
    month = monthIndex[month]
    let year = startDate.getFullYear()

    endDate = new Date(endDate)
    let endDatePost = endDate.getDate()
    let endMonth = endDate.getMonth()
    endMonth = monthIndex[endMonth]
    let endYear = endDate.getFullYear()

    let duration = endDate - startDate
    let milisecond = 1000
    let secondInHours = 3600
    let hoursInDay = 24
    let dayInMonth = 30

    duration = Math.floor(duration / (milisecond * secondInHours * hoursInDay))
    dayInMonth = Math.floor(duration / (dayInMonth))

    let startCalender = `${date} ${month} ${year}`
    let endCalender = `${endDatePost} ${endMonth} ${endYear}`

    let dataProject = {
        name,
        startDate,
        endDate,
        endMonth,
        month,
        endYear,
        year,
        date,
        endDatePost,
        startCalender,
        endCalender,
        message,
        image,
        dayInMonth,
        duration,
        check1,
        check2,
        check3,
        check4
    }
    addProject.push(dataProject)


    response.redirect('/project')
})

app.get('/edit-project/:index', function (request, response) {
    let index = request.params.index

    let project = {
         name : addProject[index].name,
         startCalender : addProject[index].startCalender,
         endCalender : addProject[index].endCalender,
         message : addProject[index].message
    }
    response.render('edit-project', { index, project})
})

app.post('/edit-project/:index', function (request, response) {
    let index = request.params.index
    
    addProject[index].name = request.body.inputName
    addProject[index].message = request.body.exampleFormControlTextarea1

    let check1 = request.body.check1
    let check2 = request.body.check2
    let check3 = request.body.check3
    let check4 = request.body.check4



    addProject[index].check1 = request.body.check1
    addProject[index].check2 = request.body.check2
    addProject[index].check3 = request.body.check3
    addProject[index].check4 = request.body.check4
    


    let startDate = request.body.inputStartDate
    let endDate = request.body.inputEndDate
   
    monthIndex = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]

    startDate = new Date(startDate)
    let date = startDate.getDate()
    let month = startDate.getMonth()
    month = monthIndex[month]
    let year = startDate.getFullYear()


    endDate = new Date(endDate)
    let endDatePost = endDate.getDate()
    let endMonth = endDate.getMonth()
    endMonth = monthIndex[endMonth]
    let endYear = endDate.getFullYear()

    let duration = endDate - startDate
    let milisecond = 1000
    let secondInHours = 3600
    let hoursInDay = 24
    let dayInMonth = 30

    duration = Math.floor(duration / (milisecond * secondInHours * hoursInDay))
    dayInMonth = Math.floor(duration / (dayInMonth))

    let startCalender = `${date} ${month} ${year}`
    let endCalender = `${endDatePost} ${endMonth} ${endYear}`
    
    addProject[index].duration = duration
    addProject[index].startCalender = startCalender
    addProject[index].endCalender = endCalender


    response.redirect('/project')
}
)


app.get('/delete-project/:index', function (request, response) {
    let index = request.params.index
    // console.log(index);

    addProject.splice(index, 1)
    // console.log(addProject);

    response.redirect('/project')
})
app.listen(port, function () {
    console.log(`server running on port ${port}`);
})
