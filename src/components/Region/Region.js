import React from "react";

import {
    buildRegion
} from "utils/Formatter"

export default function Region(props) {
    let { region } = props;

    const countryToFlag = (isoCode) => {
        return typeof String.fromCodePoint !== 'undefined'
            ? isoCode
                .toUpperCase()
                .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
            : isoCode;
    }

    return (
        <React.Fragment>
            <span>{countryToFlag(region['iso2'])}</span>
            {buildRegion(region)}
        </React.Fragment>
    );
}