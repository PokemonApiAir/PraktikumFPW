import {useState} from "react"
import Menu from "./menu"
import MenuExist from "./menuexist"

export default function Right(props) {
    const saveData = (type, indexActive) => {
        const data = props.dataActive;
        let container;
        if(type == "data-active"){
            container = document.querySelector(".data-active");
        }else if(type == "create-new"){
            container = document.querySelector(".create-new");
        }
        data.nama = container.querySelector("#plan-name").value;
        data.difficulty = container.querySelector("#difficulty").value;
        data.from = container.querySelector("#from").value;
        data.to = container.querySelector("#to").value;
        data.gender = container.querySelector("#gender").value;
        const menuListElements = container.querySelectorAll(".menu-list")[0];
        const arrTemp = [];
        const dataElements = menuListElements.querySelectorAll(".data");
        dataElements.forEach(element => {
            const tempData = {
                set: element.querySelector("#set").value,
                nama: element.querySelector("#workout-name").value,
                long: element.querySelector("#long").value,
                time: element.querySelector("#time").value
            }
            arrTemp.push(tempData);
        });
        
    }
    return (
        <>
            <div className="right w-2/3 h-full bg-snow rounded-2xl">
                {props.dataActive == null && props.addNewPlan == false ? (
                    <div className="null w-full h-full flex justify-center items-center">
                        <h1 className="text-4xl text-slate-400">Choose a plan to see detail here</h1>
                    </div>
                ) : props.addNewPlan == true ? (
                    <div className="create-new w-full h-full py-8 px-12 flex flex-col gap-y-4">
                        <div className="w-full h-10 flex align-center justify-start">
                            <input className="w-9/12 bg-white border border-1 border-black h-full rounded-lg px-4 text-2xl" type="text" name="" id="plan-name" placeholder="Plan Name"/>
                            <div className="w-3/12 h-full flex justify-end items-center">
                                <button className="w-1/2 bg-indigo-500 h-3/4 rounded-lg text-white font-semibold" onClick={() => {
                                    saveData("create-new", props.indexActive);
                                }}>Save</button>
                            </div>
                        </div>
                        <div className="flex justify-start items-center">
                            <p className="text-lg font-medium">Difficulty : </p>
                            <select name="difficulty" id="difficulty" className="w-32 ms-3 pt-1 pb-1.5 ps-3 border border-black rounded-lg">
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                        <div className="flex justify-start items-center">
                            <p className="text-lg font-medium">Duration Range : </p>
                            <input type="text" className="w-10 h-7 mx-3 py-0.5 rounded-lg border border-black text-center" id="from" placeholder="10"/>
                            <span>to</span>
                            <input type="text" className="w-10 h-7 mx-3 py-0.5 rounded-lg border border-black text-center" id="to" placeholder="20"/>
                            <span>minutes</span>
                        </div>
                        <div className="flex justify-start items-center">
                            <p className="text-lg font-medium">Gender : </p>
                            <select name="gender" id="gender" className="w-24 ms-3 pt-1 pb-1.5 ps-3 border border-black rounded-lg">
                                <option value="Intersex">Intersex</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>
                        <div className="w-full flex justify-start items-center">
                            <div className="w-3/4 flex justify-start items-center">
                                <p className="text-lg font-medium">Menu : </p>
                            </div>
                            <div className="w-1/4 flex justify-end items-center">
                                <button onClick={props.addMenu} className="w-1/2 bg-indigo-500 h-3/4 rounded-lg text-white font-semibold">Add Menu</button>
                            </div>
                        </div>
                        <div className="menu-list flex flex-col gap-y-2">
                            {props.menu && props.menu.length > 0 ? (
                                props.menu.map((data, index) => (
                                    data.status == 0 ? (
                                        <Menu key={Math.floor(Math.random() * 100000)} funct={props.funct} data={data} menu={props.menu} setMenu={props.setMenu} index={index} deleteMenu={props.deleteMenu} />
                                    ) : (
                                        <Menu key={Math.floor(Math.random() * 100000)} funct={props.funct} data={data} menu={props.menu} setMenu={props.setMenu} index={index} deleteMenu={props.deleteMenu} />
                                    )
                                ))
                            ) : (
                                <div></div>
                            )}
                        </div>                       
                    </div>
                ) : (
                    <div className="data-active w-full h-full py-8 px-12 flex flex-col gap-y-4">
                        <div className="w-full h-10 flex align-center justify-start">
                            <input className="w-9/12 bg-white border border-1 border-black h-full rounded-lg px-4 text-2xl" type="text" name="" id="plan-name" placeholder="Plan Name" defaultValue={props.dataActive.nama}/>
                            <div className="w-3/12 h-full flex justify-end items-center">
                                <button className="w-1/2 bg-indigo-500 h-3/4 rounded-lg text-white font-semibold" onClick={() => {
                                    saveData("data-active", props.indexActive);
                                }}>Save</button>
                            </div>
                        </div>
                        <div className="flex justify-start items-center">
                            <p className="text-lg font-medium">Difficulty : </p>
                            <select name="difficulty" id="difficulty" className="w-32 ms-3 pt-1 pb-1.5 ps-3 border border-black rounded-lg">
                                {props.dataActive.difficulty == "Beginner" ? (
                                    <option value="Beginner" selected>Beginner</option>
                                ) : (
                                    <option value="Beginner">Beginner</option>
                                )}
                                {props.dataActive.difficulty == "Intermediate" ? (
                                    <option value="Intermediate" selected>Intermediate</option>
                                ) : (
                                    <option value="Intermediate">Intermediate</option>
                                )}
                                {props.dataActive.difficulty == "Hard" ? (
                                    <option value="Hard" selected>Hard</option>
                                ) : (
                                    <option value="Hard">Hard</option>
                                )}
                            </select>
                        </div>
                        <div className="flex justify-start items-center">
                            <p className="text-lg font-medium">Duration Range : </p>
                            <input type="text" className="w-10 h-7 mx-3 py-0.5 rounded-lg border border-black text-center" placeholder="10" id="from" defaultValue={props.dataActive.from}/>
                            <span>to</span>
                            <input type="text" className="w-10 h-7 mx-3 py-0.5 rounded-lg border border-black text-center" placeholder="20" id="to" defaultValue={props.dataActive.to}/>
                            <span>minutes</span>
                        </div>
                        <div className="flex justify-start items-center">
                            <p className="text-lg font-medium">Gender : </p>
                            <select name="gender" id="gender" className="w-24 ms-3 pt-1 pb-1.5 ps-3 border border-black rounded-lg">
                                {props.dataActive.gender == "Intersex" ? (
                                    <option value="Intersex" selected>Intersex</option>
                                ) : (
                                    <option value="Intersex">Intersex</option>
                                )}
                                {props.dataActive.gender == "Female" ? (
                                    <option value="Female" selected>Female</option>
                                ) : (
                                    <option value="Female">Female</option>
                                )}
                                {props.dataActive.gender == "Female" ? (
                                    <option value="Male" selected>Male</option>
                                ) : (
                                    <option value="Male">Male</option>
                                )}
                            </select>
                        </div>
                        <div className="w-full flex justify-start items-center">
                            <div className="w-3/4 flex justify-start items-center">
                                <p className="text-lg font-medium">Menu : </p>
                            </div>
                            <div className="w-1/4 flex justify-end items-center">
                                <button onClick={props.addMenu} className="w-1/2 bg-indigo-500 h-3/4 rounded-lg text-white font-semibold">Add Menu</button>
                            </div>
                        </div>
                        <div className="menu-list flex flex-col gap-y-2">
                            {props.menu && props.menu.length > 0 ? (
                                props.menu.map((data, index) => (
                                    data.status == 0 ? (
                                        <Menu key={Math.floor(Math.random() * 100000)} funct={props.funct} data={data} menu={props.menu} setMenu={props.setMenu} index={index} deleteMenu={props.deleteMenu} />
                                    ) : (
                                        <MenuExist key={Math.floor(Math.random() * 100000)} funct={props.funct} data={data} menu={props.menu} setMenu={props.setMenu} index={index} deleteMenu={props.deleteMenu} />
                                    )
                                ))
                            ) : (
                                <div></div>
                            )}
                        </div>                       
                    </div>
                )}
            </div>
        </>
    )
}