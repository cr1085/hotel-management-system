import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Hotel } from "../types/hotel";

export default function HotelsPage() {

  const [hotels, setHotels] = useState<Hotel[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    nit: "",
    total_rooms: "",
  });

  const [roomForms, setRoomForms] = useState<
  Record<number, {
    room_type: string;
    accommodation: string;
    quantity: string;
  }>
>({});

const [message, setMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");

  async function loadHotels() {
    try {
      const response = await api.get("/hotels");

      setHotels(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadHotels();
  }, []);

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    try {

      await api.post("/hotels", {
        ...formData,
        total_rooms: Number(formData.total_rooms),
      });

      setFormData({
        name: "",
        address: "",
        city: "",
        nit: "",
        total_rooms: "",
      });

      loadHotels();

    } catch (error) {
      console.error(error);
    }
  }

//   async function handleAddRoom(
//   hotelId: number
// ) {
//   try {

//     await api.post(
//       `/hotels/${hotelId}/rooms`,
//       {
//         ...roomForm,
//         quantity: Number(roomForm.quantity),
//       }
//     );

//     setRoomForm({
//       room_type: "ESTANDAR",
//       accommodation: "SENCILLA",
//       quantity: "",
//     });

//     loadHotels();

//   } catch (error) {
//     console.error(error);
//   }
// }


async function handleAddRoom(
  hotelId: number
) {

  setMessage("");
setErrorMessage("");

  try {

    const roomForm = roomForms[hotelId] || {
      room_type: "ESTANDAR",
      accommodation: "SENCILLA",
      quantity: "",
    };

    console.log(roomForm);

    await api.post(
      `/hotels/${hotelId}/rooms`,
      {
        room_type: roomForm.room_type,
        accommodation: roomForm.accommodation,
        quantity: Number(roomForm.quantity),
      }
    );

    setRoomForms({
      ...roomForms,
      [hotelId]: {
        room_type: "ESTANDAR",
        accommodation: "SENCILLA",
        quantity: "",
      },
    });

    loadHotels();
    setMessage(
  "Room configuration added successfully"
);

setTimeout(() => {
  setMessage("");
}, 2500);

  } catch (error: unknown) {

  console.error(error);

  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {

    const axiosError = error as {
      response?: {
        data?: {
          message?: string;
          errors?: Record<string, string[]>;
        };
      };
    };

    const responseData =
      axiosError.response?.data;

    console.log(responseData);

    if (responseData?.errors) {

     const firstError = Object.values(
    responseData.errors
  )[0]?.[0];

  setErrorMessage(
    firstError || "Validation error"
  );

  setTimeout(() => {
    setErrorMessage("");
  }, 3000);

    } else {

  setErrorMessage(
  responseData?.message ||
  "An error occurred"
);

setTimeout(() => {
  setErrorMessage("");
}, 3000);
    }

  } else {

    setErrorMessage(
  "Unexpected error"
);

setTimeout(() => {
  setErrorMessage("");
}, 3000);
  }
}
}

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto p-6">

        {message && (

  <div className="fixed inset-0 flex items-center justify-center z-50">

    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

    <div className="relative bg-green-500 text-white px-8 py-6 rounded-2xl shadow-2xl text-center animate-bounce">

      <h2 className="text-2xl font-bold mb-2">
        Success
      </h2>

      <p className="text-lg">
        {message}
      </p>

    </div>

  </div>

)}

{errorMessage && (

  <div className="fixed inset-0 flex items-center justify-center z-50">

    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

    <div className="relative bg-red-500 text-white px-8 py-6 rounded-2xl shadow-2xl text-center animate-pulse">

      <h2 className="text-2xl font-bold mb-2">
        Error
      </h2>

      <p className="text-lg">
        {errorMessage}
      </p>

    </div>

  </div>

)}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-800">
            Hotel Management System
          </h1>

          <p className="text-slate-500 mt-2">
            Manage hotels and room configurations
          </p>

          {message && (

  <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl mt-4">
    {message}
  </div>

)}

{errorMessage && (

  <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mt-4">
    {errorMessage}
  </div>

)}

        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 mb-10"
        >

          <h2 className="text-2xl font-semibold mb-6">
            Create Hotel
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Hotel Name"
              className="border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-slate-400"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Address"
              className="border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-slate-400"
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="City"
              className="border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-slate-400"
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="NIT"
              className="border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-slate-400"
              value={formData.nit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nit: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Total Rooms"
              className="border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-slate-400"
              value={formData.total_rooms}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  total_rooms: e.target.value,
                })
              }
            />

          </div>

          <button
            type="submit"
            className="mt-6 bg-slate-900 hover:bg-slate-700 transition-all text-white px-6 py-3 rounded-xl font-medium"
          >
            Create Hotel
          </button>

        </form>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* {hotels.map((hotel) => (

            <div
              key={hotel.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <div className="mb-5">

                <h2 className="text-2xl font-bold text-slate-800">
                  {hotel.name}
                </h2>

                <p className="text-slate-500">
                  {hotel.address}
                </p>

                <p className="text-slate-500">
                  {hotel.city}
                </p>

              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">

                <div className="bg-slate-100 rounded-xl p-4">
                  <p className="text-sm text-slate-500">
                    NIT
                  </p>

                  <p className="font-semibold">
                    {hotel.nit}
                  </p>
                </div>

                <div className="bg-slate-100 rounded-xl p-4">
                  <p className="text-sm text-slate-500">
                    Total Rooms
                  </p>

                  <p className="font-semibold">
                    {hotel.total_rooms}
                  </p>
                </div>

              </div>

              <div>

                <h3 className="text-lg font-semibold mb-4">
                  Room Configurations
                </h3>

                <div className="bg-slate-100 rounded-xl p-4 mb-5">

  <h4 className="font-semibold mb-4">
    Add Room Configuration
  </h4>

  <div className="grid md:grid-cols-3 gap-3">

    <select
      aria-label="Room Type"
      className="border rounded-xl p-3 bg-white"
      value={
  roomForms[hotel.id]?.room_type || "ESTANDAR"
}
      onChange={(e) =>
      setRoomForms({
  ...roomForms,
  [hotel.id]: {
    ...roomForms[hotel.id],
    room_type: e.target.value,
  },
})
      }
    >
      <option value="ESTANDAR">
        ESTANDAR
      </option>

      <option value="JUNIOR">
        JUNIOR
      </option>

      <option value="SUITE">
        SUITE
      </option>
    </select>

    <select
      aria-label="Accommodation Type"
      className="border rounded-xl p-3 bg-white"
     value={
  roomForms[hotel.id]?.accommodation || "SENCILLA"
}
      onChange={(e) =>
        setRoomForms({
  ...roomForms,
  [hotel.id]: {
    ...roomForms[hotel.id],
    accommodation: e.target.value,
  },
})
      }
    >
      <option value="SENCILLA">
        SENCILLA
      </option>

      <option value="DOBLE">
        DOBLE
      </option>

      <option value="TRIPLE">
        TRIPLE
      </option>

      <option value="CUADRUPLE">
        CUADRUPLE
      </option>
    </select>

    <input
      type="number"
      placeholder="Quantity"
      className="border rounded-xl p-3"
     value={
  roomForms[hotel.id]?.quantity || ""
}
      onChange={(e) =>
      setRoomForms({
  ...roomForms,
  [hotel.id]: {
    ...roomForms[hotel.id],
    quantity: e.target.value,
  },
})
      }
    />

  </div>

  <button
    onClick={() =>
      handleAddRoom(hotel.id)
    }
    className="mt-4 bg-slate-900 text-white px-5 py-3 rounded-xl"
  >
    Add Room
  </button>

</div>

               <div className="space-y-3">

  {hotel.rooms?.map((room) => (

    <div
      key={room.id}
      className="border border-slate-200 rounded-xl p-4"
    >

      <div className="grid grid-cols-3 gap-4">

        <div>
          <p className="text-sm text-slate-500">
            Quantity
          </p>

          <p className="font-semibold">
            {room.quantity}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Type
          </p>

          <p className="font-semibold">
            {room.room_type.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Accommodation
          </p>

          <p className="font-semibold">
            {room.accommodation.name}
          </p>
        </div>

      </div>

    </div>

  ))}

</div>

              </div>

            </div>

          ))} */}

          {hotels.map((hotel) => {

  const currentRoomForm = roomForms[hotel.id] || {
    room_type: "ESTANDAR",
    accommodation: "SENCILLA",
    quantity: "",
  };

  return (

    <div
      key={hotel.id}
      className="bg-white rounded-2xl shadow-lg p-6"
    >

      <div className="mb-5">

        <h2 className="text-2xl font-bold text-slate-800">
          {hotel.name}
        </h2>

        <p className="text-slate-500">
          {hotel.address}
        </p>

        <p className="text-slate-500">
          {hotel.city}
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-slate-100 rounded-xl p-4">
          <p className="text-sm text-slate-500">
            NIT
          </p>

          <p className="font-semibold">
            {hotel.nit}
          </p>
        </div>

        <div className="bg-slate-100 rounded-xl p-4">
          <p className="text-sm text-slate-500">
            Total Rooms
          </p>

          <p className="font-semibold">
            {hotel.total_rooms}
          </p>
        </div>

      </div>

      <div>

        <h3 className="text-lg font-semibold mb-4">
          Room Configurations
        </h3>

        <div className="bg-slate-100 rounded-xl p-4 mb-5">

          <h4 className="font-semibold mb-4">
            Add Room Configuration
          </h4>

          <div className="grid md:grid-cols-3 gap-3">

            <select
              aria-label="Room Type"
              className="border rounded-xl p-3 bg-white"
              value={currentRoomForm.room_type}
              onChange={(e) =>
                setRoomForms({
                  ...roomForms,
                  [hotel.id]: {
                    ...currentRoomForm,
                    room_type: e.target.value,
                  },
                })
              }
            >
              <option value="ESTANDAR">
                ESTANDAR
              </option>

              <option value="JUNIOR">
                JUNIOR
              </option>

              <option value="SUITE">
                SUITE
              </option>
            </select>

            <select
              aria-label="Accommodation Type"
              className="border rounded-xl p-3 bg-white"
              value={currentRoomForm.accommodation}
              onChange={(e) =>
                setRoomForms({
                  ...roomForms,
                  [hotel.id]: {
                    ...currentRoomForm,
                    accommodation: e.target.value,
                  },
                })
              }
            >
              <option value="SENCILLA">
                SENCILLA
              </option>

              <option value="DOBLE">
                DOBLE
              </option>

              <option value="TRIPLE">
                TRIPLE
              </option>

              <option value="CUADRUPLE">
                CUADRUPLE
              </option>
            </select>

            <input
              type="number"
              placeholder="Quantity"
              className="border rounded-xl p-3"
              value={currentRoomForm.quantity}
              onChange={(e) =>
                setRoomForms({
                  ...roomForms,
                  [hotel.id]: {
                    ...currentRoomForm,
                    quantity: e.target.value,
                  },
                })
              }
            />

          </div>

          <button
            onClick={() =>
              handleAddRoom(hotel.id)
            }
            className="mt-4 bg-slate-900 text-white px-5 py-3 rounded-xl"
          >
            Add Room
          </button>

        </div>

        <div className="space-y-3">

          {hotel.rooms?.map((room) => (

            <div
              key={room.id}
              className="border border-slate-200 rounded-xl p-4"
            >

              <div className="grid grid-cols-3 gap-4">

                <div>
                  <p className="text-sm text-slate-500">
                    Quantity
                  </p>

                  <p className="font-semibold">
                    {room.quantity}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Type
                  </p>

                  <p className="font-semibold">
                    {room.room_type.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Accommodation
                  </p>

                  <p className="font-semibold">
                    {room.accommodation.name}
                  </p>
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
})}

        </div>

      </div>

    </div>
  );
}