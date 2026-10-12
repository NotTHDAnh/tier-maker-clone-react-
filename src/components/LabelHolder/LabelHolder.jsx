import './LabelHolder.css'
import { TextContext } from '../TierRow/TierRow.jsx';
import { useContext, useEffect } from 'react';
import { TierContext } from '../../App.jsx';

// type tiers = {
//      id: number, 
//      color: string,
//      title: string,
//      images: []
// }


export default function LabelHolder({ title, color, id }) {
    const { titleTxt,setTitleTxt } = useContext(TextContext);
    const {setTiers } = useContext(TierContext)

    function handleTextChange(e) {
        setTitleTxt(e.target.value);

    }

    const reTier = () => {
        setTiers(tiers => tiers.map(t => {
            if(t.id === id){
                t.title = titleTxt;
            }
            return t;
        }))
    }

    return (
        <div style={{ background: color }} className="label-holder self-stretch items-center justify-center" >
            <textarea onBlur={reTier} className="text-black black break-all flex align-middle text-center justify-center text-2xl overflow-hidden resize-none" onChange={handleTextChange} value={title}></textarea>
        </div>
    );
}
