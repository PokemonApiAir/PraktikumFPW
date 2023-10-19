import Durasi from "../../assets/durasi.png"
import Intersex from "../../assets/inter.png"
import Female from "../../assets/female.png"
import Male from "../../assets/male.png"

export default function Left(props) {
    const itemData = props.planList;
    return (
        <>
            <div className="left w-1/3 h-full flex flex-col justify-between">
                <div className="w-full h-6/7 bg-snow rounded-2xl mb-12 overflow-y-auto">
                    <div className="w-full h-full py-8 px-8">
                        {itemData.map((data, idx) => (
                            <div key={idx} onClick={() => {
                                props.setEdit(false);
                                props.setMenu([...data.menu]);
                                props.setIndexActive(idx);
                                props.setDataActive(data);
                                props.setAddNewPlan(false);
                            }}>
                                <div className="w-full h-1/6 flex pt-2">
                                    <div className="w-10/12 h-full flex flex-col gap-y-2">
                                        <h1 className="text-xl font-bold">{data.nama}</h1>
                                        {data.difficulty == "Beginner" ? (
                                            <p className="bg-green-500 w-1/4 py-0.5 text-center rounded-xl">{data.difficulty}</p>
                                        ) : data.difficulty == "Intermediate" ? (
                                            <p className="bg-yellow-300 w-2/6 py-0.5 text-center rounded-xl">{data.difficulty}</p>
                                        ) : (
                                            <p className="bg-red-500 w-1/5 py-0.5 text-center rounded-xl">{data.difficulty}</p>
                                        )}
                                        <div className="flex justify-start items-center">
                                            <img className="w-6 h-6" src={Durasi} alt="logo_durasi"/>
                                            <p className="pb-0.5">{data.from} - {data.to} minutes</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center w-12">
                                        {data.gender == "Intersex" ? (
                                            <img className="w-8 h-12" src={Intersex} alt="" />
                                        ) : data.gender == "Male" ? (
                                            <img className="w-10 h-12" src={Male} alt="" />
                                        ) : (
                                            <img className="w-8 h-12" src={Female} alt="" />
                                        )}
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <hr className="border-1 border-slate-300"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="w-full h-1/7 bg-indigo-500 rounded-2xl" onClick={() => {
                    props.setAddNewPlan(true);
                    props.setDataActive(null);
                    props.setMenu([
                        {
                            id: 0,
                            set: 1,
                            workout_name: "Menu Name",
                            long: 10,
                            time: "mins",
                            status: 0
                        }
                    ]);
                    props.setEdit(false);
                }}>
                    <span className="text-2xl text-white font-bold">+ Add new Plan</span>
                </button>
            </div>
        </>
    )
}