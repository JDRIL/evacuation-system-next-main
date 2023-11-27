"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import mapboxgl from "mapbox-gl";

const MAPBOX_GL_ACCESS_TOKEN =
  "pk.eyJ1IjoidGhvbWFzZnFiMTIiLCJhIjoiY2w3cGI4MmVxMms1cTN3cXU5ZmVkcmhodSJ9.sHPEvrhvYvE_M1QemKqiNg";
mapboxgl.accessToken = MAPBOX_GL_ACCESS_TOKEN;

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
