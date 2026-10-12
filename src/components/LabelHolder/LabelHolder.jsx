import './LabelHolder.css'
import { TextContext } from '../TierRow/TierRow.jsx';
import { useContext, useEffect } from 'react';
import { TierContext } from '../../App.jsx';
import { ColorContext } from '../TierRow/TierRow.jsx';

// type tiers = {
//      id: number, 
//      color: string,
//      title: string,
//      images: []
// }


export default function LabelHolder({ id }) {
    const { titleTxt, setTitleTxt } = useContext(TextContext);
    const { colorTxt } = useContext(ColorContext)
    const { setTiers } = useContext(TierContext)

    function handleTextChange(e) {
        setTitleTxt(e.target.value);
    }

    const reTier = () => {
        setTiers(tiers => tiers.map(t => {
            if (t.id === id) {
                t.title = titleTxt;
            }
            return t;
        }))
    }

    // field-sizing-content: div chứa text area tự mở rộng
    // break-word: text-area tự xuống dòng khi full
    return (
        <div style={{ background: colorTxt }} className="label-holder self-stretch items-center justify-center" >
            <textarea onBlur={reTier} className="text-black break-word flex align-middle field-sizing-content text-center justify-center text-2xl overflow-hidden resize-none" onChange={handleTextChange} value={titleTxt}></textarea>
        </div>);
}
