import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { DataTable } from "./data-table";
import { columns, Container } from "./columns";
import NavBar from "@/components/NavBar";

// Server action to generate a new container
async function generateContainer() {
  "use server";
  const supabase = createClient();
  const { data, error } = await supabase
    .from("containers")
    .insert({ status: "Inactive", cycle_count: 0 })
    .select();

  if (error) {
    console.error("Error generating container:", error);
  } else {
    console.log("Container generated:", data);
  }

  revalidatePath("/admin");
}

// Function to fetch containers with pagination
async function getContainers(page = 1, pageSize = 10) {
  const supabase = createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const {
    data: containers,
    error,
    count,
  } = await supabase
    .from("containers")
    .select(
      `
      *,
      profiles:borrower_id (full_name)
    `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(start, end);

  if (error) {
    console.error("Error fetching containers:", error);
    return { data: [], count: 0 };
  }

  return { data: containers, count };
}

// New server action to update container status
async function updateContainerStatus(
  containerId: string,
  newStatus: Container["status"],
) {
  "use server";
  const supabase = createClient();
  const { error } = await supabase
    .from("containers")
    .update({ status: newStatus })
    .eq("id", containerId);

  if (error) {
    console.error("Error updating container status:", error);
  } else {
    console.log(`Container ${containerId} status updated to ${newStatus}`);
  }

  revalidatePath("/admin");
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;
  const { data: containers, count } = await getContainers(page, pageSize);

  // Add onStatusChange function to each container
  const containersWithStatusChange = containers.map((container) => ({
    ...container,
    onStatusChange: updateContainerStatus,
  }));

  return (
    <>
      <NavBar isLoggedIn={true} />
      <div className="flex w-full flex-col items-center p-4">
        <h1 className="mb-4 text-2xl font-bold">Admin Panel</h1>
        <form action={generateContainer} className="mb-8">
          <Button type="submit">Generate New Container</Button>
        </form>

        <h1 className="text-lg font-bold">Containers</h1>
        <DataTable
          columns={columns}
          data={containersWithStatusChange}
          pageCount={count ? Math.ceil(count / pageSize) : 0}
        />
      </div>
    </>
  );
}
