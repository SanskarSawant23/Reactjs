import React, { useState, useEffect } from 'react'
import './style.css';

const getLocalData =() =>{

    const list = localStorage.getItem("mytodolist");
    if(list){
        return JSON.parse(list);
    }
    else{
       return []; 
    }
} 

export const Todo = () => {
    const[inputdata, setInputdata] = useState("");
    const[items, setItems] = useState(getLocalData());
    const[isEditItem, setIsEditItem] =useState();
    const[togglebutton , setToggleButton] = useState(false)
    const addItem = ()=>{
        if(!inputdata){
            alert("plz fill the data")
        }
        else if(inputdata && togglebutton){
            setItems(
                items.map((curElem) =>{
                    if(curElem.id ===isEditItem){
                        return{...curElem, name:inputdata}
                    }
                    return curElem;
                })
            )
            setInputdata([]);
        setIsEditItem(null);
        setToggleButton(false);

        }
        
        else{
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items,newInputData])
            setInputdata("");
        }
    }

    const editItem = (index)=>{
        const item_id = items.find((curElem)=>{
            return curElem.id === index
        });
        
        setInputdata(item_id.name);
        setIsEditItem(index);
        setToggleButton(true);
    }
    const deleteItem = (index)=>{
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index
        })
        setItems(updatedItem)
    }

    const RemoveAll = () =>{
        setItems([]);
    }

    useEffect(() =>{
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items])
  return (
    <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src="" alt="" />
            </figure>
            <div className='addItems'>
                <input type="text" placeholder='📝 Add Items'
                className='form-control'
                value={inputdata }
                onChange ={(event) => setInputdata(event.target.value)}

                 />{togglebutton ? (<i className="fa-solid fa-edit add-btn" onClick={addItem}></i>):(
                    <i className="fa-solid fa-plus add-btn" onClick={addItem}></i>
                 )}
                <i className="fa-solid fa-plus add-btn" onClick={addItem}></i>
            </div>
            <div className='showItems'>
                {
                    items.map((curElem) =>{
                        return(
                            
                <div className='eachItem' key ={curElem.id}>
                <h3>{curElem.name}</h3>
                <div className='todo-btn'>
                <i className="fa-solid fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                <i className="fa-solid fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>

                </div>

            </div>
                            
                        )
                    })
                }

            </div>
            <div className='showItems'><button className='btn effect04'data-sm-link-text="Remove All" onClick={RemoveAll}><span>CHECK LIST</span></button></div>
        </div>
    </div>
  )
}
