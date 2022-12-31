import "./ModderMap.scss"

import React, { useRef } from "react"
import Map, { Source, Layer, Marker } from "react-map-gl"

import PinIcon from "@/icons/map-pin.svg"

interface ModderMapProps {
  readonly latitude: string
  readonly longitude: string
  readonly modders?: {
    readonly url: string
    readonly slug: string
    readonly name: string
    readonly city: string
    readonly latitude: string
    readonly longitude: string
  }[]
  readonly interactive?: boolean
  readonly mapPinImageUrl?: string
}

export default (props: ModderMapProps) => {
  const map = useRef()

  function handleMapLoad() {
    if (props.modders) {
      let minLatitude: number,
        maxLatitude: number,
        minLongitude: number,
        maxLongitude: number

      props.modders.forEach((modder) => {
        if (!minLatitude || parseFloat(modder.latitude) < minLatitude)
          minLatitude = parseFloat(modder.latitude)
        if (!maxLatitude || parseFloat(modder.latitude) > maxLatitude)
          maxLatitude = parseFloat(modder.latitude)
        if (!minLongitude || parseFloat(modder.longitude) < minLongitude)
          minLongitude = parseFloat(modder.longitude)
        if (!maxLongitude || parseFloat(modder.longitude) > maxLongitude)
          maxLongitude = parseFloat(modder.longitude)
      })

      const latitudePadding = (maxLatitude - minLatitude) * 0.1
      const longitudePadding = (maxLongitude - minLongitude) * 0.1

      if (map.current) {
        // add custom icon
        map.current.loadImage(props.mapPinImageUrl, (error, image) => {
          map.current.addImage("modder", image)
        })

        // pan/zoom to show all modders
        map.current.fitBounds([
          {
            lng: maxLongitude + longitudePadding,
            lat: minLatitude - latitudePadding,
          },
          {
            lng: minLongitude - longitudePadding,
            lat: maxLatitude + latitudePadding,
          },
        ])
      }
    }
  }

  function getModderGeoJson() {
    return {
      type: "FeatureCollection",
      features: props.modders.map((modder) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [modder.longitude, modder.latitude],
        },
        properties: {
          name: modder.name,
          url: modder.url,
        },
      })),
    }
  }

  return (
    <div className="ModderMap">
      <Map
        mapboxAccessToken="pk.eyJ1Ijoiam1hcnF1aXMiLCJhIjoiY2xjNWI5Z25vMGFiOTNvbDduMm1xdjd6OSJ9.sIvPPG3HemKrXvtW-fVqYg"
        initialViewState={{
          longitude: parseFloat(props.longitude) || -94.5785667,
          latitude: parseFloat(props.latitude) || 39.0997265,
          zoom: 7,
        }}
        interactive={props.interactive || false}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        ref={map}
        onLoad={handleMapLoad}
      >
        {(() => {
          if (props.modders)
            return (
              <Source type="geojson" data={getModderGeoJson()}>
                <Layer
                  type="symbol"
                  layout={{
                    "icon-image": "modder",
                  }}
                />
              </Source>
            )
          else
            return (
              <Marker
                latitude={parseFloat(props.latitude)}
                longitude={parseFloat(props.longitude)}
                anchor="bottom"
              >
                <PinIcon />
              </Marker>
            )
        })()}
      </Map>
    </div>
  )
}
