"use client";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import Button from "@/components/Button/Button";
import DashboardPage from "@/components/dashboard/DashboardPage";
import EmptyList from "@/components/EmptyList";
import { TagIcon } from "@heroicons/react/24/outline";
import BeaconListItem from "@/components/dashboard/beacons/BeaconListItem";
import SlideOver from "@/components/SlideOver/SlideOver";
import CreateBeaconForm from "@/components/dashboard/beacons/CreateBeaconForm";
import useGetBeaconsSummaryQuery from "@/hooks/useGetBeaconsSummaryQuery";
import useCreateBeaconMutation from "@/hooks/useCreateBeaconMutation";

const BeaconsPage = () => {
  const [showAddBeaconSlideOver, setShowAddBeaconSlideOver] = useState(false);
  const toggleAddBeaconSlideOver = (show: boolean) => () =>
    setShowAddBeaconSlideOver(show);

  const { data } = useGetBeaconsSummaryQuery();
  const beacons = data?.items;

  const createBeaconMutation = useCreateBeaconMutation();

  return (
    <>
      <DashboardPage>
        <DashboardPage.Header
          title="Beacons"
          actions={
            <Button
              variant="secondary"
              leadingIcon={PlusIcon}
              onClick={toggleAddBeaconSlideOver(true)}
            >
              Add a Beacon
            </Button>
          }
        />
        <DashboardPage.Content>
          <ul className="grid grid-cols-3 gap-4">
            {beacons?.map((beacon) => (
              <BeaconListItem key={beacon.id} {...{ beacon }} />
            ))}
            <EmptyList
              label="Add a new beacon"
              icon={TagIcon}
              onClick={toggleAddBeaconSlideOver(true)}
            />
          </ul>
        </DashboardPage.Content>
      </DashboardPage>

      <SlideOver
        title="Add a Beacon"
        open={showAddBeaconSlideOver}
        onClose={toggleAddBeaconSlideOver(false)}
      >
        <CreateBeaconForm
          onSubmit={createBeaconMutation.mutate}
          onCancel={toggleAddBeaconSlideOver(false)}
        />
      </SlideOver>
    </>
  );
};

export default BeaconsPage;
