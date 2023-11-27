"use client";
import { useState } from "react";
import DashboardPage from "@/components/dashboard/DashboardPage";
import WorkSiteListItem from "@/components/dashboard/worksites/WorkSiteListItem";
import EmptyList from "@/components/EmptyList";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import SlideOver from "@/components/SlideOver/SlideOver";
import CreateWorksiteForm from "@/components/dashboard/worksites/CreateWorksiteForm";
import Button from "@/components/Button/Button";
import { PlusIcon } from "@heroicons/react/20/solid";
import useGetWorksitesSummaryQuery from "@/hooks/useGetWorksitesSummaryQuery";
import useCreateWorksiteMutation from "@/hooks/useCreateWorksiteMutation";

const WorksitesPage = () => {
  const [showCreateWorksiteSlideOver, setShowCreateWorksiteSlideOver] =
    useState(false);

  const { data } = useGetWorksitesSummaryQuery();
  const sites = data?.items;

  const createWorksiteMutation = useCreateWorksiteMutation();

  const toggleCreateWorksiteSlideOver = (show: boolean) => () =>
    setShowCreateWorksiteSlideOver(show);

  return (
    <>
      <DashboardPage>
        <DashboardPage.Header
          title="Worksites"
          actions={
            <Button
              variant="secondary"
              leadingIcon={PlusIcon}
              onClick={toggleCreateWorksiteSlideOver(true)}
            >
              Create a Worksite
            </Button>
          }
        />
        <DashboardPage.Content>
          {sites?.map((site) => (
            <WorkSiteListItem key={site.id} worksite={site} />
          ))}
          <EmptyList
            label="Create a new Work Site"
            icon={BuildingOffice2Icon}
            onClick={toggleCreateWorksiteSlideOver(true)}
          />
        </DashboardPage.Content>
      </DashboardPage>
      <SlideOver
        title="Create a Worksite"
        open={showCreateWorksiteSlideOver}
        onClose={toggleCreateWorksiteSlideOver(false)}
      >
        <CreateWorksiteForm
          onSubmit={createWorksiteMutation.mutate}
          onCancel={toggleCreateWorksiteSlideOver(false)}
        />
      </SlideOver>
    </>
  );
};
export default WorksitesPage;
