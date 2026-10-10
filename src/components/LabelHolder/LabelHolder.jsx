import './LabelHolder.css'
import { TextContext } from '../TierRow/TierRow.jsx';
import { useContext } from 'react';

export default function LabelHolder({ title, color }) {
    const { setTitleTxt } = useContext(TextContext);

    function handleTextChange(e) {
        setTitleTxt(e.target.value);
    }

    return (
        <div style={{ background: color }} className="label-holder self-stretch items-center justify-center" >
            <span contentEditable={true} suppressContentEditableWarning={true} className="text-black black break-all text-center text-2xl overflow-hidden resize-none" onChange={handleTextChange}>{title}</span>
        </div>
    );
}
