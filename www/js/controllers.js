angular.module('gpsDraw.controllers', [])
  /*------------
  Controlador Mapa
  --------------*/
  .controller("MapboxGLController", ["$scope", "leafletData", function($scope, leafletData) {
    //----Definicion de Capa de Grupo

    var Dibujados = new L.FeatureGroup();
    var drawControl = new L.Control.Draw();
    angular.extend($scope, {
      center: {
        lat: 51.505,
        lng: -0.04,
        zoom: 13
      },
      layers: {

      },
      mapbox: {
        name: 'Mapbox Light',
        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}@2x.png?access_token={apikey}',
        type: 'mapbox',
        options: {
          apikey: 'pk.eyJ1IjoibXJlZHByb2NvZGUiLCJhIjoiY2lpemY0aDYyMDA0Z3VkbHdxa3BudnJpMiJ9.PMtn2mheSO79sACxOri8fw',
          mapid: "mapbox.streets"
        }
      },
      defaults: {
        zoomControl: false
      }

    });

    leafletData.getMap().then(function(map) {
        map.addLayer(Dibujados);
      leafletData.getLayers().then(function(baselayers) {

        $scope.$on('MyEvent', function() {
       $scope.Empieza = new L.Draw.Polyline(map).enable(Dibujados.polyline);
     });

        map.on('draw:created', function(e) {
          var layer = e.layer;
          Dibujados.addLayer(layer);

          console.log(JSON.stringify(layer.toGeoJSON()));
          $scope.$on('MyEvent1', function() {
            layer.options.editing || (layer.options.editing = {});
            layer.editing.enable();

       });
       $scope.$on('MyEvent2', function() {
         layer.options.editing || (layer.options.editing = {});
         layer.editing.disable();

    });
        });

      });
    });
  }])
