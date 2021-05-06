let notes = getSavedNotes()
let timestamp=moment().valueOf()

let filters={
    searchtext :'',
    sortBy: 'byLastEdited'
}
renderNotes(notes,filters)

document.querySelector('#create-note').addEventListener('click',function(){
    // console.log('You clicked the button')
    let noteId=uuidv4()
    notes.push({
        id: noteId,
        title:'',
        body:'',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes(notes)
    renderNotes(notes,filters)
    location.assign(`/note.html#${noteId}`)
})

document.querySelector('#search').addEventListener('input',function(e){
    filters.searchtext=e.target.value
    renderNotes(notes,filters)   
})

document.querySelector('#filter-by').addEventListener('change',function(e){
    filters.sortBy=e.target.value
    renderNotes(notes,filters)
})

window.addEventListener('storage',function(e){
    if(e.key === 'notes'){
        notes=JSON.parse(e.newValue)
        renderNotes(notes,filters)
    }
})






// document.querySelector('#delete-note').addEventListener('click',function(e){
//     document.querySelectorAll('.note').forEach(function(i){
//         i.remove()
//     })
// })

// document.querySelector('#search').addEventListener('input',function(e){
//     let temp=e.target.value
//     document.querySelectorAll('.note').forEach(function(i){
//         if(i.textContent.includes(temp)){
//             let res=document.createElement('p')
//             res.textContent=i.textContent
//             document.querySelector('body').appendChild(res)
//         }
          
//     })
// })

// notes.forEach(function(i){
//     let temp=document.createElement('p')
//     temp.className='note'
//     temp.textContent=i.title
//     document.querySelector('body').appendChild(temp)

// })