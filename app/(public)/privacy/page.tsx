import PrivacyPolicy from "@/components/PrivacyPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SPX",
  description: "Privacy Policy and data protection at SPX.",
};

export default function Page() {
  return <PrivacyPolicy />;
}

