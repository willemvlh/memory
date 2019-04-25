function toDurationString(sec){
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    hours = Math.floor(sec / 3600);
    minutes = Math.floor((sec - (hours * 3600)) / 60);
    seconds = sec - hours * 3600 - minutes * 60;
    let resultStr = "";
    resultStr += `${hours < 10 ? "0" + hours : hours}:`;
    resultStr += `${minutes < 10 ? "0" + minutes : minutes}:`;
    resultStr += seconds < 10 ? "0" + seconds : seconds;
    return resultStr;
}

export default toDurationString;