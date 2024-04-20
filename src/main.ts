import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCe0x/WmFZfVpgdl9DaVZRTGYuP1ZhSXxXdkFjUH9cdX1QRWlUUEM='
);
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
