import '../style/message.css'
import Layeout from "../components/Layeout"
import FullMail from "../components/FullMail"

export default function Message(){
    return<>
        <Layeout isMessage={true} FullMail={<FullMail />}/>
    </>
}