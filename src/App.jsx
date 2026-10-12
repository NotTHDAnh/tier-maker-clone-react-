import { useState } from 'react'
import './App.css'
import TierContainer from './components/TierContainer.jsx'
import ImagesContainer from './components/ImagesContainer/ImagesContainer.jsx'
import { DragDropProvider } from '@dnd-kit/react'
import { createContext } from 'react'
import { data } from '../data.js'
import { arrayMove } from '@dnd-kit/sortable'

export const ImgsContext = createContext(null);
export const TierContext = createContext(null);

function App() {

    const [unSortedImages, setUnsortedImages] = useState([])
    const [tiers, setTiers] = useState([...data]);

    const handleUpload = (newImgs) => {
        setUnsortedImages(newImgs);
    }

    const handleDragEnd = (e) => {
        if (e.canceled) return;
        const { source, target } = e.operation;
        if (!target) return;

        const draggedImg = source.data;
        const targetId = target.id;

        const getId = (img) => img?.id;
        // Check if the imgs is from the uploader
        const isFromUploader = unSortedImages.some(img => getId(img) === draggedImg.id);
        // Get source tier
        const sourceTier = tiers.find(t => (t.images || []).some(img => getId(img) === draggedImg.id));
        // check if the img is dropped into uploader
        const isDropToUploader = targetId === "uploader" || unSortedImages.some(img => getId(img) === targetId);
        // find the tier that img is dropped into
        const targetTier = tiers.find(t =>
            t.id === targetId ||
            String(t.id) === String(targetId) ||
            (t.images || []).some(img => getId(img) === targetId)
        );
        if (isDropToUploader) {
            if (isFromUploader) {
                // just change order of the img because it only drop from to uploader
                const oldIndex = unSortedImages.findIndex(img => getId(img) === draggedImg.id);
                const newIndex = unSortedImages.findIndex(img => getId(img) === targetId);
                if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                    setUnsortedImages(prev => arrayMove(prev, oldIndex, newIndex));
                }
            } else if (sourceTier) {
                // if the img is dropped from another tier into uploader
                setTiers(prev => prev.map(t =>
                    t.id === sourceTier.id
                        ? { ...t, images: (t.images || []).filter(img => getId(img) !== draggedImg.id) }
                        : t
                ));
                setUnsortedImages(prev => [...prev, draggedImg]);
            }
            return;
        }
        if (targetTier) {
            if (isFromUploader) {
                setUnsortedImages(prev => prev.filter(img => getId(img) !== draggedImg.id));
            }
            setTiers(prevTiers => prevTiers.map(tier => {
                if (sourceTier && sourceTier.id === targetTier.id && tier.id === targetTier.id) {
                    // just change order of images in the same tier
                    const oldIndex = (tier.images || []).findIndex(img => getId(img) === draggedImg.id);
                    const newIndex = (tier.images || []).findIndex(img => getId(img) === targetId);
                    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                        return { ...tier, images: arrayMove(tier.images, oldIndex, newIndex) };
                    }
                    return tier;
                }
                if (sourceTier && tier.id === sourceTier.id && tier.id !== targetTier.id) {
                    // delete img from the source tier 
                    return {
                        ...tier,
                        images: (tier.images || []).filter(img => getId(img) !== draggedImg.id)
                    };
                }
                if (tier.id === targetTier.id) {
                    // add new img to the target tier
                    const cleanImages = (tier.images || []).filter(img => getId(img) !== draggedImg.id);
                    return {
                        ...tier,
                        images: [...cleanImages, draggedImg]
                    };
                }
                return tier;
            }));
        }
        else return;
    }

    return (
        <>
            <TierContext value={{ tiers, setTiers }}>
                <ImgsContext value={{ unSortedImages, handleUpload }}>
                    <DragDropProvider onDragEnd={handleDragEnd}>
                        <h1>Tier maker</h1>
                        <TierContainer />
                        <ImagesContainer />
                    </DragDropProvider>
                </ImgsContext>
            </TierContext>
        </>
    )
}

export default App
