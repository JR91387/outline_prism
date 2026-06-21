/**
 * In-memory console-log capture for the Development Mode dev tool. Off by
 * default. When enabled it tees console.{log,info,warn,error} into a bounded
 * ring buffer that the settings page can view, copy, or export as JSON. The
 * enabled flag persists in localStorage so capture survives reloads.
 */
type LogLevel = "log" | "info" | "warn" | "error";

export type LogEntry = {
  time: string;
  level: LogLevel;
  message: string;
};

const STORAGE_KEY = "prism-debug-logger-enabled";
const MAX_ENTRIES = 1000;
const LEVELS: LogLevel[] = ["log", "info", "warn", "error"];

class LogStore {
  entries: LogEntry[] = [];
  private installed = false;
  private originals: Partial<Record<LogLevel, (...args: unknown[]) => void>> =
    {};

  get enabled(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  }

  setEnabled(on: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEY, String(on));
    } catch {
      // ignore storage failures (private mode, etc.)
    }
    if (on) {
      this.install();
    } else {
      this.uninstall();
    }
  }

  install(): void {
    if (this.installed) {
      return;
    }
    this.installed = true;
    for (const level of LEVELS) {
      const original = console[level].bind(console) as (
        ...args: unknown[]
      ) => void;
      this.originals[level] = original;
      console[level] = (...args: unknown[]) => {
        this.push(level, args);
        original(...args);
      };
    }
  }

  uninstall(): void {
    if (!this.installed) {
      return;
    }
    for (const level of LEVELS) {
      const original = this.originals[level];
      if (original) {
        console[level] = original;
      }
    }
    this.originals = {};
    this.installed = false;
  }

  clear(): void {
    this.entries = [];
  }

  toJSON(): string {
    return JSON.stringify(this.entries, null, 2);
  }

  private push(level: LogLevel, args: unknown[]): void {
    const message = args
      .map((arg) => {
        if (typeof arg === "string") {
          return arg;
        }
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      })
      .join(" ");
    this.entries.push({
      time: new Date().toISOString(),
      level,
      message,
    });
    if (this.entries.length > MAX_ENTRIES) {
      this.entries.shift();
    }
  }
}

export const logStore = new LogStore();
