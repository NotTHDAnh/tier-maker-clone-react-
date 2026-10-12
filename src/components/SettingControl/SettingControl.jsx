import { useContext, useRef } from 'react';
import './SettingControl.css'
import SettingModal from '../SettingModal/SettingModal';
import { TierContext } from '../../App.jsx';
import { arrayMove } from '@dnd-kit/sortable';

export default function SettingControl({ id }) {
    const { tiers, setTiers } = useContext(TierContext);
    const dialog = useRef();
    const handleDownBtn = () => {
        const index = tiers.findIndex(item => item.id === id);
        if (index === tiers.length) {
            return;
        }
        setTiers(tiers => arrayMove(tiers, index, index + 1));
    }

    const handleUpBtn = () => {
        const index = tiers.findIndex(item => item.id === id);
        if (index === 0) return;
        setTiers(tiers => arrayMove(tiers, index, index - 1));
    }

    const handleSettingClick = () => {
        dialog.current.showModal();
    }

    return (
        <>
            <SettingModal id={id} ref={dialog}></SettingModal >
            <div className="setting-control">
                <div className="setting rounded hover:opacity-50 transition-opacity duration-50 p-10 m-2" onClick={handleSettingClick}>
                </div>
                <div className="move-buttons flex flex-col align-middle justify-center">
                    <div onClick={handleUpBtn} className="rounded move-up hover:opacity-50 transition-opacity duration-50 p-10 m-1"></div>
                    <div onClick={handleDownBtn} className="move-down rounded hover:opacity-50 transition-opacity duration-50 p-10 m-1"></div>
                </div>
            </div>
        </>
    );
}
