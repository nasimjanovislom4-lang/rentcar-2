import { Icon } from "@iconify/react";
import arrowLeft from "@iconify-icons/lucide/arrow-left";
import arrowRight from "@iconify-icons/lucide/arrow-right";
import badgeCheck from "@iconify-icons/lucide/badge-check";
import banknote from "@iconify-icons/lucide/banknote";
import bell from "@iconify-icons/lucide/bell";
import briefcase from "@iconify-icons/lucide/briefcase-business";
import calendar from "@iconify-icons/lucide/calendar-days";
import car from "@iconify-icons/lucide/car";
import carFront from "@iconify-icons/lucide/car-front";
import chart from "@iconify-icons/lucide/chart-no-axes-column-increasing";
import check from "@iconify-icons/lucide/check";
import circleDollar from "@iconify-icons/lucide/circle-dollar-sign";
import circleDot from "@iconify-icons/lucide/circle-dot";
import clipboard from "@iconify-icons/lucide/clipboard-list";
import clock from "@iconify-icons/lucide/clock-3";
import creditCard from "@iconify-icons/lucide/credit-card";
import crown from "@iconify-icons/lucide/crown";
import download from "@iconify-icons/lucide/download";
import fileSpreadsheet from "@iconify-icons/lucide/file-spreadsheet";
import fileText from "@iconify-icons/lucide/file-text";
import fuel from "@iconify-icons/lucide/fuel";
import globe from "@iconify-icons/lucide/globe";
import idCard from "@iconify-icons/lucide/id-card";
import landmark from "@iconify-icons/lucide/landmark";
import lock from "@iconify-icons/lucide/lock-keyhole";
import mail from "@iconify-icons/lucide/mail";
import mapPin from "@iconify-icons/lucide/map-pin";
import moon from "@iconify-icons/lucide/moon";
import phone from "@iconify-icons/lucide/phone";
import plus from "@iconify-icons/lucide/plus";
import printer from "@iconify-icons/lucide/printer";
import rotate from "@iconify-icons/lucide/rotate-cw";
import search from "@iconify-icons/lucide/search";
import satellite from "@iconify-icons/lucide/satellite";
import settings from "@iconify-icons/lucide/settings-2";
import shield from "@iconify-icons/lucide/shield";
import shieldCheck from "@iconify-icons/lucide/shield-check";
import smartphone from "@iconify-icons/lucide/smartphone";
import sparkles from "@iconify-icons/lucide/sparkles";
import star from "@iconify-icons/lucide/star";
import sun from "@iconify-icons/lucide/sun";
import table from "@iconify-icons/lucide/table";
import alert from "@iconify-icons/lucide/triangle-alert";
import user from "@iconify-icons/lucide/user-round";
import users from "@iconify-icons/lucide/users";
import wallet from "@iconify-icons/lucide/wallet";
import wrench from "@iconify-icons/lucide/wrench";
import x from "@iconify-icons/lucide/x";
import zap from "@iconify-icons/lucide/zap";
import React, { type CSSProperties } from "react";

const icons = {
  alert,
  arrowLeft,
  arrowRight,
  badgeCheck,
  banknote,
  bell,
  briefcase,
  calendar,
  car,
  carFront,
  chart,
  check,
  circleDollar,
  circleDot,
  clipboard,
  clock,
  creditCard,
  crown,
  download,
  fileSpreadsheet,
  fileText,
  fuel,
  globe,
  idCard,
  landmark,
  lock,
  mail,
  mapPin,
  moon,
  phone,
  plus,
  printer,
  rotate,
  satellite,
  search,
  settings,
  shield,
  shieldCheck,
  smartphone,
  sparkles,
  star,
  sun,
  table,
  user,
  users,
  wallet,
  wrench,
  x,
  zap,
};

export type SiteIconName = keyof typeof icons;

interface SiteIconProps {
  name: SiteIconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export default function SiteIcon({ name, size = 20, className, style }: SiteIconProps) {
  return (
    <Icon
      icon={icons[name]}
      ssr={true}
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    />
  );
}