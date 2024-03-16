export async function getAge(name: string): Promise<number | null> {
  try {
    const response = await fetch(`https://api.agify.io/?name=${name}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.age;
  } catch (error) {
    console.error(error);

    return null;
  }
}
