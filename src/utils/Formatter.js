
export function buildRegion(region) {
    return region.city + ", " + region.country;
}

export function buildRunFrequency(timer) {

    let timerType = timer.type;
    if (timerType === 'WEEK_TIMER') {
        return timer.week;
    }

    if (timerType === 'HOUR_TIMER') {
        return timer.hour;
    }

    if (timerType === 'MINUTE_TIMER') {
        return timer.minute;
    }
}