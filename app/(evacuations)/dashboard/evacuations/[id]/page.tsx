"use client";

import Badge from "@/components/Badge";
import Card from "@/components/Card/Card";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import mapboxgl, { GeoJSONSource, Map } from "mapbox-gl";
import { getScannedBeacons } from "@/api/beacons";
import { useQuery } from "@tanstack/react-query";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { usePathname } from "next/navigation";
import useGetEvacuationInfoQuery from "@/hooks/useGetevacuationInfoQuery";
import useGetEvacuationById from "@/hooks/useGetEvacuationById";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const EvacuationPage = () => {
  const pathname = usePathname();
  const [evacuationId, setEvacuationId] = useState<string>("");
  const { data: people } = useGetEvacuationInfoQuery(evacuationId);
  const { data: evacuation, isLoading,isSuccess } = useGetEvacuationById(evacuationId);


  const handleDuration= (created:string,finish:string) => {

    const startDate = new Date(created);
    const endDate = finish && new Date(finish);

    const durationMs = endDate
    ? endDate.getTime() - startDate.getTime()
    : undefined;

  // Convert milliseconds to hours, minutes, and seconds
  const hours = durationMs
    ? Math.floor(durationMs / (1000 * 60 * 60))
    : undefined;
  const minutes = durationMs
    ? Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
    : undefined;
  const seconds = durationMs
    ? Math.floor((durationMs % (1000 * 60)) / 1000)
    : undefined;
    
    return `${hours}h ${minutes}min ${seconds}s`;
  };

  const stats = [
    { name: "At safe point", stat: people?.filter((item) => item.arrival_time).length ?? 0},
    {
      name: "In worksite",
      stat: people?.filter((item) => !item.arrival_time).length ?? 0,
    },
    { name: "Total ", stat: people?.length?? 0},
  ];

  useEffect(() => {
    const routes = pathname.split("/");
    setEvacuationId(routes[routes.length - 1]);
  }, [pathname, evacuationId]);

  const mapContainerRef = useRef(null);
  const [map, setMap] = useState<Map | null>(null);

  const TIME_TO_REFRESH_MILISECONDS= 2000;
  const beaconsQuery = useQuery({
    queryKey: ["scanned_beacons"],
    queryFn: getScannedBeacons,
    refetchInterval: TIME_TO_REFRESH_MILISECONDS,
  });

  const beacons = beaconsQuery.data?.items;

  const updateMapLayer = async () => {
    if (!beacons) return;

    // Generate the GeoJSON feature collection from the fetched data
    const featureCollection: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: beacons.map((beacon) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [beacon.longitude, beacon.latitude],
        },
        properties: {
          color: "red",

          description: `<p>${beacon.mac_address}</p><p>${timeAgo.format(
            //@ts-ignore
            new Date(beacon.last_seen_date)
          )}</p>`,
        },
      })),
    };

    (map?.getSource("clusters") as GeoJSONSource)?.setData(featureCollection);
  };

  useEffect(() => {
    updateMapLayer();
  }, [beacons, map]);
//cambiar el beacon y como se muestra la info
  useEffect(() => {
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-74.04475, 4.67928],
        zoom: 15,
      });

      newMap.on("load", () => {
        // updateMapLayer();
        // const clusterData = generateClusterData();

        newMap.addSource("clusters", {
          type: "geojson",
          //data: clusterData as any,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        newMap.addLayer({
          id: "clusters",
          type: "circle",
          source: "clusters",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              100,
              "#f1f075",
              750,
              "#f28cb1",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
          },
        });

        newMap.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "clusters",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 15,
          },
          paint: {
            "text-color": "#ffffff",
          },
        });

        newMap.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "clusters",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": 4,
            "circle-color": "red", // Use the color property to assign the dynamic color
          },
        });

        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        newMap.on("mouseenter", "unclustered-point", (e) => {
          // Change the cursor style as a UI indicator.
          newMap.getCanvas().style.cursor = "pointer";

          // Copy coordinates array.
          const coordinates =
            e.features?.[0].geometry.type === "Point" &&
            e.features?.[0].geometry.coordinates.slice();

          const description = e.features?.[0].properties?.description;

          if (!coordinates) return;
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          console.log({ coordinates });
          // Populate the popup and set its coordinates
          // based on the feature found.
          popup
            .setLngLat(coordinates as [number, number])
            .setHTML(description)

            .addTo(newMap);
        });

        newMap.on("mouseleave", "unclustered-point", () => {
          newMap.getCanvas().style.cursor = "";
          popup.remove();
        });

        setMap(newMap);
      });
    }

    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, [map]);

  return (
    <div className="h-screen w-screen bg-gray-100 flex">
      <div className="h-screen w-1/2 overflow-y-auto relative">
        <header className="border-b p-6 bg-white flex items-center justify-between sticky top-0">
          <div className="flex items-center space-x-3">
            <Link
              href={"/dashboard/evacuations"}
              className="hover:bg-gray-100 p-2 rounded-full"
            >
              <ArrowLeftIcon className="h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold">
                {isLoading ? "Loading...": evacuation?.expand.worksite?.name } &apos;s Evacuation
                
              </h1>
              <p className="text-sm text-gray-500">{isSuccess? new Date(evacuation.created).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              }):""}</p>
            </div>
          </div>
          { isSuccess && evacuation.end_date!== ""?
           <Badge color= "green">
           Finished
         </Badge>: 
          <Badge color= "red"  className="animate-pulse">
            🚨 Ongoing
          </Badge>
}
        </header>
        <div className="p-6 space-y-6">
          <div>
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.name}
                  className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                >
                  <dt className="truncate text-sm font-medium text-gray-500">
                    {item.name}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {item.stat}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <Card>
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Evacuation time
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {people?.map((person) => (
                  <tr key={person.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {person.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.role}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {handleDuration(person.created,person.arrival_time)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <Badge color= {person.arrival_time?  "green": "red" } size="small" className="w-full text-right">
                    {person.arrival_time?'SAFEPOINT':'WORKSITE'}
                  </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
      <div className="w-1/2 bg-gray-200 h-full relative overflow-hidden">
        <div className="inset-0 absolute" ref={mapContainerRef} />
      </div>
    </div>
  );
};

export default EvacuationPage;
