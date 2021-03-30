//get time variables 
var date = $('#currentDay');
var currentHour = moment().format('H');


//Make arrays for inputs and military times
var inputAreas = [];
var militaryTimes = [];
for (var i = 9; i < 18; i++){
    inputAreas.push($(`#${i} textarea`))
    militaryTimes.push(i);

    if (!JSON.parse(localStorage.getItem(`${i}`))){
        localStorage.setItem(i, JSON.stringify(''))
    }

}

//WHEN I refresh the page
//THEN the saved events persist
for (var i = 9; i < 18; i++){
    var retrievedNote = JSON.parse(localStorage.getItem(`${i}`));
    console.log(retrievedNote)
    if (retrievedNote.value == ''){
        inputAreas[i-9][0].innerHTML = retrievedNote;
    }else{
        inputAreas[i-9][0].innerHTML =  retrievedNote;
}
}

//Set the colors based on the current time
for (var i = 0; i < inputAreas.length; i++){
    if (militaryTimes[i] < currentHour){
        inputAreas[i].addClass('past');
    }else if (militaryTimes[i] > currentHour){
        inputAreas[i].addClass('future')
    }else{
        inputAreas[i].addClass('present')
    }
}
//On the save button save whatever text is in local storage
$('button').on('click', function (event){
    event.preventDefault();
    var slot = $(this).parent().attr('id');
    var note = $(this).prev().val(); 
    localStorage.setItem(slot, JSON.stringify(note))
})

//clock function 
//THEN the current day is displayed at the top of the calendar
let startClock = function(){
    var today = moment();
    date.text(today.format("MMM Do, YYYY h:mm:ss a"));
}

//get time to be dynamic
setInterval(startClock, 1000);
startClock();
