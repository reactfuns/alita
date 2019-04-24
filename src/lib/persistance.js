
export function setKeyValue ( key, value ) {
    sessionStorage.setItem(key, value);
}
export function getKeyValue (key) {
	return sessionStorage.getItem(key);
}
export function removeKey (key) {
	sessionStorage.removeItem(key);
}
export function flushAll () {
	sessionStorage.clear();
}
