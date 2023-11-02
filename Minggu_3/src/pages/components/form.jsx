import { useForm } from 'react-hook-form';
import { useState } from 'react';

import BlankForm from './blankForm';
import ViewForm from './viewForm';

export default function Form({inputStatus, setInputStatus, data, setData, setState}) {
    const [experiences, setExperiences] = useState(data ? data.experiences : [
        {
            id: 0,
            title: "",
            place: "",
            description: "",
            start: "",
            end: ""
        }
    ])

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const generate = data => {
        const generate_data = {
            nama: data.nama,
            title: data.title,
            phone_number: data.phone_number,
            email: data.email,
            domicile: data.domicile,
            linkedin: data.linkedin,
            photo_url: data.photo_url,
            about: data.about,
        }

        const education = [];
        for (let i = 0; i < inputStatus.length; i++) {
            if(inputStatus[i] == true){
                let edu;
                switch (i) {
                    case 0:
                        edu = "High School";
                    break;
                    case 1:
                        edu = "Diploma Degree";
                    break;
                    case 2:
                        edu = "Bachelor Degree";
                    break;
                    case 3:
                        edu = "Master Degree";
                    break;
                    default:
                        edu = "Unknown";
                }

                const temp_edu = {
                    edu: edu,
                    place: data[`place_${i}`],
                    start: data[`start_${i}`],
                    end: data[`end_${i}`]
                }

                education.push(temp_edu);
            }
        }
        generate_data.education = education;
        
        const list_experiences = [];
        for (let i = 0; i < experiences.length; i++) {
            const temp_exp = {
                title: data.experiences[`${experiences[i].id}`].title,
                place: data.experiences[`${experiences[i].id}`].place,
                description: data.experiences[`${experiences[i].id}`].desc,
                start: data.experiences[`${experiences[i].id}`].start,
                end: data.experiences[`${experiences[i].id}`].end
            }
            list_experiences.push(temp_exp);            
        }

        generate_data.experiences = list_experiences;
        setData(generate_data);
        setState("view");
    }

    const statusChange = (field) => {
        if(inputStatus[field] == true){
            const fieldList = document.querySelectorAll(".text-" + field);
            fieldList.forEach(element => {
                element.disabled = "disabled";
                element.classList.remove("border-black");
                element.classList.add("border-gray-300");
            });
            inputStatus[field] = false;
            setInputStatus([...inputStatus]);
        }else if(inputStatus[field] == false){
            const fieldList = document.querySelectorAll(".text-" + field);
            fieldList.forEach(element => {
                element.disabled = "";
                element.classList.remove("border-gray-300");
                element.classList.add("border-black");
            });
            inputStatus[field] = true;
            setInputStatus([...inputStatus]);
        }
    }

    const addField = () => {
        const data = {
            id: experiences.length,
            title: "",
            place: "",
            description: "",
            start: "",
            end: ""
        }

        setExperiences([...experiences, data])
    }

    const deleteField = (idx) => {
        const updatedData = experiences.filter((item) => {
            if(item.id != idx){
                return item;
            }
        });
        setExperiences([...updatedData]);
    }

    const changeTitle = (index) => {
        const elements = document.querySelectorAll(".title");
        let title;
        elements.forEach((element, idx) => {
            if(idx == index){
                title = element.value;
            }
        });

        experiences[index].title = title;
        setExperiences(experiences);
    }

    const changePlace = (index) => {
        const elements = document.querySelectorAll(".place");
        let place;
        elements.forEach((element, idx) => {
            if(idx == index){
                place = element.value;
            }
        });

        experiences[index].place = place;
        setExperiences(experiences);
    }

    const changeDesc = (index) => {
        const elements = document.querySelectorAll(".desc");
        let description;
        elements.forEach((element, idx) => {
            if(idx == index){
                description = element.value;
            }
        });

        experiences[index].description = description;
        setExperiences(experiences);
    }

    const changeStart = (index) => {
        const elements = document.querySelectorAll(".start");
        let start;
        elements.forEach((element, idx) => {
            if(idx == index){
                start = element.value;
            }
        });

        experiences[index].start = start;
        setExperiences(experiences);
    }

    const changeEnd = (index) => {
        const elements = document.querySelectorAll(".end");
        let end;
        elements.forEach((element, idx) => {
            if(idx == index){
                end = element.value;
            }
        });

        experiences[index].end = end;
        setExperiences(experiences);
    }

    return (
        <>
            {data ? (
                <ViewForm reset={reset} data={data} setData={setData} register={register} handleSubmit={handleSubmit} errors={errors} inputStatus={inputStatus} setInputStatus={setInputStatus} experiences={experiences} setExperiences={setExperiences} generate={generate} statusChange={statusChange} addField={addField} deleteField={deleteField} changeTitle={changeTitle} changePlace={changePlace} changeDesc={changeDesc} changeStart={changeStart} changeEnd={changeEnd} />
            ) : (
                <BlankForm reset={reset} setData={setData} register={register} handleSubmit={handleSubmit} errors={errors} inputStatus={inputStatus} setInputStatus={setInputStatus} experiences={experiences} setExperiences={setExperiences} generate={generate} statusChange={statusChange} addField={addField} deleteField={deleteField} changeTitle={changeTitle} changePlace={changePlace} changeDesc={changeDesc} changeStart={changeStart} changeEnd={changeEnd} />
            )}
            
        </>
    )
}