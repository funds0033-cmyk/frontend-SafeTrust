import { CheckCircle, Info, AlertTriangle, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NotificationData } from "@/types/dashboard";

interface NotificationItemProps {
  notification: NotificationData;
  onClick: () => void;
}

const ICON_MAP = {
  payment: <CheckCircle className="h-5 w-5 text-green-400" />,
  milestone: <Info className="h-5 w-5 text-blue-400" />,
  alert: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
};

export function NotificationItem({
  notification,
  onClick,
}: NotificationItemProps) {
  const { type, message, timestamp, read } = notification;
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-lg border p-4 transition-colors",
        read
          ? "border-gray-700 bg-transparent"
          : "border-purple-700/40 bg-purple-900/10 hover:bg-purple-900/20"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          {ICON_MAP[type as keyof typeof ICON_MAP] || <Bell className="h-5 w-5 text-gray-400" />}
        </div>
        <div className="flex-1 space-y-0.5">
          <p className={cn("text-sm font-medium", read ? "text-gray-300" : "text-white")}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Update
          </p>
          <p className="text-xs text-gray-400">{message}</p>
          <p className="text-xs text-gray-500">{timestamp}</p>
        </div>
        {!read && (
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500" aria-label="Unread" />
        )}
      </div>
    </button>
  );
}
