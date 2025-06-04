import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Mail(props){
    return<>
        <div className={`mail ${props.read ? 'read' : ''}`} onClick={props.IsRead}>
            <div className="mail-container">
                <h3 className="name">{props.name}</h3>
                <p className="subject">{props.subject}</p>
                <p className="date">{props.date}</p>
            </div>
            <div className="mail-container">
                <p className="short-message">{props.message}</p>
                <DeleteOutlineIcon className='delete-icon' onClick={props.MoveToTrash}/>
            </div>
        </div>
    </>
}