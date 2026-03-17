'use client';

import { useJobs } from '@/hooks/useJobs';
import JobCard from '@/components/ui/JobCard';

export default function JobsSection() {
  const { jobs, loading, error } = useJobs();

  if (error) {
    return (
      <section className="bg-warm py-24 px-3">
        <div className="max-w-container-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">채용공고</h2>
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
            채용공고를 불러오는 중 오류가 발생했습니다.
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="bg-warm py-24 px-3">
        <div className="max-w-container-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">채용공고</h2>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
          </div>
        </div>
      </section>
    );
  }

  if (jobs.length === 0) {
    return (
      <section className="bg-warm py-24 px-3">
        <div className="max-w-container-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">채용공고</h2>
          <div className="text-center text-gray-600 py-12">
            현재 진행 중인 채용공고가 없습니다.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-warm py-24 px-3">
      <div className="max-w-container-md mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">채용공고</h2>

        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
