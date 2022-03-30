showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e){
    
    let addTxt = document.getElementById("addTxt");

    //creating a array named notes
    let notes = localStorage.getItem("notes");

    //checking if thr=e array is null 
    if(notes==null){
        notesObj=[];
    }
    else{
     notesObj=JSON.parse(notes);
    }
     notesObj.push(addTxt.value);
     localStorage.setItem("notes", JSON.stringify(notesObj));
     addTxt.value="";
     console.log(notesObj);

     showNotes();
})

function showNotes(){
    let notes = localStorage.getItem("notes");

        if(notes==null){
        notesObj=[];
    }
    else{
     notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element, index){
         html+= `
         <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
         <div class="card-body">
           <h5 class="card-title">Notes ${index+1} </h5>
           <p class="card-text" > ${element} </p>
           <button class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
         </div>
       </div>     `
    });
    let notesElm = document.getElementById("notes");
    if(notesObj.length!=0){
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML=`Nothing to Show! Use "Add a Note' section above to add notes`
    }
}

function cutTxt(index){
    let paragraph = document.getElementById("para")
    paragraph.addEventListener("click", function(){
    paragraph.style.textDecoration="line-through";
})
}


function deleteNote(index){
    let notes = localStorage.getItem("notes");

        if(notes==null){
        notesObj=[];
    }
    else{
     notesObj=JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}



//searching list item by search box
let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    let inc=1;
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        cardTxt=cardTxt+ " notes "+inc.toString();
        inc++;
        let isFind=false;
        let spaceFound=true;
        for(let i=0; i<cardTxt.length && isFind==false; i++) {
            if(cardTxt.charAt(i)==' ') spaceFound=true;
            else{
                if(spaceFound && inputVal.charAt(0)==cardTxt.charAt(i)){
                    isFind=true;
                   for(let j=1; j<inputVal.length && isFind; j++) if(inputVal.charAt(j)!=cardTxt.charAt(i+j)) isFind=false;
                }else spaceFound=false;
            }

        }

        if(isFind || inputVal.length==0){ //ardTxt.includes(inputVal)
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})

