import { useParams } from "react-router-dom";
import '../style/message.css'
import Layeout from "../components/Layeout"
import FullMail from "../components/FullMail"

export default function Message(){
    const { id } = useParams();

    return<>
        <Layeout isMessage={true} FullMail={<FullMail messageId={id}/>}/>
    </>
}