import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'


function App() {

  const todoinput = useRef(null);
  const saveBtn = useRef(null);
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todosString = localStorage.getItem("todos")
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    let uuid = uuidv4();
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos, { id: uuid, todo, isCompleted: false }];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
    setTodo("")
    todoinput.current.rows = 1;
  }

  const handleEdit = (e) => {
    let id = e.target.value
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    todoinput.current.focus();
    todoinput.current.rows = 10;

    saveBtn.current.textContent = "Save"
    setTodos((prevTodos) => {
      let newTodos = todos.filter(item => item.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    })

  }
  const handleDelete = (e) => {
    let id = e.target.value
    setTodos((prevTodos) => {
      let newTodos = todos.filter(item => item.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    })
  }

  const changeType = (id) => {
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    setTodos((prevTodos) => {
      localStorage.setItem("todos", JSON.stringify(newtodos));
      return newtodos;

    })
  };

  function isDesktopOrLaptop() {
    return window.innerWidth > 1024; // Adjust the threshold as needed
  }
  return (
    <>
      <div className="conatains max-md:w-full  conatiner border  w-2/4 mx-auto m-4">
        <Navbar />
        <div className="mt-5 flex justify-center items-center gap-4">
          <textarea rows={1} type="text" onChange={handleChange} value={todo} ref={todoinput} onBlur={handleAdd}  name="todoinput" id="todoinput" className="pl-3 text-neutral-500 block w-2/5 max-md:w-3/5 rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-base sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none" placeholder="Add Task" />
          <button onClick={handleAdd} ref={saveBtn} className="rounded-md h-10 bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 tracking-wider">Create</button>
        </div>
        <div className="tasks flex flex-col justify-center mt-1 p-3  ">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="pl-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="left-1 py-3 pl-16">
                    Todo
                  </th>
                </tr>
              </thead>
              <tbody className='py-6'>
                {todos.map(item => {
                  return <tr key={item.id} className="h-20 odd:bg-white  even:bg-gray-50">
                    <td className="pl-3 py-4 max-md:py-10 " style={{ width: '10rem' }}>
                      {item.isCompleted ? (
                        <div>
                          <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Completed</span>
                          <svg data-name="Layer 1" id="Layer_1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" onClick={() => changeType(item.id)}
                            value={item.id} style={{ width: '20px', marginLeft: '6rem', marginTop: '-1.25rem' }}>
                            <defs>
                              <style type="text/css">{`.cls-1 {fill: red; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px;}`}</style>
                            </defs>
                            <title />
                            <circle className="cls-1" cx="24" cy="24" r="23" />
                            <line className="cls-1" x1="12" x2="36" y1="12" y2="36" />
                            <line className="cls-1" x1="12" x2="36" y1="36" y2="12" />
                          </svg>

                        </div>
                      )
                        : (
                          <div>
                            <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-50">Incomplete</span>
                            <svg
                              onClick={() => changeType(item.id)}
                              value={item.id}
                              id="Layer_1"
                              style={{ enableBackground: 'new 0 0 512 512', width: '20px', marginLeft: '6rem', marginTop: '-1.25rem' }}
                              version="1.1"
                              viewBox="0 0 512 512"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                              <style type="text/css">
                                {`.st0{fill:#2BB673;}
                                .st1{fill:none;stroke:#FFFFFF;stroke-width:30;stroke-miterlimit:10;}`}
                              </style>
                              <path
                                className="st0"
                                d="M489,255.9c0-0.2,0-0.5,0-0.7c0-1.6,0-3.2-0.1-4.7c0-0.9-0.1-1.8-0.1-2.8c0-0.9-0.1-1.8-0.1-2.7c-0.1-1.1-0.1-2.2-0.2-3.3c0-0.7-0.1-1.4-0.1-2.1c-0.1-1.2-0.2-2.4-0.3-3.6c0-0.5-0.1-1.1-0.1-1.6c-0.1-1.3-0.3-2.6-0.4-4c0-0.3-0.1-0.7-0.1-1C474.3,113.2,375.7,22.9,256,22.9S37.7,113.2,24.5,229.5c0,0.3-0.1,0.7-0.1,1c-0.1,1.3-0.3,2.6-0.4,4c-0.1,0.5-0.1,1.1-0.1,1.6c-0.1,1.2-0.2,2.4-0.3,3.6c0,0.7-0.1,1.4-0.1,2.1c-0.1,1.1-0.1,2.2-0.2,3.3c0,0.9-0.1,1.8-0.1,2.7c0,0.9-0.1,1.8-0.1,2.8c0,1.6-0.1,3.2-0.1,4.7c0,0.2,0,0.5,0,0.7c0,0,0,0,0,0.1s0,0,0,0.1c0,0.2,0,0.5,0,0.7c0,1.6,0,3.2,0.1,4.7c0,0.9,0.1,1.8,0.1,2.8c0,0.9,0.1,1.8,0.1,2.7c0.1,1.1,0.1,2.2,0.2,3.3c0,0.7,0.1,1.4,0.1,2.1c0.1,1.2,0.2,2.4,0.3,3.6c0,0.5,0.1,1.1,0.1,1.6c0.1,1.3,0.3,2.6,0.4,4c0,0.3,0.1,0.7,0.1,1C37.7,398.8,136.3,489.1,256,489.1s218.3-90.3,231.5-206.5c0-0.3,0.1-0.7,0.1-1c0.1-1.3,0.3-2.6,0.4-4c0.1-0.5,0.1-1.1,0.1-1.6c0.1-1.2,0.2-2.4,0.3-3.6c0-0.7,0.1-1.4,0.1-2.1c0.1-1.1,0.1-2.2,0.2-3.3c0-0.9,0.1-1.8,0.1-2.7c0-0.9,0.1-1.8,0.1-2.8c0-1.6,0.1-3.2,0.1-4.7c0-0.2,0-0.5,0-0.7C489,256,489,256,489,255.9C489,256,489,256,489,255.9z"
                                id="XMLID_3_"
                              />
                              <g id="XMLID_1_">
                                <line className="st1" id="XMLID_2_" x1="213.6" x2="369.7" y1="344.2" y2="188.2" />
                                <line className="st1" id="XMLID_4_" x1="233.8" x2="154.7" y1="345.2" y2="266.1" />
                              </g>
                            </svg>
                          </div>
                        )}



                    </td>
                    <td className="my-auto px-6  py-3 item w-full h-12 rounded-lg  text-base   bg-[rgb(246,246,246)] flex justify-between items-center p-3 mt-5">
                      <div className="task  ">
                      {isDesktopOrLaptop() ? item.todo.slice(0, 90).concat("", "....") : item.todo.slice(0, 10).concat("", "....")}

                      </div>
                      <div className="funcs flex">
                        <button onClick={handleEdit} value={item.id} className="rounded-md  bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 tracking-wider">Edit/View</button>
                        <button onClick={handleDelete} value={item.id} className="rounded-md ml-3 bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 tracking-wider">Delete</button>
                      </div>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

