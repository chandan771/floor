import React, { useEffect, useState } from 'react'
// import styles from '../Tidy/tide.module.scss'
import "./style.css"


// get the local storage data back ---
const getLocalData = () => {
    const list = localStorage.getItem("listItems");

    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // add the items function

    const addItem = () => {
        if (!inputData) {
            alert("Plz fill the data");
        } else if (inputData && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputData }
                    }
                    return curElem;
                })
            );

            setInputData("");

            setIsEditItem(null);

            setToggleButton(false);


        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    }

    // edit the items 

    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index
        });

        setInputData(item_todo_edited.name);

        setIsEditItem(index);

        setToggleButton(true);
    }


    // ------------------------------------------

    // how to delete item section

    const deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItem);
    };


    // remove all the elements

    const removeAll = () => {
        setItems([]);
    }

    // adding local storage by using useEfeect hook

    useEffect(() => {
        localStorage.setItem("listItems", JSON.stringify(items));
    }, [items]);

    // -------------------------------------------

    return (
        <div>
            <div className="main_div">
                <div className="child_div">
                    <figure>
                        <img src='https://imgs.search.brave.com/MCX-7MwXmpZRVOg1SdZu6t5VCg4H0Gx7F_P6gqAG_do/rs:fit:198:212:1/g:ce/aHR0cDovLzMuYnAu/YmxvZ3Nwb3QuY29t/Ly1QcXhmVTE0Rkxz/NC9VdUZtVmQwNEVH/SS9BQUFBQUFBQUFw/OC9BeDhPXzVPeHo5/RS9zMTYwMC9ub3Rl/bGlzdC5qcGc' alt='todologo' />

                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>

                    <div className="add_items">
                        <input
                            type="text"
                            placeholder="✍ Add Item"
                            className="form_control"
                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                        {toggleButton ? (

                            <i className="fa-solid fa-pen-to-square add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa-solid fa-plus add-btn" onClick={addItem}></i>
                        )}

                        {/* <i className="fa-solid fa-plus add-btn" onClick={addItem}></i> */}

                        {/* <i class="fa-solid fa-pen-to-square add-btn"></i> */}
                        {/* <img src='images/plus-solid.svg' className={styles.fa}  /> */}
                    </div>

                    {/* show items list */}

                    <div className='show_items'>

                        {items.map((curElem, index) => {
                            return (
                                <div className='each_item' key={index} >
                                    <h3>{curElem.name}</h3>
                                    <div className='todo_btn'>
                                        <i className="fa-solid fa-pen-to-square add-btn"
                                            onClick={() => editItem(curElem.id)}
                                        ></i>
                                        <i className="fa-solid fa-trash add-btn"
                                            onClick={() => deleteItem(curElem.id)}
                                        ></i>
                                    </div>

                                </div>
                            )
                        })}

                    </div>

                    {/* remove all button  */}

                    <div className="show_items">
                        <button
                            className='btn effect04'
                            data-sm-link-text="Remove All"
                            onClick={removeAll}
                        >
                            <span>Check List</span>
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Todo
