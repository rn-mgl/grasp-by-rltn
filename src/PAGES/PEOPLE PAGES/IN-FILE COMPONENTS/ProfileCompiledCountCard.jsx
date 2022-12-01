import React from "react";

import CountCard from "../../../COMPONENTS/GLOBAL COMPONENTS/CountCard";

export default function ProfileCompiledCountCard(props) {
  return (
    <div
      className="w-11/12 custom-flex flex-col gap-5
            tablet:flex-row"
    >
      <CountCard
        count={props.classesData?.length}
        bgColor={"from-gray-400 to-gray-200"}
        label={"Enrolled Classes"}
      />
      <CountCard
        count={props.countsData?.ongoing_count}
        bgColor={"from-pr-grn to-pr-ylw"}
        label={"Ongoing Tasks"}
      />
      <CountCard
        count={props.countsData?.late_count}
        bgColor={"from-pr-red to-pr-orng"}
        label={"Late Tasks"}
      />
      <CountCard
        count={props.countsData?.done_count}
        bgColor={"from-pr-blu to-pr-grn"}
        label={"Done Tasks"}
      />
    </div>
  );
}
