import Parse from "@/api/parseClient";

export async function getCurrentUsername(): Promise<string | null> {
  const currentUser = await Parse.User.currentAsync();
  if (!currentUser) return null;

  return currentUser.getUsername() ?? null;
}
