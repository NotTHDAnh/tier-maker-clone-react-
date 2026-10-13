import { useContext } from 'react'
import './SettingModal.css'
import TierRow, { TextContext, ColorContext } from '../TierRow/TierRow.jsx'
import { TierContext } from '../../App.jsx';
import { ImgsContext } from '../../App.jsx';
import { arrayMove } from '@dnd-kit/sortable';

export default function SettingModal({ ref, id }) {
    const { titleTxt, setTitleTxt } = useContext(TextContext);
    const { colorTxt, setColorTxt } = useContext(ColorContext);
    const { setUnsortedImages } = useContext(ImgsContext);
    const { tiers, setTiers } = useContext(TierContext);

    function addNewRow(direction) {
        let currentRowIndex = tiers.findIndex(item => item.id === id);
        currentRowIndex = (direction === "down") ? currentRowIndex + 1 : currentRowIndex;
        const newRowData = {
            id: crypto.randomUUID(),
            color: "#feff7f",
            title: "NEW",
            images: []
        }
        let newTiers = [...tiers];

        newTiers.splice(currentRowIndex, 0, newRowData);
        setTiers(newTiers);
    }

    const handleAddBtnAbove = () => {
        addNewRow("up");
    }

    const handleAddBtnBelow = () => {
        addNewRow("down");
    }

    const handleClearRow = () => {
        const currentRowIndex = tiers.findIndex(item => item.id === id);
        const imgs = tiers[currentRowIndex].images;
        setTiers(item => item.map(i => {
            if (i.id === id) {
                i.images = [];
            }
            return i;
        }))
        setUnsortedImages(prev => [...prev, ...imgs]);
    }

    const handleDeleteRow = () => {
        handleClearRow();
        setTiers(item => item.filter(i => i.id !== id));
    }

    const handleDoneModal = () => {
        setTiers(item => item.map(i => {
            if (i.id === id) {
                i.color = colorTxt;
                i.title = titleTxt;
            }
            return i;
        }))
    }

    let colors = ["ff7f7d", "febf7e", "fede80", "feff7f", "befe7e", "7fff7f", "7fffff", "7fbfff", "7f7fff", "ff7fff", "3b3b3b", "858585", "cfcfcf", "f7f7f7"];
    colors = colors.map(x => '#' + x);
    return (
        <dialog ref={ref} className="result-modal m-auto" onClick={e => { if (e.currentTarget === e.target) { e.currentTarget.close(); handleDoneModal() } }}>
            <form method="dialog">
                <button id="close">x</button>
            </form>
            <h1 style={{ color: 'white' }}>Choose a Label Background Color</h1>
            <div id="color-select">
                {colors.map((item, index) =>
                    <span
                        key={index}
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
                <button className='cursor-pointer' onClick={handleDeleteRow} id="delete-row">Delete Row</button>
                <button className='cursor-pointer' onClick={handleClearRow} id="clear-row">Clear Row Images</button>
            </div>
            <div className='modal-button'>
                <button className='cursor-pointer' onClick={handleAddBtnAbove} id="add-row-above">Add a Row Above</button>
                <button className='cursor-pointer' onClick={handleAddBtnBelow} id="add-row-below">Add a Row Below</button>
            </div>
        </dialog >
    )
}
