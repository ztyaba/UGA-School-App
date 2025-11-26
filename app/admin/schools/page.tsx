import { prisma } from "../../../lib/prisma";

export default async function AdminSchools() {
  const schools = await prisma.school.findMany();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Schools</h1>
      <div className="space-y-2">
        {schools.map((school) => (
          <div key={school.id} className="rounded border bg-white p-4 shadow">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{school.name}</p>
                <p className="text-xs text-slate-600">{school.code} • {school.district}</p>
              </div>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded">{school.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
