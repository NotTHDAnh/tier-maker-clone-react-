import { useContext } from 'react'
import './SettingModal.css'
import { TextContext, ColorContext } from '../TierRow/TierRow.jsx'

export default function SettingModal({ ref }) {
    const { titleTxt, setTitleTxt } = useContext(TextContext);
    const { colorTxt, setColorTxt } = useContext(ColorContext);
    let colors = ["ff7f7d", "febf7e", "fede80", "feff7f", "befe7e", "7fff7f", "7fffff", "7fbfff", "7f7fff", "ff7fff", "3b3b3b", "858585", "cfcfcf", "f7f7f7"];
    colors = colors.map(x => '#' + x);
    return (
        <dialog ref={ref} className="result-modal m-auto" onClick={e => { if (e.currentTarget === e.target) e.currentTarget.close() }}>
            <form method="dialog">
                <button id="close">X</button>
            </form>
            <h1 style={{ color: 'white' }}>Choose a Label Background Color</h1>
            <div id="color-select">
                {colors.map(item =>
                    <span
                        onClick={() => setColorTxt(item)}
                        className={colorTxt === item ? "selected" : undefined}
                        style={{ background: item }}
                    >

                    </span>)
                }
            </div>
            <h1 style={{ color: 'white' }}>Edit Label Text Below</h1>
            <textarea onChange={(e) => setTitleTxt(e.target.value)} defaultValue={titleTxt}></textarea>
            <div className='modal-button'>
                <button id="delete-row">Delete Row</button>
                <button id="clear-row">Clear Row Images</button>
            </div>
            <div className='modal-button'>
                <button id="add-row-above">Add a Row Above</button>
                <button id="add-row-below">Add a Row Below</button>
            </div>
        </dialog >
    )
}
