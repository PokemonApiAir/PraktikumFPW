import berangkat from "../../assets/berangkat.png";
import tanggal from "../../assets/tanggal.png";
import sampai from "../../assets/sampai.png";
import durasi from "../../assets/durasi.png";

export default function Detail(props) {
    const itemData = props.data;
    const url_bendera_asal = `https://flagcdn.com/w80/${itemData.asal.flag}.png`;
    const url_bendera_tujuan = `https://flagcdn.com/w80/${itemData.tujuan.flag}.png`;

    function formatDate(inputDate) {
        const temp = inputDate.split('-');
        const day = temp[0];
        const month = temp[1];
        const year = temp[2];

        const listMonth = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];

        return `${day} ${listMonth[parseInt(month, 10) - 1]} ${year}`;
    }

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    return (
        <>
            <div className="country w-full h-1/4 flex bg-slate-200 rounded-lg flex items-center">
                <div className="depart h-1/2 w-1/2 flex flex-col justify-start items-center gap-y-3">
                    <img src={url_bendera_asal} alt="" />
                    <p className="w-2/3 text-center font-semibold">{itemData.asal.bandara}</p>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-12 h-12">
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="arrival w-1/2 h-1/2 flex flex-col justify-start items-center  gap-y-3">
                    <img src={url_bendera_tujuan} alt="" />
                    <p className="w-2/3 text-center font-semibold">{itemData.tujuan.bandara}</p>
                </div>
            </div>
            <div className="detail w-full h-1/4 flex rounded-lg flex items-center pt-12">
                <div className="depart w-1/2 flex flex-col justify-center items-start gap-y-3">
                    <p>Boarding Date</p>
                    <p>Boarding Time</p>
                    <p>Duration</p>
                    <p>Flight Type</p>
                </div>
                <div className="arrival w-1/2 flex flex-col justify-center items-start gap-y-3 font-semibold">
                    <p>{formatDate(itemData.jadwal.berangkat.tanggal)}</p>
                    <p>{itemData.jadwal.berangkat.jam}</p>
                    <p>{itemData.jadwal.durasi}</p>
                    <p>{capitalizeFirstLetter(itemData.jenis)}</p>
                </div>
            </div>
            <div className="schedule w-full h-1/4 flex rounded-lg flex items-center pt-2">
                <div className="depart w-1/2 flex flex-col justify-start items-center gap-y-3">
                    <h1 className="text-2xl font-semibold">Departure</h1>
                    <div className="flex justify-center align-center">
                        <img className="w-16 h-16" src={berangkat} alt="" />
                        <div className="flex flex-col align-start">
                            <div className="flex justify-center align-center gap-1">
                                <img className="w-9 h-9" src={tanggal} alt="" />
                                <p className="text-lg pt-1">{itemData.jadwal.berangkat.tanggal}</p>
                            </div>
                            <div className="flex justify-start align-center gap-1">
                                <img className="w-9 h-9" src={durasi} alt="" />
                                <p className="text-lg pt-1">{itemData.jadwal.berangkat.jam}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="depart w-1/2 flex flex-col justify-start items-center gap-y-3">
                    <h1 className="text-2xl font-semibold">Arrival</h1>
                    <div className="flex justify-center align-center">
                        <img className="w-16 h-16" src={sampai} alt="" />
                        <div className="flex flex-col align-start">
                            <div className="flex justify-center align-center gap-1">
                                <img className="w-9 h-9" src={tanggal} alt="" />
                                <p className="text-lg  pt-1">{itemData.jadwal.sampai.tanggal}</p>
                            </div>
                            <div className="flex justify-start align-center gap-1">
                                <img className="w-9 h-9" src={durasi} alt="" />
                                <p className="text-lg pt-1">{itemData.jadwal.sampai.jam}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}