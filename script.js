const add = document.querySelector('#add');

// data storage to local system
const updateData = () =>{
    const textareaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textareaData);
    textareaData.forEach((note)=>{
        return notes.push(note.value);
    });
    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') =>{
    
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>

        <div class="main ${text ? "":"hidden"}"></div>
        <textarea class= ${text ? "hidden":""}></textarea>`;

        note.insertAdjacentHTML('afterbegin',htmlData);

        const editbtn = note.querySelector('.edit');
        const delbtn = note.querySelector('.delete');
        const textarea = note.querySelector('textarea');
        const mainDiv = note.querySelector('.main');

        // Delete Button
        delbtn.addEventListener('click',() => {
            note.remove();
            updateData();
        });

        // Edit Button
        textarea.value=text;
        mainDiv.innerHTML=text;

        editbtn.addEventListener('click',()=>{
            textarea.classList.toggle('hidden');
            mainDiv.classList.toggle('hidden');
        })
        
        textarea.addEventListener('change',(event)=>{
            const value = event.target.value;
            mainDiv.innerHTML = value;
        
            updateData();
        })

        document.body.appendChild(note);

}

// Data retrieve from local system
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes)
{
    notes.forEach((note) => addNewNote(note));
}

add.addEventListener('click',() =>addNewNote());