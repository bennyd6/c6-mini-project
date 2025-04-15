import ai from '../assets/ai.png'
export default function AiSuggestion(){
    return(
        <div className="chat-prom">
        <img src={ai} alt="" />
            <h1>Ask Emira!</h1>
            <div className="b-grad">
                <button>Chat Now!</button>
            </div>
        </div>
    );
}