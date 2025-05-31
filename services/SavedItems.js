import LocalStorage from './LocalStorage.js';
import { ObservableMixin } from './Mixins.js';

class SavedItemsBase {
}

class SavedItems extends ObservableMixin(SavedItemsBase) {
    constructor() {
        super();
        if (SavedItems._instance) {
            return SavedItems._instance;
        }
        this.items = this.loadSavedItems();
        SavedItems._instance = this;
    }

    loadSavedItems() {
        return LocalStorage.load('savedItems') || [];
    }

    saveSavedItems() {
        LocalStorage.save('savedItems', this.items);
        this.notify(this.items);
    }

    addItem(item) {
        if (!this.items.some(existingItem => existingItem.id === item.id)) {
            this.items.push(item);
            this.saveSavedItems();
        }
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveSavedItems();
    }

    isItemSaved(itemId) {
        return this.items.some(item => item.id === itemId);
    }

    getSavedItems() {
        return [...this.items];
    }
}

export const savedItems = new SavedItems();