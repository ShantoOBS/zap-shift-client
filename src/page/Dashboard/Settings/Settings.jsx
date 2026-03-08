import React from "react";
import { Link } from "react-router";
import { User, Bell, Shield } from "lucide-react";

export default function Settings() {
  const sections = [
    {
      title: "Account",
      icon: User,
      items: [
        {
          label: "Profile",
          description: "View and edit your profile information",
          to: "/dashboard/profile",
        },
      ],
    },
    {
      title: "Preferences",
      icon: Bell,
      items: [
        {
          label: "Notifications",
          description: "Manage email and in-app notifications",
          extra: "Coming soon",
        },
      ],
    },
    {
      title: "Security",
      icon: Shield,
      items: [
        {
          label: "Password",
          description: "Change your password",
          extra: "Manage in account provider (Google/Email)",
        },
      ],
    },
  ];

  return (
    <div className="mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
        Settings
      </h1>
      <p className="mb-8 text-sm text-[#606060]">
        Manage your account and preferences.
      </p>

      <div className="space-y-6">
        {sections.map(({ title, icon: Icon, items }) => (
          <section
            key={title}
            className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_0_rgb(0_0_0/.06)]"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#056873]/10 text-[#056873]">
                <Icon className="size-5" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            </div>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link
                      to={item.to}
                      className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 transition-colors hover:border-[#056873]/20 hover:bg-[#056873]/5"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-sm text-[#056873]">Edit →</span>
                    </Link>
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      {item.extra && (
                        <span className="text-xs text-gray-400">
                          {item.extra}
                        </span>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
