export async function getFact(): Promise<string> {
  try {
    const response = await fetch("https://catfact.ninja/fact");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.fact;
  } catch (error) {
    console.error(error);

    return "";
  }
}
