import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IChampion } from '../models/IChampion';

interface ChampionProps {
  id?: number,
  patch?: string
}

const Champion: React.FC<ChampionProps> = ({ id, patch }: ChampionProps) => {
  const { id: paramId } = useParams();
  if (!id && paramId) {
    // eslint-disable-next-line no-param-reassign
    id = Number.parseInt(paramId);
  }
  // eslint-disable-next-line no-param-reassign
  if (!patch) patch = process.env.REACT_APP_CURRENT_PATCH;

  const [data, setData] = useState<IChampion>();
  useEffect(() => {
    fetch(`/api/champion/${id}/${patch}`)
      .then(response => response.json())
      .then(setData);
  }, [id, patch]);

  if (!data) {
    return (
      <div>{`Loading champion ${id}`}</div>
    );
  }

  // const tags = data.tags.reduce((prev, curr, idx, arr) => curr + ((arr.length - 1) === idx ? '' : ' '));

  // image width is width+24 to allow for 12 padding on either side
  return (
    // <div className="row align-items-center">
    //   <img alt={data.name} src={`http://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/${data.image.group}/${data.image.full}`} style={{ height: "100px", width: "124px" }} />
    //   <div className="col-2">
    //     <div className="row justify-content-center">{data.name}</div>
    //     <div className="row"><hr /></div>
    //     <div className="row justify-content-center">{data.title}</div>
    //   </div>
    //   <div className="col-2">
    //     <div className="row">
    //       Tags: {tags}
    //     </div>
    //   </div>
    // </div>
    <div>needs converted to tailwind</div>
  );
};

Champion.defaultProps = {
  id: undefined,
  patch: process.env.REACT_APP_CURRENT_PATCH,
};

export default Champion;
