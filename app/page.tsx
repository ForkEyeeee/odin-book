async function getData() {
  const res = await fetch("http://localhost:3000/api");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page() {
  const data = await getData();
  // console.log(data);
  // {data &&
  //   data.map((users: User) => (
  //     <Message
  //       justifyContent={
  //         message.sender !== parseJwt(token).user._id
  //           ? "flex-start"
  //           : "flex-end"
  //       }
  //       backGround={
  //         message.sender !== parseJwt(token).user._id
  //           ? "white"
  //           : "blue.400"
  //       }
  //       color={
  //         message.sender !== parseJwt(token).user._id
  //           ? "black"
  //           : "white"
  //       }
  //       popOverPlacement={
  //         message.sender !== parseJwt(token).user._id
  //           ? "right"
  //           : "left"
  //       }
  return <main></main>;
}
