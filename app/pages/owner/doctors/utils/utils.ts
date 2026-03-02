import { Doctor } from "../types/types";

export const isAvailable = (doctor: Doctor) => {
  if (doctor.status !== "active") return false;

  const now = new Date();
  const currentDay = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ][now.getDay()];

  const todaySchedule = doctor.availability?.find((a) => a.day === currentDay);
  if (!todaySchedule || !todaySchedule.slots?.length) return false;

  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return todaySchedule.slots.some(
    (slot) => currentTime >= slot.from && currentTime <= slot.to,
  );
};

export const filterDoctors = (doctors: Doctor[], searchTerm: string) => {
  return doctors.filter((doctor) => {
    const nameAr = doctor.name?.ar || "";
    const nameEn = doctor.name?.en || "";
    return (
      nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nameEn.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};
