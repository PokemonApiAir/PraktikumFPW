import {useState} from "react"
import Menu from "./menu"

export default function Right(props) {
    const [menu, setMenu] = useState([
        {
            id: 0,
            set: 1,
            workout_name: "Menu Name",
            long: 10,
            time: "mins",
            status: 0
        }
    ]);

    const addMenu = () => {
        const tempMenu = {
            id: menu[menu.length - 1].id + 1,
            set: 1,
            workout_name: "Menu Name",
            long: 10,
            time: "mins",
            status: 0
        };
        const newMenu = Object.values({...menu});
        newMenu.push(tempMenu);
        setMenu(newMenu);
    }

    const deleteMenu = (id) => {
        const updatedData = menu.filter((item) => {
            if(item.id != id){
                return item;
            }
        });
        setMenu([...updatedData]);
    }

    const handleInputChange = (e, index) => {
        const changeData = menu.filter((data, idx) => {
            if(idx == index && e.target.value != ""){
                data.workout_name = e.target.value;
            }
            return data;
        });
        setMenu(changeData);
    }

    return (
        <>
            <div className="right w-2/3 h-full bg-snow rounded-2xl">
                {props.dataActive == null && props.addNewPlan == false ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <h1 className="text-4xl text-slate-400">Choose a plan to see detail here</h1>
                    </div>
                ) : props.addNewPlan == true ? (
                    <div className="w-full h-full py-8 px-12 flex flex-col gap-y-4">
                        <div className="w-full h-10 flex align-center justify-start">
                            <input className="w-9/12 bg-white border border-1 border-black h-full rounded-lg px-4 text-2xl" type="text" name="" id="" placeholder="Plan Name"/>
                            <div className="w-3/12 h-full flex justify-end items-center">
                                <button className="w-1/2 bg-indigo-500 h-3/4 rounded-lg text-white font-semibold">Save</button>
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
                            <input type="text" className="w-10 h-7 mx-3 py-0.5 rounded-lg border border-black text-center" placeholder="10"/>
                            <span>to</span>
                            <input type="text" className="w-10 h-7 mx-3 py-0.5 rounded-lg border border-black text-center" placeholder="20"/>
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
                                <button onClick={addMenu} className="w-1/2 bg-indigo-500 h-3/4 rounded-lg text-white font-semibold">Add Menu</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            {menu && menu.length > 0 ? (
                                menu.map((data, index) => (
                                    data.status == 0 ? (
                                        <Menu key={index} data={data} menu={menu} setMenu={setMenu} index={index} deleteMenu={deleteMenu} handleInputChange={handleInputChange}/>
                                    ) : (
                                        <div></div>
                                    )
                                ))
                            ) : (
                                <div></div>
                            )}
                        </div>                       
                    </div>
                ) : (
                    <div className="w-full h-full py-8 px-12 flex flex-col gap-y-4">
                        <div className="w-full h-10 flex align-center justify-start">
                            <input className="w-9/12 bg-white border border-1 border-black h-full rounded-lg px-4 text-2xl" type="text" name="" id="" placeholder="Plan Name" defaultValue={props.dataActive.nama}/>
                            <div className="w-3/12 h-full flex justify-end items-center">
                                <button className="w-1/2 bg-indigo-500 h-3/4 rounded-lg text-white font-semibold">Save</button>
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
                            <input type="text" className="w-10 h-7 mx-3 py-0.5 rounded-lg border border-black text-center" placeholder="10" defaultValue={props.dataActive.from}/>
                            <span>to</span>
                            <input type="text" className="w-10 h-7 mx-3 py-0.5 rounded-lg border border-black text-center" placeholder="20" defaultValue={props.dataActive.to}/>
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
                                <button onClick={addMenu} className="w-1/2 bg-indigo-500 h-3/4 rounded-lg text-white font-semibold">Add Menu</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            {menu && menu.length > 0 ? (
                                menu.map((data, index) => (
                                    data.status == 0 ? (
                                        <Menu key={Math.floor(Math.random() * 100) + 100} data={data} menu={menu} setMenu={setMenu} index={index} deleteMenu={deleteMenu} handleInputChange={handleInputChange}/>
                                    ) : (
                                        <div></div>
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