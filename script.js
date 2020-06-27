
		$(document).ready(function () {
            //holds the eventlist that's read from the storage or will be dumped to storage
            eventList=[]; 

            function starter(){
                // Display the Today's Date at the top of the page.
                $("#now").text(moment().format('dddd,MMMM Do'));
                //et schedule object from the local storage and parse it.
                eventList=JSON.parse(localStorage.getItem("Dailyplan"));
                if(eventList!=null){
                    for(var i=0; i<eventList.length;i++){
                    find(eventList[i]);
                        }
                }
                updatecolor();
            }
            
     
            //updates the page, makes it color coded. Grey for past, Red for present and Green for future
            function updatecolor(){
                // store the current time of the day in a variable called hour.
                var hour = moment().format("h a"); // 12-hour time digit (1-12) & a stands for (am pm).
                var minute=moment().minutes();
                
                $.each($(".hour"),function(key,h){
                    var value=$(h).text();
                    // condition 1, when the current time of day is matche with the current hour
                    if(moment(value,"h a").isSame(moment(hour,"h a"))){
                        //make the text area background color of present class from our style css.
                        $("#tAentry"+key).addClass("present");
                        //still the user can enter event.
                        $("#tAentry"+key).attr("disabled",false);
                        // the user can store event at this current hour.
                        $("#btn"+key).attr("disabled",false);
                    }
                    // condition 2, the current time of day  is passed the current hour.
                    else if(moment(hour,"h a").isAfter(moment(value,"h a"))){
                        // the text area will be gray so that we add the past class.
                        $("#tAentry"+key).addClass("past");
                        //the text area is not active.
                        $("#tAentry"+key).attr("disabled",true);
                        //store button will be disabled since you can't store any new events at past time
                        $("#btn"+key).attr("disabled",true);
                    }
                    // condition 3, the current hour is not happen yet.
                    else if(moment(hour,"h a").isBefore(moment(value,"h a"))){
                        //the text area will be green 
                        $("#tAentry"+key).addClass("future");
                        //you can enter new events
                        $("#tAentry"+key).attr("disabled",false);
                        //you can store new events
                        $("#btn"+key).attr("disabled",false);
                    }
                });
               
                
            }
            // when a save button is clicked the current event will be fired up to local to be stored.
            function storeEvents(event){
                event.preventDefault();
                var events={
                    time :"",
                    date:"",
                    eventDesc:"",
                };


                // when an event is updated on the same date and time, this function is called
                function multipleEvent(){
                // grab the events object from local stotage and convert it to object variable.
                    eventList=JSON.parse(localStorage.getItem("Dailyplan")); 
                    //if there are no previous event.
                    if (eventList==null){
    
                        if(events. eventDesc!==""){
                        eventList=[];
                        // push the event object to the array.
                        eventList.push(events);
                        }
                    }
                    else{// if there are previous events in the storage
                            for(var i=0; i<eventList.length;i++){  //if the new event is on the same date as one of events in the object array in the local storage
                                if(eventList[i].date===events.date){
                                    //compare time
                                    if(eventList[i].time==events.time){
                                        // if the user deleted the event
                                        if(events.eventDesc==""){
                                            // the event will be deleted from the storage since the user do so.
                                            eventList.splice(i,1);
                                        }
                                        //update the event eventually in local storage.
                                        else{
                                            eventList[i].eventDesc=events.eventDesc;
                                        }
                                        return 0;
                                    } 
                                }
                            }
                            //the preveious event should belong to another time or date.
                            return 1;
                        }
                
                }
                //get the id attribute of each button
                var el=$(this).attr("id");
                // extract the index from the button id.
                var index=el.indexOf("n");
                var id="";
                for (var i=(index+1);i<el.length;i++){
                    id+=el.charAt(i);
                }
                id=parseInt(id);
                //populate the events object  with the fields corresponding to the save button pressed.
                events.eventDesc=$("textarea#tAentry"+id).val();
                events.time=$("label[for='tAentry"+id+"']").text();
                events.date=moment().format('dddd,MMMM Do');
                if (multipleEvent()>0){
                    if(events.eventDesc!==""){
                        // push the new event to event lists
                        eventList.push(events);

                    }
                    else{
                        return;
                    }
                }
                //store the all the events both the old one and the new one to storage.
                if (eventList.length!=0){
                    localStorage.setItem("Dailyplan",JSON.stringify(eventList));
                }
                else{
                    localStorage.setItem("Dailyplan",null);
                }

            }
            // this function take the event object and compare it with the date and time of the DOM, and update the textarea based on the result.
            function find(eventlist){
                $.each($(".hour"),function(key,h){
                    var value=$(h).text(); //grap the time from the DOM.
                    if(eventlist.date===moment().format('dddd,MMMM Do')){
                                if(eventlist.time==value)
                                    {$("#tAentry"+key).text(eventlist.eventDesc);
                                    return;
                                    }
                            }
                });
            }
            // the window is loaded "starter" function is fired  up
            $(window).on('load',starter);
            // when a save button is clicked "storeEvents" function is fired up  
            $(".btn").on('click',storeEvents);
           

        });