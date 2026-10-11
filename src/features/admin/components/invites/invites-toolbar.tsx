import { SegmentedFilter } from "../list/segmented-filter";
import { ClearExpiredButton } from "./clear-expired-button";

const STATE_FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "expired", label: "Expired" },
] as const;

/** Filter above the list of invites, and the way to clear out the expired ones. */
export function InvitesToolbar({ expiredCount }: { expiredCount: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <SegmentedFilter name="state" label="Filter by state" options={STATE_FILTER_OPTIONS} />
      {expiredCount > 0 && <ClearExpiredButton count={expiredCount} />}
    </div>
  );
}
