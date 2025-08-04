
# Eliq Drinks App

This project is a white-label Angular-based drinks application. The UI elements of the application are dynamically controlled via a **configurable JSON object**, making the app customizable and adaptable to different brands and requirements. The design decisions made in this app aim to ensure flexibility, scalability, and ease of maintenance.

## Table of Contents
- [Introduction](#introduction)
- [How UI Elements are Managed](#how-ui-elements-are-managed)
- [Design Decisions](#design-decisions)
- [Customization](#customization)
- [Conclusion](#conclusion)

## Introduction

Eliq Drinks App provides a dynamic and flexible platform for displaying a variety of drink recipes. The application is built with **Angular**, using **Angular Material** for UI components, and **SCSS** for styling. The main feature of this app is its ability to change its branding and layout elements dynamically, based on a JSON configuration file, making it a perfect fit for white-label use cases.

## How UI Elements are Managed

The **config.json** file is at the heart of this customization. It contains all the necessary configurations for the UI elements, including:

- **Branding**: Logos, app name
- **Navigation**: Links for the app's menu, footer, and routing paths
- **UI Layouts**: Settings for the navbar transparency, page layouts, and more

### Example Config.json

Here is an example of how the **config.json** is structured:

```json
{
  "brand": {
    "appName": "Eliq Drinks",
    "logoUrl": "/public/logo.png"
  },
  "navLinks": [
    { "label": "Home", "path": "/" },
    { "label": "About", "path": "/about" },
    { "label": "Contact", "path": "/contact" }
  ]
}
```

### How This Works in the App

1. **Branding**: The `logoUrl` is used to display the app’s logo, while `appName` is shown as the fallback text. These values are injected into the UI dynamically.

2. **Navigation**: The `navLinks` section defines the navigation menu items. The paths are automatically set up using Angular's `routerLink` directives to handle routing.

3. **API END point**: The "env" key in config.json selects the active environment which makes the app content adjustable based on the JSON configuration.

### Example of Dynamic Rendering in HTML

```html
<mat-toolbar class="top-nav">
  <div class="container">
    <a mat-button href="/" class="logo">
      <img *ngIf="logoUrl" [src]="logoUrl" alt="{{ appName }}" class="logo-img" />
      <ng-container *ngIf="!logoUrl">{{ appName }}</ng-container>
    </a>
    <nav *ngIf="navLinks.length" class="nav-links">
      <a *ngFor="let link of navLinks" [routerLink]="link.path">{{ link.label }}</a>
    </nav>
  </div>
</mat-toolbar>
```

### How UI Elements are Bound to Config

- The `logoUrl` and `appName` are bound to the component from the JSON configuration using Angular’s two-way data binding, allowing dynamic updates to the UI.
- The navigation links (`navLinks`) are iterated with `*ngFor` to dynamically generate the `<a>` tags.

---

## Design Decisions

The design of the Eliq Drinks App is centered around flexibility and easy customization. The following are key decisions made:

### 1. **Separation of Configuration and Logic**
   - **Decision**: The app's logic is separated from the UI configuration. The app can change its appearance and behavior based on the `config.json` without needing to modify any of the core logic or code.

### 2. **Static Config vs Dynamic Loading**
   - **Decision**: Initially, a static configuration file (`config.json`) was chosen to allow for easy alterations without touching code. This method was preferred for simplicity and scalability.

### 3. **Flexibility of Navigation**
   - **Decision**: The app uses the `navLinks` configuration to dynamically generate navigation menus. This allows for easy changes to the navigation structure based on client needs.
   
---

## Conclusion

The Eliq Drinks App is designed to be easily configurable through the **config.json** file, allowing for rapid changes to the branding and UI elements without modifying the core application code. The flexibility of this design ensures that the app can be quickly customized to fit different branding needs, making it ideal for white-label projects.

By managing UI elements in a configuration file, we provide an easy and scalable approach to maintain and adjust the app, with clear separation between logic and design.