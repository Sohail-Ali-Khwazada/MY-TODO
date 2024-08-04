import { useRef, useState,useEffect } from "react"
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";



function Todo() {

  const [AllTask, setAllTask] = useState([]);
  const [inputVisibility, setInputVisibility] = useState(false);
  const inputTaskRef = useRef("");


  useEffect(() => {
    axios.get("http://localhost:8000/api/todos")
      .then((res) => {
        setAllTask(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);


  const addTask = () => {

    const todo = {
      task:inputTaskRef.current.value
    }
    inputTaskRef.current.value = "";

    if (todo.task.trim().length > 0) {
      axios.post("http://localhost:8000/api/todos",todo)
        .then((res) => {
          setAllTask([...AllTask,res.data]);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    setInputVisibility(false);
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/todos/${id}`)
      .then((res) => {
        console.log(res.data);
        setAllTask(AllTask.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleCompletion = (id) => {

    let index = AllTask.findIndex(item => {
      return item._id === id;
    })
    let newTodos = [...AllTask];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;

    const todo = {
      task: newTodos[index].task,
      isCompleted: newTodos[index].isCompleted
    }

    axios.put(`http://localhost:8000/api/todos/${id}`,todo)
      .then((res) => {
        console.log(res.data);
        setAllTask(newTodos);
      })
      .catch((err) => {
        console.log(err);
      })
 
  }


  return (
    <>
      <div
        id="title"
        className="bg-[#AD7EE5] text-white text-2xl font-black flex justify-center items-center h-12 rounded-xl mb-4 w-[24rem]"
      >
        My Todo
      </div>
      <div
        id="taskcontainer"
        className="bg-white shadow-[0.1rem_0.15rem_0.2rem_0.25rem_rgba(130,117,117,0.26)] rounded-lg w-96 p-8 relative min-h-60"
      >
        <div id="inputtask" className={inputVisibility === false ? "hidden" : ""}>
          <input
            type="text" ref={inputTaskRef}
            placeholder="Enter task"
            id="taskdata"
            className="p-1 border-2 border-black rounded-lg w-[65%] mr-4"
          />
          <button
            id="submitbtn" onClick={addTask}
            className="bg-[#AD7EE5] text-white text-lg font-semibold cursor-pointer outline-none border-none rounded-lg w-1/4 p-1">
            Submit
          </button>
        </div>

        <div id="tasks" className="flex flex-col gap-4 font-bold text-2xl text-[#A9ACB6] mt-4 tasks">
          {AllTask.map((item) => {
            return (<div className="inputholder flex items-center gap-4 relative" key={item._id}>
              <input type="checkbox" checked = {item.isCompleted} className="taskcheck" onChange={() => handleCompletion(item._id)}/>
              <label className={item.isCompleted ? "line-through" : ""}>{item.task}</label>
              <MdDeleteOutline className="absolute right-0" onClick={() => handleDelete(item._id)}/>
            </div>
            )
          })}
        </div>
        
        <button
          id="newtask"
          className="bg-[#AD7EE5] text-white text-xl font-semibold h-12 w-44 rounded-2xl border-none absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 cursor-pointer hover:bg-[#9657e4]" onClick={() => setInputVisibility(true)}>
          + New task
        </button>
      </div>

    </>
  )
}

export default Todo


