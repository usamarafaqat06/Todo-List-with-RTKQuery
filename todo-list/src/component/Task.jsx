
import "./Task.css"
import {useGetTodosQuery ,useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} from '../app/Todiapi'
import React,{useState} from "react";

function Task() {
  const [task, setTask] = useState('');
  const[editTask ,setEdit] =useState(null)
  const [createTask] = useCreateTaskMutation()
  const [deleteTask] =useDeleteTaskMutation()
  const[updateTask] =useUpdateTaskMutation()
  const {data} = useGetTodosQuery();
  console.log("data",data)
  
  const handleChange = (e) => {
       setTask(e.target.value)
       console.log("val",task)
  };
  const createOrUpdateTodoHandler = async(e) => {
    e.preventDefault()
    editTask? handleUpdate():handleCreate()
  }
    const handleUpdate =async()=>{
      try{
        await updateTask({id:editTask ,title:task})
        setEdit(null)
        setTask("")
       }
       catch(err) {
        console.log(err)
      }
    }
   const handleCreate = async ()=>{
    try {
        await createTask(task)
      setTask('')
    } 
    catch(err) {
      console.log(err)
    }
   }
   const handleDelete = async(id)=>{
    try{
      await deleteTask({id})
    }
    catch (error) {
      console.log(error);
    }
   }
   const handleEdit = (id, title) => {
    setEdit(id);
    setTask(title);
  };
  
  return (
    <>
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center ">
                 <div className="col-7">
                    <div className="task-col pt-3 px-5 pb-5">
                       <h1 className='text-center py-5'>Getting Things Done!</h1>
                       <form className='task-form d-flex justify-content-center py-2 ' onSubmit={createOrUpdateTodoHandler}>
                        <input type="text" placeholder='What is the task today!'required id='title' name='title' value={task}  onChange={handleChange}/>
                        <button type="submit" className='task-button '>{editTask? "UpdateTask":"AddTask"}</button>
                       </form>
                    
                       {data && data.map((current)=>(
                         <div key={current.id} className="task-list m-4 d-flex justify-content-between align-items-center " >
                         <p className='text-white pt-3'>{current.title}</p>
                         <div className="action-button d-flex ">
                         <i className="fa fa-regular fa-pen-to-square me-2" onClick={()=>handleEdit(current.id ,current.title)}></i>
                         <i className="fa fa-solid fa-trash" onClick={()=>handleDelete(current.id)}></i>
                         </div>
                     </div>
                       )
                       )
                      }
                      
                 </div>
                 </div>
            </div>
            </div> 
    </>
  )
}

export default Task