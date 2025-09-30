# Olympic Games Dashboard

Interactive web application for Olympic Games coverage and data visualization, developed with Angular 18 for TéléSport TV channel.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

## 🛠️ Development Commands

- `npm install` - Install dependencies before starting development
- `npm start` or `ng serve` - Start development server at http://localhost:4200
- `npm run build` or `ng build` - Build the project (artifacts in dist/)
- `npm test` or `ng test` - Run tests using Karma/Jasmine
- `npm run watch` or `ng build --watch --configuration development` - Build in watch mode

## 📱 Application Features

### Dashboard Page
- **Interactive pie chart** showing medal distribution per country
- **Real-time statistics** displaying number of Olympic Games and participating countries
- **Hover effects** revealing total medal counts for each country
- **Click navigation** to country detail pages
- **Responsive design** optimized for desktop, tablet, and mobile

### Country Detail Page
- **Dynamic line chart** showing medal evolution over Olympic Games years
- **Country statistics** displaying entries, total medals, and athletes count
- **URL-based routing** with country parameter support
- **Back navigation** to dashboard
- **Responsive charts** adapting to screen size

### Technical Features
- **TypeScript interfaces** with strict typing (no `any` types)
- **RxJS observables** for reactive data management
- **Proper subscription management** preventing memory leaks
- **Error handling** for network issues and invalid routes
- **Loading states** with user feedback
- **Responsive design** across all devices

## 🏗️ Architecture

### Project Structure
```
src/app/
├── core/                          # Business logic layer
│   ├── models/                    # TypeScript interfaces
│   │   ├── Olympic.ts            # Olympic country data structure
│   │   └── Participation.ts      # Olympic participation data
│   └── services/                 # Data and utility services
│       ├── olympic.service.ts    # Main data service with BehaviorSubject
│       ├── chart-utils.service.ts # Chart data transformation utilities
│       └── subscription-manager.service.ts # RxJS subscription management
├── pages/                        # Route components
│   ├── home/                     # Dashboard with pie chart
│   ├── country-detail/           # Country detail with line chart
│   └── not-found/               # 404 error page
└── app-routing.module.ts         # Route configuration
```

### Key Technical Decisions

- **Chart Library**: [@swimlane/ngx-charts](https://github.com/swimlane/ngx-charts) for interactive visualizations
- **Data Flow**: Service-based architecture with RxJS observables
- **Routing**: Parameter-based navigation (`/country/:countryName`)
- **Styling**: SCSS with responsive design principles
- **Error Handling**: Comprehensive error states and user feedback

## 📊 Data Structure

The application uses mock Olympic data (`assets/mock/olympic.json`) containing:

```typescript
interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}

interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}
```

Data includes 5 countries (Italy, Spain, United States, Germany, France) with 3 Olympic participations each (2012, 2016, 2020).
