const seesionIdToUserMap = new Map();

export function setUser(id, user) {
    return seesionIdToUserMap.set(id, user);
};

export function getUser(id) {
    return seesionIdToUserMap.get(id);
};