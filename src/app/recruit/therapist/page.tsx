import JobPageClient from "../JobPageClient";
import { JobPostingStructuredData } from "@/components/StructuredData";

export default function RecruitTherapistPage() {
  return (
    <>
      <JobPostingStructuredData jobId="therapist" />
      <JobPageClient jobId="therapist" />
    </>
  );
}
