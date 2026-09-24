"use client";

import { useGetMeQuery } from "@/store/api/technazApi";

export default function DashboardAuthInit() {
  useGetMeQuery();
  return null;
}
