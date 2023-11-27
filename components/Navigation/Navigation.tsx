import {
  BellAlertIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  TagIcon,
  UserGroupIcon,
  ExclamationCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import NavigationLink from "@/components/Navigation/NavigationLink";
import Button from "../Button/Button";
import useNavigationStats from "@/hooks/useNavigationStats";
import StartEvacuationModal from "../dashboard/evacuations/StartEvacuationModal";
import { useState } from "react";
import Image from "next/image";

const Navigation = () => {
  const { data: stats, isSuccess, isLoading } = useNavigationStats();
  const [showStartEvacuationModal, setShowStartEvacuationModal] =
    useState(false);
  const tabs = [
    {
      icon: BellAlertIcon,
      label: "Evacuations",
      href: "/dashboard/evacuations",
      count: stats?.evacuationCount,
    },
    {
      icon: BuildingOfficeIcon,
      label: "Worksites",
      href: "/dashboard/worksites",
      count: stats?.sitesCount,
    },
    {
      icon: UserGroupIcon,
      label: "People",
      href: "/dashboard/people",
      count: stats?.peopleCount,
    },
    {
      icon: TagIcon,
      label: "Beacons",
      href: "/dashboard/beacons",
      count: stats?.beaconsCount,
    },
    {
      icon: DocumentTextIcon,
      label: "Reports",
      href: "/dashboard/reports",
    },
    {
      icon: Cog6ToothIcon,
      label: "Configuration",
      href: "/dashboard/configuration",
    },
  ];

  return (
    <>
      <nav className="rounded-xl shadow-lg bg-white p-6 flex flex-col justify-between flex-1">
        <div className="flex items-center justify-center mb-6">
          <svg
            className="h-12"
            viewBox="0 0 325 184"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_2217_121)">
              <path
                d="M6 96C6 42.9807 48.9807 0 102 0H313V101C313 135.794 284.794 164 250 164H6V96Z"
                fill="#070C31"
              />
            </g>
            <path
              d="M58.8463 67.12H76.5263V75.52H64.0463L71.6463 86.8C75.0596 91.6533 76.9529 94.9867 77.3263 96.8C77.5396 97.6533 77.6463 98.5333 77.6463 99.44C77.6463 103.227 76.2329 106.08 73.4063 108H53.0063V99.6H67.6463L59.0863 87.04C58.7129 86.4533 58.1263 85.6267 57.3263 84.56C56.5796 83.4933 55.9929 82.64 55.5663 82C55.1396 81.3067 54.8463 80.8 54.6863 80.48C54.5263 80.16 54.3129 79.76 54.0462 79.28C53.7796 78.7467 53.5929 78.2933 53.4863 77.92C53.2729 76.9067 53.1663 76.08 53.1663 75.44C53.1663 71.5467 55.0596 68.7733 58.8463 67.12ZM100.314 89.52H91.7538C90.6338 90.9067 90.0738 92.64 90.0738 94.72C90.0738 96.8 90.6604 98.4267 91.8338 99.6H100.314V89.52ZM83.1138 67.12H102.954C106.154 69.04 108.26 71.2533 109.274 73.76C110.287 76.2133 110.794 79.5733 110.794 83.84V95.84C110.794 100.267 110.9 104.32 111.114 108H101.994L100.554 105.12C98.4738 107.04 95.5404 108 91.7538 108H86.7138C82.1804 105.013 79.9138 100.72 79.9138 95.12C79.9138 89.4667 82.2338 85.0133 86.8738 81.76H94.3938C96.4738 81.76 98.4204 82.4 100.234 83.68V79.68C100.234 77.6 99.3271 76.2133 97.5138 75.52H83.1138V67.12ZM126.613 52H138.133V60.4H130.933C129.12 61.52 128.213 63.76 128.213 67.12H136.533V75.52H128.213V108H117.573V75.52H113.173V67.12H117.573C117.573 60.1867 120.586 55.1467 126.613 52ZM156.576 75.52H150.576C149.776 76.48 149.11 77.8133 148.576 79.52C148.096 81.2267 147.856 82.88 147.856 84.48H159.296C159.403 82.88 159.19 81.2267 158.656 79.52C158.123 77.76 157.43 76.4267 156.576 75.52ZM167.456 99.6V108H147.136C143.403 105.493 140.763 102.4 139.216 98.72C137.723 94.9867 136.976 91.2267 136.976 87.44C136.976 78.6933 140.283 71.92 146.896 67.12H159.856C163.43 69.7333 165.856 72.5067 167.136 75.44C168.416 78.3733 169.056 81.3333 169.056 84.32C169.056 87.3067 168.816 89.8667 168.336 92H148.416C148.576 93.2267 149.03 94.64 149.776 96.24C150.576 97.7867 151.43 98.9067 152.336 99.6H167.456ZM170.141 58.72V47.92H180.861V50.72C180.861 55.0933 180.515 58.3733 179.821 60.56C179.181 62.6933 177.421 65.76 174.541 69.76L169.981 67.2C172.381 63.0933 173.768 60.2667 174.141 58.72H170.141ZM199.342 75.52H193.342C192.542 76.48 191.875 77.8133 191.342 79.52C190.862 81.2267 190.622 82.88 190.622 84.48H202.062C202.169 82.88 201.955 81.2267 201.422 79.52C200.889 77.76 200.195 76.4267 199.342 75.52ZM210.222 99.6V108H189.902C186.169 105.493 183.529 102.4 181.982 98.72C180.489 94.9867 179.742 91.2267 179.742 87.44C179.742 78.6933 183.049 71.92 189.662 67.12H202.622C206.195 69.7333 208.622 72.5067 209.902 75.44C211.182 78.3733 211.822 81.3333 211.822 84.32C211.822 87.3067 211.582 89.8667 211.102 92H191.182C191.342 93.2267 191.795 94.64 192.542 96.24C193.342 97.7867 194.195 98.9067 195.102 99.6H210.222ZM233.95 67.12H239.63L241.63 69.92C242.75 68.9067 243.817 68.1867 244.83 67.76C245.897 67.3333 247.47 67.12 249.55 67.12H258.43C260.777 70.1067 262.377 73.0933 263.23 76.08C264.083 79.0667 264.51 82.8 264.51 87.28V108H253.87V86.48C253.87 81.5733 253.123 77.92 251.63 75.52H243.95C245.123 77.8133 245.71 80.9333 245.71 84.88V108H235.07V86.48C235.07 81.4133 234.377 77.76 232.99 75.52H226.83V108H216.19V67.12H224.51L225.95 70C227.123 68.9333 228.217 68.1867 229.23 67.76C230.297 67.3333 231.87 67.12 233.95 67.12Z"
              fill="white"
            />
            <defs>
              <filter
                id="filter0_d_2217_121"
                x="0"
                y="0"
                width="325"
                height="184"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="3" dy="11" />
                <feGaussianBlur stdDeviation="4.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2217_121"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2217_121"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <ul className="flex  flex-col space-y-3 flex-1">
          {tabs.map((link) => (
            <NavigationLink key={link.href} link={link} />
          ))}
        </ul>
        <Button
          variant="danger"
          leadingIcon={ExclamationCircleIcon}
          onClick={() => setShowStartEvacuationModal(true)}
        >
          Start Evacuation
        </Button>
      </nav>
      <StartEvacuationModal
        mobile={false}
        open={showStartEvacuationModal}
        onClose={() => setShowStartEvacuationModal(false)}
      />
    </>
  );
};

export default Navigation;
