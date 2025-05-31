export const ObservableMixin = (Base) => class extends Base {
    constructor(...args) {
        super(...args);
        this.observers = new Set();
    }

    addObserver(observer) {
        this.observers.add(observer);
    }

    removeObserver(observer) {
        this.observers.delete(observer);
    }

    notify(data) {
        this.observers.forEach((observer) => {
            if (typeof observer === 'function') {
                observer(data);
            } else if (typeof observer.update === 'function') {
                observer.update(data);
            }
        });
    }
};