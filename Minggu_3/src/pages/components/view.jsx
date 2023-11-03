import Linkedin from '../../assets/linkedin.png'

export default function View({data, setState}) {
    const printPage = () => {
        const element = document.getElementById("print").innerHTML;
        const ori = document.body.innerHTML;
        document.body.innerHTML = element;
        window.print();
        document.body.innerHTML = ori;
    }
    
    const toForm = () => {
        setState("form")
    }
    return (
        <>
            <div className="w-full h-full bg-hehe flex flex-col justify-center items-center py-16">
                <div className="w-full flex justify-between h-16 px-44 mb-6">
                    <button onClick={toForm} className='text-white font-semibold bg-button-cl rounded-lg h-12 w-32'>Back</button>
                    <h1 className='text-3xl font-bold'>CV Maker</h1>
                    <button onClick={printPage} className='text-white font-semibold bg-button-add rounded-lg h-12 w-32'>Print</button>
                </div>
                <div id="print" className="w-7/12 bg-white flex flex-col h-full rounded-2xl py-40 px-16">
                    <div className="w-full h-72 flex justify-center items-center">
                        <div className="w-5/12 flex justify-center items-center">
                            <img className='h-72 w-72 rounded-full border-double border-8 border-sky-500' src={data.photo_url} alt="" />
                        </div>
                        <div className="w-7/12">
                            <div className="flex w-full justify-start items-end gap-x-6">
                                <h1 className="text-4xl font-semibold text-blue">{data.nama}</h1>
                                <p className="text-2xl font-medium text-light-blue">{data.title}</p>
                            </div>
                            <hr className="h-1 bg-line my-3"/>
                            <div className="flex w-full justify-start items-end gap-x-6">
                                <div className="w-1/2 flex flex-col gap-y-2">
                                    <p className="text-lg font-medium">📞 {data.phone_number}</p>
                                    <div className='flex items-center'>
                                        <img className='w-5 h-5' src={Linkedin}/>
                                        <p className="text-lg font-medium ps-2">{data.linkedin}</p>
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-col gap-y-2">
                                    <p className="text-lg font-medium">📧 {data.email}</p>
                                    <p className="text-lg font-medium">📍 {data.domicile}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full flex justify-center items-start py-16 px-20'>
                        <div className='w-1/2 flex flex-col'>
                            <div className='w-full flex flex-col'>
                                <h1 className='h-12 w-28 bg-text-view font-semibold text-lg text-white flex justify-center items-center'>About</h1>
                                <p className='w-8/12 py-4 text-lg text-justify pe-8'>{data.about}</p>
                            </div>
                            <div className='w-full flex flex-col'>
                                <h1 className='h-12 w-36 bg-text-view font-semibold text-lg text-white flex justify-center items-center'>Education</h1>
                                {data.education.map((item, idx) => (
                                    <div key={idx} className='w-full flex flex-col justify-center items-start py-3'>
                                        <div className='w-full flex pe-8'>
                                            <p className='w-1/2 text-lg font-semibold flex justify-start'>{item.edu}</p>
                                            <p className='w-1/2 text-lg font-medium flex justify-end text-light-blue'>{item.start} - {item.end}</p>
                                        </div>
                                        <p className='text-lg font-normal flex text-justify'>{item.place}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='w-1/2 ps-8'>
                            <div className='w-full flex flex-col'>
                                <h1 className='h-12 w-36 bg-text-view font-semibold text-lg text-white flex justify-center items-center'>Experiences</h1>
                                {data.experiences.map((item, idx) => (
                                    <div key={idx} className='flex flex-col py-3'>
                                        <div className='w-full flex pe-8'>
                                            <p className='w-1/2 text-lg font-semibold flex justify-start'>{item.title}</p>
                                            <p className='w-1/2 text-lg font-medium flex justify-end text-light-blue'>{item.start} - {item.end}</p>
                                        </div>
                                        <p className='text-lg font-normal flex text-justify'>{item.place}</p>
                                        <p className='text-lg font-normal flex text-justify'>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}