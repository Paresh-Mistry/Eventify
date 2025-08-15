"use client";

import React, { useEffect, useState } from "react";

import { Team } from "@component/types/team";

interface MembersAsideProps {
  team: any;
}


const MembersAside: React.FC<MembersAsideProps> = ({ team }) => {

  const [member, setMember] = useState<Team>();

  useEffect(() => {
    setMember(team)
  }, [])

  return (
    <>

      {member?.members.length != 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-xl font-thin text-blue-800 mb-5 border-b border-gray-300 pb-2">
            Team Members
          </h3>
          <ul className="space-y-2">
            {member?.members.map((member, index) => (
              <li key={member.id} className="flex justify-between items-center text-gray-700">
                <span>{index + 1}. {member.user.name.toUpperCase()}</span>
                <span className="text-xs hidden sm:block">{member.user.email}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </>
  );
};

export default MembersAside;


