import { AppInitializerService } from "./services/app-initializer.service";

export function initializeApp(appInitializer: AppInitializerService) {
    return (): Promise<any> => {
      return appInitializer.initializeApp();
    };
  }