import React from 'react';

const SectionHeader: React.FunctionComponent<{ title: string }> = ({
  title,
}) => (
  <h2 className="mb-8">
    <span className="border-b-4 border-orange-500 pb-1 text-2xl font-semibold">
      {title}
    </span>
  </h2>
);

export default SectionHeader;
