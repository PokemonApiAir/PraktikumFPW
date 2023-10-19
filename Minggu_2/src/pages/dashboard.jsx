import { useState } from "react"
import Left from "./components/left"
import Right from "./components/right"
import Data from "../assets/data.json"

export default function Dashboard() {
    const [addNewPlan, setAddNewPlan] = useState(false);
    const [dataActive, setDataActive] = useState(null);
    const [indexActive, setIndexActive] = useState(0);
    const [edit, setEdit] = useState(false);
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

    // Data
    const [planList, setPlanList] = useState(Data);

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

    return (
        <>
            <div className="w-screen h-screen flex flex-col justify-start items-center bg-blue-950">
                <h1 className="text-white text-3xl py-12 font-semibold">GETFIT</h1>
                <div className="w-5/6 h-4/5 flex justify-evenly gap-x-12">
                    <Left setEdit={setEdit} setIndexActive={setIndexActive} menu={menu} setMenu={setMenu} setAddNewPlan={setAddNewPlan} planList={planList} setPlanList={setPlanList} dataActive={dataActive} setDataActive={setDataActive}/>
                    <Right edit={edit} setEdit={setEdit} indexActive={indexActive} deleteMenu={deleteMenu} addMenu={addMenu} menu={menu} setMenu={setMenu} addNewPlan={addNewPlan} setAddNewPlan={setAddNewPlan} planList={planList} setPlanList={setPlanList} dataActive={dataActive} setDataActive={setDataActive}/>
                </div>
            </div>
        </>
    )
}