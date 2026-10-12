import LabelHolder from '../LabelHolder/LabelHolder.jsx';
import SettingControl from '../SettingControl/SettingControl.jsx';
import { useState, useContext, createContext } from 'react'
import './TierRow.css'
import { useDroppable } from '@dnd-kit/react';
import { TierContext } from '../../App.jsx';
import ImageWrapper from '../ImageWrapper/ImageWrapper.jsx';
import { SortableContext } from '@dnd-kit/sortable';

export const TextContext = createContext(null);
export const ColorContext = createContext(null);

export default function TierRow({ title, color, id, images = [] }) {
    const { tiers, setTiers } = useContext(TierContext);
    const [titleTxt, setTitleTxt] = useState(title);
    const [colorTxt, setColorTxt] = useState(color);
    const { ref } = useDroppable({ id: id });

    return (
        <ColorContext.Provider value={{ colorTxt, setColorTxt }}>
            <TextContext.Provider value={{ titleTxt, setTitleTxt }}>
                <div className='tier-row'>
                    <LabelHolder title={titleTxt} color={colorTxt} id={id} className='label-holder'>
                    </LabelHolder>
                    <div ref={ref} className='tier-sort flex flex-wrap'>
                        <SortableContext items={images.map(img => img.id)}>
                            {images.map((img) => {
                                return < ImageWrapper key={img.id} image={img} />
                            })}
                        </SortableContext>
                    </div>
                    <SettingControl id={id}></SettingControl>
                </div>
            </TextContext.Provider>
        </ColorContext.Provider >
    );
}
