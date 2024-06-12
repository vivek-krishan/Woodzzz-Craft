const HandelCartData = async (userId, Info) => {
  try {
    const Response = await fetch("http://localhost:3000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ userId, Info }),
    });

    const error = await Response.json();
    alert(error.message);

    console.log(Response);
  } catch (error) {
    console.log(error);
  }
};

export default HandelCartData;
