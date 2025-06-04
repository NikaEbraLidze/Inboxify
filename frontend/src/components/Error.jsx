export default function Error(props){
    return <>
        <div className="error">
            <div> 
                <p>{props.message}</p>
            </div>
        </div>
    </>
}