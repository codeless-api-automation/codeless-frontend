import React, { useRef, useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const OverflowTip = props => {

    const textElementRef = useRef();

    const compareSize = () => {
        const compare =
            textElementRef.current.scrollWidth > textElementRef.current.clientWidth;
        setHover(compare);
    };

    useEffect(() => {
        compareSize();
        window.addEventListener('resize', compareSize);
    }, []);

    useEffect(() => () => {
        window.removeEventListener('resize', compareSize);
    }, []);

    const [hoverStatus, setHover] = useState(false);

    return (
        <Tooltip
            title={props.tooltipValue == null ? props.originalValue : props.tooltipValue}
            interactive
            disableHoverListener={!hoverStatus}
        >
            <div
                ref={textElementRef}
                style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                {props.originalValue}
            </div>
        </Tooltip>
    );
};

export default OverflowTip;