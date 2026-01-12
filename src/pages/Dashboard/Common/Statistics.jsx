import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const StatCard = ({ title, value, hint }) => (
  <div className="card bg-base-100 border border-base-200 shadow-sm">
    <div className="card-body p-5">
      <p className="text-sm text-base-content/60">{title}</p>
      <p className="text-2xl font-bold text-base-content">{value}</p>
      {hint ? <p className="text-xs text-base-content/50 mt-1">{hint}</p> : null}
    </div>
  </div>
);

const BadgeRow = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-base-content/70">{label}</span>
    <span className="badge badge-primary badge-outline">{value}</span>
  </div>
);

const niceStatusOrder = ["pending", "approved", "rejected", "delivered", "cancelled"];

const buildStatusData = (byStatus = {}) => {
  const keys = Array.from(
    new Set([...niceStatusOrder, ...Object.keys(byStatus)])
  );
  return keys
    .filter(Boolean)
    .map((k) => ({
      name: k,
      value: Number(byStatus[k] || 0),
    }))
    .filter((x) => x.value > 0 || keys.length <= 5);
};

const formatMoney = (n) => `$${Number(n || 0).toLocaleString()}`;

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const [role, roleLoading] = useRole();

  const endpoint =
    role === "admin"
      ? "/stats/admin"
      : role === "seller"
      ? "/stats/seller"
      : "/stats/customer";

  const { data, isLoading, isFetching } = useQuery({
    enabled: !!role && !roleLoading,
    queryKey: ["stats", role],
    queryFn: async () => {
      const res = await axiosSecure.get(endpoint);
      return res.data;
    },
  });

  const statusData = useMemo(() => buildStatusData(data?.byStatus), [data]);

  if (roleLoading || isLoading) return <LoadingSpinner />;

  const headerTitle =
    role === "admin"
      ? "Platform Statistics"
      : role === "seller"
      ? "Shop Statistics"
      : "My Statistics";

  const headerSub =
    role === "admin"
      ? "System overview and performance"
      : role === "seller"
      ? "Your products, orders, and revenue"
      : "Your orders and spending summary";

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-base-content">
            {headerTitle}
          </h1>
          <p className="text-sm text-base-content/70 mt-1">{headerSub}</p>
        </div>

        {isFetching && (
          <div className="inline-flex items-center gap-2 text-sm text-base-content/60">
            <span className="loading loading-spinner loading-xs" />
            Updating...
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {role === "customer" && (
          <>
            <StatCard title="Total Orders" value={data?.totalOrders || 0} />
            <StatCard title="Total Spent" value={formatMoney(data?.totalSpent)} />
            <StatCard title="Approved" value={data?.byStatus?.approved || 0} />
            <StatCard title="Pending" value={data?.byStatus?.pending || 0} />
          </>
        )}

        {role === "seller" && (
          <>
            <StatCard title="Products" value={data?.productCount || 0} />
            <StatCard title="Total Orders" value={data?.totalOrders || 0} />
            <StatCard title="Approved" value={data?.byStatus?.approved || 0} />
            <StatCard title="Revenue" value={formatMoney(data?.revenue)} />
          </>
        )}

        {role === "admin" && (
          <>
            <StatCard title="Users" value={data?.usersTotal || 0} />
            <StatCard title="Products" value={data?.productsTotal || 0} />
            <StatCard title="Orders" value={data?.ordersTotal || 0} />
            <StatCard title="Revenue" value={formatMoney(data?.revenue)} />
          </>
        )}
      </div>

      {/* Charts grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Status Chart */}
        <div className="card bg-base-100 border border-base-200 shadow-sm">
          <div className="card-body p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-base-content">Orders by Status</p>
              <span className="badge badge-ghost">{role}</span>
            </div>

            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 space-y-2">
              {statusData.slice(0, 6).map((s) => (
                <BadgeRow key={s.name} label={s.name} value={s.value} />
              ))}
            </div>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="card bg-base-100 border border-base-200 shadow-sm">
          <div className="card-body p-5">
            <p className="font-semibold text-base-content">
              {role === "seller"
                ? "Revenue (Last 14 Days)"
                : "Orders (Last 14 Days)"}
            </p>

            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                {role === "seller" ? (
                  <AreaChart data={data?.revenueByDay || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" hide />
                    <YAxis />
                    <Tooltip />
                    <Area dataKey="revenue" />
                  </AreaChart>
                ) : (
                  <AreaChart data={data?.ordersByDay || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" hide />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Area dataKey="orders" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-base-content/60 mt-3">
              Tip: Your chart updates automatically based on recent activity.
            </p>
          </div>
        </div>
      </div>

      {/* Role-specific extras */}
      {role === "seller" && (
        <div className="mt-4 card bg-base-100 border border-base-200 shadow-sm">
          <div className="card-body p-5">
            <p className="font-semibold text-base-content">Top Products</p>
            <p className="text-sm text-base-content/70 mt-1">
              Most ordered items from your shop
            </p>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {(data?.topProducts || []).map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between rounded-xl border border-base-200 bg-base-200/40 px-4 py-3"
                >
                  <span className="text-sm font-medium text-base-content line-clamp-1">
                    {p.name}
                  </span>
                  <span className="badge badge-primary badge-outline">
                    {p.count}
                  </span>
                </div>
              ))}
              {!data?.topProducts?.length && (
                <p className="text-sm text-base-content/60">No data yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {role === "admin" && (
        <div className="mt-4 card bg-base-100 border border-base-200 shadow-sm">
          <div className="card-body p-5">
            <p className="font-semibold text-base-content">Top Categories</p>
            <p className="text-sm text-base-content/70 mt-1">
              Categories with the highest order volume
            </p>

            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={(data?.topCategories || []).map((x) => ({
                      name: x.category,
                      value: x.count,
                    }))}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    innerRadius={55}
                  >
                    {(data?.topCategories || []).map((_, idx) => (
                      <Cell key={idx} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(data?.topCategories || []).slice(0, 8).map((c) => (
                <div
                  key={c.category}
                  className="flex items-center justify-between rounded-xl border border-base-200 bg-base-200/40 px-4 py-3"
                >
                  <span className="text-sm font-medium text-base-content">
                    {c.category}
                  </span>
                  <span className="badge badge-ghost">{c.count}</span>
                </div>
              ))}
              {!data?.topCategories?.length && (
                <p className="text-sm text-base-content/60">No data yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
