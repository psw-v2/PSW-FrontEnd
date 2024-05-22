import 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    interface Control {
      // Add any specific methods or properties you expect to use, or leave empty if uncertain
    }

    function control(options: any): Control;
  }
}
