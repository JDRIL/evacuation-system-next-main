"use client";
import Badge from "@/components/Badge";
import Card from "@/components/Card/Card";
import DashboardPage from "@/components/dashboard/DashboardPage";
import useGetEvacuationsQuery from "@/hooks/useGetEvacuationsQuery";
import Evacuation from "@/types/Evacuation";

import { useRouter } from 'next/navigation'

const EvacuationPage = () => {
  const { data: evacuationsResponse } = useGetEvacuationsQuery();
  const evacuations = evacuationsResponse?.items;
  return (
    <>
      <DashboardPage>
        <DashboardPage.Header title="Evacuations" />
        <DashboardPage.Content>
          <ul className="grid gap-4">
            {evacuations?.map((evacuation) => (
              <EvacuationListItem key={evacuation.id} evacuation={evacuation} />
            ))}
          </ul>
        </DashboardPage.Content>
      </DashboardPage>
    </>
  );
};

export default EvacuationPage;

interface EvacuationListItemProps {
  evacuation: Evacuation;
}

const EvacuationListItem = ({ evacuation }: EvacuationListItemProps) => {
  
 const router = useRouter();
  const startDate = new Date(evacuation.created);
  const endDate = evacuation.end_date && new Date(evacuation.end_date);

  // Calculate the duration in milliseconds
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

  return (
    <li key={evacuation.id} onClick={()=> router.push(`/dashboard/evacuations/${evacuation.id}`)}>     
      <Card>
        <Card.Content>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4">
                <h3 className=" text-xl font-medium">
                  {evacuation.expand.worksite?.name}
                </h3>
                <Badge
                  color={evacuation.is_simulation ? "gray" : "red"}
                  size="small"
                >
                  {evacuation.is_simulation
                    ? "🧪 Evacuation drill"
                    : "🚨 Real evacuation"}
                </Badge>
              </div>

              {new Date(evacuation.created).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>

            {evacuation.end_date ? (
              <Badge color="gray">
                ⏱ {hours}h {minutes}min {seconds}s
              </Badge>
            ) : (
              <Badge color="red">🚨 Ongoing</Badge>
            )}
          </div>         
        </Card.Content>
      </Card>
    </li>
  );
};
