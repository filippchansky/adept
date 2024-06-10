import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Employee = {
  id: number;
  companyId: number;
  lastName: string;
  firstName: string;
  position: string;
};

const initialState: Employee[] = [
  {
    id: 1,
    companyId: 1,
    lastName: "Smith",
    firstName: "John",
    position: "Software Engineer",
  },
  {
    id: 2,
    companyId: 1,
    lastName: "Doe",
    firstName: "Jane",
    position: "Product Manager",
  },
  {
    id: 3,
    companyId: 2,
    lastName: "Johnson",
    firstName: "Bob",
    position: "Data Scientist",
  },
  {
    id: 4,
    companyId: 2,
    lastName: "Williams",
    firstName: "Alice",
    position: "UX Designer",
  },
  {
    id: 5,
    companyId: 2,
    lastName: "Brown",
    firstName: "Charlie",
    position: "QA Engineer",
  },
  {
    id: 6,
    companyId: 3,
    lastName: "Davis",
    firstName: "David",
    position: "DevOps Engineer",
  },
];

export const staffSlice = createSlice({
  name: "staff",
  initialState: initialState,
  reducers: {
    editStaff(
      state,
      action: PayloadAction<{ id: number; field: string; value: string }>
    ) {
      const { id, field, value } = action.payload;
      const staffIndex = state.findIndex((company) => company.id === id);

      if (staffIndex !== -1) {
        state[staffIndex] = {
          ...state[staffIndex],
          [field]: value,
        };
      }
    },
  },
});

export const { editStaff } = staffSlice.actions;

export default staffSlice.reducer;
