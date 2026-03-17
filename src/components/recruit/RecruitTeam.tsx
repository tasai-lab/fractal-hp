"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { StaffMember } from "@/lib/stations-data";

type Props = {
  staffMembers: StaffMember[];
  roleOverrides?: Record<string, string>;
  teamOrder?: string[];
  showTeamPhoto?: boolean;
  onModalChange?: (isOpen: boolean) => void;
};

const DEFAULT_ROLE_OVERRIDES: Record<string, string> = {
  "古谷 一真": "管理者",
  "浅井 拓哉": "看護師",
  "髙山 里美": "看護師",
  "祝迫 萌々": "営業兼事務職",
};

const DEFAULT_TEAM_ORDER = ["古谷 一真", "浅井 拓哉", "髙山 里美", "祝迫 萌々"];

function buildTeamProfiles(
  staffMembers: StaffMember[],
  roleOverrides: Record<string, string>,
  teamOrder: string[]
): StaffMember[] {
  return teamOrder
    .map((name) => staffMembers.find((staff) => staff.name === name))
    .filter((staff): staff is StaffMember => Boolean(staff))
    .map((staff) => ({
      ...staff,
      role: roleOverrides[staff.name] ?? staff.role,
    }));
}

export default function RecruitTeam({
  staffMembers,
  roleOverrides = DEFAULT_ROLE_OVERRIDES,
  teamOrder = DEFAULT_TEAM_ORDER,
  showTeamPhoto = true,
  onModalChange,
}: Props) {
  const teamProfiles = useMemo(
    () => buildTeamProfiles(staffMembers, roleOverrides, teamOrder),
    [staffMembers, roleOverrides, teamOrder]
  );
  const [selectedTeam, setSelectedTeam] = useState<StaffMember | null>(null);

  useEffect(() => {
    const isOpen = selectedTeam !== null;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    onModalChange?.(isOpen);
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedTeam, onModalChange]);

  return (
    <>
      <p className="text-xs tracking-[0.3em] text-ink-soft">TEAM</p>
      <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
        一緒に働く仲間
      </h3>
      <p className="text-ink-soft mt-2">
        互いに支え合いながら、成長を喜べるチームです。
      </p>

      {showTeamPhoto && (
        <div className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-lg bg-white mt-6">
          <Image
            src="/images/recruit/labels/team-title.webp"
            alt="一緒に働く仲間"
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-contain bg-white"
          />
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {teamProfiles.map((member) => (
          <button
            key={member.name}
            type="button"
            onClick={() => setSelectedTeam(member)}
            className="w-full bg-[var(--color-paper)] rounded-2xl p-3 md:p-5 text-center border border-white transition-all duration-300 hover:shadow-md active:scale-[0.98]"
          >
            <div className="relative w-20 h-20 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto rounded-2xl overflow-hidden mb-2 md:mb-3">
              <Image
                src={member.image}
                alt={`${member.name}の写真`}
                fill
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 128px, 144px"
                className="object-cover"
              />
            </div>
            <p className="heading-mincho text-base md:text-lg text-[var(--color-olive)]">
              {member.name}
            </p>
            <p className="text-[11px] md:text-sm text-ink-soft">{member.role}</p>
            <p className="text-[10px] text-ink-soft/70 mt-1">タップで自己紹介</p>
          </button>
        ))}
      </div>

      {selectedTeam && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setSelectedTeam(null)}
        >
          <div
            className="w-full max-w-md bg-[var(--color-paper)] rounded-3xl shadow-xl border border-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative rounded-t-3xl bg-white/80 px-6 py-8 text-center">
              <button
                type="button"
                onClick={() => setSelectedTeam(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center"
                aria-label="閉じる"
              >
                <span className="text-lg text-ink-soft">×</span>
              </button>
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden mx-auto mb-4">
                <Image
                  src={selectedTeam.image}
                  alt={`${selectedTeam.name}の写真`}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs tracking-[0.2em] text-ink-soft">STAFF</p>
              <h3 className="heading-mincho text-2xl text-[var(--color-olive)] mt-2">
                {selectedTeam.name}
              </h3>
              <p className="text-sm text-ink-soft mt-1">{selectedTeam.nameReading}</p>
              <p className="text-sm text-[var(--color-olive)] mt-2">{selectedTeam.role}</p>
            </div>

            <div className="px-6 pb-6">
              <div className="grid gap-3 mt-4">
                <div className="bg-white rounded-2xl border border-white p-3 text-sm text-ink-soft">
                  <span className="font-semibold text-[var(--color-olive)]">出身地：</span>
                  {selectedTeam.birthplace}
                </div>
                <div className="bg-white rounded-2xl border border-white p-3 text-sm text-ink-soft">
                  <span className="font-semibold text-[var(--color-olive)]">趣味：</span>
                  {selectedTeam.hobbies}
                </div>
              </div>
              <div className="mt-4 bg-white rounded-2xl border border-white p-4">
                <p className="text-sm font-semibold text-[var(--color-olive)] mb-2">自己紹介</p>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {selectedTeam.introduction}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
