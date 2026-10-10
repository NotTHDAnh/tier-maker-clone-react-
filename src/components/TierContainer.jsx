import { data } from '../../data.js'
import TierRow from './TierRow/TierRow.jsx';
import './TierContainer.css'
import { TierContext } from '../App.jsx';
import { useContext } from 'react';

export default function TierContainer() {
    const { tiers } = useContext(TierContext);

    return (
        <div className="tier-container p-10">
            {tiers && tiers.map((item, index) => (
                <TierRow {...item} key={item.id ?? index} id={item.id ?? index}></TierRow>
            ))}
        </div>
    );
}
