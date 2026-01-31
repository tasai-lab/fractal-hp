import JobPageClient from "../JobPageClient";
import { JobPostingStructuredData } from "@/components/StructuredData";

export default function RecruitNursePage() {
  return (
    <>
      <JobPostingStructuredData jobId="nurse" />
      <JobPageClient jobId="nurse" />
    </>
  );
}
