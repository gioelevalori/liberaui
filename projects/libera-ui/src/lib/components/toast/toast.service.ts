import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type ToastTone = 'info' | 'success' | 'warning' | 'danger';
export interface ToastOptions {
  message: string;
  title?: string;
  tone?: ToastTone;
  /** Milliseconds before the toast closes; 0 keeps it until dismissed. */
  duration?: number;
}
export interface Toast extends Required<ToastOptions> {
  id: number;
}
interface ToastTimer {
  handle?: ReturnType<typeof setTimeout>;
  remaining: number;
  startedAt: number;
}

/** Queue rendered by lib-toast-outlet. State is a signal, so zoneless apps update on their own. */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly list = signal<Toast[]>([]);
  private readonly timers = new Map<number, ToastTimer>();
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private nextId = 0;
  readonly toasts = this.list.asReadonly();

  show(options: ToastOptions): number {
    const toast: Toast = { title: '', tone: 'info', duration: 5000, ...options, id: ++this.nextId };
    this.list.update((list) => [...list, toast]);
    if (toast.duration > 0 && this.isBrowser) {
      this.timers.set(toast.id, { remaining: toast.duration, startedAt: 0 });
      this.resume(toast.id);
    }
    return toast.id;
  }
  dismiss(id: number) {
    clearTimeout(this.timers.get(id)?.handle);
    this.timers.delete(id);
    this.list.update((list) => list.filter((toast) => toast.id !== id));
  }
  clear() {
    for (const toast of this.list()) this.dismiss(toast.id);
  }
  /** Stops the countdown while someone reads or interacts with the toast. */
  pause(id: number) {
    const timer = this.timers.get(id);
    if (!timer?.handle) return;
    clearTimeout(timer.handle);
    timer.handle = undefined;
    timer.remaining -= Date.now() - timer.startedAt;
  }
  resume(id: number) {
    const timer = this.timers.get(id);
    if (!timer || timer.handle) return;
    timer.startedAt = Date.now();
    timer.handle = setTimeout(() => this.dismiss(id), Math.max(0, timer.remaining));
  }
}
