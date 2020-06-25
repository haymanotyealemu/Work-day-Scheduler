var timeOfDay = moment().format('k'); // 24-hour time digit (1-24)
var mornOrNight = moment().format('A'); // PM (AM/PM)



    
    $(".hour").each(function(){
        if($(this).att('data-time')<timeOfDay){
            $(this).addClass('gray');
        }
        else if($(this).att('data-time')>timeOfDay){
            $(this).addClass('#77dd77');
        }
        else if($(this).att('data-time')=== timeOfDay){
            $(this).addclass('#ff6961');
        }

    

    var minuteOfHour = moment().format('m'); // 25
    var timeTilNextHour = 60 - minuteOfHour; // 60 minutes in an hour, minus the current gives you the number of minutes until next hour starts
    timeTilNextHour = timeTilNextHour * 60 * 1000;
   

    

   

});
