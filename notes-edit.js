let titleElement=document.querySelector('#note-title')
let bodyElement=document.querySelector('#note-body')
let spanElement=document.querySelector('#last-edited')
let noteId=location.hash.substring(1,)
let notes=getSavedNotes()
let note=notes.find(function(note){
    return note.id === noteId
})
if(note === undefined){
    location.assign('/index.html')
}

titleElement.value=note.title
bodyElement.value=note.body
spanElement.textContent=getLastEditedMessage(note.updatedAt)

titleElement.addEventListener('input',function(e){
    note.title=e.target.value
    note.updatedAt=moment().valueOf()
    spanElement.textContent=getLastEditedMessage()

    saveNotes(notes)
})

bodyElement.addEventListener('input',function(e){
    note.body=e.target.value
    note.updatedAt=moment().valueOf()
    spanElement.textContent=getLastEditedMessage(note.updatedAt)

    saveNotes(notes)
})

document.querySelector('#remove-note').addEventListener('click',function(){
    removeNote(noteId)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage',function(e){
    if(e.key === 'notes'){
        notes=JSON.parse(e.newValue)
        note=notes.find(function(note){
            return note.id === noteId
        })
        if(note === undefined){
            location.assign('/index.html')
        }
        
        document.querySelector('#note-title').value=note.title
        document.querySelector('#note-body').value=note.body
        spanElement.textContent=getLastEditedMessage(note.updatedAt)

    }
})