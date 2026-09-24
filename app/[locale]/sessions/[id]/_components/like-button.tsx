"use client";

import { Button, type ButtonVariant } from "@/components/atoms/button";
import { useTranslations } from "next-intl";

export type LikeStatus = "idle" | "loading" | "success" | "error";

interface LikeButtonProps {
  status: LikeStatus;
  onLike: () => void;
}

const VARIANT_BY_STATUS: Record<LikeStatus, ButtonVariant> = {
  idle: "default",
  loading: "default",
  success: "secondary",
  error: "destructive",
};

/** Presentational only — `status` and `onLike` are owned by the caller. */
export function LikeButton({ status, onLike }: LikeButtonProps) {
  const t = useTranslations("SessionDetail");

  const label =
    status === "success"
      ? t("likeSuccess")
      : status === "error"
        ? t("likeError")
        : t("like");

  return (
    <Button
      variant={VARIANT_BY_STATUS[status]}
      disabled={status === "loading" || status === "success"}
      onClick={onLike}
    >
      {label}
    </Button>
  );
}
