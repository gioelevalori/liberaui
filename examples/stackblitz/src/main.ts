import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

// LiberaUI works without zone.js; this starter runs fully zoneless.
bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] }).catch((err) =>
  console.error(err),
);
