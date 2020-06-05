import React from 'react';
import { episode } from '../models/episode';
import EpisodeItem from './episodeitem';
import { dateHeadText } from '../logic/helper';

const EpisodeList: React.FunctionComponent<{ el: episode[] }> = ({ el }) => {
  let lastDateHead = new Date(Date.now());
  return (
    <div className="flex flex-wrap">
      {el.map((e, i) => {
        const ed = new Date(e.published);
        const edate = new Date(ed.getFullYear(), ed.getMonth(), ed.getDate());
        let dateHead = null;
        if (edate < lastDateHead) {
          lastDateHead = edate;
          dateHead = (
            <h2 className="border-b-0 w-full text-2xl font-semibold uppercase pl-2 pb-2 pt-4">
              {dateHeadText(edate)}
            </h2>
          );
        }
        return (
          <>
            {dateHead}
            <EpisodeItem e={e} />
          </>
        );
      })}
    </div>
  );
};

export default EpisodeList;
