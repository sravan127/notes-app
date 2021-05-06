//used to save the existing data into our array
let getSavedNotes=function(){
    let notesJSON=localStorage.getItem('notes')
    if(notesJSON !== null){
        return JSON.parse(notesJSON)
    }
    else{
        return []
    }
}

let saveNotes=function(notes){
    localStorage.setItem('notes',JSON.stringify(notes))
}

//used to create a DOM element to push into HTML
let getDOMelement=function(note){
    let noteEl=document.createElement('a')
    let textEl=document.createElement('p')
    let statusEl=document.createElement('p')
    
         if(note.title.length>0){
             textEl.textContent=note.title
         }
        else{
           textEl.textContent='Unnamed Notes'
        }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    noteEl.setAttribute('href',`/note.html#${note.id}`)
    noteEl.classList.add('list-item')
    
    statusEl.textContent=getLastEditedMessage(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

        return noteEl
}

let sortNote=function(notes,sortBy){
    if( sortBy === 'byName'){
        return notes.sort(function(a,b){
            if(a.title.toLowerCase() > b.title.toLowerCase()) {return 1}
            else if(a.title.toLowerCase() < b.title.toLowerCase()) {return -1}
            else {return 0}
        })
    }
    else if(sortBy === 'byLastEdited'){
        return notes.sort(function(a,b){
             if(a.updatedAt > b.updatedAt){ return -1}
             else if(a.updatedAt < b.updatedAt) {return 1}
             else {return 0}
        })
    }
    else if(sortBy === 'byNew'){
        return notes.sort(function(a,b){
           if(a.createdAt > b.createdAt){ return -1}
           else if(a.createdAt < b.createdAt){ return 1}
           else {return 0}
        })
    }
    else{
      return notes
    }
    
}

//used to render the notes in HTML file
let renderNotes=function(notes,filters){
   notes=sortNote(notes,filters.sortBy)
   let filterednotes=notes.filter(function(i){
        //if(filters.searchtext.length!=0)
        return i.title.toLowerCase().includes(filters.searchtext.toLowerCase())
    })
    document.querySelector('#searchresult').innerHTML=''
    if(filterednotes.length>0){
        filterednotes.forEach(function(note){
            let noteEl=getDOMelement(note)
           document.querySelector('#searchresult').appendChild(noteEl)
        })
    }
    else{
        let emptyMessage=document.createElement('p')
        emptyMessage.className='empty-message'
        emptyMessage.textContent='No messages to show'
        document.querySelector('#searchresult').appendChild(emptyMessage)
    }
      
 }

 let removeNote=function(noteid){
      let index=notes.findIndex(function(i){
          return i.id === noteid
      })
      if(index !==-1){
          notes.splice(index,1)
      }
 }

 let getLastEditedMessage=function(timestamp){
    return `Last edited ${moment(timestamp).fromNow()}`
 }

     

 