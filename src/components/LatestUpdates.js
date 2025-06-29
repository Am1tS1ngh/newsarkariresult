import React from 'react';
import Card from './ui/Card';
// components/AdSense.js


const jobData =  [
  { title: 'SSC CGL Online Form', posts: '(14582 Posts)', year: '', color: 'red' },
  { title: 'SSC MTS / Havildar Online Form 2025', posts: '', year: '', color: 'orange' },
  { title: 'RRB Technician Form', posts: '(6238 Posts)', year: '', color: 'purple' },
  { title: 'Air Force AFCAT Online Form 2025', posts: '', year: '', color: 'blue' },
  { title: 'UP Police Constable Form', posts: '(19,220 Posts)', year: '', color: 'olive' },
  { title: 'Army School AWES TGT, PGT, PRT Form', posts: '', year: '', color: 'blue' },
  { title: 'SSC Phase 13 Online Form', posts: '(2423 Posts)', year: '', color: 'maroon' },
  { title: 'UP Police SI Form 2025', posts: '(4543 Posts)', year: '', color: 'green' },
];

const LatestUpdates = () => {
    return (
    <div className="container mx-auto p-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 ">
        {jobData.map((job, index) => (
          <Card key={index} title={job.title} posts={job.posts} year={job.year} color={job.color} />
        ))}
      </div>
    </div>
  );
};

export default LatestUpdates;
