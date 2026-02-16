export class LocalStorageService {
  private key: string;
  private entityName: string;

  constructor(key: string, entityName: string = '') {
    this.key = key;
    this.entityName = entityName;
  }

  save<T>(items: T[]) {
    try {
      localStorage.setItem(this.key, JSON.stringify(items));
    } catch (err) {
      console.error(`Ошибка при сохранении ${this.entityName} в localStorage:`, err);
    }
  }

  load<T>(): T[] {
    try {
      const data = localStorage.getItem(this.key);
      if (!data) return [];
      return JSON.parse(data) as T[];
    } catch (err) {
      console.error(`Ошибка при чтении ${this.entityName} из localStorage:`, err);
      return [];
    }
  }

  removeById<T extends { id: string }>(id: string): T[] | undefined {
    try {
      const items = this.load<T>();
      const filtered = items.filter(item => item.id !== id);
      this.save(filtered);
      return filtered || [] as T[];
    } catch (err) {
      console.error(`Ошибка при удалении элемента ${this.entityName} с id=${id} из localStorage:`, err);
    }
  }

  clear() {
    try {
      localStorage.removeItem(this.key);
    } catch (err) {
      console.error(`Ошибка при удалении ${this.entityName} из localStorage:`, err);
    }
  }
}
