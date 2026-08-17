/**
 * Formula History Manager
 * Stores and manages recent formulas with localStorage persistence.
 */

class FormulaHistory {
  constructor(storageKey = 'latex_formula_history', maxItems = 30) {
    this.storageKey = storageKey;
    this.maxItems = maxItems;
    this.items = this.load();
  }

  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Failed to load history from localStorage', e);
      return [];
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.warn('Failed to save history to localStorage', e);
    }
  }

  add(latex) {
    if (!latex || !latex.trim()) return;
    const trimmed = latex.trim();

    // Remove if already exists (to move to top)
    this.items = this.items.filter(item => item.latex !== trimmed);

    // Insert at front
    this.items.unshift({
      id: Date.now().toString(),
      latex: trimmed,
      timestamp: new Date().toISOString()
    });

    if (this.items.length > this.maxItems) {
      this.items = this.items.slice(0, this.maxItems);
    }

    this.save();
  }

  remove(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  getAll() {
    return this.items;
  }
}

window.FormulaHistory = FormulaHistory;
