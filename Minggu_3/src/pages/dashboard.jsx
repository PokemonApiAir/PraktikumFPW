import { useForm } from 'react-hook-form';
import { useState } from 'react';

import Form from './components/form'
import View from './components/view'

export default function Dashboard() {
    // Error Handling react-hook-form
    // const { register, handleSubmit,
    //     formState: { errors } } = useForm();
    
    const [state, setState] = useState("form");
    const [inputStatus, setInputStatus] = useState([false, false, false, false]);
    // const [data, setData] = useState({
    //     nama: "Sucipto",
    //     title: "Backend Developer",
    //     phone_number: "0812837377580",
    //     email: "sucipto8391@gmail.com",
    //     domicile: "Semarang",
    //     linkedin: "example_user",
    //     photo_url: "data:image/jpeg;base64,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",
    //     about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel culpa quas maxime eos eaque commodi quod autem non atque, deleniti accusantium dolore ipsa tempora modi alias ab hic, maiores asperiores, amet blanditiis quo aperiam officiis voluptatum ducimus. Enim nemo omnis, nulla ipsa vel iusto quasi! Numquam quos impedit quibusdam in libero, sequi aliquam accusantium quasi, ut aperiam dolorum corporis delectus ipsum ad laborum non. Doloremque corporis quasi, corrupti perferendis dolorem vero provident deserunt officia fuga aspernatur aut inventore excepturi iusto consequatur magni veniam magnam, eos facere facilis amet laboriosam, perspiciatis distinctio minus. Suscipit vero, quos explicabo tenetur velit sequi natus?",
    //     education: [
    //         {
    //             edu: "High School",
    //             place: "SMA Sedes Sapientiae, Semarang",
    //             start: "2018",
    //             end: "2021"
    //         },
    //         {
    //             edu: "Bachelor Degree",
    //             place: "Institut Sains dan Teknologi Terpadu, Surabaya",
    //             start: "2021",
    //             end: "2025"
    //         }
    //     ],
    //     experiences: [
    //         {
    //             title: "Machine Learning",
    //             place: "kaggle.com",
    //             desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias obcaecati magnam cumque pariatur et officia sunt nemo soluta? Doloremque, omnis.",
    //             start: "June, 2023",
    //             end: "July, 2023"
    //         },
    //         {
    //             title: "Python",
    //             place: "kaggle.com",
    //             desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias obcaecati magnam cumque pariatur et officia sunt nemo soluta? Doloremque, omnis.",
    //             start: "June, 2023",
    //             end: "July, 2023"
    //         },
    //         {
    //             title: "Python",
    //             place: "kaggle.com",
    //             desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias obcaecati magnam cumque pariatur et officia sunt nemo soluta? Doloremque, omnis.",
    //             start: "June, 2023",
    //             end: "July, 2023"
    //         },
    //         {
    //             title: "Python",
    //             place: "kaggle.com",
    //             desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias obcaecati magnam cumque pariatur et officia sunt nemo soluta? Doloremque, omnis.",
    //             start: "June, 2023",
    //             end: "July, 2023"
    //         },
    //         {
    //             title: "Python",
    //             place: "kaggle.com",
    //             desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias obcaecati magnam cumque pariatur et officia sunt nemo soluta? Doloremque, omnis.",
    //             start: "June, 2023",
    //             end: "July, 2023"
    //         },
    //         {
    //             title: "Python",
    //             place: "kaggle.com",
    //             desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias obcaecati magnam cumque pariatur et officia sunt nemo soluta? Doloremque, omnis.",
    //             start: "June, 2023",
    //             end: "July, 2023"
    //         },
    //         {
    //             title: "Python",
    //             place: "kaggle.com",
    //             desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias obcaecati magnam cumque pariatur et officia sunt nemo soluta? Doloremque, omnis.",
    //             start: "June, 2023",
    //             end: "July, 2023"
    //         }
    //     ]
    // })

    // Web Service
    // const schema = Joi.object({
    //     nama_key: Joi.string()
    // })

    const [data, setData] = useState(null);

    return (
        <>
            {state == "form" && <Form inputStatus={inputStatus} setInputStatus={setInputStatus} data={data} setData={setData} setState={setState}/>}
            {state == "view" && data && <View data={data} setState={setState}/>}
        </>
    )
}