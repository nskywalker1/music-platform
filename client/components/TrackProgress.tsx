import React from 'react';

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e) => void
}

const TrackProgress:React.FC<TrackProgressProps> = ({left,right,onChange}) => {
    return (
        <div>
            <input
                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{left} / {right}</div>
        </div>
    );
};

export default TrackProgress;