"use client";

import Link from "next/link";
import { User, Camera, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SideNavigation() {
  const pathname = usePathname();
  return (
    <aside className="col-span-4 lg:col-span-1">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard/settings"
              className={`px-2.5 py-2 flex items-center space-x-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                pathname === "/dashboard/settings"
                  ? "bg-gray-100 dark:bg-gray-800"
                  : ""
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings/avatar"
              className={`px-2.5 py-2 flex items-center space-x-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                pathname === "/dashboard/settings/avatar"
                  ? "bg-gray-100 dark:bg-gray-800"
                  : ""
              }`}
            >
              <Camera className="h-4 w-4" />
              <span>Avatar</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings/profile"
              className={`px-2.5 py-2 flex items-center space-x-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                pathname === "/dashboard/settings/profile"
                  ? "bg-gray-100 dark:bg-gray-800"
                  : ""
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
