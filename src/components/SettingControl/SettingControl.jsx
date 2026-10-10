import { useRef } from 'react';
import './SettingControl.css'
import SettingModal from '../SettingModal/SettingModal';

export default function SettingControl() {
    const dialog = useRef();
    const handleDownBtn = () => {
        console.log("down");
    }

    const handleUpBtn = () => {
        console.log("up")
    }

    const handleSettingClick = () => {
        dialog.current.showModal();
    }

    return (
        <>
            <SettingModal ref={dialog}></SettingModal >
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
