export function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}


export const fullname = user => user.first_name + " " + user.last_name;

export const strings = {
    DEV: {past: "Developed", label: "Develop", icon: "fa-flask"},
    SCAN: {past: "Scanned", label: "Scan", icon: "mdi-scanner"},
    CUT: {past: "Cut", label: "Cut"},

    NOTIFY: {past: "Notified", label: "Notify", icon: "fa-flask"},
    PICK_UP: {past: "PickedUp", label: "Pick up", icon: "mdi-scanner"},
    PROC: {label: "PROC", icon: ""},

    DONE: {label: "DONE", icon: ""},
};

export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

export function isObject(item) {
    return (typeof item === "object" && !Array.isArray(item) && item !== null);
}

export const toType = function (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
